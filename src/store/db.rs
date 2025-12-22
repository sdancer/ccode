use anyhow::{Context, Result};
use rusqlite::{Connection, params};
use std::path::Path;

use super::models::*;

const SCHEMA: &str = r#"
-- Bundle metadata
CREATE TABLE IF NOT EXISTS bundles (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    version TEXT,
    path TEXT NOT NULL,
    hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(name, version)
);

-- Webpack modules within bundle
CREATE TABLE IF NOT EXISTS modules (
    id INTEGER PRIMARY KEY,
    bundle_id INTEGER NOT NULL REFERENCES bundles(id) ON DELETE CASCADE,
    module_id TEXT NOT NULL,
    size INTEGER NOT NULL DEFAULT 0,
    body_hash TEXT,
    UNIQUE(bundle_id, module_id)
);

-- All extracted symbols
CREATE TABLE IF NOT EXISTS symbols (
    id INTEGER PRIMARY KEY,
    module_id INTEGER NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
    kind TEXT NOT NULL,
    name TEXT NOT NULL,
    parent_id INTEGER REFERENCES symbols(id),
    body_hash TEXT,
    signature TEXT,
    metadata JSON
);

-- String literals (matching anchors)
CREATE TABLE IF NOT EXISTS strings (
    id INTEGER PRIMARY KEY,
    module_id INTEGER NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
    symbol_id INTEGER REFERENCES symbols(id) ON DELETE CASCADE,
    value TEXT NOT NULL,
    context TEXT
);

-- Call graph edges
CREATE TABLE IF NOT EXISTS calls (
    id INTEGER PRIMARY KEY,
    caller_id INTEGER NOT NULL REFERENCES symbols(id) ON DELETE CASCADE,
    callee_id INTEGER NOT NULL REFERENCES symbols(id) ON DELETE CASCADE,
    call_type TEXT NOT NULL
);

-- Symbol mappings between versions
CREATE TABLE IF NOT EXISTS mappings (
    id INTEGER PRIMARY KEY,
    source_bundle_id INTEGER NOT NULL REFERENCES bundles(id) ON DELETE CASCADE,
    target_bundle_id INTEGER NOT NULL REFERENCES bundles(id) ON DELETE CASCADE,
    source_symbol_id INTEGER NOT NULL REFERENCES symbols(id) ON DELETE CASCADE,
    target_symbol_id INTEGER NOT NULL REFERENCES symbols(id) ON DELETE CASCADE,
    confidence REAL NOT NULL,
    match_reason TEXT NOT NULL,
    UNIQUE(source_bundle_id, target_bundle_id, source_symbol_id)
);

