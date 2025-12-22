use rusqlite::{params, Connection};
use std::collections::{HashMap, HashSet, VecDeque};
use std::fs;
use regex::Regex;

fn main() {
    let conn = Connection::open("test.db").unwrap();

    // Create edges table if not exists
    conn.execute(
        "CREATE TABLE IF NOT EXISTS module_edges (
            from_module TEXT NOT NULL,
            to_module TEXT NOT NULL,
            edge_type TEXT,
            PRIMARY KEY (from_module, to_module)
        )", []
    ).unwrap();

    conn.execute("DELETE FROM module_edges", []).unwrap();

    // Get all L modules
    let mut stmt = conn.prepare(
        "SELECT module_name FROM module_map WHERE module_type = 'L'"
    ).unwrap();

    let l_modules: Vec<String> = stmt.query_map([], |row| {
        row.get::<_, String>(0)
    }).unwrap().filter_map(|r| r.ok()).collect();

    // Get all U modules for validation
    let mut stmt = conn.prepare(
        "SELECT module_name FROM module_map WHERE module_type = 'U'"
    ).unwrap();

    let u_modules: HashSet<String> = stmt.query_map([], |row| {
        row.get::<_, String>(0)
    }).unwrap().filter_map(|r| r.ok()).collect();

    // Also collect L module names for cross-references
    let l_set: HashSet<String> = l_modules.iter().cloned().collect();

    println!("Building dependency graph from {} L modules...", l_modules.len());

    // Regex to find module references
    // L modules call other modules like: aB(); VW(); etc (function calls)
    // Or reference them like: var X = qA("module");
    let call_re = Regex::new(r"\b([a-zA-Z_$][a-zA-Z0-9_$]*)\(\)").unwrap();
    let var_re = Regex::new(r"\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*[,;=\)]").unwrap();

    let mut edges: Vec<(String, String)> = Vec::new();
    let mut edge_set: HashSet<(String, String)> = HashSet::new();

    for module in &l_modules {
        let path = format!("modules/L/{}.js", module);
        if let Ok(content) = fs::read_to_string(&path) {
            // Find all potential module calls
            for cap in call_re.captures_iter(&content) {
                let target = &cap[1];
                // Check if it's a valid module name
                if (u_modules.contains(target) || l_set.contains(target)) && target != module {
                    let edge = (module.clone(), target.to_string());
                    if !edge_set.contains(&edge) {
                        edge_set.insert(edge.clone());
                        edges.push(edge);
                    }
                }
            }
        }
    }

    println!("Found {} dependency edges", edges.len());

    // Save edges to database
    for (from, to) in &edges {
        conn.execute(
            "INSERT OR IGNORE INTO module_edges (from_module, to_module, edge_type) VALUES (?1, ?2, 'call')",
            params![from, to]
        ).unwrap();
    }

    // Build adjacency lists
    let mut deps: HashMap<String, Vec<String>> = HashMap::new();
    let mut rdeps: HashMap<String, Vec<String>> = HashMap::new();

    for (from, to) in &edges {
        deps.entry(from.clone()).or_default().push(to.clone());
        rdeps.entry(to.clone()).or_default().push(from.clone());
    }

    // Get identified libraries
    let mut stmt = conn.prepare(
        "SELECT minified_name, library_name FROM library_cache WHERE library_name IS NOT NULL"
    ).unwrap();

    let mut known_libs: HashMap<String, String> = HashMap::new();
    stmt.query_map([], |row| {
        Ok((row.get::<_, String>(0)?, row.get::<_, String>(1)?))
    }).unwrap().filter_map(|r| r.ok()).for_each(|(name, lib)| {
        known_libs.insert(name, lib);
    });

    println!("\nStarting with {} identified modules", known_libs.len());

    // Propagate library identification through dependencies
    // If A depends on B and B is identified as library X, A might also be library X
    let mut propagated: HashMap<String, (String, f64)> = HashMap::new();
    let mut queue: VecDeque<String> = VecDeque::new();

    // Initialize with known libraries
    for (name, lib) in &known_libs {
        if lib != "claude-code" {  // Don't propagate app code
            propagated.insert(name.clone(), (lib.clone(), 1.0));
            queue.push_back(name.clone());
        }
    }

    // BFS propagation through reverse dependencies
    // If B is a library and A calls B (A depends on B), A might be same library
    let mut iterations = 0;
    while let Some(module) = queue.pop_front() {
        iterations += 1;
        if iterations > 100000 { break; }  // Safety limit

        let (lib, conf) = propagated.get(&module).unwrap().clone();
        let new_conf = conf * 0.7;  // Decay confidence

        if new_conf < 0.3 { continue; }  // Stop at low confidence

        // Check reverse deps (modules that depend on this one)
        if let Some(dependents) = rdeps.get(&module) {
            for dep in dependents {
                if known_libs.contains_key(dep) { continue; }  // Skip already known
                if let Some((existing_lib, existing_conf)) = propagated.get(dep) {
                    if *existing_conf >= new_conf { continue; }  // Skip if better match exists
                    if existing_lib != &lib { continue; }  // Skip if different library
                }
                propagated.insert(dep.clone(), (lib.clone(), new_conf));
                queue.push_back(dep.clone());
            }
        }

        // Also check forward deps (modules this one depends on)
        if let Some(dependencies) = deps.get(&module) {
            for dep in dependencies {
                if known_libs.contains_key(dep) { continue; }
                if let Some((existing_lib, existing_conf)) = propagated.get(dep) {
                    if *existing_conf >= new_conf { continue; }
                    if existing_lib != &lib { continue; }
                }
                propagated.insert(dep.clone(), (lib.clone(), new_conf));
                queue.push_back(dep.clone());
            }
        }
    }

    // Filter out claude-code from propagation results
    let new_identifications: Vec<_> = propagated.iter()
        .filter(|(name, _)| !known_libs.contains_key(*name))
        .filter(|(_, (lib, _))| lib != "claude-code")
        .collect();

    println!("\nPropagated {} new library identifications:", new_identifications.len());

    // Group by library
    let mut by_lib: HashMap<String, Vec<(&String, f64)>> = HashMap::new();
    for (name, (lib, conf)) in &new_identifications {
        by_lib.entry(lib.clone()).or_default().push((name, *conf));
    }

    let mut sorted_libs: Vec<_> = by_lib.iter().collect();
    sorted_libs.sort_by(|a, b| b.1.len().cmp(&a.1.len()));

    for (lib, modules) in sorted_libs.iter().take(20) {
        println!("\n  {} ({} modules):", lib, modules.len());
        let mut sorted_mods: Vec<_> = modules.iter().cloned().collect();
        sorted_mods.sort_by(|a, b| b.1.partial_cmp(&a.1).unwrap());
        for (name, conf) in sorted_mods.iter().take(8) {
            println!("    {:.0}%: {}", conf * 100.0, name);
        }
        if sorted_mods.len() > 8 {
            println!("    ... and {} more", sorted_mods.len() - 8);
        }
    }

    // Analyze dependency clusters
    println!("\n\n═══════════════════════════════════════════════════════════════");
    println!("Dependency Analysis");
    println!("═══════════════════════════════════════════════════════════════\n");

    // Find modules with most dependencies (likely aggregators/entry points)
    let mut dep_counts: Vec<_> = deps.iter()
        .map(|(name, d)| (name, d.len()))
        .collect();
    dep_counts.sort_by(|a, b| b.1.cmp(&a.1));

    println!("Top 15 modules by dependency count (aggregators):");
    for (name, count) in dep_counts.iter().take(15) {
        let lib = known_libs.get(*name)
            .or_else(|| propagated.get(*name).map(|(l, _)| l))
            .map(|s| s.as_str())
            .unwrap_or("-");
        println!("  {:>4} deps: {:>10}  {}", count, name, lib);
    }

    // Find modules depended on by most others (core utilities)
    let mut rdep_counts: Vec<_> = rdeps.iter()
        .map(|(name, d)| (name, d.len()))
        .collect();
    rdep_counts.sort_by(|a, b| b.1.cmp(&a.1));

    println!("\nTop 15 most depended-on modules (core utilities):");
    for (name, count) in rdep_counts.iter().take(15) {
        let lib = known_libs.get(*name)
            .or_else(|| propagated.get(*name).map(|(l, _)| l))
            .map(|s| s.as_str())
            .unwrap_or("-");
        println!("  {:>4} dependents: {:>10}  {}", count, name, lib);
    }

    // Find isolated modules (no deps, not depended on)
    let all_in_graph: HashSet<&String> = deps.keys().chain(rdeps.keys()).collect();
    let all_modules: HashSet<&String> = l_set.iter().chain(u_modules.iter()).collect();
    let in_graph_set: HashSet<&String> = all_in_graph.iter().cloned().collect();
    let isolated: Vec<_> = all_modules.difference(&in_graph_set).collect();

    println!("\nIsolated modules (not in dependency graph): {}", isolated.len());
}
