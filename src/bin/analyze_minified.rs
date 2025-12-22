use rusqlite::{Connection};
use std::collections::HashMap;

fn main() {
    let args: Vec<String> = std::env::args().collect();
    let db_path = args.get(1).map(|s| s.as_str()).unwrap_or("test.db");

    let conn = Connection::open(db_path).expect("Failed to open database");

    // Count single-letter symbols
    println!("Single-letter symbol counts:");
    println!("═══════════════════════════════════════════════════════════════");

    let mut stmt = conn.prepare(
        "SELECT name, kind, COUNT(*) as cnt
         FROM symbols
         WHERE LENGTH(name) = 1
         GROUP BY name, kind
         ORDER BY cnt DESC"
    ).unwrap();

    let mut by_letter: HashMap<String, Vec<(String, i64)>> = HashMap::new();
    let rows = stmt.query_map([], |row| {
        Ok((row.get::<_, String>(0)?, row.get::<_, String>(1)?, row.get::<_, i64>(2)?))
    }).unwrap();

    for row in rows {
        let (name, kind, count) = row.unwrap();
        by_letter.entry(name).or_default().push((kind, count));
    }

    // Sort by total count
    let mut letters: Vec<_> = by_letter.iter().collect();
    letters.sort_by(|a, b| {
        let sum_a: i64 = a.1.iter().map(|(_, c)| c).sum();
        let sum_b: i64 = b.1.iter().map(|(_, c)| c).sum();
        sum_b.cmp(&sum_a)
    });

    for (letter, kinds) in letters.iter().take(30) {
        let total: i64 = kinds.iter().map(|(_, c)| c).sum();
        let breakdown: Vec<String> = kinds.iter().map(|(k, c)| format!("{}:{}", k, c)).collect();
        println!("  '{}'  {:>5}x  ({})", letter, total, breakdown.join(", "));
    }

    // Now let's look at what strings are associated with specific letters
    println!("\n\nStrings associated with 'U' symbols:");
    println!("═══════════════════════════════════════════════════════════════");

    let mut stmt = conn.prepare(
        "SELECT DISTINCT s.value, sym.kind
         FROM strings s
         JOIN symbols sym ON s.symbol_id = sym.id
         WHERE sym.name = 'U'
         LIMIT 30"
    ).unwrap();

    let rows = stmt.query_map([], |row| {
        Ok((row.get::<_, String>(0)?, row.get::<_, String>(1)?))
    }).unwrap();

    for row in rows {
        let (value, kind) = row.unwrap();
        let display = if value.len() > 60 { format!("{}...", &value[..60]) } else { value };
        println!("  [{}] {}", kind, display);
    }

    println!("\n\nStrings associated with 'L' symbols:");
    println!("═══════════════════════════════════════════════════════════════");

    let mut stmt = conn.prepare(
        "SELECT DISTINCT s.value, sym.kind
         FROM strings s
         JOIN symbols sym ON s.symbol_id = sym.id
         WHERE sym.name = 'L'
         LIMIT 30"
    ).unwrap();

    let rows = stmt.query_map([], |row| {
        Ok((row.get::<_, String>(0)?, row.get::<_, String>(1)?))
    }).unwrap();

    for row in rows {
        let (value, kind) = row.unwrap();
        let display = if value.len() > 60 { format!("{}...", &value[..60]) } else { value };
        println!("  [{}] {}", kind, display);
    }

    // Look at body hashes to find duplicates
    println!("\n\nDuplicate function bodies (same code, different names):");
    println!("═══════════════════════════════════════════════════════════════");

    let mut stmt = conn.prepare(
        "SELECT body_hash, GROUP_CONCAT(name, ', ') as names, COUNT(*) as cnt
         FROM symbols
         WHERE body_hash IS NOT NULL AND LENGTH(name) <= 3
         GROUP BY body_hash
         HAVING cnt > 1
         ORDER BY cnt DESC
         LIMIT 20"
    ).unwrap();

    let rows = stmt.query_map([], |row| {
        Ok((
            row.get::<_, String>(0)?,
            row.get::<_, String>(1)?,
            row.get::<_, i64>(2)?
        ))
    }).unwrap();

    for row in rows {
        let (hash, names, count) = row.unwrap();
        let names_display = if names.len() > 60 { format!("{}...", &names[..60]) } else { names };
        println!("  {}x  hash:{}...  names: {}", count, &hash[..12], names_display);
    }

    // Signature patterns
    println!("\n\nMost common function signatures:");
    println!("═══════════════════════════════════════════════════════════════");

    let mut stmt = conn.prepare(
        "SELECT signature, COUNT(*) as cnt
         FROM symbols
         WHERE signature IS NOT NULL
         GROUP BY signature
         ORDER BY cnt DESC
         LIMIT 15"
    ).unwrap();

    let rows = stmt.query_map([], |row| {
        Ok((row.get::<_, String>(0)?, row.get::<_, i64>(1)?))
    }).unwrap();

    for row in rows {
        let (sig, count) = row.unwrap();
        println!("  {:>6}x  {}", count, sig);
    }
}
