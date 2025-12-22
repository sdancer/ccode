use anyhow::{Context, Result};
use rusqlite::{params, Connection};
use std::collections::HashMap;

use super::claude::{ClaudeClient, LibraryIdentification};
use crate::store::models::NewLibraryCache;

/// Known library patterns that can be identified without AI
pub struct PatternMatcher {
    patterns: Vec<(Vec<&'static str>, &'static str, &'static str)>, // (strings, library, module_path)
}

impl PatternMatcher {
    pub fn new() -> Self {
        Self {
            patterns: vec![
                // RxJS patterns
                (vec!["Observable", "ConnectableObservable"], "rxjs", "rxjs"),
                (vec!["Subject", "BehaviorSubject", "ReplaySubject"], "rxjs", "rxjs/Subject"),
                (vec!["switchMap", "mergeMap", "concatMap"], "rxjs", "rxjs/operators"),
                (vec!["isFunction", "typeof", "function"], "rxjs", "rxjs/internal/util/isFunction"),
                (vec!["UnsubscriptionError"], "rxjs", "rxjs/internal/util/UnsubscriptionError"),

                // Lodash patterns
                (vec!["debounce", "wait", "leading", "trailing"], "lodash", "lodash/debounce"),
                (vec!["throttle", "wait"], "lodash", "lodash/throttle"),
                (vec!["cloneDeep"], "lodash", "lodash/cloneDeep"),

                // TypeScript helpers
                (vec!["__awaiter", "__generator"], "tslib", "tslib/__awaiter"),
                (vec!["__spreadArray", "__read"], "tslib", "tslib/__spreadArray"),

                // Zod patterns
                (vec!["ZodError", "ZodIssue"], "zod", "zod"),

                // Node.js core
                (vec!["homedir", "tmpdir", "platform"], "node:os", "os"),
                (vec!["readFileSync", "writeFileSync", "existsSync"], "node:fs", "fs"),
                (vec!["createHash", "randomBytes", "createCipheriv"], "node:crypto", "crypto"),
                (vec!["EventEmitter", "emit", "once"], "node:events", "events"),

                // gRPC
                (vec!["grpc", "http_connect_target"], "@grpc/grpc-js", "grpc"),

                // Anthropic SDK
                (vec!["api.anthropic.com"], "@anthropic-ai/sdk", "anthropic"),
                (vec!["anthropic.", "Anthropic"], "@anthropic-ai/sdk", "anthropic"),

                // AWS SDK
                (vec!["aws.lambda", "db.system"], "@aws-sdk", "aws-sdk"),
                (vec!["useFipsEndpoint", "useDualstackEndpoint"], "@aws-sdk", "aws-sdk"),

                // highlight.js
                (vec!["actionscript", "angelscript", "applescript"], "highlight.js", "highlight.js/languages"),

                // React DevTools
                (vec!["React::DevTools"], "react-devtools", "react-devtools"),

                // CLI frameworks
                (vec!["commander", "program.option"], "commander", "commander"),
                (vec!["yargs", "argv", "positional"], "yargs", "yargs"),

                // Terminal / chalk
                (vec!["chalk", "ansiStyles"], "chalk", "chalk"),

                // Unicode / CLDR
                (vec!["UTF-8", "unicode", "iana"], "@anthropic-ai/sdk", "mime-types"),

                // CSS properties
                (vec!["align-content", "align-items", "flex-direction"], "css-properties", "known-css-properties"),
            ],
        }
    }

