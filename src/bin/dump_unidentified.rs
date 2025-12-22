use anyhow::Result;
use rusqlite::Connection;
use std::env;
use std::fs;

fn main() -> Result<()> {
    let args: Vec<String> = env::args().collect();
    let db_path = args.get(1).map(|s| s.as_str()).unwrap_or("test.db");
    let js_path = args.get(2).map(|s| s.as_str()).unwrap_or("/home/sdancer/webpack/formatted.js");
    let limit: usize = args
        .iter()
        .position(|a| a == "--limit")
        .and_then(|i| args.get(i + 1))
        .and_then(|s| s.parse().ok())
        .unwrap_or(50);

    let conn = Connection::open(db_path)?;
    let source = fs::read_to_string(js_path)?;
    let lines: Vec<&str> = source.lines().collect();

    // Get unidentified L modules with their strings
    let mut stmt = conn.prepare(
        "SELECT DISTINCT m.module_name, m.start_line, m.end_line
         FROM module_map m
         WHERE m.module_type = 'L'
           AND m.module_name NOT IN (SELECT minified_name FROM library_cache WHERE minified_name IS NOT NULL)
         ORDER BY m.end_line - m.start_line DESC
         LIMIT ?1"
    )?;

    let modules: Vec<(String, i64, i64)> = stmt
        .query_map([limit as i64], |row| {
            Ok((
                row.get::<_, String>(0)?,
                row.get::<_, i64>(1)?,
                row.get::<_, i64>(2)?,
            ))
        })?
        .filter_map(|r| r.ok())
        .collect();

    println!("# Unidentified L Modules for Analysis\n");
    println!("Analyze each module and identify the library it belongs to.\n");

    for (name, start, end) in &modules {
        // Get strings for this module
        let strings = get_module_strings(&conn, name)?;

        // Get first 15 lines of code
        let code: String = lines[*start as usize..(*end as usize).min(lines.len())]
            .iter()
            .take(15)
            .cloned()
            .collect::<Vec<_>>()
            .join("\n");

        println!("## Module: {}", name);
        println!("Lines: {}-{} ({} lines)", start, end, end - start);

        if !strings.is_empty() {
            let preview: Vec<_> = strings.iter().take(8).collect();
            println!("Strings: {:?}", preview);
        }

        println!("```javascript\n{}\n```\n", code);
    }

    // Also dump unidentified U modules with interesting strings
    println!("\n# Unidentified U Modules with Distinctive Strings\n");

    let mut stmt = conn.prepare(
        "SELECT DISTINCT m.module_name, m.start_line, m.end_line
         FROM module_map m
         WHERE m.module_type = 'U'
           AND m.module_name NOT IN (SELECT minified_name FROM library_cache WHERE minified_name IS NOT NULL)
         ORDER BY m.end_line - m.start_line DESC
         LIMIT ?1"
    )?;

    let u_modules: Vec<(String, i64, i64)> = stmt
        .query_map([limit as i64], |row| {
            Ok((
                row.get::<_, String>(0)?,
                row.get::<_, i64>(1)?,
                row.get::<_, i64>(2)?,
            ))
        })?
        .filter_map(|r| r.ok())
        .collect();

    for (name, start, end) in &u_modules {
        let strings = get_module_strings(&conn, name)?;

        // Only show modules with interesting strings
        if strings.is_empty() {
            continue;
        }

        let code: String = lines[*start as usize..(*end as usize).min(lines.len())]
            .iter()
            .take(10)
            .cloned()
            .collect::<Vec<_>>()
            .join("\n");

        println!("## Module: {}", name);
        println!("Lines: {}-{}", start, end);
        println!("Strings: {:?}", strings.iter().take(5).collect::<Vec<_>>());
        println!("```javascript\n{}\n```\n", code);
    }

    Ok(())
}

fn get_module_strings(conn: &Connection, name: &str) -> Result<Vec<String>> {
    let mut stmt = conn.prepare(
        "SELECT DISTINCT s.value
         FROM strings s
         JOIN symbols sym ON s.symbol_id = sym.id
         WHERE sym.name = ?1
           AND LENGTH(s.value) > 3
           AND s.value NOT IN ('true', 'false', 'null', 'undefined', 'string', 'number', 'object', 'function')
         LIMIT 15"
    )?;

    let strings: Vec<String> = stmt
        .query_map([name], |row| row.get(0))?
        .filter_map(|r| r.ok())
        .collect();

    Ok(strings)
}
