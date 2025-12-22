use rusqlite::Connection;
use std::collections::{HashMap, HashSet};

fn main() {
    let conn = Connection::open("test.db").expect("Failed to open database");

    println!("Module Dependency Analysis: L() vs U()");
    println!("═══════════════════════════════════════════════════════════════\n");

    // First, let's find all symbols and categorize them
    // We need to look at the call patterns to identify L-wrapped vs U-wrapped modules

    // Find symbols that are called (these would be the module variables like tF1, dG, etc)
    println!("Finding module-like symbols (called as functions)...\n");

    let mut stmt = conn.prepare(
        "SELECT DISTINCT callee.name
         FROM calls c
         JOIN symbols callee ON c.callee_id = callee.id
         WHERE callee.kind = 'function'
           AND LENGTH(callee.name) BETWEEN 2 AND 6
         ORDER BY callee.name"
    ).unwrap();

    let module_candidates: Vec<String> = stmt.query_map([], |row| {
        row.get::<_, String>(0)
    }).unwrap().filter_map(|r| r.ok()).collect();

    println!("Found {} potential module symbols\n", module_candidates.len());

    // Now find the call graph between these modules
    println!("Module dependency graph (who calls whom):");
    println!("───────────────────────────────────────");

    // Get all calls between short-named functions (likely modules)
    let mut stmt = conn.prepare(
        "SELECT caller.name, callee.name, COUNT(*) as cnt
         FROM calls c
         JOIN symbols caller ON c.caller_id = caller.id
         JOIN symbols callee ON c.callee_id = callee.id
         WHERE caller.kind = 'function'
           AND callee.kind = 'function'
           AND LENGTH(caller.name) BETWEEN 2 AND 6
           AND LENGTH(callee.name) BETWEEN 2 AND 6
           AND caller.name != callee.name
         GROUP BY caller.name, callee.name
         ORDER BY cnt DESC
         LIMIT 50"
    ).unwrap();

    let rows = stmt.query_map([], |row| {
        Ok((row.get::<_, String>(0)?, row.get::<_, String>(1)?, row.get::<_, i64>(2)?))
    }).unwrap();

    for row in rows {
        if let Ok((caller, callee, cnt)) = row {
            println!("  {} -> {} ({}x)", caller, callee, cnt);
        }
    }

    // Find which modules use the runtime helpers
    println!("\n\nModules using l() (ES interop):");
    println!("───────────────────────────────────────");

    let mut stmt = conn.prepare(
        "SELECT caller.name, COUNT(*) as cnt
         FROM calls c
         JOIN symbols caller ON c.caller_id = caller.id
         JOIN symbols callee ON c.callee_id = callee.id
         WHERE callee.name = 'l'
           AND LENGTH(caller.name) BETWEEN 2 AND 6
         GROUP BY caller.name
         ORDER BY cnt DESC
         LIMIT 20"
    ).unwrap();

    let rows = stmt.query_map([], |row| {
        Ok((row.get::<_, String>(0)?, row.get::<_, i64>(1)?))
    }).unwrap();

    for row in rows {
        if let Ok((name, cnt)) = row {
            println!("  {} uses l() {}x", name, cnt);
        }
    }

    // Analyze strings to identify module purposes
    println!("\n\nModule identification by strings:");
    println!("───────────────────────────────────────");

    let mut stmt = conn.prepare(
        "SELECT sym.name, GROUP_CONCAT(DISTINCT s.value) as strings
         FROM strings s
         JOIN symbols sym ON s.symbol_id = sym.id
         WHERE sym.kind = 'function'
           AND LENGTH(sym.name) BETWEEN 2 AND 6
           AND LENGTH(s.value) > 5
           AND LENGTH(s.value) < 30
         GROUP BY sym.name
         HAVING COUNT(DISTINCT s.value) BETWEEN 1 AND 5
         LIMIT 30"
    ).unwrap();

    let rows = stmt.query_map([], |row| {
        Ok((row.get::<_, String>(0)?, row.get::<_, String>(1)?))
    }).unwrap();

    for row in rows {
        if let Ok((name, strings)) = row {
            let display = if strings.len() > 60 {
                format!("{}...", &strings[..60])
            } else {
                strings
            };
            println!("  {}: {}", name, display);
        }
    }

    // Find "__esModule" pattern to identify CommonJS modules
    println!("\n\nCommonJS modules (use __esModule):");
    println!("───────────────────────────────────────");

    let mut stmt = conn.prepare(
        "SELECT DISTINCT sym.name
         FROM symbols sym
         WHERE sym.kind = 'function'
           AND LENGTH(sym.name) BETWEEN 2 AND 6
           AND EXISTS (
               SELECT 1 FROM strings s
               WHERE s.symbol_id = sym.id
               AND s.value LIKE '%esModule%'
           )
         LIMIT 30"
    ).unwrap();

    let cjs_modules: Vec<String> = stmt.query_map([], |row| {
        row.get::<_, String>(0)
    }).unwrap().filter_map(|r| r.ok()).collect();

    println!("  Found {} CommonJS-style modules", cjs_modules.len());
    for m in cjs_modules.iter().take(20) {
        println!("    {}", m);
    }

    // Cross-reference: which L modules call which U modules
    println!("\n\nDependency chains (L -> U relationships):");
    println!("───────────────────────────────────────");

    // We need to find patterns where:
    // 1. A symbol defined with L() signature ():0 or (i,i):2
    // 2. Calls a symbol defined with U() that has __esModule

    let mut stmt = conn.prepare(
        "SELECT caller.name as l_module, callee.name as u_module
         FROM calls c
         JOIN symbols caller ON c.caller_id = caller.id
         JOIN symbols callee ON c.callee_id = callee.id
         WHERE LENGTH(caller.name) BETWEEN 2 AND 6
           AND LENGTH(callee.name) BETWEEN 2 AND 6
           AND EXISTS (
               SELECT 1 FROM strings s
               WHERE s.symbol_id = callee.id
               AND s.value LIKE '%esModule%'
           )
         ORDER BY caller.name
         LIMIT 40"
    ).unwrap();

    let mut deps: HashMap<String, Vec<String>> = HashMap::new();
    let rows = stmt.query_map([], |row| {
        Ok((row.get::<_, String>(0)?, row.get::<_, String>(1)?))
    }).unwrap();

    for row in rows {
        if let Ok((l_mod, u_mod)) = row {
            deps.entry(l_mod).or_default().push(u_mod);
        }
    }

    for (l_mod, u_mods) in deps.iter().take(20) {
        let unique: HashSet<_> = u_mods.iter().collect();
        let mods: Vec<_> = unique.iter().take(5).map(|s| s.as_str()).collect();
        println!("  {} -> [{}]", l_mod, mods.join(", "));
    }
}
