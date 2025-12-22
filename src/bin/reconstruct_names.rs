use rusqlite::{params, Connection};
use serde::{Deserialize, Serialize};
use std::collections::{HashMap, HashSet};
use std::fs;
use regex::Regex;

#[derive(Debug, Deserialize)]
struct Declaration {
    #[serde(rename = "type")]
    decl_type: String,
    name: String,
    params: Option<usize>,
    #[serde(rename = "paramNames")]
    param_names: Option<Vec<String>>,
    #[serde(rename = "bodyLength")]
    body_length: Option<usize>,
    signature: Option<String>,
    strings: Option<Vec<String>>,
    file: Option<String>,
    #[serde(rename = "className")]
    class_name: Option<String>,
    #[serde(rename = "methodName")]
    method_name: Option<String>,
    methods: Option<Vec<String>>,
    #[serde(rename = "methodCount")]
    method_count: Option<usize>,
}

#[derive(Debug, Deserialize)]
struct LibraryDeclarations {
    library: String,
    version: String,
    declarations: Vec<Declaration>,
}

#[derive(Debug, Serialize)]
struct NameMapping {
    minified: String,
    original: String,
    library: String,
    confidence: f64,
    match_type: String,
}

fn extract_module_info(content: &str) -> ModuleInfo {
    let mut info = ModuleInfo::default();

    // Count parameters in main function
    let func_re = Regex::new(r"function\s*\(([^)]*)\)").unwrap();
    if let Some(cap) = func_re.captures(content) {
        let params: Vec<&str> = cap[1].split(',').filter(|s| !s.trim().is_empty()).collect();
        info.param_count = params.len();
    }

    // Extract string literals (simplified regex without lookahead)
    let string_re = Regex::new(r#""[^"\\]*(?:\\.[^"\\]*)*"|'[^'\\]*(?:\\.[^'\\]*)*'"#).unwrap();
    for cap in string_re.captures_iter(content) {
        let s = &cap[0];
        if s.len() > 5 && s.len() < 200 {
            info.strings.insert(s[1..s.len()-1].to_string());
        }
    }

    // Count function calls
    let call_re = Regex::new(r"\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(").unwrap();
    for cap in call_re.captures_iter(content) {
        *info.calls.entry(cap[1].to_string()).or_insert(0) += 1;
    }

    // Extract class-like patterns
    let class_re = Regex::new(r"\.prototype\.([a-zA-Z_$][a-zA-Z0-9_$]*)").unwrap();
    for cap in class_re.captures_iter(content) {
        info.prototype_methods.insert(cap[1].to_string());
    }

    // Measure approximate body length
    info.body_length = content.len();

    info
}

#[derive(Debug, Default)]
struct ModuleInfo {
    param_count: usize,
    body_length: usize,
    strings: HashSet<String>,
    calls: HashMap<String, usize>,
    prototype_methods: HashSet<String>,
}

fn main() {
    let conn = Connection::open("test.db").unwrap();

    // Load library declarations
    let decl_path = "lib_signatures/names/all_declarations.json";
    if !std::path::Path::new(decl_path).exists() {
        println!("Run scripts/extract_original_names.js first");
        return;
    }

    let content = fs::read_to_string(decl_path).unwrap();
    let libraries: HashMap<String, LibraryDeclarations> = serde_json::from_str(&content).unwrap();

    println!("Loaded declarations from {} libraries", libraries.len());

    // Build indices for matching
    let mut string_to_decl: HashMap<String, Vec<(&str, &Declaration)>> = HashMap::new();
    let mut param_to_decl: HashMap<usize, Vec<(&str, &Declaration)>> = HashMap::new();

    for (lib_name, lib_data) in &libraries {
        for decl in &lib_data.declarations {
            // Index by strings
            if let Some(strings) = &decl.strings {
                for s in strings {
                    string_to_decl.entry(s.clone()).or_default().push((lib_name.as_str(), decl));
                }
            }
            // Index by param count for functions
            if let Some(params) = decl.params {
                param_to_decl.entry(params).or_default().push((lib_name.as_str(), decl));
            }
        }
    }

    println!("Built indices: {} strings, {} param counts\n", string_to_decl.len(), param_to_decl.len());

    // Load signature matches to know which modules belong to which library
    let matches_path = "lib_signatures/matches.json";
    let matches_content = fs::read_to_string(matches_path).unwrap_or_else(|_| "[]".to_string());
    let sig_matches: Vec<serde_json::Value> = serde_json::from_str(&matches_content).unwrap();

    let mut module_to_lib: HashMap<String, String> = HashMap::new();
    for m in &sig_matches {
        if let (Some(module), Some(lib)) = (m["module"].as_str(), m["library"].as_str()) {
            module_to_lib.insert(module.to_string(), lib.to_string());
        }
    }

    println!("Loaded {} module->library mappings\n", module_to_lib.len());

    // Get modules and try to match names
    let mut stmt = conn.prepare(
        "SELECT module_name, module_type FROM module_map"
    ).unwrap();

    let modules: Vec<(String, String)> = stmt.query_map([], |row| {
        Ok((row.get::<_, String>(0)?, row.get::<_, String>(1)?))
    }).unwrap().filter_map(|r| r.ok()).collect();

    let mut mappings: Vec<NameMapping> = Vec::new();
    let mut processed = 0;

    for (module_name, module_type) in &modules {
        let path = format!("modules/{}/{}.js", module_type, module_name);
        if let Ok(content) = fs::read_to_string(&path) {
            let info = extract_module_info(&content);

            // Get the library this module belongs to
            let lib_filter = module_to_lib.get(module_name);

            // Try to match by strings
            let mut candidates: HashMap<String, (f64, String)> = HashMap::new(); // original_name -> (score, lib)

            for s in &info.strings {
                if let Some(decls) = string_to_decl.get(s) {
                    for (lib, decl) in decls {
                        // If we know the library, only consider matches from that library
                        if let Some(expected_lib) = lib_filter {
                            if lib != expected_lib {
                                continue;
                            }
                        }

                        let key = format!("{}::{}", lib, decl.name);
                        let entry = candidates.entry(key).or_insert((0.0, lib.to_string()));
                        entry.0 += 1.0;

                        // Bonus for param count match
                        if let Some(params) = decl.params {
                            if params == info.param_count {
                                entry.0 += 2.0;
                            }
                        }
                    }
                }
            }

            // Find best match
            if let Some((best_name, (score, lib))) = candidates.iter().max_by(|a, b| a.1.0.partial_cmp(&b.1.0).unwrap()) {
                if *score >= 3.0 {  // Minimum threshold
                    let original = best_name.split("::").nth(1).unwrap_or(best_name);
                    let confidence = (*score / 20.0).min(1.0);

                    mappings.push(NameMapping {
                        minified: module_name.clone(),
                        original: original.to_string(),
                        library: lib.clone(),
                        confidence,
                        match_type: "string_match".to_string(),
                    });
                }
            }
        }

        processed += 1;
        if processed % 500 == 0 {
            print!("\rProcessed {}/{} modules...", processed, modules.len());
        }
    }

    println!("\n\nFound {} name mappings\n", mappings.len());

    // Group by library
    let mut by_lib: HashMap<String, Vec<&NameMapping>> = HashMap::new();
    for m in &mappings {
        by_lib.entry(m.library.clone()).or_default().push(m);
    }

    println!("═══════════════════════════════════════════════════════════════");
    println!("Reconstructed Names by Library");
    println!("═══════════════════════════════════════════════════════════════\n");

    let mut sorted_libs: Vec<_> = by_lib.iter().collect();
    sorted_libs.sort_by(|a, b| b.1.len().cmp(&a.1.len()));

    for (lib, lib_mappings) in sorted_libs.iter().take(15) {
        println!("{} ({} names reconstructed)", lib, lib_mappings.len());

        let mut sorted: Vec<_> = lib_mappings.iter().cloned().collect();
        sorted.sort_by(|a, b| b.confidence.partial_cmp(&a.confidence).unwrap());

        for m in sorted.iter().take(10) {
            println!("  {:>10} -> {:<30} ({:.0}%)", m.minified, m.original, m.confidence * 100.0);
        }
        if lib_mappings.len() > 10 {
            println!("  ... and {} more", lib_mappings.len() - 10);
        }
        println!();
    }

    // Save mappings
    let output_path = "lib_signatures/name_mappings.json";
    fs::write(output_path, serde_json::to_string_pretty(&mappings).unwrap()).unwrap();
    println!("\nSaved {} mappings to {}", mappings.len(), output_path);

    // Save to database
    conn.execute(
        "CREATE TABLE IF NOT EXISTS name_mappings (
            minified_name TEXT PRIMARY KEY,
            original_name TEXT,
            library TEXT,
            confidence REAL,
            match_type TEXT
        )", []
    ).unwrap();

    conn.execute("DELETE FROM name_mappings", []).unwrap();

    for m in &mappings {
        conn.execute(
            "INSERT INTO name_mappings (minified_name, original_name, library, confidence, match_type)
             VALUES (?1, ?2, ?3, ?4, ?5)",
            params![m.minified, m.original, m.library, m.confidence, m.match_type]
        ).unwrap();
    }

    println!("Saved mappings to database");
}
