use rusqlite::Connection;
use serde::{Deserialize, Serialize};
use std::collections::{HashMap, HashSet};
use std::fs;
use std::path::Path;

#[derive(Debug, Serialize)]
struct ModuleMapping {
    minified: String,
    folder: String,
    filename: String,
    category: Option<String>,
    original_name: Option<String>,
    library: Option<String>,
    confidence: f64,
}

// Claude Code app module categories extracted from identifications
fn get_claude_code_categories() -> HashMap<&'static str, (&'static str, &'static str)> {
    let mut categories = HashMap::new();

    // API Client
    categories.insert("qr", ("api", "query"));
    categories.insert("UE9", ("api", "messages"));
    categories.insert("ME9", ("api", "message_creation"));
    categories.insert("sv", ("api", "response"));
    categories.insert("eA9", ("api", "client_config"));

    // OAuth
    categories.insert("BJ", ("auth", "oauth_config"));
    categories.insert("D39", ("auth", "tokens"));

    // Permissions
    categories.insert("Go", ("permissions", "rules"));
    categories.insert("C5A", ("permissions", "sandbox"));
    categories.insert("E_0", ("permissions", "prompt"));
    categories.insert("_FA", ("permissions", "mode"));

    // Tools
    categories.insert("AV9", ("tools", "registry"));
    categories.insert("hq0", ("tools", "execution"));
    categories.insert("dH", ("tools", "bash"));
    categories.insert("FX9", ("tools", "edit"));
    categories.insert("lH", ("tools", "read"));
    categories.insert("EA9", ("tools", "glob"));
    categories.insert("zm", ("tools", "grep"));
    categories.insert("IPA", ("tools", "write"));

    // MCP
    categories.insert("RI9", ("mcp", "client"));
    categories.insert("LM0", ("mcp", "server_manager"));
    categories.insert("z4", ("mcp", "cli"));

    // Settings
    categories.insert("UI9", ("config", "settings"));
    categories.insert("y21", ("config", "loader"));
    categories.insert("_BA", ("config", "project"));
    categories.insert("zJ1", ("config", "claude_md"));

    // Hooks
    categories.insert("aD1", ("hooks", "execution"));
    categories.insert("TTA", ("hooks", "registry"));
    categories.insert("pJ9", ("hooks", "pre_tool"));
    categories.insert("nz2", ("hooks", "post_tool"));

    // Agents
    categories.insert("Ke2", ("agents", "spawn"));
    categories.insert("He2", ("agents", "communication"));
    categories.insert("fI9", ("agents", "background"));
    categories.insert("DI9", ("agents", "tasks"));

    // Terminal UI
    categories.insert("tN0", ("ui", "terminal"));
    categories.insert("ee2", ("ui", "layout"));
    categories.insert("GJ9", ("ui", "text"));

    // Streaming
    categories.insert("YQB", ("streaming", "events"));
    categories.insert("YGB", ("streaming", "content"));

    // Git
    categories.insert("xw", ("git", "commands"));
    categories.insert("EL", ("git", "diff"));
    categories.insert("LA9", ("git", "commit"));

    // Commands
    categories.insert("nc0", ("commands", "registry"));
    categories.insert("kK1", ("commands", "execution"));
    categories.insert("zF1", ("commands", "help"));

    // Cost
    categories.insert("j69", ("cost", "calculator"));
    categories.insert("DL0", ("cost", "usage"));

    categories
}