    pub fn try_match(&self, strings: &[String]) -> Option<(&str, &str, f64)> {
        let strings_lower: Vec<String> = strings.iter().map(|s| s.to_lowercase()).collect();

        for (patterns, library, module_path) in &self.patterns {
            let matches: usize = patterns
                .iter()
                .filter(|p| {
                    strings_lower
                        .iter()
                        .any(|s| s.contains(&p.to_lowercase()))
                })
                .count();

            if matches >= 2 || (patterns.len() == 1 && matches == 1) {
                let confidence = matches as f64 / patterns.len() as f64;
                return Some((library, module_path, confidence.min(0.9)));
            }
        }

        None
    }
}

impl Default for PatternMatcher {
    fn default() -> Self {
        Self::new()
    }
}

/// Library identifier with caching
pub struct LibraryIdentifier {
    conn: Connection,
    claude: Option<ClaudeClient>,
    pattern_matcher: PatternMatcher,
}

impl LibraryIdentifier {
    pub fn new(db_path: &str, api_key: Option<String>) -> Result<Self> {
        let conn = Connection::open(db_path)
            .with_context(|| format!("Failed to open database: {}", db_path))?;

        let claude = api_key.map(ClaudeClient::new);

        Ok(Self {
            conn,
            claude,
            pattern_matcher: PatternMatcher::new(),
        })
    }

    /// Check if we have a cached identification for this hash
    pub fn get_cached(&self, body_hash: &str) -> Result<Option<NewLibraryCache>> {
        let mut stmt = self.conn.prepare(
            "SELECT body_hash, minified_name, library_name, module_path, cleartext_name,
                    confidence, identification_method, sample_strings
             FROM library_cache WHERE body_hash = ?1",
        )?;

        let result = stmt.query_row([body_hash], |row| {
            Ok(NewLibraryCache {
                body_hash: row.get(0)?,
                minified_name: row.get(1)?,
                library_name: row.get(2)?,
                module_path: row.get(3)?,
                cleartext_name: row.get(4)?,
                confidence: row.get(5)?,
                identification_method: row.get(6)?,
                sample_strings: row.get(7)?,
            })
        });

        match result {
            Ok(cache) => Ok(Some(cache)),
            Err(rusqlite::Error::QueryReturnedNoRows) => Ok(None),
            Err(e) => Err(e.into()),
        }
    }

    /// Save identification to cache
    pub fn cache_identification(&self, cache: &NewLibraryCache) -> Result<()> {
        self.conn.execute(
            "INSERT OR REPLACE INTO library_cache
             (body_hash, minified_name, library_name, module_path, cleartext_name,
              confidence, identification_method, sample_strings)
             VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8)",
            params![
                cache.body_hash,
                cache.minified_name,
                cache.library_name,
                cache.module_path,
                cache.cleartext_name,
                cache.confidence,
                cache.identification_method,
                cache.sample_strings,
            ],
        )?;
        Ok(())
    }

    /// Get strings associated with a symbol
    pub fn get_symbol_strings(&self, symbol_name: &str) -> Result<Vec<String>> {
        let mut stmt = self.conn.prepare(
            "SELECT DISTINCT s.value
             FROM strings s
             JOIN symbols sym ON s.symbol_id = sym.id
             WHERE sym.name = ?1
             LIMIT 50",
        )?;

        let strings: Vec<String> = stmt
            .query_map([symbol_name], |row| row.get(0))?
            .filter_map(|r| r.ok())
            .collect();

        Ok(strings)
    }

    /// Get symbol info by name
    pub fn get_symbol_info(&self, name: &str) -> Result<Option<(String, Option<String>, Option<String>)>> {
        let mut stmt = self.conn.prepare(
            "SELECT name, body_hash, signature FROM symbols WHERE name = ?1 LIMIT 1",
        )?;

        let result = stmt.query_row([name], |row| {
            Ok((
                row.get::<_, String>(0)?,
                row.get::<_, Option<String>>(1)?,
                row.get::<_, Option<String>>(2)?,
            ))
        });

        match result {
            Ok(info) => Ok(Some(info)),
            Err(rusqlite::Error::QueryReturnedNoRows) => Ok(None),
            Err(e) => Err(e.into()),
        }
    }

