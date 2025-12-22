use anyhow::Result;
use rusqlite::{params, Connection};
use std::env;
use std::fs;
use serde::{Deserialize, Serialize};

#[derive(Serialize)]
struct ModuleContext {
    name: String,
    module_type: String,
    lines: String,
    strings: Vec<String>,
    code_preview: String,
}

#[derive(Deserialize)]
struct Identification {
    name: String,
    library: Option<String>,
    module_path: Option<String>,
    cleartext: Option<String>,
    confidence: f64,
}

fn main() -> Result<()> {
    let args: Vec<String> = env::args().collect();
    let db_path = args.get(1).map(|s| s.as_str()).unwrap_or("test.db");
    let js_path = args.get(2).map(|s| s.as_str()).unwrap_or("/home/sdancer/webpack/formatted.js");
    let batch_size: usize = args
        .iter()
        .position(|a| a == "--batch")
        .and_then(|i| args.get(i + 1))
        .and_then(|s| s.parse().ok())
        .unwrap_or(100);

    let save_mode = args.iter().any(|a| a == "--save");
    let input_file = args.iter()
        .position(|a| a == "--input")
        .and_then(|i| args.get(i + 1));

    let conn = Connection::open(db_path)?;
    let source = fs::read_to_string(js_path)?;
    let lines: Vec<&str> = source.lines().collect();

    if save_mode {
        // Read identifications from input file and save to database
        if let Some(input_path) = input_file {
            let content = fs::read_to_string(input_path)?;
            let identifications: Vec<Identification> = serde_json::from_str(&content)?;

            let mut saved = 0;
            for id in &identifications {
                if let (Some(lib), Some(path), Some(name)) = (&id.library, &id.module_path, &id.cleartext) {
                    if id.confidence > 0.5 {
                        conn.execute(
                            "INSERT OR REPLACE INTO library_cache
                             (body_hash, minified_name, library_name, module_path, cleartext_name, confidence, identification_method)
                             VALUES (?1, ?2, ?3, ?4, ?5, ?6, 'ai_batch')",
                            params![
                                format!("batch_{}", id.name),
                                id.name,
                                lib,
                                path,
                                name,
                                id.confidence,
                            ],
                        )?;
                        saved += 1;
                    }
                }
            }
            println!("Saved {} identifications", saved);
        }
        return Ok(());
    }

    // Get unidentified modules
    let mut stmt = conn.prepare(
        "SELECT m.module_name, m.module_type, m.start_line, m.end_line
         FROM module_map m
         WHERE m.module_name NOT IN (SELECT minified_name FROM library_cache WHERE minified_name IS NOT NULL)
         ORDER BY m.end_line - m.start_line DESC
         LIMIT ?1"
    )?;

    let modules: Vec<(String, String, i64, i64)> = stmt
        .query_map([batch_size as i64], |row| {
            Ok((
                row.get::<_, String>(0)?,
                row.get::<_, String>(1)?,
                row.get::<_, i64>(2)?,
                row.get::<_, i64>(3)?,
            ))
        })?
        .filter_map(|r| r.ok())
        .collect();

    let mut contexts = Vec::new();

    for (name, mod_type, start, end) in &modules {
        let strings = get_module_strings(&conn, name)?;

        // Get first 20 lines of code
        let code: String = lines[*start as usize..(*end as usize).min(lines.len())]
            .iter()
            .take(20)
            .cloned()
            .collect::<Vec<_>>()
            .join("\n");

        contexts.push(ModuleContext {
            name: name.clone(),
            module_type: mod_type.clone(),
            lines: format!("{}-{}", start, end),
            strings,
            code_preview: code,
        });
    }

    // Output as JSON for processing
    println!("{}", serde_json::to_string_pretty(&contexts)?);

    eprintln!("\n--- {} modules dumped for identification ---", contexts.len());

    Ok(())
}

fn get_module_strings(conn: &Connection, name: &str) -> Result<Vec<String>> {
    let mut stmt = conn.prepare(
        "SELECT DISTINCT s.value
         FROM strings s
         JOIN symbols sym ON s.symbol_id = sym.id
         WHERE sym.name = ?1
           AND LENGTH(s.value) > 3
           AND s.value NOT IN ('true', 'false', 'null', 'undefined', 'string', 'number', 'object', 'function', '__esModule')
         ORDER BY LENGTH(s.value) DESC
         LIMIT 10"
    )?;

    let strings: Vec<String> = stmt
        .query_map([name], |row| row.get(0))?
        .filter_map(|r| r.ok())
        .collect();

    Ok(strings)
}
