use rusqlite::Connection;
use std::collections::{HashMap, HashSet, VecDeque};

fn main() {
    let conn = Connection::open("test.db").unwrap();

    // Get edges
    let mut stmt = conn.prepare("SELECT from_module, to_module FROM module_edges").unwrap();
    let edges: Vec<(String, String)> = stmt.query_map([], |row| {
        Ok((row.get::<_, String>(0)?, row.get::<_, String>(1)?))
    }).unwrap().filter_map(|r| r.ok()).collect();

    // Build adjacency lists
    let mut deps: HashMap<String, HashSet<String>> = HashMap::new();  // module -> what it depends on
    let mut rdeps: HashMap<String, HashSet<String>> = HashMap::new(); // module -> what depends on it

    for (from, to) in &edges {
        deps.entry(from.clone()).or_default().insert(to.clone());
        rdeps.entry(to.clone()).or_default().insert(from.clone());
    }

    // Get known SDK libraries (excluding claude-code)
    let mut stmt = conn.prepare(
        "SELECT minified_name, library_name FROM library_cache
         WHERE library_name IS NOT NULL AND library_name != 'claude-code'"
    ).unwrap();

    let known_libs: HashMap<String, String> = stmt.query_map([], |row| {
        Ok((row.get::<_, String>(0)?, row.get::<_, String>(1)?))
    }).unwrap().filter_map(|r| r.ok()).collect();

    let known_set: HashSet<String> = known_libs.keys().cloned().collect();

    println!("Backward DAG Propagation");
    println!("═══════════════════════════════════════════════════════════════");
    println!("\nLogic: If a known library module depends on X, then X is also a library module.\n");

    // Collect all dependencies of known library modules
    let mut lib_deps: HashSet<String> = HashSet::new();
    let mut lib_dep_sources: HashMap<String, HashSet<String>> = HashMap::new(); // dep -> which libs use it

    for (module, lib) in &known_libs {
        if let Some(module_deps) = deps.get(module) {
            for dep in module_deps {
                lib_deps.insert(dep.clone());
                lib_dep_sources.entry(dep.clone()).or_default().insert(lib.clone());
            }
        }
    }

    // Now recursively: dependencies of lib_deps are also lib modules
    let mut all_lib_modules: HashSet<String> = known_set.clone();
    let mut queue: VecDeque<String> = lib_deps.iter().cloned().collect();
    let mut new_libs: HashMap<String, HashSet<String>> = HashMap::new(); // module -> libraries that lead to it

    for dep in &lib_deps {
        new_libs.insert(dep.clone(), lib_dep_sources.get(dep).cloned().unwrap_or_default());
    }

    while let Some(module) = queue.pop_front() {
        if all_lib_modules.contains(&module) {
            continue;
        }
        all_lib_modules.insert(module.clone());

        // This module's dependencies are also lib modules
        if let Some(module_deps) = deps.get(&module) {
            for dep in module_deps {
                if !all_lib_modules.contains(dep) && !new_libs.contains_key(dep) {
                    // Inherit library associations
                    let parent_libs = new_libs.get(&module).cloned().unwrap_or_default();
                    new_libs.insert(dep.clone(), parent_libs);
                    queue.push_back(dep.clone());
                }
            }
        }
    }

    // Remove already known modules
    for known in known_libs.keys() {
        new_libs.remove(known);
    }

    println!("Starting from {} known SDK modules", known_libs.len());
    println!("Found {} new library modules through backward propagation\n", new_libs.len());

    // Group by inferred library
    let mut by_lib: HashMap<String, Vec<String>> = HashMap::new();
    let mut multi_lib: Vec<(String, HashSet<String>)> = Vec::new();

    for (module, libs) in &new_libs {
        if libs.len() == 1 {
            let lib = libs.iter().next().unwrap();
            by_lib.entry(lib.clone()).or_default().push(module.clone());
        } else if libs.len() > 1 {
            multi_lib.push((module.clone(), libs.clone()));
        } else {
            by_lib.entry("(inherited)".to_string()).or_default().push(module.clone());
        }
    }

    // Sort by count
    let mut sorted: Vec<_> = by_lib.iter().collect();
    sorted.sort_by(|a, b| b.1.len().cmp(&a.1.len()));

    println!("New library modules by inferred library:\n");
    for (lib, modules) in sorted.iter().take(20) {
        println!("  {} ({} modules)", lib, modules.len());
        for m in modules.iter().take(8) {
            let rdep_count = rdeps.get(m).map(|r| r.len()).unwrap_or(0);
            println!("    {} ({} dependents)", m, rdep_count);
        }
        if modules.len() > 8 {
            println!("    ... and {} more", modules.len() - 8);
        }
        println!();
    }

    if !multi_lib.is_empty() {
        println!("\nModules used by multiple libraries ({}):", multi_lib.len());
        for (module, libs) in multi_lib.iter().take(15) {
            let rdep_count = rdeps.get(module).map(|r| r.len()).unwrap_or(0);
            let lib_list: Vec<_> = libs.iter().take(4).cloned().collect();
            println!("  {} ({} deps): {}", module, rdep_count, lib_list.join(", "));
        }
    }

    // Now verify: check if any "app" modules depend on these lib modules
    // If so, they're shared between app and libs
    println!("\n\n═══════════════════════════════════════════════════════════════");
    println!("Verification: Which lib modules are also used by app code?");
    println!("═══════════════════════════════════════════════════════════════\n");

    let mut app_also_uses: Vec<(String, usize, usize)> = Vec::new(); // (module, lib_users, app_users)

    for module in all_lib_modules.iter() {
        if let Some(users) = rdeps.get(module) {
            let lib_users = users.iter().filter(|u| all_lib_modules.contains(*u)).count();
            let app_users = users.len() - lib_users;
            if app_users > 0 && lib_users > 0 {
                app_also_uses.push((module.clone(), lib_users, app_users));
            }
        }
    }

    app_also_uses.sort_by(|a, b| b.2.cmp(&a.2));

    println!("Modules used by BOTH libraries and app code:\n");
    println!("{:<12} {:>8} {:>8}  Classification", "Module", "LibUsers", "AppUsers");
    println!("{}", "─".repeat(50));

    for (module, lib_users, app_users) in app_also_uses.iter().take(30) {
        let classification = if *app_users > *lib_users * 2 {
            "app-primary"
        } else if *lib_users > *app_users * 2 {
            "lib-primary"
        } else {
            "shared"
        };
        println!("{:<12} {:>8} {:>8}  {}", module, lib_users, app_users, classification);
    }

    // Final summary
    println!("\n\n═══════════════════════════════════════════════════════════════");
    println!("Summary");
    println!("═══════════════════════════════════════════════════════════════\n");

    let pure_lib = all_lib_modules.iter()
        .filter(|m| {
            rdeps.get(*m).map(|users| {
                users.iter().all(|u| all_lib_modules.contains(u))
            }).unwrap_or(true)
        })
        .count();

    println!("Known SDK modules:        {:>5}", known_libs.len());
    println!("New lib modules (total):  {:>5}", new_libs.len());
    println!("Pure lib (no app users):  {:>5}", pure_lib);
    println!("Shared (lib + app users): {:>5}", app_also_uses.len());
}
