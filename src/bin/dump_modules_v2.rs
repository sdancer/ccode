use std::collections::{HashMap, HashSet};
use std::fs::{self, File};
use std::io::Write;
use std::path::Path;
use regex::Regex;

#[derive(Debug, Clone)]
struct ModuleInfo {
    name: String,
    mod_type: String,  // L or U
    start_line: usize,
    end_line: usize,
    init_deps: Vec<String>,       // L() init calls
    owned_functions: Vec<String>, // Functions defined after L() that belong to this module
    owned_vars: Vec<String>,      // Vars defined after L()
}

fn main() {
    let source = fs::read_to_string("/home/sdancer/webpack/formatted.js")
        .expect("Failed to read source");
    let lines: Vec<&str> = source.lines().collect();

    // Regex patterns
    let l_module_re = Regex::new(r"^var\s+(\w+)\s*=\s*L\(\(\)\s*=>\s*\{").unwrap();
    let u_module_re = Regex::new(r"^var\s+(\w+)\s*=\s*U\(\([^)]*\)\s*=>\s*\{").unwrap();
    let func_re = Regex::new(r"^(async\s+)?function\s+(\w+)\s*\(").unwrap();
    let var_re = Regex::new(r"^var\s+(\w+)\s*=").unwrap();
    let call_re = Regex::new(r"\b(\w+)\s*\(").unwrap();

    // First pass: find all module boundaries
    let mut modules: Vec<ModuleInfo> = Vec::new();
    let mut current_line = 0;

    while current_line < lines.len() {
        let line = lines[current_line];

        // Check for L module
        if let Some(cap) = l_module_re.captures(line) {
            let name = cap[1].to_string();
            let start = current_line;

            // Find end of L() block and extract init deps
            let mut init_deps = Vec::new();
            let init_call_re = Regex::new(r"^\s+(\w+)\(\);$").unwrap();

            let mut idx = current_line + 1;
            let mut end_of_init = current_line;
            while idx < lines.len() {
                let l = lines[idx];
                if l.contains("});") {
                    end_of_init = idx;
                    break;
                }
                if let Some(cap) = init_call_re.captures(l) {
                    init_deps.push(cap[1].to_string());
                }
                idx += 1;
            }

            // Find end of module (next L or U declaration)
            let mut end_line = end_of_init + 1;
            for j in (end_of_init + 1)..lines.len() {
                if l_module_re.is_match(lines[j]) || u_module_re.is_match(lines[j]) {
                    end_line = j;
                    break;
                }
                if j == lines.len() - 1 {
                    end_line = lines.len();
                }
            }

            // Find functions and vars in this module's scope
            let mut owned_functions = Vec::new();
            let mut owned_vars = Vec::new();

            for j in (end_of_init + 1)..end_line {
                let l = lines[j];
                if let Some(cap) = func_re.captures(l) {
                    owned_functions.push(cap[2].to_string());
                }
                if let Some(cap) = var_re.captures(l) {
                    let var_name = &cap[1];
                    // Skip if it's another module
                    if !l.contains("= L(") && !l.contains("= U(") {
                        owned_vars.push(var_name.to_string());
                    }
                }
            }

            modules.push(ModuleInfo {
                name,
                mod_type: "L".to_string(),
                start_line: start,
                end_line,
                init_deps,
                owned_functions,
                owned_vars,
            });

            current_line = end_line;
            continue;
        }

        // Check for U module
        if let Some(cap) = u_module_re.captures(line) {
            let name = cap[1].to_string();
            let start = current_line;

            // Find end of U() block
            let mut end_line = current_line + 1;
            for j in (current_line + 1)..lines.len() {
                if l_module_re.is_match(lines[j]) || u_module_re.is_match(lines[j]) {
                    end_line = j;
                    break;
                }
            }

            modules.push(ModuleInfo {
                name,
                mod_type: "U".to_string(),
                start_line: start,
                end_line,
                init_deps: Vec::new(),
                owned_functions: Vec::new(),
                owned_vars: Vec::new(),
            });

            current_line = end_line;
            continue;
        }

        current_line += 1;
    }

    println!("Found {} modules ({} L, {} U)\n",
        modules.len(),
        modules.iter().filter(|m| m.mod_type == "L").count(),
        modules.iter().filter(|m| m.mod_type == "U").count()
    );

    // Create output directories
    let out_dir = Path::new("modules_v2");
    fs::create_dir_all(out_dir.join("L")).unwrap();
    fs::create_dir_all(out_dir.join("U")).unwrap();

    // Dump modules with enhanced metadata
    for m in &modules {
        let subdir = &m.mod_type;
        let file_path = out_dir.join(subdir).join(format!("{}.js", m.name));

        let mut file = File::create(&file_path).unwrap();

        // Write enhanced header
        writeln!(file, "// ═══════════════════════════════════════════════════════════════").unwrap();
        writeln!(file, "// Module: {}", m.name).unwrap();
        writeln!(file, "// Type: {} ({})", m.mod_type,
            if m.mod_type == "L" { "lazy/ESM" } else { "CommonJS" }).unwrap();
        writeln!(file, "// Lines: {}-{} ({} lines)", m.start_line + 1, m.end_line, m.end_line - m.start_line).unwrap();

        if !m.init_deps.is_empty() {
            writeln!(file, "//").unwrap();
            writeln!(file, "// Init Dependencies ({}):", m.init_deps.len()).unwrap();
            for dep in &m.init_deps {
                writeln!(file, "//   - {}", dep).unwrap();
            }
        }

        if !m.owned_functions.is_empty() {
            writeln!(file, "//").unwrap();
            writeln!(file, "// Defined Functions ({}):", m.owned_functions.len()).unwrap();
            for func in &m.owned_functions {
                writeln!(file, "//   - {}()", func).unwrap();
            }
        }

        if !m.owned_vars.is_empty() {
            writeln!(file, "//").unwrap();
            writeln!(file, "// Defined Vars ({}):", m.owned_vars.len()).unwrap();
            for v in m.owned_vars.iter().take(10) {
                writeln!(file, "//   - {}", v).unwrap();
            }
            if m.owned_vars.len() > 10 {
                writeln!(file, "//   ... and {} more", m.owned_vars.len() - 10).unwrap();
            }
        }

        writeln!(file, "// ═══════════════════════════════════════════════════════════════").unwrap();
        writeln!(file, "").unwrap();

        // Write the actual code
        let code: String = lines[m.start_line..m.end_line]
            .iter()
            .cloned()
            .collect::<Vec<_>>()
            .join("\n");
        writeln!(file, "{}", code).unwrap();
    }

    println!("Dumped modules to {}/", out_dir.display());

    // Print summary of modules with most functions
    println!("\n═══════════════════════════════════════════════════════════════");
    println!("Modules with Most Defined Functions");
    println!("═══════════════════════════════════════════════════════════════\n");

    let mut by_func_count: Vec<_> = modules.iter()
        .filter(|m| !m.owned_functions.is_empty())
        .collect();
    by_func_count.sort_by(|a, b| b.owned_functions.len().cmp(&a.owned_functions.len()));

    for m in by_func_count.iter().take(20) {
        let funcs: Vec<_> = m.owned_functions.iter().take(5).cloned().collect();
        println!("  {} ({} funcs): {}{}",
            m.name,
            m.owned_functions.len(),
            funcs.join(", "),
            if m.owned_functions.len() > 5 { "..." } else { "" }
        );
    }

    println!("\n═══════════════════════════════════════════════════════════════");
    println!("Modules with Most Init Dependencies");
    println!("═══════════════════════════════════════════════════════════════\n");

    let mut by_dep_count: Vec<_> = modules.iter()
        .filter(|m| !m.init_deps.is_empty())
        .collect();
    by_dep_count.sort_by(|a, b| b.init_deps.len().cmp(&a.init_deps.len()));

    for m in by_dep_count.iter().take(15) {
        let deps: Vec<_> = m.init_deps.iter().take(5).cloned().collect();
        println!("  {} ({} deps): {}{}",
            m.name,
            m.init_deps.len(),
            deps.join(", "),
            if m.init_deps.len() > 5 { "..." } else { "" }
        );
    }

    // Create mapping file
    let mut mapping = File::create(out_dir.join("MODULE_FUNCTIONS.md")).unwrap();
    writeln!(mapping, "# Module Function Mapping\n").unwrap();
    writeln!(mapping, "Maps which functions belong to which modules.\n").unwrap();

    for m in modules.iter().filter(|m| !m.owned_functions.is_empty()) {
        writeln!(mapping, "## {} ({})\n", m.name, m.mod_type).unwrap();
        writeln!(mapping, "**Init deps:** {}\n", m.init_deps.join(", ")).unwrap();
        writeln!(mapping, "**Functions:**").unwrap();
        for f in &m.owned_functions {
            writeln!(mapping, "- `{}`", f).unwrap();
        }
        writeln!(mapping, "").unwrap();
    }

    println!("\nCreated {}/MODULE_FUNCTIONS.md", out_dir.display());
}
