use std::collections::{HashMap, HashSet};
use std::fs;
use std::io::{BufRead, BufReader};

fn main() {
    let file = fs::File::open("/home/sdancer/webpack/formatted.js").expect("Failed to open file");
    let reader = BufReader::new(file);

    let mut l_modules: Vec<(usize, String)> = Vec::new();  // (line, name)
    let mut u_modules: Vec<(usize, String)> = Vec::new();

    // Parse L and U module declarations
    for (line_num, line) in reader.lines().enumerate() {
        let line = line.unwrap();
        if line.starts_with("var ") {
            if let Some(rest) = line.strip_prefix("var ") {
                if let Some(eq_pos) = rest.find(" = ") {
                    let name = &rest[..eq_pos];
                    let rhs = &rest[eq_pos + 3..];

                    if rhs.starts_with("L(") {
                        l_modules.push((line_num + 1, name.to_string()));
                    } else if rhs.starts_with("U(") {
                        u_modules.push((line_num + 1, name.to_string()));
                    }
                }
            }
        }
    }

    println!("Module Definition Summary");
    println!("═══════════════════════════════════════════════════════════════\n");
    println!("L (lazy) modules: {}", l_modules.len());
    println!("U (CommonJS) modules: {}", u_modules.len());

    // Now re-read and find what each L module calls
    let source = fs::read_to_string("/home/sdancer/webpack/formatted.js").unwrap();
    let lines: Vec<&str> = source.lines().collect();

    // Build a set of U module names for quick lookup
    let u_names: HashSet<&str> = u_modules.iter().map(|(_, n)| n.as_str()).collect();
    let l_names: HashSet<&str> = l_modules.iter().map(|(_, n)| n.as_str()).collect();

    println!("\n\nL modules that call U modules:");
    println!("───────────────────────────────────────");

    let mut l_to_u: HashMap<String, Vec<String>> = HashMap::new();

    // For each L module, scan forward until we hit another var declaration
    for i in 0..l_modules.len() {
        let (start_line, l_name) = &l_modules[i];
        let end_line = if i + 1 < l_modules.len() {
            // Find next module (either L or U)
            let next_l = l_modules.get(i + 1).map(|(l, _)| *l).unwrap_or(usize::MAX);
            let next_u = u_modules.iter().find(|(l, _)| *l > *start_line).map(|(l, _)| *l).unwrap_or(usize::MAX);
            std::cmp::min(next_l, next_u)
        } else {
            start_line + 100  // Reasonable limit
        };

        // Scan the L module body for U module calls
        let mut called_u: Vec<String> = Vec::new();
        for line_idx in *start_line..std::cmp::min(end_line, lines.len()) {
            let line = lines[line_idx];
            // Look for U module name followed by ( - indicating a call
            for u_name in &u_names {
                if line.contains(&format!("{}(", u_name)) || line.contains(&format!("{},", u_name)) {
                    if !called_u.contains(&u_name.to_string()) {
                        called_u.push(u_name.to_string());
                    }
                }
            }
        }

        if !called_u.is_empty() {
            l_to_u.insert(l_name.clone(), called_u);
        }
    }

    // Show L -> U relationships
    let mut entries: Vec<_> = l_to_u.iter().collect();
    entries.sort_by(|a, b| b.1.len().cmp(&a.1.len()));

    for (l_mod, u_mods) in entries.iter().take(30) {
        let display: Vec<_> = u_mods.iter().take(5).map(|s| s.as_str()).collect();
        let more = if u_mods.len() > 5 { format!(" +{}", u_mods.len() - 5) } else { "".to_string() };
        println!("  {} -> [{}]{}", l_mod, display.join(", "), more);
    }

    // Now find U -> U dependencies
    println!("\n\nU modules that call other U modules:");
    println!("───────────────────────────────────────");

    let mut u_to_u: HashMap<String, Vec<String>> = HashMap::new();

    for i in 0..u_modules.len() {
        let (start_line, u_name) = &u_modules[i];
        let end_line = if i + 1 < u_modules.len() {
            u_modules[i + 1].0
        } else {
            start_line + 100
        };

        let mut called_u: Vec<String> = Vec::new();
        for line_idx in *start_line..std::cmp::min(end_line, lines.len()) {
            let line = lines[line_idx];
            for other_u in &u_names {
                if *other_u != u_name.as_str() {
                    if line.contains(&format!("{}(", other_u)) {
                        if !called_u.contains(&other_u.to_string()) {
                            called_u.push(other_u.to_string());
                        }
                    }
                }
            }
        }

        if !called_u.is_empty() {
            u_to_u.insert(u_name.clone(), called_u);
        }
    }

    let mut entries: Vec<_> = u_to_u.iter().collect();
    entries.sort_by(|a, b| b.1.len().cmp(&a.1.len()));

    for (u_mod, deps) in entries.iter().take(30) {
        let display: Vec<_> = deps.iter().take(5).map(|s| s.as_str()).collect();
        let more = if deps.len() > 5 { format!(" +{}", deps.len() - 5) } else { "".to_string() };
        println!("  {} -> [{}]{}", u_mod, display.join(", "), more);
    }

    // Show some specific examples
    println!("\n\nSample L module definitions (first 10):");
    println!("───────────────────────────────────────");
    for (line, name) in l_modules.iter().take(10) {
        println!("  line {:>5}: {}", line, name);
    }

    println!("\n\nSample U module definitions (first 10):");
    println!("───────────────────────────────────────");
    for (line, name) in u_modules.iter().take(10) {
        println!("  line {:>5}: {}", line, name);
    }

    // Statistics
    println!("\n\nDependency Statistics:");
    println!("───────────────────────────────────────");
    println!("  L modules with U dependencies: {}", l_to_u.len());
    println!("  U modules with U dependencies: {}", u_to_u.len());

    let total_l_to_u: usize = l_to_u.values().map(|v| v.len()).sum();
    let total_u_to_u: usize = u_to_u.values().map(|v| v.len()).sum();
    println!("  Total L->U edges: {}", total_l_to_u);
    println!("  Total U->U edges: {}", total_u_to_u);
}
