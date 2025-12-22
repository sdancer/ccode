use std::collections::{HashMap, HashSet};
use std::fs;
use regex::Regex;

fn main() {
    let l_dir = "modules/L";

    // Extract dependencies from each L module
    let mut deps: HashMap<String, Vec<String>> = HashMap::new();
    let mut reverse_deps: HashMap<String, Vec<String>> = HashMap::new();

    // Regex to match: var NAME = L(() => { followed by function calls
    let module_re = Regex::new(r"var\s+(\w+)\s*=\s*L\(\(\)\s*=>\s*\{").unwrap();
    let call_re = Regex::new(r"^\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\(\);").unwrap();

    for entry in fs::read_dir(l_dir).unwrap() {
        let entry = entry.unwrap();
        let path = entry.path();
        if path.extension().map(|e| e == "js").unwrap_or(false) {
            let name = path.file_stem().unwrap().to_str().unwrap().to_string();
            let content = fs::read_to_string(&path).unwrap_or_default();

            // Find the L(() => { block and extract calls
            let mut in_block = false;
            let mut module_deps = Vec::new();

            for line in content.lines() {
                if module_re.is_match(line) {
                    in_block = true;
                    continue;
                }
                if in_block {
                    if line.contains("});") || line.contains("})") && !line.contains("(") {
                        break;
                    }
                    if let Some(cap) = call_re.captures(line) {
                        let dep = cap[1].to_string();
                        module_deps.push(dep.clone());
                        reverse_deps.entry(dep).or_default().push(name.clone());
                    }
                }
            }

            if !module_deps.is_empty() {
                deps.insert(name, module_deps);
            }
        }
    }

    println!("L Module Dependency Analysis");
    println!("═══════════════════════════════════════════════════════════════\n");
    println!("Total L modules with dependencies: {}\n", deps.len());

    // Find root modules (high in-degree, low out-degree)
    println!("Most depended-on modules (core utilities):");
    let mut dep_counts: Vec<_> = reverse_deps.iter()
        .map(|(k, v)| (k.clone(), v.len()))
        .collect();
    dep_counts.sort_by(|a, b| b.1.cmp(&a.1));

    for (name, count) in dep_counts.iter().take(20) {
        // Check if this module exists and get a hint about what it does
        let path = format!("{}/{}.js", l_dir, name);
        let hint = if let Ok(content) = fs::read_to_string(&path) {
            // Look for identifying strings
            if content.contains("You are") {
                "system prompt"
            } else if content.contains("Executes") || content.contains("Reads a file") || content.contains("Writes") {
                "tool description"
            } else if content.contains("agentType") {
                "agent definition"
            } else if content.contains("export") || content.contains("module.exports") {
                "utility"
            } else {
                ""
            }
        } else {
            "not found"
        };
        println!("  {:>4} deps <- {:<10} {}", count, name, hint);
    }

    println!("\n\nModules with most dependencies (entry points):");
    let mut out_counts: Vec<_> = deps.iter()
        .map(|(k, v)| (k.clone(), v.len()))
        .collect();
    out_counts.sort_by(|a, b| b.1.cmp(&a.1));

    for (name, count) in out_counts.iter().take(15) {
        // Get first few deps
        let first_deps: Vec<_> = deps.get(name).unwrap().iter().take(5).cloned().collect();
        println!("  {:>4} deps -> {:<10} [{}...]", count, name, first_deps.join(", "));
    }

    // Identify tool modules
    println!("\n\nIdentified Tool Modules:");
    let tools = ["lH", "zm", "IPA", "Kr", "AL", "MK", "OT", "gVA", "KPA"];
    for tool in &tools {
        let path = format!("{}/{}.js", l_dir, tool);
        if let Ok(content) = fs::read_to_string(&path) {
            let desc = content.lines()
                .find(|l| l.contains("description") || l.contains("Reads") || l.contains("Writes") || l.contains("Executes"))
                .map(|l| l.chars().take(60).collect::<String>())
                .unwrap_or_default();
            let dep_count = reverse_deps.get(*tool).map(|v| v.len()).unwrap_or(0);
            println!("  {} ({} dependents): {}", tool, dep_count, desc);
        }
    }

    // Identify prompt modules
    println!("\n\nPrompt-containing Modules:");
    for entry in fs::read_dir(l_dir).unwrap() {
        let entry = entry.unwrap();
        let path = entry.path();
        if path.extension().map(|e| e == "js").unwrap_or(false) {
            if let Ok(content) = fs::read_to_string(&path) {
                if content.contains("You are") && content.len() > 500 {
                    let name = path.file_stem().unwrap().to_str().unwrap();
                    let prompt_start = content.find("You are").unwrap();
                    let snippet: String = content[prompt_start..].chars().take(60).collect();
                    let dep_count = reverse_deps.get(name).map(|v| v.len()).unwrap_or(0);
                    println!("  {} ({} dependents): {}...", name, dep_count, snippet);
                }
            }
        }
    }

    // Build categorization based on deps
    println!("\n\nModule Categories (by dependency patterns):");

    let mut categories: HashMap<&str, Vec<String>> = HashMap::new();

    for (name, module_deps) in &deps {
        // Categorize based on what it depends on
        if module_deps.iter().any(|d| d == "MK" || d == "OT" || d == "lH") {
            categories.entry("uses-file-tools").or_default().push(name.clone());
        }
        if module_deps.iter().any(|d| d == "VYB" || d == "oVA") {
            categories.entry("uses-prompts").or_default().push(name.clone());
        }
        if module_deps.iter().any(|d| d == "qr" || d == "sv") {
            categories.entry("uses-api").or_default().push(name.clone());
        }
    }

    for (cat, modules) in &categories {
        println!("  {} ({} modules): {}...",
            cat,
            modules.len(),
            modules.iter().take(5).cloned().collect::<Vec<_>>().join(", "));
    }
}
