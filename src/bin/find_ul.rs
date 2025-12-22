use rusqlite::Connection;

fn main() {
    let conn = Connection::open("test.db").expect("Failed to open database");

    for letter in &["U", "L", "u", "l"] {
        println!("\n'{}' symbols:", letter);
        println!("───────────────────────────────────────");

        let mut stmt = conn.prepare(
            "SELECT kind, COUNT(*) FROM symbols WHERE name = ?1 GROUP BY kind"
        ).unwrap();

        let rows: Vec<_> = stmt.query_map([letter], |row| {
            Ok((row.get::<_, String>(0)?, row.get::<_, i64>(1)?))
        }).unwrap().filter_map(|r| r.ok()).collect();

        if rows.is_empty() {
            println!("  (none found)");
        } else {
            for (kind, count) in &rows {
                println!("  {} {}", count, kind);
            }
        }

        // Find what strings these symbols use
        let mut stmt = conn.prepare(
            "SELECT DISTINCT s.value
             FROM strings s
             JOIN symbols sym ON s.symbol_id = sym.id
             WHERE sym.name = ?1
             LIMIT 10"
        ).unwrap();

        let strings: Vec<String> = stmt.query_map([letter], |row| {
            row.get::<_, String>(0)
        }).unwrap().filter_map(|r| r.ok()).collect();

        if !strings.is_empty() {
            println!("  Strings used:");
            for s in strings {
                let display = if s.len() > 50 { format!("{}...", &s[..50]) } else { s };
                println!("    - {}", display);
            }
        }

        // Find body hash to correlate with other symbols
        let mut stmt = conn.prepare(
            "SELECT DISTINCT body_hash FROM symbols WHERE name = ?1 AND body_hash IS NOT NULL LIMIT 5"
        ).unwrap();

        let hashes: Vec<String> = stmt.query_map([letter], |row| {
            row.get::<_, String>(0)
        }).unwrap().filter_map(|r| r.ok()).collect();

        for hash in hashes {
            // Find other symbols with same body
            let mut stmt = conn.prepare(
                "SELECT name FROM symbols WHERE body_hash = ?1 AND name != ?2 LIMIT 10"
            ).unwrap();

            let others: Vec<String> = stmt.query_map([&hash, &letter.to_string()], |row| {
                row.get::<_, String>(0)
            }).unwrap().filter_map(|r| r.ok()).collect();

            if !others.is_empty() {
                println!("  Same body as: {}", others.join(", "));
            }
        }
    }

    // Most correlated symbols (by shared body hash)
    println!("\n\nTop correlated symbol pairs (same function body):");
    println!("═══════════════════════════════════════════════════════════════");

    let mut stmt = conn.prepare(
        "SELECT s1.name, s2.name, s1.body_hash
         FROM symbols s1
         JOIN symbols s2 ON s1.body_hash = s2.body_hash AND s1.id < s2.id
         WHERE s1.body_hash IS NOT NULL
           AND LENGTH(s1.name) <= 2
           AND LENGTH(s2.name) <= 2
         LIMIT 30"
    ).unwrap();

    let rows = stmt.query_map([], |row| {
        Ok((row.get::<_, String>(0)?, row.get::<_, String>(1)?, row.get::<_, String>(2)?))
    }).unwrap();

    for row in rows {
        if let Ok((n1, n2, hash)) = row {
            println!("  {} <=> {}  (hash: {}...)", n1, n2, &hash[..12]);
        }
    }
}
