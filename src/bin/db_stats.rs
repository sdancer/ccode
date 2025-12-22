use rusqlite::{params, Connection};

fn main() {
    let args: Vec<String> = std::env::args().collect();
    let db_path = args.get(1).map(|s| s.as_str()).unwrap_or("test.db");

    let conn = Connection::open(db_path).expect("Failed to open database");

    println!("Symbol counts by kind:");
    println!("─────────────────────────────────────");
    let mut stmt = conn.prepare("SELECT kind, COUNT(*) FROM symbols GROUP BY kind ORDER BY COUNT(*) DESC").unwrap();
    let rows = stmt.query_map([], |row| {
        Ok((row.get::<_, String>(0)?, row.get::<_, i64>(1)?))
    }).unwrap();

    for row in rows {
        let (kind, count) = row.unwrap();
        println!("  {:12} {:>8}", kind, count);
    }

    println!("\nTop 20 most common strings:");
    println!("─────────────────────────────────────");
    let mut stmt = conn.prepare("SELECT value, COUNT(*) as cnt FROM strings GROUP BY value ORDER BY cnt DESC LIMIT 20").unwrap();
    let rows = stmt.query_map([], |row| {
        Ok((row.get::<_, String>(0)?, row.get::<_, i64>(1)?))
    }).unwrap();

    for row in rows {
        let (value, count) = row.unwrap();
        let display = if value.len() > 40 { format!("{}...", &value[..40]) } else { value };
        println!("  {:>5}x  {}", count, display);
    }
}
