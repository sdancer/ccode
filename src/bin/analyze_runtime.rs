use rusqlite::Connection;

fn main() {
    let conn = Connection::open("test.db").expect("Failed to open database");

    println!("Webpack Runtime Analysis");
    println!("═══════════════════════════════════════════════════════════════\n");

    // Find functions that call L (lazy initializers)
    println!("Modules initialized with L():");
    println!("───────────────────────────────────────");

    let mut stmt = conn.prepare(
        "SELECT caller.name, caller.signature
         FROM calls c
         JOIN symbols caller ON c.caller_id = caller.id
         JOIN symbols callee ON c.callee_id = callee.id
         WHERE callee.name = 'L'
         ORDER BY caller.name
         LIMIT 50"
    ).unwrap();

    let rows = stmt.query_map([], |row| {
        Ok((row.get::<_, String>(0)?, row.get::<_, Option<String>>(1)?))
    }).unwrap();

    let mut count = 0;
    for row in rows {
        if let Ok((name, sig)) = row {
            count += 1;
            let sig_str = sig.unwrap_or_default();
            println!("  {} {}", name, sig_str);
        }
    }
    println!("  ... total: {}", count);

    // Find what l() returns/uses
    println!("\n\nSymbols that call l() (interop require):");
    println!("───────────────────────────────────────");

    let mut stmt = conn.prepare(
        "SELECT caller.name, COUNT(*) as cnt
         FROM calls c
         JOIN symbols caller ON c.caller_id = caller.id
         JOIN symbols callee ON c.callee_id = callee.id
         WHERE callee.name = 'l'
         GROUP BY caller.name
         ORDER BY cnt DESC
         LIMIT 20"
    ).unwrap();

    let rows = stmt.query_map([], |row| {
        Ok((row.get::<_, String>(0)?, row.get::<_, i64>(1)?))
    }).unwrap();

    for row in rows {
        if let Ok((name, cnt)) = row {
            println!("  {} - {} calls", name, cnt);
        }
    }

    // Find what U() wraps (module factories)
    println!("\n\nModules wrapped with U() (CommonJS):");
    println!("───────────────────────────────────────");

    let mut stmt = conn.prepare(
        "SELECT caller.name
         FROM calls c
         JOIN symbols caller ON c.caller_id = caller.id
         JOIN symbols callee ON c.callee_id = callee.id
         WHERE callee.name = 'U'
         ORDER BY caller.name
         LIMIT 30"
    ).unwrap();

    let rows = stmt.query_map([], |row| {
        Ok(row.get::<_, String>(0)?)
    }).unwrap();

    for row in rows {
        if let Ok(name) = row {
            println!("  {}", name);
        }
    }

    // Top-level runtime functions (called a lot)
    println!("\n\nMost frequently called single-letter functions:");
    println!("───────────────────────────────────────");

    let mut stmt = conn.prepare(
        "SELECT callee.name, COUNT(*) as cnt, callee.signature
         FROM calls c
         JOIN symbols callee ON c.callee_id = callee.id
         WHERE LENGTH(callee.name) <= 2
         GROUP BY callee.name
         ORDER BY cnt DESC
         LIMIT 20"
    ).unwrap();

    let rows = stmt.query_map([], |row| {
        Ok((row.get::<_, String>(0)?, row.get::<_, i64>(1)?, row.get::<_, Option<String>>(2)?))
    }).unwrap();

    for row in rows {
        if let Ok((name, cnt, sig)) = row {
            let sig_str = sig.unwrap_or_default();
            println!("  {}  {:>6}x  {}", name, cnt, sig_str);
        }
    }

    // Analyze lazy initialization chains
    println!("\n\nLazy initialization dependency graph (L calls):");
    println!("───────────────────────────────────────");

    // Find symbols that are created by L() and what they call
    let mut stmt = conn.prepare(
        "SELECT s.name,
                (SELECT COUNT(*) FROM calls c2
                 JOIN symbols callee ON c2.callee_id = callee.id
                 WHERE c2.caller_id = s.id AND callee.name = 'l') as l_calls,
                (SELECT COUNT(*) FROM calls c2 WHERE c2.caller_id = s.id) as total_calls
         FROM symbols s
         WHERE s.name LIKE '%F1' OR s.name LIKE '%K' OR s.name LIKE '%j'
         ORDER BY l_calls DESC
         LIMIT 15"
    ).unwrap();

    let rows = stmt.query_map([], |row| {
        Ok((row.get::<_, String>(0)?, row.get::<_, i64>(1)?, row.get::<_, i64>(2)?))
    }).unwrap();

    for row in rows {
        if let Ok((name, l_calls, total)) = row {
            if l_calls > 0 {
                println!("  {} - calls l(): {}, total calls: {}", name, l_calls, total);
            }
        }
    }
}
