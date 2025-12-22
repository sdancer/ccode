use anyhow::Result;
use rusqlite::Connection;
use std::env;
use std::fs::{self, File};
use std::io::Write;
use std::path::Path;

fn main() -> Result<()> {
    let args: Vec<String> = env::args().collect();
    let db_path = args.get(1).map(|s| s.as_str()).unwrap_or("test.db");
    let js_path = args.get(2).map(|s| s.as_str()).unwrap_or("/home/sdancer/webpack/formatted.js");
    let output_dir = args.get(3).map(|s| s.as_str()).unwrap_or("modules");

    let conn = Connection::open(db_path)?;
    let source = fs::read_to_string(js_path)?;
    let lines: Vec<&str> = source.lines().collect();

    // Create output directory
    let out_path = Path::new(output_dir);
    if !out_path.exists() {
        fs::create_dir_all(out_path)?;
    }

    // Create subdirectories for L and U modules
    fs::create_dir_all(out_path.join("L"))?;
    fs::create_dir_all(out_path.join("U"))?;

    // Get all modules
    let mut stmt = conn.prepare(
        "SELECT module_name, module_type, start_line, end_line
         FROM module_map
         ORDER BY module_type, start_line"
    )?;

    let modules: Vec<(String, String, i64, i64)> = stmt
        .query_map([], |row| {
            Ok((
                row.get::<_, String>(0)?,
                row.get::<_, String>(1)?,
                row.get::<_, i64>(2)?,
                row.get::<_, i64>(3)?,
            ))
        })?
        .filter_map(|r| r.ok())
        .collect();

    println!("Dumping {} modules to {}/", modules.len(), output_dir);

    let mut l_count = 0;
    let mut u_count = 0;

    for (name, mod_type, start, end) in &modules {
        let start_idx = *start as usize;
        let end_idx = (*end as usize).min(lines.len());

        if start_idx >= lines.len() {
            continue;
        }

        let code: String = lines[start_idx..end_idx]
            .iter()
            .cloned()
            .collect::<Vec<_>>()
            .join("\n");

        let subdir = if mod_type == "L" { "L" } else { "U" };
        let file_path = out_path.join(subdir).join(format!("{}.js", name));

        let mut file = File::create(&file_path)?;

        // Write header comment with metadata
        writeln!(file, "// Module: {}", name)?;
        writeln!(file, "// Type: {}", mod_type)?;
        writeln!(file, "// Lines: {}-{}", start, end)?;

        // Check if identified
        let identification: Option<(String, String)> = conn.query_row(
            "SELECT library_name, cleartext_name FROM library_cache WHERE minified_name = ?1",
            [name],
            |row| Ok((row.get(0)?, row.get(1)?))
        ).ok();

        if let Some((lib, cleartext)) = identification {
            writeln!(file, "// Library: {}", lib)?;
            writeln!(file, "// Name: {}", cleartext)?;
        }

        writeln!(file, "//")?;
        writeln!(file, "{}", code)?;

        if mod_type == "L" {
            l_count += 1;
        } else {
            u_count += 1;
        }
    }

    println!("Dumped {} L modules to {}/L/", l_count, output_dir);
    println!("Dumped {} U modules to {}/U/", u_count, output_dir);

    // Also create an index file
    let mut index = File::create(out_path.join("INDEX.md"))?;
    writeln!(index, "# Module Index\n")?;
    writeln!(index, "Total: {} modules ({} L, {} U)\n", l_count + u_count, l_count, u_count)?;

    // Write identified modules section
    writeln!(index, "## Identified Modules\n")?;

    let mut stmt = conn.prepare(
        "SELECT m.module_name, m.module_type, c.library_name, c.cleartext_name
         FROM module_map m
         JOIN library_cache c ON m.module_name = c.minified_name
         WHERE c.library_name IS NOT NULL
         ORDER BY c.library_name, m.module_name"
    )?;

    let identified: Vec<(String, String, String, String)> = stmt
        .query_map([], |row| {
            Ok((
                row.get::<_, String>(0)?,
                row.get::<_, String>(1)?,
                row.get::<_, String>(2)?,
                row.get::<_, String>(3)?,
            ))
        })?
        .filter_map(|r| r.ok())
        .collect();

    let mut current_lib = String::new();
    for (name, mod_type, lib, cleartext) in &identified {
        if lib != &current_lib {
            writeln!(index, "\n### {}\n", lib)?;
            current_lib = lib.clone();
        }
        writeln!(index, "- `{}` ({}) - {}", name, mod_type, cleartext)?;
    }

    println!("Created {}/INDEX.md", output_dir);

    Ok(())
}