    /// Identify a symbol using pattern matching first, then Claude if needed
    pub async fn identify(
        &self,
        symbol_name: &str,
        module_code: Option<&str>,
        use_ai: bool,
    ) -> Result<NewLibraryCache> {
        // Get symbol info
        let (name, body_hash, signature) = self
            .get_symbol_info(symbol_name)?
            .ok_or_else(|| anyhow::anyhow!("Symbol not found: {}", symbol_name))?;

        // Check cache first
        if let Some(hash) = &body_hash {
            if let Some(cached) = self.get_cached(hash)? {
                return Ok(cached);
            }
        }

        // Get associated strings
        let strings = self.get_symbol_strings(symbol_name)?;
        let sample_strings = serde_json::to_string(&strings.iter().take(20).collect::<Vec<_>>())?;

        // Try pattern matching first
        if let Some((library, module_path, confidence)) = self.pattern_matcher.try_match(&strings) {
            let cache = NewLibraryCache {
                body_hash: body_hash.clone().unwrap_or_default(),
                minified_name: Some(name),
                library_name: Some(library.to_string()),
                module_path: Some(module_path.to_string()),
                cleartext_name: None,
                confidence: Some(confidence),
                identification_method: Some("pattern".to_string()),
                sample_strings: Some(sample_strings),
            };

            if body_hash.is_some() {
                self.cache_identification(&cache)?;
            }
            return Ok(cache);
        }

        // Use Claude if available and requested
        if use_ai {
            if let Some(claude) = &self.claude {
                let code = module_code.unwrap_or("");
                let identification = claude
                    .identify_library(&name, code, &strings, signature.as_deref())
                    .await?;

                let cache = NewLibraryCache {
                    body_hash: body_hash.clone().unwrap_or_default(),
                    minified_name: Some(name),
                    library_name: identification.library_name,
                    module_path: identification.module_path,
                    cleartext_name: identification.cleartext_name,
                    confidence: Some(identification.confidence),
                    identification_method: Some("ai".to_string()),
                    sample_strings: Some(sample_strings),
                };

                if body_hash.is_some() {
                    self.cache_identification(&cache)?;
                }
                return Ok(cache);
            }
        }

        // Unknown
        let cache = NewLibraryCache {
            body_hash: body_hash.unwrap_or_default(),
            minified_name: Some(name),
            library_name: None,
            module_path: None,
            cleartext_name: None,
            confidence: Some(0.0),
            identification_method: Some("unknown".to_string()),
            sample_strings: Some(sample_strings),
        };

        Ok(cache)
    }

    /// Get all symbols with body hashes that haven't been identified yet
    pub fn get_unidentified_symbols(&self, limit: usize) -> Result<Vec<(String, String, Option<String>)>> {
        let mut stmt = self.conn.prepare(
            "SELECT sym.name, sym.body_hash, sym.signature
             FROM symbols sym
             WHERE sym.body_hash IS NOT NULL
               AND sym.body_hash NOT IN (SELECT body_hash FROM library_cache)
               AND sym.kind = 'function'
             ORDER BY sym.name
             LIMIT ?1",
        )?;

        let symbols: Vec<_> = stmt
            .query_map([limit as i64], |row| {
                Ok((
                    row.get::<_, String>(0)?,
                    row.get::<_, String>(1)?,
                    row.get::<_, Option<String>>(2)?,
                ))
            })?
            .filter_map(|r| r.ok())
            .collect();

        Ok(symbols)
    }

    /// Get identification statistics
    pub fn get_stats(&self) -> Result<HashMap<String, i64>> {
        let mut stats = HashMap::new();

        let count: i64 = self.conn.query_row(
            "SELECT COUNT(*) FROM library_cache",
            [],
            |row| row.get(0),
        )?;
        stats.insert("total_cached".to_string(), count);

        let count: i64 = self.conn.query_row(
            "SELECT COUNT(*) FROM library_cache WHERE library_name IS NOT NULL",
            [],
            |row| row.get(0),
        )?;
        stats.insert("identified".to_string(), count);

        let count: i64 = self.conn.query_row(
            "SELECT COUNT(DISTINCT body_hash) FROM symbols WHERE body_hash IS NOT NULL",
            [],
            |row| row.get(0),
        )?;
        stats.insert("unique_hashes".to_string(), count);

        Ok(stats)
    }
}
