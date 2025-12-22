use anyhow::Result;
use rusqlite::Connection;
use std::collections::HashMap;
use std::env;
use std::fs;

use webpack_symbols::identify::claude::ClaudeClient;
use webpack_symbols::store::models::NewLibraryCache;

#[tokio::main]
async fn main() -> Result<()> {
    let args: Vec<String> = env::args().collect();
    let db_path = args.get(1).map(|s| s.as_str()).unwrap_or("test.db");
    let js_path = args.get(2).map(|s| s.as_str()).unwrap_or("/home/sdancer/webpack/formatted.js");
    let use_ai = args.iter().any(|a| a == "--ai");
    let limit: usize = args
        .iter()
        .position(|a| a == "--limit")
        .and_then(|i| args.get(i + 1))
        .and_then(|s| s.parse().ok())
        .unwrap_or(20);

    let api_key = env::var("ANTHROPIC_API_KEY").ok();
    let claude = api_key.map(ClaudeClient::new);

    if use_ai && claude.is_none() {
        eprintln!("Warning: --ai flag set but ANTHROPIC_API_KEY not found");
    }

    let conn = Connection::open(db_path)?;

    // Load source file
    let source = fs::read_to_string(js_path)?;
    let lines: Vec<&str> = source.lines().collect();

    println!("Identify Modules with L->U Context");
    println!("═══════════════════════════════════════════════════════════════\n");

    // Find L modules with U dependencies that haven't been identified
    let mut stmt = conn.prepare(
        "SELECT DISTINCT m.module_name, m.start_line, m.end_line,
                GROUP_CONCAT(d.callee, ',') as u_deps
         FROM module_map m
         LEFT JOIN module_deps d ON m.module_name = d.caller AND d.caller_type = 'L'
         WHERE m.module_type = 'L'
           AND m.module_name NOT IN (SELECT minified_name FROM library_cache WHERE minified_name IS NOT NULL)
         GROUP BY m.module_name
         HAVING COUNT(d.callee) > 0
         ORDER BY COUNT(d.callee) DESC
         LIMIT ?1"
    )?;

    let candidates: Vec<(String, i64, i64, String)> = stmt
        .query_map([limit as i64], |row| {
            Ok((
                row.get::<_, String>(0)?,
                row.get::<_, i64>(1)?,
                row.get::<_, i64>(2)?,
                row.get::<_, String>(3)?,
            ))
        })?
        .filter_map(|r| r.ok())
        .collect();

    println!("Found {} L modules with U dependencies to analyze\n", candidates.len());

    for (l_name, start, end, u_deps_str) in &candidates {
        println!("═══════════════════════════════════════════════════════════════");
        println!("L Module: {}", l_name);
        println!("Lines: {} - {}", start, end);

        let u_deps: Vec<&str> = u_deps_str.split(',').collect();
        println!("U Dependencies: {:?}\n", u_deps);

        // Extract L module code
        let l_code: String = lines[*start as usize..(*end as usize).min(lines.len())]
            .iter()
            .take(30)
            .cloned()
            .collect::<Vec<_>>()
            .join("\n");

        // Get strings from L module
        let l_strings = get_module_strings(&conn, &l_name)?;
        println!("L Strings: {:?}", l_strings.iter().take(10).collect::<Vec<_>>());

        // For each U dependency, get its info
        let mut u_context = Vec::new();
        for u_name in u_deps.iter().take(5) {
            let u_info = get_u_module_info(&conn, u_name, &lines)?;
            if let Some((u_start, u_end, u_strings)) = u_info {
                let u_code: String = lines[u_start..u_end.min(lines.len())]
                    .iter()
                    .take(20)
                    .cloned()
                    .collect::<Vec<_>>()
                    .join("\n");

                u_context.push(format!(
                    "U Module '{}' (lines {}-{}):\nStrings: {:?}\nCode:\n{}",
                    u_name,
                    u_start,
                    u_end,
                    u_strings.iter().take(5).collect::<Vec<_>>(),
                    u_code
                ));
            }
        }

        println!("\n--- U Module Context ---");
        for ctx in &u_context {
            println!("{}\n", ctx);
        }

        // Try AI identification if enabled
        if use_ai {
            if let Some(ref client) = claude {
                println!("\n--- AI Analysis ---");

                // Combine all context
                let full_context = format!(
                    "L Module '{}':\n{}\n\nU Dependencies:\n{}",
                    l_name,
                    l_code,
                    u_context.join("\n\n")
                );

                let mut all_strings = l_strings.clone();
                for u_name in &u_deps {
                    if let Ok(s) = get_module_strings(&conn, u_name) {
                        all_strings.extend(s);
                    }
                }

                match client.identify_library(&l_name, &full_context, &all_strings, None).await {
                    Ok(result) => {
                        println!("Library: {:?}", result.library_name);
                        println!("Path: {:?}", result.module_path);
                        println!("Name: {:?}", result.cleartext_name);
                        println!("Confidence: {:.0}%", result.confidence * 100.0);
                        println!("Reasoning: {}", result.reasoning);

                        // Cache the result
                        if result.confidence > 0.3 {
                            cache_result(&conn, &l_name, &result)?;
                        }
                    }
                    Err(e) => {
                        println!("AI Error: {}", e);
                    }
                }
            }
        }

        println!();
    }

    // Show stats
    let cached: i64 = conn.query_row(
        "SELECT COUNT(*) FROM library_cache WHERE library_name IS NOT NULL",
        [],
        |r| r.get(0),
    )?;
    println!("\n───────────────────────────────────────");
    println!("Total identified in cache: {}", cached);

    Ok(())
}

fn get_module_strings(conn: &Connection, name: &str) -> Result<Vec<String>> {
    let mut stmt = conn.prepare(
        "SELECT DISTINCT s.value
         FROM strings s
         JOIN symbols sym ON s.symbol_id = sym.id
         WHERE sym.name = ?1
         LIMIT 20"
    )?;

    let strings: Vec<String> = stmt
        .query_map([name], |row| row.get(0))?
        .filter_map(|r| r.ok())
        .collect();

    Ok(strings)
}

fn get_u_module_info(
    conn: &Connection,
    name: &str,
    lines: &[&str],
) -> Result<Option<(usize, usize, Vec<String>)>> {
    let mut stmt = conn.prepare(
        "SELECT start_line, end_line FROM module_map WHERE module_name = ?1 AND module_type = 'U'"
    )?;

    let result = stmt.query_row([name], |row| {
        Ok((row.get::<_, i64>(0)? as usize, row.get::<_, i64>(1)? as usize))
    });

    match result {
        Ok((start, end)) => {
            let strings = get_module_strings(conn, name)?;
            Ok(Some((start, end, strings)))
        }
        Err(_) => Ok(None),
    }
}

fn cache_result(
    conn: &Connection,
    name: &str,
    result: &webpack_symbols::identify::claude::LibraryIdentification,
) -> Result<()> {
    conn.execute(
        "INSERT OR REPLACE INTO library_cache
         (body_hash, minified_name, library_name, module_path, cleartext_name, confidence, identification_method)
         VALUES (?1, ?2, ?3, ?4, ?5, ?6, 'ai')",
        rusqlite::params![
            format!("l_module_{}", name), // Use module name as pseudo-hash for L modules
            name,
            result.library_name,
            result.module_path,
            result.cleartext_name,
            result.confidence,
        ],
    )?;
    Ok(())
}
