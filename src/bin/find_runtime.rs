use rusqlite::Connection;

fn main() {
    let conn = Connection::open("test.db").expect("Failed to open database");

    // Known webpack runtime function names
    let runtime_funcs = ["l", "U", "L", "M5", "u"];

    println!("Webpack Runtime Functions Analysis");
    println!("═══════════════════════════════════════════════════════════════\n");

    for name in &runtime_funcs {
        println!("'{}' symbol:", name);
        println!("───────────────────────────────────────");

        // Get counts by kind
        let mut stmt = conn.prepare(
            "SELECT kind, COUNT(*) FROM symbols WHERE name = ?1 GROUP BY kind ORDER BY COUNT(*) DESC"
        ).unwrap();

        let rows: Vec<_> = stmt.query_map([name], |row| {
            Ok((row.get::<_, String>(0)?, row.get::<_, i64>(1)?))
        }).unwrap().filter_map(|r| r.ok()).collect();

        if rows.is_empty() {
            println!("  (not found in symbol table)\n");
            continue;
        }

        for (kind, count) in &rows {
            println!("  {} {}", count, kind);
        }

        // Get signature if function
        let mut stmt = conn.prepare(
            "SELECT DISTINCT signature FROM symbols WHERE name = ?1 AND signature IS NOT NULL LIMIT 5"
        ).unwrap();

        let sigs: Vec<String> = stmt.query_map([name], |row| {
            row.get::<_, String>(0)
        }).unwrap().filter_map(|r| r.ok()).collect();

        if !sigs.is_empty() {
            println!("  Signatures: {}", sigs.join(", "));
        }

        // Get strings used
        let mut stmt = conn.prepare(
            "SELECT DISTINCT s.value
             FROM strings s
             JOIN symbols sym ON s.symbol_id = sym.id
             WHERE sym.name = ?1
             LIMIT 5"
        ).unwrap();

        let strings: Vec<String> = stmt.query_map([name], |row| {
            row.get::<_, String>(0)
        }).unwrap().filter_map(|r| r.ok()).collect();

        if !strings.is_empty() {
            println!("  Sample strings:");
            for s in strings {
                let display = if s.len() > 60 { format!("{}...", &s[..60]) } else { s };
                println!("    - {}", display);
            }
        }

        // Who calls this function?
        let mut stmt = conn.prepare(
            "SELECT DISTINCT caller.name
             FROM calls c
             JOIN symbols caller ON c.caller_id = caller.id
             JOIN symbols callee ON c.callee_id = callee.id
             WHERE callee.name = ?1
             LIMIT 10"
        ).unwrap();

        let callers: Vec<String> = stmt.query_map([name], |row| {
            row.get::<_, String>(0)
        }).unwrap().filter_map(|r| r.ok()).collect();

        if !callers.is_empty() {
            println!("  Called by: {}", callers.join(", "));
        }

        // What does this function call?
        let mut stmt = conn.prepare(
            "SELECT DISTINCT callee.name
             FROM calls c
             JOIN symbols caller ON c.caller_id = caller.id
             JOIN symbols callee ON c.callee_id = callee.id
             WHERE caller.name = ?1
             LIMIT 10"
        ).unwrap();

        let callees: Vec<String> = stmt.query_map([name], |row| {
            row.get::<_, String>(0)
        }).unwrap().filter_map(|r| r.ok()).collect();

        if !callees.is_empty() {
            println!("  Calls: {}", callees.join(", "));
        }

        println!();
    }

    // Find interop patterns - functions that use __esModule
    println!("\n\nFunctions using '__esModule' string:");
    println!("═══════════════════════════════════════════════════════════════");

    let mut stmt = conn.prepare(
        "SELECT DISTINCT sym.name, sym.kind
         FROM strings s
         JOIN symbols sym ON s.symbol_id = sym.id
         WHERE s.value LIKE '%esModule%'
         LIMIT 20"
    ).unwrap();

    let rows = stmt.query_map([], |row| {
        Ok((row.get::<_, String>(0)?, row.get::<_, String>(1)?))
    }).unwrap();

    for row in rows {
        if let Ok((name, kind)) = row {
            println!("  {} ({})", name, kind);
        }
    }

    // Find module initialization patterns
    println!("\n\nFunctions using 'exports' string:");
    println!("═══════════════════════════════════════════════════════════════");

    let mut stmt = conn.prepare(
        "SELECT sym.name, sym.kind, COUNT(*) as cnt
         FROM strings s
         JOIN symbols sym ON s.symbol_id = sym.id
         WHERE s.value = 'exports'
         GROUP BY sym.name, sym.kind
         ORDER BY cnt DESC
         LIMIT 15"
    ).unwrap();

    let rows = stmt.query_map([], |row| {
        Ok((row.get::<_, String>(0)?, row.get::<_, String>(1)?, row.get::<_, i64>(2)?))
    }).unwrap();

    for row in rows {
        if let Ok((name, kind, count)) = row {
            println!("  {} ({}) - {} uses", name, kind, count);
        }
    }
}