fn main() {
    let conn = Connection::open("test.db").expect("Failed to open database");

    // Create output directories
    let app_dir = Path::new("app_modules");
    let unidentified_dir = app_dir.join("_unidentified");

    if app_dir.exists() {
        fs::remove_dir_all(app_dir).ok();
    }
    fs::create_dir_all(&unidentified_dir).unwrap();

    // Get Claude Code categories
    let cc_categories = get_claude_code_categories();

    // Create category directories
    let categories: HashSet<&str> = cc_categories.values().map(|(cat, _)| *cat).collect();
    for cat in &categories {
        fs::create_dir_all(app_dir.join(cat)).unwrap();
    }

    // Load all modules
    let mut stmt = conn.prepare(
        "SELECT module_name, module_type FROM module_map"
    ).unwrap();

    let modules: Vec<(String, String)> = stmt.query_map([], |row| {
        Ok((row.get::<_, String>(0)?, row.get::<_, String>(1)?))
    }).unwrap().filter_map(|r| r.ok()).collect();

    println!("Total modules: {}", modules.len());

    // Load library identifications
    let mut lib_modules: HashSet<String> = HashSet::new();

    // From library_cache
    let mut stmt = conn.prepare(
        "SELECT minified_name, library_name FROM library_cache WHERE library_name IS NOT NULL"
    ).unwrap_or_else(|_| conn.prepare("SELECT '', ''").unwrap());

    if let Ok(rows) = stmt.query_map([], |row| {
        Ok((row.get::<_, String>(0)?, row.get::<_, String>(1)?))
    }) {
        for row in rows.flatten() {
            if row.1 != "claude-code" {
                lib_modules.insert(row.0);
            }
        }
    }

    // From module_identifications
    let mut stmt = conn.prepare(
        "SELECT module_name, library FROM module_identifications WHERE library IS NOT NULL"
    ).unwrap_or_else(|_| conn.prepare("SELECT '', ''").unwrap());

    if let Ok(rows) = stmt.query_map([], |row| {
        Ok((row.get::<_, String>(0)?, row.get::<_, String>(1)?))
    }) {
        for row in rows.flatten() {
            if row.1 != "claude-code" {
                lib_modules.insert(row.0);
            }
        }
    }

    // Load signature matches
    let matches_path = "lib_signatures/matches.json";
    if Path::new(matches_path).exists() {
        if let Ok(content) = fs::read_to_string(matches_path) {
            if let Ok(matches) = serde_json::from_str::<Vec<serde_json::Value>>(&content) {
                for m in matches {
                    if let Some(module) = m["module"].as_str() {
                        lib_modules.insert(module.to_string());
                    }
                }
            }
        }
    }

    // Load name mappings for original names
    let mut name_mappings: HashMap<String, (String, String)> = HashMap::new(); // minified -> (original, library)
    let mappings_path = "lib_signatures/name_mappings.json";
    if Path::new(mappings_path).exists() {
        if let Ok(content) = fs::read_to_string(mappings_path) {
            #[derive(Deserialize)]
            struct NameMapping {
                minified: String,
                original: String,
                library: String,
            }
            if let Ok(mappings) = serde_json::from_str::<Vec<NameMapping>>(&content) {
                for m in mappings {
                    name_mappings.insert(m.minified.clone(), (m.original, m.library));
                }
            }
        }
    }

    // Load backward DAG propagated modules
    let dag_path = "lib_signatures/dag_propagated.json";
    if Path::new(dag_path).exists() {
        if let Ok(content) = fs::read_to_string(dag_path) {
            if let Ok(modules) = serde_json::from_str::<Vec<String>>(&content) {
                for m in modules {
                    lib_modules.insert(m);
                }
            }
        }
    }

    // Remove Claude Code modules from lib_modules - they are app, not library
    let cc_keys: HashSet<&str> = cc_categories.keys().cloned().collect();
    for key in &cc_keys {
        lib_modules.remove(*key);
    }

    println!("Known library modules: {}", lib_modules.len());

    // Process modules
    let mut mappings: Vec<ModuleMapping> = Vec::new();
    let mut app_count = 0;
    let mut identified_count = 0;

    for (module_name, module_type) in &modules {
        let src_path = format!("modules/{}/{}.js", module_type, module_name);

        // Skip if definitely a library module
        if lib_modules.contains(module_name) {
            continue;
        }

        // Skip arrow functions (typically library internals)
        if module_name.starts_with("arrow_") {
            continue;
        }

        // Check if it's an identified Claude Code module
        if let Some((category, filename)) = cc_categories.get(module_name.as_str()) {
            // Copy to category folder
            let dest_dir = app_dir.join(category);
            let dest_path = dest_dir.join(format!("{}.js", filename));

            if let Ok(content) = fs::read_to_string(&src_path) {
                fs::write(&dest_path, &content).ok();

                mappings.push(ModuleMapping {
                    minified: module_name.clone(),
                    folder: format!("app_modules/{}", category),
                    filename: format!("{}.js", filename),
                    category: Some(category.to_string()),
                    original_name: Some(filename.to_string()),
                    library: Some("claude-code".to_string()),
                    confidence: 0.99,
                });

                identified_count += 1;
            }
        } else {
            // Potential app module - copy to unidentified
            if let Ok(content) = fs::read_to_string(&src_path) {
                // Skip very small modules (likely just re-exports)
                if content.len() < 100 {
                    continue;
                }

                let dest_path = unidentified_dir.join(format!("{}.js", module_name));
                fs::write(&dest_path, &content).ok();

                // Check if we have a name mapping
                let (original_name, library) = name_mappings
                    .get(module_name)
                    .map(|(o, l)| (Some(o.clone()), Some(l.clone())))
                    .unwrap_or((None, None));

                mappings.push(ModuleMapping {
                    minified: module_name.clone(),
                    folder: "app_modules/_unidentified".to_string(),
                    filename: format!("{}.js", module_name),
                    category: None,
                    original_name,
                    library,
                    confidence: 0.0,
                });

                app_count += 1;
            }
        }
    }

    println!("\nOrganized modules:");
    println!("  Identified Claude Code: {}", identified_count);
    println!("  Unidentified (potential app): {}", app_count);

    // Sort mappings by category then filename
    mappings.sort_by(|a, b| {
        match (&a.category, &b.category) {
            (Some(ca), Some(cb)) => ca.cmp(cb).then(a.filename.cmp(&b.filename)),
            (Some(_), None) => std::cmp::Ordering::Less,
            (None, Some(_)) => std::cmp::Ordering::Greater,
            (None, None) => a.minified.cmp(&b.minified),
        }
    });

    // Save mapping file
    let mapping_path = app_dir.join("MODULE_MAPPING.json");
    fs::write(&mapping_path, serde_json::to_string_pretty(&mappings).unwrap()).unwrap();

    // Also create a markdown summary
    let mut md = String::new();
    md.push_str("# App Module Mapping\n\n");
    md.push_str("Mapping from minified identifiers to organized folders/filenames.\n\n");

    md.push_str("## Identified Modules\n\n");
    md.push_str("| Minified | Category | Filename | Original Name |\n");
    md.push_str("|----------|----------|----------|---------------|\n");

    for m in mappings.iter().filter(|m| m.category.is_some()) {
        md.push_str(&format!(
            "| `{}` | {} | {} | {} |\n",
            m.minified,
            m.category.as_ref().unwrap(),
            m.filename,
            m.original_name.as_ref().unwrap_or(&"-".to_string())
        ));
    }

    md.push_str("\n## Unidentified Modules\n\n");
    md.push_str(&format!("{} modules in `app_modules/_unidentified/`\n\n", app_count));

    // Group unidentified by first character for easier browsing
    let mut by_prefix: HashMap<char, Vec<&ModuleMapping>> = HashMap::new();
    for m in mappings.iter().filter(|m| m.category.is_none()) {
        let prefix = m.minified.chars().next().unwrap_or('_');
        by_prefix.entry(prefix).or_default().push(m);
    }

    let mut prefixes: Vec<_> = by_prefix.keys().collect();
    prefixes.sort();

    for prefix in prefixes {
        let mods = &by_prefix[prefix];
        md.push_str(&format!("### {} ({} modules)\n\n", prefix, mods.len()));
        for m in mods.iter().take(10) {
            let orig = m.original_name.as_ref().map(|n| format!(" → {}", n)).unwrap_or_default();
            md.push_str(&format!("- `{}`{}\n", m.minified, orig));
        }
        if mods.len() > 10 {
            md.push_str(&format!("- ... and {} more\n", mods.len() - 10));
        }
        md.push_str("\n");
    }

    let md_path = app_dir.join("MODULE_MAPPING.md");
    fs::write(&md_path, &md).unwrap();

    println!("\nSaved:");
    println!("  {}", mapping_path.display());
    println!("  {}", md_path.display());

    // Print category summary
    println!("\n═══════════════════════════════════════════════════════════════");
    println!("Category Summary");
    println!("═══════════════════════════════════════════════════════════════\n");

    let mut cat_counts: HashMap<String, usize> = HashMap::new();
    for m in &mappings {
        if let Some(cat) = &m.category {
            *cat_counts.entry(cat.clone()).or_default() += 1;
        }
    }

    let mut cats: Vec<_> = cat_counts.iter().collect();
    cats.sort_by(|a, b| b.1.cmp(a.1));

    for (cat, count) in cats {
        println!("  {:<15} {} modules", cat, count);
    }
    println!("  {:<15} {} modules", "_unidentified", app_count);
}