-- Library identification cache (by AST hash)
CREATE TABLE IF NOT EXISTS library_cache (
    id INTEGER PRIMARY KEY,
    body_hash TEXT NOT NULL UNIQUE,
    minified_name TEXT,           -- The minified name (e.g., "dG", "Zp")
    library_name TEXT,            -- Identified library (e.g., "rxjs", "lodash")
    module_path TEXT,             -- Original module path (e.g., "rxjs/internal/util/isFunction")
    cleartext_name TEXT,          -- Human-readable function name (e.g., "isFunction")
    confidence REAL,              -- 0.0 to 1.0
    identification_method TEXT,   -- "ai", "string_match", "pattern"
    sample_strings TEXT,          -- JSON array of key strings used for identification
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_modules_bundle ON modules(bundle_id);
CREATE INDEX IF NOT EXISTS idx_symbols_module ON symbols(module_id);
CREATE INDEX IF NOT EXISTS idx_symbols_kind ON symbols(kind);
CREATE INDEX IF NOT EXISTS idx_symbols_name ON symbols(name);
CREATE INDEX IF NOT EXISTS idx_symbols_body_hash ON symbols(body_hash);
CREATE INDEX IF NOT EXISTS idx_strings_value ON strings(value);
CREATE INDEX IF NOT EXISTS idx_strings_module ON strings(module_id);
CREATE INDEX IF NOT EXISTS idx_calls_caller ON calls(caller_id);
CREATE INDEX IF NOT EXISTS idx_calls_callee ON calls(callee_id);
CREATE INDEX IF NOT EXISTS idx_mappings_source ON mappings(source_bundle_id, source_symbol_id);
CREATE INDEX IF NOT EXISTS idx_mappings_target ON mappings(target_bundle_id, target_symbol_id);
CREATE INDEX IF NOT EXISTS idx_library_cache_hash ON library_cache(body_hash);
CREATE INDEX IF NOT EXISTS idx_library_cache_library ON library_cache(library_name);
"#;

pub struct Database {
    pub conn: Connection,
}

impl Database {
    pub fn open(path: &Path) -> Result<Self> {
        let conn = Connection::open(path)
            .with_context(|| format!("Failed to open database at {:?}", path))?;

        conn.execute_batch("PRAGMA foreign_keys = ON; PRAGMA journal_mode = WAL;")?;

        let db = Self { conn };
        db.migrate()?;
        Ok(db)
    }

    pub fn open_in_memory() -> Result<Self> {
        let conn = Connection::open_in_memory()?;
        conn.execute_batch("PRAGMA foreign_keys = ON;")?;

        let db = Self { conn };
        db.migrate()?;
        Ok(db)
    }

    fn migrate(&self) -> Result<()> {
        self.conn
            .execute_batch(SCHEMA)
            .context("Failed to run database migrations")?;
        Ok(())
    }

    // Bundle operations
    pub fn insert_bundle(&self, bundle: &NewBundle) -> Result<i64> {
        self.conn.execute(
            "INSERT INTO bundles (name, version, path, hash) VALUES (?1, ?2, ?3, ?4)",
            params![bundle.name, bundle.version, bundle.path, bundle.hash],
        )?;
        Ok(self.conn.last_insert_rowid())
    }

    pub fn get_bundle_by_version(&self, name: &str, version: &str) -> Result<Option<Bundle>> {
        let mut stmt = self.conn.prepare(
            "SELECT id, name, version, path, hash, created_at FROM bundles WHERE name = ?1 AND version = ?2"
        )?;

        let result = stmt.query_row(params![name, version], |row| {
            Ok(Bundle {
                id: row.get(0)?,
                name: row.get(1)?,
                version: row.get(2)?,
                path: row.get(3)?,
                hash: row.get(4)?,
                created_at: row.get(5)?,
            })
        });

        match result {
            Ok(bundle) => Ok(Some(bundle)),
            Err(rusqlite::Error::QueryReturnedNoRows) => Ok(None),
            Err(e) => Err(e.into()),
        }
    }

    pub fn get_bundle_by_id(&self, id: i64) -> Result<Option<Bundle>> {
        let mut stmt = self.conn.prepare(
            "SELECT id, name, version, path, hash, created_at FROM bundles WHERE id = ?1"
        )?;

        let result = stmt.query_row(params![id], |row| {
            Ok(Bundle {
                id: row.get(0)?,
                name: row.get(1)?,
                version: row.get(2)?,
                path: row.get(3)?,
                hash: row.get(4)?,
                created_at: row.get(5)?,
            })
        });

        match result {
            Ok(bundle) => Ok(Some(bundle)),
            Err(rusqlite::Error::QueryReturnedNoRows) => Ok(None),
            Err(e) => Err(e.into()),
        }
    }

    pub fn find_bundle_by_version(&self, version: &str) -> Result<Option<Bundle>> {
        let mut stmt = self.conn.prepare(
            "SELECT id, name, version, path, hash, created_at FROM bundles WHERE version = ?1"
        )?;

        let result = stmt.query_row(params![version], |row| {
            Ok(Bundle {
                id: row.get(0)?,
                name: row.get(1)?,
                version: row.get(2)?,
                path: row.get(3)?,
                hash: row.get(4)?,
                created_at: row.get(5)?,
            })
        });

        match result {
            Ok(bundle) => Ok(Some(bundle)),
            Err(rusqlite::Error::QueryReturnedNoRows) => Ok(None),
            Err(e) => Err(e.into()),
        }
    }

    pub fn list_bundles(&self) -> Result<Vec<Bundle>> {
        let mut stmt = self.conn.prepare(
            "SELECT id, name, version, path, hash, created_at FROM bundles ORDER BY created_at DESC"
        )?;

        let bundles = stmt.query_map([], |row| {
            Ok(Bundle {
                id: row.get(0)?,
                name: row.get(1)?,
                version: row.get(2)?,
                path: row.get(3)?,
                hash: row.get(4)?,
                created_at: row.get(5)?,
            })
        })?;

        bundles.collect::<Result<Vec<_>, _>>().map_err(Into::into)
    }

    // Module operations
    pub fn insert_module(&self, module: &NewModule) -> Result<i64> {
        self.conn.execute(
            "INSERT INTO modules (bundle_id, module_id, size, body_hash) VALUES (?1, ?2, ?3, ?4)",
            params![module.bundle_id, module.module_id, module.size, module.body_hash],
        )?;
        Ok(self.conn.last_insert_rowid())
    }

    pub fn get_modules_by_bundle(&self, bundle_id: i64) -> Result<Vec<Module>> {
        let mut stmt = self.conn.prepare(
            "SELECT id, bundle_id, module_id, size, body_hash FROM modules WHERE bundle_id = ?1"
        )?;

        let modules = stmt.query_map(params![bundle_id], |row| {
            Ok(Module {
                id: row.get(0)?,
                bundle_id: row.get(1)?,
                module_id: row.get(2)?,
                size: row.get(3)?,
                body_hash: row.get(4)?,
            })
        })?;

        modules.collect::<Result<Vec<_>, _>>().map_err(Into::into)
    }

    // Symbol operations
    pub fn insert_symbol(&self, symbol: &NewSymbol) -> Result<i64> {
        let metadata_json = symbol
            .metadata
            .as_ref()
            .map(|m| serde_json::to_string(m).unwrap());

        self.conn.execute(
            "INSERT INTO symbols (module_id, kind, name, parent_id, body_hash, signature, metadata)
             VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)",
            params![
                symbol.module_id,
                symbol.kind.as_str(),
                symbol.name,
                symbol.parent_id,
                symbol.body_hash,
                symbol.signature,
                metadata_json
            ],
        )?;
        Ok(self.conn.last_insert_rowid())
    }

    pub fn get_symbols_by_module(&self, module_id: i64) -> Result<Vec<Symbol>> {
        let mut stmt = self.conn.prepare(
            "SELECT id, module_id, kind, name, parent_id, body_hash, signature, metadata
             FROM symbols WHERE module_id = ?1"
        )?;

        let symbols = stmt.query_map(params![module_id], |row| {
            let kind_str: String = row.get(2)?;
            let metadata_str: Option<String> = row.get(7)?;

            Ok(Symbol {
                id: row.get(0)?,
                module_id: row.get(1)?,
                kind: SymbolKind::from_str(&kind_str).unwrap_or(SymbolKind::Variable),
                name: row.get(3)?,
                parent_id: row.get(4)?,
                body_hash: row.get(5)?,
                signature: row.get(6)?,
                metadata: metadata_str.and_then(|s| serde_json::from_str(&s).ok()),
            })
        })?;

        symbols.collect::<Result<Vec<_>, _>>().map_err(Into::into)
    }

    pub fn get_symbols_by_bundle(&self, bundle_id: i64) -> Result<Vec<Symbol>> {
        let mut stmt = self.conn.prepare(
            "SELECT s.id, s.module_id, s.kind, s.name, s.parent_id, s.body_hash, s.signature, s.metadata
             FROM symbols s
             JOIN modules m ON s.module_id = m.id
             WHERE m.bundle_id = ?1"
        )?;

        let symbols = stmt.query_map(params![bundle_id], |row| {
            let kind_str: String = row.get(2)?;
            let metadata_str: Option<String> = row.get(7)?;

            Ok(Symbol {
                id: row.get(0)?,
                module_id: row.get(1)?,
                kind: SymbolKind::from_str(&kind_str).unwrap_or(SymbolKind::Variable),
                name: row.get(3)?,
                parent_id: row.get(4)?,
                body_hash: row.get(5)?,
                signature: row.get(6)?,
                metadata: metadata_str.and_then(|s| serde_json::from_str(&s).ok()),
            })
        })?;

        symbols.collect::<Result<Vec<_>, _>>().map_err(Into::into)
    }

    pub fn find_symbol_by_name(&self, bundle_id: i64, name: &str) -> Result<Option<Symbol>> {
        let mut stmt = self.conn.prepare(
            "SELECT s.id, s.module_id, s.kind, s.name, s.parent_id, s.body_hash, s.signature, s.metadata
             FROM symbols s
             JOIN modules m ON s.module_id = m.id
             WHERE m.bundle_id = ?1 AND s.name = ?2"
        )?;

        let result = stmt.query_row(params![bundle_id, name], |row| {
            let kind_str: String = row.get(2)?;
            let metadata_str: Option<String> = row.get(7)?;

            Ok(Symbol {
                id: row.get(0)?,
                module_id: row.get(1)?,
                kind: SymbolKind::from_str(&kind_str).unwrap_or(SymbolKind::Variable),
                name: row.get(3)?,
                parent_id: row.get(4)?,
                body_hash: row.get(5)?,
                signature: row.get(6)?,
                metadata: metadata_str.and_then(|s| serde_json::from_str(&s).ok()),
            })
        });

        match result {
            Ok(symbol) => Ok(Some(symbol)),
            Err(rusqlite::Error::QueryReturnedNoRows) => Ok(None),
            Err(e) => Err(e.into()),
        }
    }

    pub fn find_symbols_by_body_hash(&self, bundle_id: i64, body_hash: &str) -> Result<Vec<Symbol>> {
        let mut stmt = self.conn.prepare(
            "SELECT s.id, s.module_id, s.kind, s.name, s.parent_id, s.body_hash, s.signature, s.metadata
             FROM symbols s
             JOIN modules m ON s.module_id = m.id
             WHERE m.bundle_id = ?1 AND s.body_hash = ?2"
        )?;

        let symbols = stmt.query_map(params![bundle_id, body_hash], |row| {
            let kind_str: String = row.get(2)?;
            let metadata_str: Option<String> = row.get(7)?;

            Ok(Symbol {
                id: row.get(0)?,
                module_id: row.get(1)?,
                kind: SymbolKind::from_str(&kind_str).unwrap_or(SymbolKind::Variable),
                name: row.get(3)?,
                parent_id: row.get(4)?,
                body_hash: row.get(5)?,
                signature: row.get(6)?,
                metadata: metadata_str.and_then(|s| serde_json::from_str(&s).ok()),
            })
        })?;

        symbols.collect::<Result<Vec<_>, _>>().map_err(Into::into)
    }

    // String literal operations
    pub fn insert_string(&self, string: &NewStringLiteral) -> Result<i64> {
        self.conn.execute(
            "INSERT INTO strings (module_id, symbol_id, value, context) VALUES (?1, ?2, ?3, ?4)",
            params![string.module_id, string.symbol_id, string.value, string.context],
        )?;
        Ok(self.conn.last_insert_rowid())
    }

    pub fn get_strings_by_module(&self, module_id: i64) -> Result<Vec<StringLiteral>> {
        let mut stmt = self.conn.prepare(
            "SELECT id, module_id, symbol_id, value, context FROM strings WHERE module_id = ?1"
        )?;

        let strings = stmt.query_map(params![module_id], |row| {
            Ok(StringLiteral {
                id: row.get(0)?,
                module_id: row.get(1)?,
                symbol_id: row.get(2)?,
                value: row.get(3)?,
                context: row.get(4)?,
            })
        })?;

        strings.collect::<Result<Vec<_>, _>>().map_err(Into::into)
    }

    pub fn find_strings_by_value(&self, bundle_id: i64, value: &str) -> Result<Vec<StringLiteral>> {
        let mut stmt = self.conn.prepare(
            "SELECT s.id, s.module_id, s.symbol_id, s.value, s.context
             FROM strings s
             JOIN modules m ON s.module_id = m.id
             WHERE m.bundle_id = ?1 AND s.value = ?2"
        )?;

        let strings = stmt.query_map(params![bundle_id, value], |row| {
            Ok(StringLiteral {
                id: row.get(0)?,
                module_id: row.get(1)?,
                symbol_id: row.get(2)?,
                value: row.get(3)?,
                context: row.get(4)?,
            })
        })?;

        strings.collect::<Result<Vec<_>, _>>().map_err(Into::into)
    }

    pub fn get_strings_by_bundle(&self, bundle_id: i64) -> Result<Vec<StringLiteral>> {
        let mut stmt = self.conn.prepare(
            "SELECT s.id, s.module_id, s.symbol_id, s.value, s.context
             FROM strings s
             JOIN modules m ON s.module_id = m.id
             WHERE m.bundle_id = ?1"
        )?;

        let strings = stmt.query_map(params![bundle_id], |row| {
            Ok(StringLiteral {
                id: row.get(0)?,
                module_id: row.get(1)?,
                symbol_id: row.get(2)?,
                value: row.get(3)?,
                context: row.get(4)?,
            })
        })?;

        strings.collect::<Result<Vec<_>, _>>().map_err(Into::into)
    }

    // Call graph operations
    pub fn insert_call(&self, call: &NewCall) -> Result<i64> {
        self.conn.execute(
            "INSERT INTO calls (caller_id, callee_id, call_type) VALUES (?1, ?2, ?3)",
            params![call.caller_id, call.callee_id, call.call_type.as_str()],
        )?;
        Ok(self.conn.last_insert_rowid())
    }

    pub fn get_calls_by_caller(&self, caller_id: i64) -> Result<Vec<Call>> {
        let mut stmt = self.conn.prepare(
            "SELECT id, caller_id, callee_id, call_type FROM calls WHERE caller_id = ?1"
        )?;

        let calls = stmt.query_map(params![caller_id], |row| {
            let call_type_str: String = row.get(3)?;
            Ok(Call {
                id: row.get(0)?,
                caller_id: row.get(1)?,
                callee_id: row.get(2)?,
                call_type: CallType::from_str(&call_type_str).unwrap_or(CallType::Direct),
            })
        })?;

        calls.collect::<Result<Vec<_>, _>>().map_err(Into::into)
    }

    pub fn get_calls_by_callee(&self, callee_id: i64) -> Result<Vec<Call>> {
        let mut stmt = self.conn.prepare(
            "SELECT id, caller_id, callee_id, call_type FROM calls WHERE callee_id = ?1"
        )?;

        let calls = stmt.query_map(params![callee_id], |row| {
            let call_type_str: String = row.get(3)?;
            Ok(Call {
                id: row.get(0)?,
                caller_id: row.get(1)?,
                callee_id: row.get(2)?,
                call_type: CallType::from_str(&call_type_str).unwrap_or(CallType::Direct),
            })
        })?;

        calls.collect::<Result<Vec<_>, _>>().map_err(Into::into)
    }

    // Mapping operations
    pub fn insert_mapping(&self, mapping: &NewMapping) -> Result<i64> {
        self.conn.execute(
            "INSERT OR REPLACE INTO mappings
             (source_bundle_id, target_bundle_id, source_symbol_id, target_symbol_id, confidence, match_reason)
             VALUES (?1, ?2, ?3, ?4, ?5, ?6)",
            params![
                mapping.source_bundle_id,
                mapping.target_bundle_id,
                mapping.source_symbol_id,
                mapping.target_symbol_id,
                mapping.confidence,
                mapping.match_reason
            ],
        )?;
        Ok(self.conn.last_insert_rowid())
    }

    pub fn get_mapping(&self, source_bundle_id: i64, target_bundle_id: i64, source_symbol_id: i64) -> Result<Option<Mapping>> {
        let mut stmt = self.conn.prepare(
            "SELECT id, source_bundle_id, target_bundle_id, source_symbol_id, target_symbol_id, confidence, match_reason
             FROM mappings
             WHERE source_bundle_id = ?1 AND target_bundle_id = ?2 AND source_symbol_id = ?3"
        )?;

        let result = stmt.query_row(params![source_bundle_id, target_bundle_id, source_symbol_id], |row| {
            Ok(Mapping {
                id: row.get(0)?,
                source_bundle_id: row.get(1)?,
                target_bundle_id: row.get(2)?,
                source_symbol_id: row.get(3)?,
                target_symbol_id: row.get(4)?,
                confidence: row.get(5)?,
                match_reason: row.get(6)?,
            })
        });

        match result {
            Ok(mapping) => Ok(Some(mapping)),
            Err(rusqlite::Error::QueryReturnedNoRows) => Ok(None),
            Err(e) => Err(e.into()),
        }
    }

    pub fn get_mappings_between(&self, source_bundle_id: i64, target_bundle_id: i64) -> Result<Vec<Mapping>> {
        let mut stmt = self.conn.prepare(
            "SELECT id, source_bundle_id, target_bundle_id, source_symbol_id, target_symbol_id, confidence, match_reason
             FROM mappings
             WHERE source_bundle_id = ?1 AND target_bundle_id = ?2
             ORDER BY confidence DESC"
        )?;

        let mappings = stmt.query_map(params![source_bundle_id, target_bundle_id], |row| {
            Ok(Mapping {
                id: row.get(0)?,
                source_bundle_id: row.get(1)?,
                target_bundle_id: row.get(2)?,
                source_symbol_id: row.get(3)?,
                target_symbol_id: row.get(4)?,
                confidence: row.get(5)?,
                match_reason: row.get(6)?,
            })
        })?;

        mappings.collect::<Result<Vec<_>, _>>().map_err(Into::into)
    }

    // Transaction support
    pub fn transaction<T, F>(&mut self, f: F) -> Result<T>
    where
        F: FnOnce(&Connection) -> Result<T>,
    {
        let tx = self.conn.transaction()?;
        let result = f(&tx)?;
        tx.commit()?;
        Ok(result)
    }

    // Batch insert methods for performance
    pub fn insert_symbols_batch(&self, symbols: &[NewSymbol]) -> Result<Vec<i64>> {
        let mut ids = Vec::with_capacity(symbols.len());
        for symbol in symbols {
            ids.push(self.insert_symbol(symbol)?);
        }
        Ok(ids)
    }

    pub fn insert_strings_batch(&self, strings: &[NewStringLiteral]) -> Result<()> {
        let mut stmt = self.conn.prepare_cached(
            "INSERT INTO strings (module_id, symbol_id, value, context) VALUES (?1, ?2, ?3, ?4)"
        )?;
        for s in strings {
            stmt.execute(params![s.module_id, s.symbol_id, s.value, s.context])?;
        }
        Ok(())
    }

    pub fn insert_calls_batch(&self, calls: &[NewCall]) -> Result<()> {
        let mut stmt = self.conn.prepare_cached(
            "INSERT INTO calls (caller_id, callee_id, call_type) VALUES (?1, ?2, ?3)"
        )?;
        for c in calls {
            stmt.execute(params![c.caller_id, c.callee_id, c.call_type.as_str()])?;
        }
        Ok(())
    }

    pub fn begin_transaction(&self) -> Result<()> {
        self.conn.execute("BEGIN TRANSACTION", [])?;
        Ok(())
    }

    pub fn commit_transaction(&self) -> Result<()> {
        self.conn.execute("COMMIT", [])?;
        Ok(())
    }

    // Stats
    pub fn get_bundle_stats(&self, bundle_id: i64) -> Result<BundleStats> {
        let module_count: i64 = self.conn.query_row(
            "SELECT COUNT(*) FROM modules WHERE bundle_id = ?1",
            params![bundle_id],
            |row| row.get(0),
        )?;

        let symbol_count: i64 = self.conn.query_row(
            "SELECT COUNT(*) FROM symbols s JOIN modules m ON s.module_id = m.id WHERE m.bundle_id = ?1",
            params![bundle_id],
            |row| row.get(0),
        )?;

        let string_count: i64 = self.conn.query_row(
            "SELECT COUNT(*) FROM strings s JOIN modules m ON s.module_id = m.id WHERE m.bundle_id = ?1",
            params![bundle_id],
            |row| row.get(0),
        )?;

        Ok(BundleStats {
            module_count,
            symbol_count,
            string_count,
        })
    }
}

#[derive(Debug, Clone)]
pub struct BundleStats {
    pub module_count: i64,
    pub symbol_count: i64,
    pub string_count: i64,
}
