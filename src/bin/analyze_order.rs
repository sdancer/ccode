use rusqlite::Connection;
use std::collections::HashMap;

fn main() {
    let conn = Connection::open("test.db").unwrap();

    // Get all U modules with their line positions
    let mut stmt = conn.prepare(
        "SELECT m.module_name, m.start_line, m.end_line, c.library_name
         FROM module_map m
         LEFT JOIN library_cache c ON m.module_name = c.minified_name
         WHERE m.module_type = 'U'
         ORDER BY m.start_line"
    ).unwrap();

    let modules: Vec<(String, i64, i64, Option<String>)> = stmt.query_map([], |row| {
        Ok((
            row.get::<_, String>(0)?,
            row.get::<_, i64>(1)?,
            row.get::<_, i64>(2)?,
            row.get::<_, Option<String>>(3)?,
        ))
    }).unwrap().filter_map(|r| r.ok()).collect();

    println!("U Module Ordering Analysis");
    println!("═══════════════════════════════════════════════════════════════\n");

    // Divide into ranges
    let total = modules.len();
    let chunk_size = total / 10;

    println!("Distribution of identified vs unidentified by position:\n");
    println!("{:<20} {:>8} {:>10} {:>10} {:>8}", "Line Range", "Total", "Identified", "Unknown", "% Known");
    println!("{}", "─".repeat(65));

    for i in 0..10 {
        let start = i * chunk_size;
        let end = if i == 9 { total } else { (i + 1) * chunk_size };
        let chunk = &modules[start..end];

        let identified = chunk.iter().filter(|(_, _, _, lib)| lib.is_some()).count();
        let unknown = chunk.len() - identified;
        let pct = identified as f64 / chunk.len() as f64 * 100.0;

        let first_line = chunk.first().map(|(_, l, _, _)| *l).unwrap_or(0);
        let last_line = chunk.last().map(|(_, _, l, _)| *l).unwrap_or(0);

        println!("{:<20} {:>8} {:>10} {:>10} {:>7.1}%",
            format!("{}k - {}k", first_line/1000, last_line/1000),
            chunk.len(), identified, unknown, pct);
    }

    // Show first 20 and last 20 modules
    println!("\n\nFirst 20 U modules (earliest in file):");
    println!("{}", "─".repeat(65));
    for (name, start, end, lib) in modules.iter().take(20) {
        let lib_str = lib.as_deref().unwrap_or("-");
        let size = end - start;
        println!("  line {:>6}: {:>8}  {:>5} lines  {}", start, name, size, lib_str);
    }

    println!("\n\nLast 20 U modules (latest in file):");
    println!("{}", "─".repeat(65));
    for (name, start, end, lib) in modules.iter().rev().take(20).collect::<Vec<_>>().into_iter().rev() {
        let lib_str = lib.as_deref().unwrap_or("-");
        let size = end - start;
        println!("  line {:>6}: {:>8}  {:>5} lines  {}", start, name, size, lib_str);
    }

    // Group libraries by their average position
    println!("\n\nIdentified libraries by position (avg line number):");
    println!("{}", "─".repeat(65));

    let mut lib_positions: HashMap<String, Vec<i64>> = HashMap::new();
    for (_, start, _, lib) in &modules {
        if let Some(l) = lib {
            lib_positions.entry(l.clone()).or_default().push(*start);
        }
    }

    let mut libs: Vec<_> = lib_positions.iter()
        .map(|(lib, positions)| {
            let avg = positions.iter().sum::<i64>() / positions.len() as i64;
            let min = *positions.iter().min().unwrap();
            let max = *positions.iter().max().unwrap();
            (lib, avg, min, max, positions.len())
        })
        .collect();
    libs.sort_by_key(|(_, avg, _, _, _)| *avg);

    for (lib, avg, min, max, count) in libs {
        println!("  {:>6}k avg | {:>3} modules | lines {:>3}k-{:>3}k | {}",
            avg/1000, count, min/1000, max/1000, lib);
    }

    // Analyze module sizes
    println!("\n\nModule size analysis:");
    println!("{}", "─".repeat(65));

    let mut sizes: Vec<_> = modules.iter().map(|(n, s, e, l)| (n, e - s, l)).collect();
    sizes.sort_by_key(|(_, size, _)| -(*size as i64));

    println!("\nLargest 15 U modules:");
    for (name, size, lib) in sizes.iter().take(15) {
        let lib_str = lib.as_ref().map(|s| s.as_str()).unwrap_or("-");
        println!("  {:>6} lines: {:>10}  {}", size, name, lib_str);
    }
}
