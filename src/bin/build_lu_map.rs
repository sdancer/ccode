use std::collections::{HashMap, HashSet};
use std::fs;
use std::io::{BufRead, BufReader};
use rusqlite::{params, Connection};
use regex::Regex;

fn main() {
    let args: Vec<String> = std::env::args().collect();
    let js_path = args.get(1).map(|s| s.as_str()).unwrap_or("/home/sdancer/webpack/formatted.js");
    let db_path = args.get(2).map(|s| s.as_str()).unwrap_or("test.db");

    println!("Building L() -> U() Module Map");
    println!("═══════════════════════════════════════════════════════════════\n");

    // Parse the source file
    let file = fs::File::open(js_path).expect("Failed to open JS file");
    let reader = BufReader::new(file);
    let lines: Vec<String> = reader.lines().filter_map(|l| l.ok()).collect();

    // Find all L and U module declarations
    let mut l_modules: Vec<(String, usize, usize)> = Vec::new(); // (name, start_line, end_line)
    let mut u_modules: Vec<(String, usize, usize)> = Vec::new();
    let mut all_u_names: HashSet<String> = HashSet::new();

    // First pass: find all module declarations
    let var_l_re = Regex::new(r"^var\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=\s*L\(").unwrap();
    let var_u_re = Regex::new(r"^var\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=\s*U\(").unwrap();

    for (i, line) in lines.iter().enumerate() {
        if let Some(caps) = var_l_re.captures(line) {
            let name = caps.get(1).unwrap().as_str().to_string();
            l_modules.push((name, i, 0)); // end_line will be filled later
        } else if let Some(caps) = var_u_re.captures(line) {
            let name = caps.get(1).unwrap().as_str().to_string();
            all_u_names.insert(name.clone());
            u_modules.push((name, i, 0));
        }
    }

    println!("Found {} L() modules and {} U() modules\n", l_modules.len(), u_modules.len());

    // Second pass: determine module boundaries
    // A module ends when the next module starts or at specific patterns
    let mut all_starts: Vec<(usize, bool)> = Vec::new(); // (line, is_l)
    for (_, start, _) in &l_modules {
        all_starts.push((*start, true));
    }
    for (_, start, _) in &u_modules {
        all_starts.push((*start, false));
    }
    all_starts.sort_by_key(|(line, _)| *line);

    // Update end lines
    for i in 0..l_modules.len() {
        let start = l_modules[i].1;
        let end = all_starts.iter()
            .find(|(line, _)| *line > start)
            .map(|(line, _)| *line)
            .unwrap_or(lines.len());
        l_modules[i].2 = end;
    }

    for i in 0..u_modules.len() {
        let start = u_modules[i].1;
        let end = all_starts.iter()
            .find(|(line, _)| *line > start)
            .map(|(line, _)| *line)
            .unwrap_or(lines.len());
        u_modules[i].2 = end;
    }

    // Third pass: for each L module, find which U modules it references
    let mut l_to_u: HashMap<String, Vec<String>> = HashMap::new();

    // Build regex to find U module calls
    let call_re = Regex::new(r"\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(").unwrap();

    for (l_name, start, end) in &l_modules {
        let mut called_u: HashSet<String> = HashSet::new();

        for line_idx in *start..*end.min(&lines.len()) {
            let line = &lines[line_idx];

            // Find all function calls in this line
            for caps in call_re.captures_iter(line) {
                let called_name = caps.get(1).unwrap().as_str();
                if all_u_names.contains(called_name) {
                    called_u.insert(called_name.to_string());
                }
            }
        }

        if !called_u.is_empty() {
            let mut u_list: Vec<String> = called_u.into_iter().collect();
            u_list.sort();
            l_to_u.insert(l_name.clone(), u_list);
        }
    }

    // Also find U -> U dependencies
    let mut u_to_u: HashMap<String, Vec<String>> = HashMap::new();

    for (u_name, start, end) in &u_modules {
        let mut called_u: HashSet<String> = HashSet::new();

        for line_idx in *start..*end.min(&lines.len()) {
            let line = &lines[line_idx];

            for caps in call_re.captures_iter(line) {
                let called_name = caps.get(1).unwrap().as_str();
                if all_u_names.contains(called_name) && called_name != u_name {
                    called_u.insert(called_name.to_string());
                }
            }
        }

        if !called_u.is_empty() {
            let mut u_list: Vec<String> = called_u.into_iter().collect();
            u_list.sort();
            u_to_u.insert(u_name.clone(), u_list);
        }
    }

    // Print statistics
    println!("L -> U Dependencies:");
    println!("───────────────────────────────────────");

    let mut l_with_deps: Vec<_> = l_to_u.iter().collect();
    l_with_deps.sort_by(|a, b| b.1.len().cmp(&a.1.len()));

    for (l_name, u_deps) in l_with_deps.iter().take(30) {
        let deps_str = if u_deps.len() > 5 {
            format!("{}, ... (+{})", u_deps[..5].join(", "), u_deps.len() - 5)
        } else {
            u_deps.join(", ")
        };
        println!("  {} -> [{}]", l_name, deps_str);
    }

    println!("\n\nU -> U Dependencies:");
    println!("───────────────────────────────────────");

    let mut u_with_deps: Vec<_> = u_to_u.iter().collect();
    u_with_deps.sort_by(|a, b| b.1.len().cmp(&a.1.len()));

    for (u_name, u_deps) in u_with_deps.iter().take(30) {
        let deps_str = if u_deps.len() > 5 {
            format!("{}, ... (+{})", u_deps[..5].join(", "), u_deps.len() - 5)
        } else {
            u_deps.join(", ")
        };
        println!("  {} -> [{}]", u_name, deps_str);
    }

    // Save to database
    println!("\n\nSaving to database...");

    let conn = Connection::open(db_path).expect("Failed to open database");

    // Create tables for module mapping
    conn.execute_batch(r#"
        CREATE TABLE IF NOT EXISTS module_map (
            id INTEGER PRIMARY KEY,
            module_name TEXT NOT NULL,
            module_type TEXT NOT NULL,  -- 'L' or 'U'
            start_line INTEGER,
            end_line INTEGER,
            UNIQUE(module_name, module_type)
        );

        CREATE TABLE IF NOT EXISTS module_deps (
            id INTEGER PRIMARY KEY,
            caller TEXT NOT NULL,
            caller_type TEXT NOT NULL,
            callee TEXT NOT NULL,
            callee_type TEXT NOT NULL,
            UNIQUE(caller, caller_type, callee, callee_type)
        );

        CREATE INDEX IF NOT EXISTS idx_module_map_name ON module_map(module_name);
        CREATE INDEX IF NOT EXISTS idx_module_deps_caller ON module_deps(caller);
    "#).expect("Failed to create tables");

    // Insert L modules
    let mut stmt = conn.prepare(
        "INSERT OR REPLACE INTO module_map (module_name, module_type, start_line, end_line) VALUES (?1, 'L', ?2, ?3)"
    ).unwrap();

    for (name, start, end) in &l_modules {
        stmt.execute(params![name, *start as i64, *end as i64]).ok();
    }

    // Insert U modules
    let mut stmt = conn.prepare(
        "INSERT OR REPLACE INTO module_map (module_name, module_type, start_line, end_line) VALUES (?1, 'U', ?2, ?3)"
    ).unwrap();

    for (name, start, end) in &u_modules {
        stmt.execute(params![name, *start as i64, *end as i64]).ok();
    }

    // Insert L -> U dependencies
    let mut stmt = conn.prepare(
        "INSERT OR REPLACE INTO module_deps (caller, caller_type, callee, callee_type) VALUES (?1, 'L', ?2, 'U')"
    ).unwrap();

    for (l_name, u_deps) in &l_to_u {
        for u_name in u_deps {
            stmt.execute(params![l_name, u_name]).ok();
        }
    }

    // Insert U -> U dependencies
    let mut stmt = conn.prepare(
        "INSERT OR REPLACE INTO module_deps (caller, caller_type, callee, callee_type) VALUES (?1, 'U', ?2, 'U')"
    ).unwrap();

    for (u_name, u_deps) in &u_to_u {
        for dep in u_deps {
            stmt.execute(params![u_name, dep]).ok();
        }
    }

    // Print summary
    let l_count: i64 = conn.query_row("SELECT COUNT(*) FROM module_map WHERE module_type = 'L'", [], |r| r.get(0)).unwrap();
    let u_count: i64 = conn.query_row("SELECT COUNT(*) FROM module_map WHERE module_type = 'U'", [], |r| r.get(0)).unwrap();
    let dep_count: i64 = conn.query_row("SELECT COUNT(*) FROM module_deps", [], |r| r.get(0)).unwrap();

    println!("\n───────────────────────────────────────");
    println!("Saved to database:");
    println!("  L modules: {}", l_count);
    println!("  U modules: {}", u_count);
    println!("  Dependencies: {}", dep_count);
    println!("  L with U deps: {}", l_to_u.len());
    println!("  U with U deps: {}", u_to_u.len());
}
