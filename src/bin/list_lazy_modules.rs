use rusqlite::Connection;
use std::collections::HashMap;

fn main() {
    let conn = Connection::open("test.db").expect("Failed to open database");

    println!("Webpack Lazy Module Analysis");
    println!("═══════════════════════════════════════════════════════════════\n");

    // Find all top-level function symbols (not arrows within other functions)
    // These would have no parent and signature matching common patterns

    println!("Top-level named functions (likely lazy modules):");
    println!("───────────────────────────────────────");

    // Pattern: 2-4 char names that are common in minified bundles
    let mut stmt = conn.prepare(
        "SELECT name, signature, kind
         FROM symbols
         WHERE LENGTH(name) BETWEEN 2 AND 6
           AND kind = 'function'
           AND signature IS NOT NULL
         ORDER BY name
         LIMIT 100"
    ).unwrap();

    let rows: Vec<_> = stmt.query_map([], |row| {
        Ok((row.get::<_, String>(0)?, row.get::<_, String>(1)?, row.get::<_, String>(2)?))
    }).unwrap().filter_map(|r| r.ok()).collect();

    // Group by signature pattern
    let mut by_sig: HashMap<String, Vec<String>> = HashMap::new();
    for (name, sig, _kind) in &rows {
        by_sig.entry(sig.clone()).or_default().push(name.clone());
    }

    println!("By signature pattern:");
    let mut sigs: Vec<_> = by_sig.iter().collect();
    sigs.sort_by(|a, b| b.1.len().cmp(&a.1.len()));

    for (sig, names) in sigs.iter().take(10) {
        let sample: Vec<_> = names.iter().take(10).cloned().collect();
        let more = if names.len() > 10 { format!(" (+{} more)", names.len() - 10) } else { "".to_string() };
        println!("  {} ({} funcs): {}{}", sig, names.len(), sample.join(", "), more);
    }

    // Find patterns that look like lazy modules: called by many, call L or l
    println!("\n\nModules that call l() (use ES imports):");
    println!("───────────────────────────────────────");

    let mut stmt = conn.prepare(
        "SELECT caller.name, COUNT(*) as l_calls
         FROM calls c
         JOIN symbols caller ON c.caller_id = caller.id
         JOIN symbols callee ON c.callee_id = callee.id
         WHERE callee.name = 'l'
           AND LENGTH(caller.name) BETWEEN 2 AND 6
         GROUP BY caller.name
         ORDER BY l_calls DESC
         LIMIT 30"
    ).unwrap();

    let rows = stmt.query_map([], |row| {
        Ok((row.get::<_, String>(0)?, row.get::<_, i64>(1)?))
    }).unwrap();

    for row in rows {
        if let Ok((name, cnt)) = row {
            println!("  {} - {} import calls", name, cnt);
        }
    }

    // Find the runtime helper pattern: short names with high call counts
    println!("\n\nRuntime helpers (short names, high call frequency):");
    println!("───────────────────────────────────────");

    let mut stmt = conn.prepare(
        "SELECT s.name, s.signature,
                (SELECT COUNT(*) FROM calls c WHERE c.callee_id = s.id) as times_called,
                (SELECT COUNT(*) FROM calls c WHERE c.caller_id = s.id) as calls_made
         FROM symbols s
         WHERE LENGTH(s.name) <= 3
           AND s.kind = 'function'
         ORDER BY times_called DESC
         LIMIT 25"
    ).unwrap();

    let rows = stmt.query_map([], |row| {
        Ok((
            row.get::<_, String>(0)?,
            row.get::<_, Option<String>>(1)?,
            row.get::<_, i64>(2)?,
            row.get::<_, i64>(3)?
        ))
    }).unwrap();

    for row in rows {
        if let Ok((name, sig, called, calls)) = row {
            let sig_str = sig.unwrap_or_else(|| "?".to_string());
            println!("  {:4} {:12}  called: {:>5}x  calls: {:>4} others",
                     name, sig_str, called, calls);
        }
    }

    // Show what strings the runtime helpers use
    println!("\n\nStrings used by runtime helpers:");
    println!("───────────────────────────────────────");

    for helper in ["l", "U", "L", "M5", "k", "r", "t"] {
        let mut stmt = conn.prepare(
            "SELECT DISTINCT s.value
             FROM strings s
             JOIN symbols sym ON s.symbol_id = sym.id
             WHERE sym.name = ?1
             LIMIT 5"
        ).unwrap();

        let strings: Vec<String> = stmt.query_map([helper], |row| {
            row.get::<_, String>(0)
        }).unwrap().filter_map(|r| r.ok()).collect();

        if !strings.is_empty() {
            println!("  {}: {}", helper, strings.join(", "));
        }
    }
}
