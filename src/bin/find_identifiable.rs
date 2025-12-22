use rusqlite::Connection;
use std::collections::HashMap;

fn main() {
    let conn = Connection::open("test.db").expect("Failed to open database");

    println!("Finding Identifiable Modules");
    println!("═══════════════════════════════════════════════════════════════\n");

    // Find symbols with distinctive strings
    println!("Symbols with library-identifying strings:");
    println!("───────────────────────────────────────");

    let patterns = vec![
        ("rxjs", "Observable|Subject|BehaviorSubject|switchMap|mergeMap"),
        ("lodash", "debounce|throttle|cloneDeep|isPlainObject"),
        ("zod", "ZodError|ZodIssue|ZodType"),
        ("commander", "commander|program.option|program.command"),
        ("chalk", "chalk|ansiStyles"),
        ("anthropic", "Anthropic|claude|messages.create"),
        ("typescript", "__awaiter|__generator|__spreadArray"),
        ("grpc", "grpc|http_connect_target"),
        ("node:os", "homedir|tmpdir|platform"),
        ("node:fs", "readFileSync|writeFileSync|existsSync"),
        ("node:crypto", "createHash|randomBytes|createCipheriv"),
    ];

    let mut lib_symbols: HashMap<String, Vec<(String, Vec<String>)>> = HashMap::new();

    for (lib_name, pattern) in &patterns {
        let pattern_parts: Vec<&str> = pattern.split('|').collect();

        for part in &pattern_parts {
            let mut stmt = conn.prepare(
                "SELECT DISTINCT sym.name, s.value
                 FROM strings s
                 JOIN symbols sym ON s.symbol_id = sym.id
                 WHERE s.value LIKE ?1
                   AND sym.kind = 'function'
                 LIMIT 10"
            ).unwrap();

            let search = format!("%{}%", part);
            let rows: Vec<(String, String)> = stmt
                .query_map([&search], |row| {
                    Ok((row.get::<_, String>(0)?, row.get::<_, String>(1)?))
                })
                .unwrap()
                .filter_map(|r| r.ok())
                .collect();

            for (sym_name, str_val) in rows {
                lib_symbols
                    .entry(lib_name.to_string())
                    .or_default()
                    .push((sym_name, vec![str_val]));
            }
        }
    }

    for (lib, symbols) in &lib_symbols {
        println!("\n  {} candidates:", lib);
        let mut seen = std::collections::HashSet::new();
        for (sym, strings) in symbols.iter().take(10) {
            if seen.insert(sym.clone()) {
                println!("    {} : {:?}", sym, strings);
            }
        }
    }

    // Find symbols with error messages (often identifiable)
    println!("\n\nSymbols with distinctive error messages:");
    println!("───────────────────────────────────────");

    let mut stmt = conn.prepare(
        "SELECT sym.name, s.value
         FROM strings s
         JOIN symbols sym ON s.symbol_id = sym.id
         WHERE (s.value LIKE '%Error%' OR s.value LIKE '%error%')
           AND LENGTH(s.value) > 20
           AND LENGTH(s.value) < 100
           AND sym.kind = 'function'
         ORDER BY sym.name
         LIMIT 30"
    ).unwrap();

    let rows = stmt.query_map([], |row| {
        Ok((row.get::<_, String>(0)?, row.get::<_, String>(1)?))
    }).unwrap();

    for row in rows {
        if let Ok((name, msg)) = row {
            println!("  {:10} : {}", name, msg);
        }
    }

    // Find __esModule exports (CommonJS modules)
    println!("\n\nCommonJS modules with identifiable exports:");
    println!("───────────────────────────────────────");

    let mut stmt = conn.prepare(
        "SELECT sym.name,
                GROUP_CONCAT(DISTINCT s.value) as exports
         FROM strings s
         JOIN symbols sym ON s.symbol_id = sym.id
         WHERE s.value NOT LIKE '%esModule%'
           AND LENGTH(s.value) > 3
           AND LENGTH(s.value) < 30
           AND s.value NOT LIKE '%function%'
           AND s.value NOT LIKE '%object%'
           AND sym.kind = 'function'
         GROUP BY sym.name
         HAVING COUNT(DISTINCT s.value) >= 3
         ORDER BY COUNT(DISTINCT s.value) DESC
         LIMIT 30"
    ).unwrap();

    let rows = stmt.query_map([], |row| {
        Ok((row.get::<_, String>(0)?, row.get::<_, String>(1)?))
    }).unwrap();

    for row in rows {
        if let Ok((name, exports)) = row {
            let display = if exports.len() > 80 {
                format!("{}...", &exports[..80])
            } else {
                exports
            };
            println!("  {:10} : {}", name, display);
        }
    }

    // Show library cache stats
    println!("\n\nLibrary Cache:");
    println!("───────────────────────────────────────");

    let count: i64 = conn.query_row(
        "SELECT COUNT(*) FROM library_cache WHERE library_name IS NOT NULL",
        [],
        |row| row.get(0)
    ).unwrap_or(0);

    println!("  Identified: {}", count);

    let mut stmt = conn.prepare(
        "SELECT library_name, COUNT(*) as cnt
         FROM library_cache
         WHERE library_name IS NOT NULL
         GROUP BY library_name
         ORDER BY cnt DESC"
    ).unwrap();

    let rows = stmt.query_map([], |row| {
        Ok((row.get::<_, String>(0)?, row.get::<_, i64>(1)?))
    }).unwrap();

    for row in rows {
        if let Ok((lib, cnt)) = row {
            println!("    {} : {}", lib, cnt);
        }
    }
}
