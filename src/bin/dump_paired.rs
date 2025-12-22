use anyhow::Result;
use rusqlite::Connection;
use std::collections::HashMap;
use std::env;
use std::fs::{self, File};
use std::io::Write;
use std::path::Path;

fn main() -> Result<()> {
    let args: Vec<String> = env::args().collect();
    let db_path = args.get(1).map(|s| s.as_str()).unwrap_or("test.db");
    let js_path = args.get(2).map(|s| s.as_str()).unwrap_or("/home/sdancer/webpack/formatted.js");
    let output_dir = args.get(3).map(|s| s.as_str()).unwrap_or("paired_modules");

    let conn = Connection::open(db_path)?;
    let source = fs::read_to_string(js_path)?;
    let lines: Vec<&str> = source.lines().collect();

    // Create output directory
    let out_path = Path::new(output_dir);
    fs::create_dir_all(out_path)?;

    // Build L→U dependency map
    let mut l_to_u: HashMap<String, Vec<String>> = HashMap::new();
    let mut stmt = conn.prepare(
        "SELECT caller, callee FROM module_deps WHERE caller_type = 'L' AND callee_type = 'U'"
    )?;

    let deps: Vec<(String, String)> = stmt.query_map([], |row| {
        Ok((row.get::<_, String>(0)?, row.get::<_, String>(1)?))
    })?.filter_map(|r| r.ok()).collect();

    for (l, u) in deps {
        l_to_u.entry(l).or_default().push(u);
    }

    // Get module line info
    let mut module_info: HashMap<String, (String, i64, i64)> = HashMap::new();
    let mut stmt = conn.prepare("SELECT module_name, module_type, start_line, end_line FROM module_map")?;
    let modules: Vec<(String, String, i64, i64)> = stmt.query_map([], |row| {
        Ok((row.get(0)?, row.get(1)?, row.get(2)?, row.get(3)?))
    })?.filter_map(|r| r.ok()).collect();

    for (name, mtype, start, end) in modules {
        module_info.insert(name, (mtype, start, end));
    }

    // Get library identifications
    let mut identifications: HashMap<String, (String, String)> = HashMap::new();
    let mut stmt = conn.prepare(
        "SELECT minified_name, library_name, cleartext_name FROM library_cache WHERE library_name IS NOT NULL"
    )?;
    let ids: Vec<(String, String, String)> = stmt.query_map([], |row| {
        Ok((row.get(0)?, row.get(1)?, row.get(2)?))
    })?.filter_map(|r| r.ok()).collect();

    for (name, lib, cleartext) in ids {
        identifications.insert(name, (lib, cleartext));
    }

    println!("Creating paired module files...");

    let mut count = 0;
    for (l_name, u_deps) in &l_to_u {
        let Some((_, l_start, l_end)) = module_info.get(l_name) else { continue };

        // Create file for this L module with all its U dependencies
        let file_path = out_path.join(format!("{}.js", l_name));
        let mut file = File::create(&file_path)?;

        // Header
        writeln!(file, "// ═══════════════════════════════════════════════════════════════")?;
        writeln!(file, "// L Module: {} (lines {}-{})", l_name, l_start, l_end)?;

        if let Some((lib, cleartext)) = identifications.get(l_name) {
            writeln!(file, "// Library: {} - {}", lib, cleartext)?;
        }

        writeln!(file, "// U Dependencies: {:?}", u_deps)?;
        writeln!(file, "// ═══════════════════════════════════════════════════════════════\n")?;

        // Write L module code
        let l_start_idx = *l_start as usize;
        let l_end_idx = (*l_end as usize).min(lines.len());
        writeln!(file, "// --- L Module: {} ---\n", l_name)?;
        for line in &lines[l_start_idx..l_end_idx] {
            writeln!(file, "{}", line)?;
        }

        // Write each U dependency
        for u_name in u_deps {
            let Some((_, u_start, u_end)) = module_info.get(u_name) else { continue };

            writeln!(file, "\n// ───────────────────────────────────────────────────────────────")?;
            writeln!(file, "// U Module: {} (lines {}-{})", u_name, u_start, u_end)?;

            if let Some((lib, cleartext)) = identifications.get(u_name) {
                writeln!(file, "// Library: {} - {}", lib, cleartext)?;
            }

            writeln!(file, "// ───────────────────────────────────────────────────────────────\n")?;

            let u_start_idx = *u_start as usize;
            let u_end_idx = (*u_end as usize).min(lines.len());
            for line in &lines[u_start_idx..u_end_idx] {
                writeln!(file, "{}", line)?;
            }
        }

        count += 1;
    }

    println!("Created {} paired module files in {}/", count, output_dir);

    // Create summary
    let mut summary = File::create(out_path.join("SUMMARY.md"))?;
    writeln!(summary, "# Paired L→U Modules\n")?;
    writeln!(summary, "Each file contains an L module and all U modules it depends on.\n")?;
    writeln!(summary, "Total: {} L modules with U dependencies\n", count)?;

    // Group by library
    writeln!(summary, "## By Library\n")?;

    let mut by_lib: HashMap<String, Vec<String>> = HashMap::new();
    for l_name in l_to_u.keys() {
        let lib = identifications.get(l_name)
            .map(|(l, _)| l.clone())
            .unwrap_or_else(|| "unidentified".to_string());
        by_lib.entry(lib).or_default().push(l_name.clone());
    }

    let mut libs: Vec<_> = by_lib.iter().collect();
    libs.sort_by(|a, b| b.1.len().cmp(&a.1.len()));

    for (lib, modules) in libs {
        writeln!(summary, "### {} ({} modules)\n", lib, modules.len())?;
        for m in modules.iter().take(20) {
            let u_count = l_to_u.get(m).map(|v| v.len()).unwrap_or(0);
            writeln!(summary, "- `{}` ({} U deps)", m, u_count)?;
        }
        if modules.len() > 20 {
            writeln!(summary, "- ... and {} more", modules.len() - 20)?;
        }
        writeln!(summary)?;
    }

    Ok(())
}
