use rusqlite::{params, Connection};
use std::collections::{HashMap, HashSet};

fn main() {
    let conn = Connection::open("test.db").unwrap();

    // Get edges
    let mut stmt = conn.prepare("SELECT from_module, to_module FROM module_edges").unwrap();
    let edges: Vec<(String, String)> = stmt.query_map([], |row| {
        Ok((row.get::<_, String>(0)?, row.get::<_, String>(1)?))
    }).unwrap().filter_map(|r| r.ok()).collect();

    // Build adjacency lists
    let mut deps: HashMap<String, Vec<String>> = HashMap::new();
    let mut rdeps: HashMap<String, Vec<String>> = HashMap::new();

    for (from, to) in &edges {
        deps.entry(from.clone()).or_default().push(to.clone());
        rdeps.entry(to.clone()).or_default().push(from.clone());
    }

    // Get known libraries (excluding claude-code app modules)
    let mut stmt = conn.prepare(
        "SELECT minified_name, library_name FROM library_cache
         WHERE library_name IS NOT NULL AND library_name != 'claude-code'"
    ).unwrap();

    let known_libs: HashMap<String, String> = stmt.query_map([], |row| {
        Ok((row.get::<_, String>(0)?, row.get::<_, String>(1)?))
    }).unwrap().filter_map(|r| r.ok()).collect();

    println!("DAG Refined Analysis");
    println!("═══════════════════════════════════════════════════════════════\n");

    // Identify shared utilities: modules with >20 dependents
    let shared_threshold = 20;
    let mut shared_utils: Vec<(&String, usize)> = rdeps.iter()
        .filter(|(_, d)| d.len() > shared_threshold)
        .map(|(n, d)| (n, d.len()))
        .collect();
    shared_utils.sort_by(|a, b| b.1.cmp(&a.1));

    println!("Shared Utilities (>{} dependents) - likely NOT library-specific:\n", shared_threshold);
    for (name, count) in shared_utils.iter().take(30) {
        let lib = known_libs.get(*name).map(|s| s.as_str()).unwrap_or("?");
        println!("  {:>4} dependents: {:>10}  (labeled: {})", count, name, lib);
    }

    // For propagation, ONLY propagate to modules with few dependents
    // High-dependency modules are shared utilities
    println!("\n\n═══════════════════════════════════════════════════════════════");
    println!("Refined Library Propagation (excluding shared utilities)");
    println!("═══════════════════════════════════════════════════════════════\n");

    // Group known library modules by library
    let mut by_lib: HashMap<String, Vec<String>> = HashMap::new();
    for (name, lib) in &known_libs {
        by_lib.entry(lib.clone()).or_default().push(name.clone());
    }

    // For each library, find related modules through deps (forward only)
    // Only include modules that:
    // 1. Are dependencies of known library modules
    // 2. Have low fan-out (< 10 dependents)
    // 3. Aren't already identified as a different library

    let mut propagated: HashMap<String, (String, String)> = HashMap::new(); // name -> (library, reason)

    for (lib, seed_modules) in &by_lib {
        let mut lib_deps: HashSet<String> = HashSet::new();

        // Collect direct dependencies
        for seed in seed_modules {
            if let Some(d) = deps.get(seed) {
                for dep in d {
                    // Only include if low fan-out
                    let dep_count = rdeps.get(dep).map(|r| r.len()).unwrap_or(0);
                    if dep_count <= 15 && !known_libs.contains_key(dep) {
                        lib_deps.insert(dep.clone());
                    }
                }
            }
        }

        for dep in &lib_deps {
            if !propagated.contains_key(dep) {
                propagated.insert(dep.clone(), (lib.clone(), "direct dep".to_string()));
            }
        }
    }

    // Group propagated by library
    let mut prop_by_lib: HashMap<String, Vec<String>> = HashMap::new();
    for (name, (lib, _)) in &propagated {
        prop_by_lib.entry(lib.clone()).or_default().push(name.clone());
    }

    let mut sorted: Vec<_> = prop_by_lib.iter().collect();
    sorted.sort_by(|a, b| b.1.len().cmp(&a.1.len()));

    println!("Propagated identifications (low fan-out only):\n");
    for (lib, modules) in sorted.iter().take(15) {
        println!("  {} ({} new modules)", lib, modules.len());
        for m in modules.iter().take(5) {
            println!("    - {}", m);
        }
        if modules.len() > 5 {
            println!("    ... and {} more", modules.len() - 5);
        }
    }

    // Now classify shared utilities by analyzing WHO uses them
    println!("\n\n═══════════════════════════════════════════════════════════════");
    println!("Shared Utility Classification");
    println!("═══════════════════════════════════════════════════════════════\n");

    // For each shared utility, see which libraries use it
    for (name, dep_count) in shared_utils.iter().take(20) {
        if let Some(dependents) = rdeps.get(*name) {
            let mut lib_usage: HashMap<String, usize> = HashMap::new();
            let mut app_usage = 0;

            for dep in dependents {
                if let Some(lib) = known_libs.get(dep) {
                    *lib_usage.entry(lib.clone()).or_default() += 1;
                } else if let Some((lib, _)) = propagated.get(dep) {
                    *lib_usage.entry(lib.clone()).or_default() += 1;
                } else {
                    app_usage += 1;
                }
            }

            let mut sorted_libs: Vec<_> = lib_usage.iter().collect();
            sorted_libs.sort_by(|a, b| b.1.cmp(&a.1));

            let classification = if app_usage > *dep_count / 2 {
                "app-shared"
            } else if sorted_libs.len() > 3 {
                "multi-lib"
            } else if let Some((lib, count)) = sorted_libs.first() {
                if **count > *dep_count / 2 {
                    lib.as_str()
                } else {
                    "multi-lib"
                }
            } else {
                "unknown"
            };

            print!("  {:>10} ({} deps): {} ", name, dep_count, classification);
            if !sorted_libs.is_empty() {
                let top3: Vec<_> = sorted_libs.iter().take(3)
                    .map(|(l, c)| format!("{}:{}", l, c))
                    .collect();
                print!("[{}]", top3.join(", "));
            }
            if app_usage > 0 {
                print!(" app:{}", app_usage);
            }
            println!();
        }
    }

    // Summary of likely app-code aggregators (high deps, not in any library)
    println!("\n\n═══════════════════════════════════════════════════════════════");
    println!("Likely Application Code (high deps, not library)");
    println!("═══════════════════════════════════════════════════════════════\n");

    let mut dep_counts: Vec<_> = deps.iter()
        .filter(|(name, _)| !known_libs.contains_key(*name) && !propagated.contains_key(*name))
        .map(|(name, d)| (name, d.len()))
        .collect();
    dep_counts.sort_by(|a, b| b.1.cmp(&a.1));

    println!("Top application modules by dependency count:\n");
    for (name, count) in dep_counts.iter().take(25) {
        let rdep_count = rdeps.get(*name).map(|r| r.len()).unwrap_or(0);
        let category = if rdep_count > 50 {
            "shared-util"
        } else if rdep_count < 5 {
            "entry-point"
        } else {
            "internal"
        };
        println!("  {:>4} deps, {:>3} rdeps: {:>10}  [{}]", count, rdep_count, name, category);
    }
}
