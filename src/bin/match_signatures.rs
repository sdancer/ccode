use rusqlite::Connection;
use serde::{Deserialize, Serialize};
use std::collections::{HashMap, HashSet};
use std::fs;

#[derive(Debug, Deserialize)]
struct LibSignature {
    name: String,
    version: Option<String>,
    strings: Vec<String>,
    exports: Vec<String>,
    #[serde(rename = "uniquePatterns")]
    unique_patterns: Vec<String>,
    #[serde(rename = "fileHashes")]
    file_hashes: HashMap<String, String>,
}

#[derive(Debug, Serialize)]
struct MatchResult {
    module: String,
    library: String,
    version: String,
    confidence: f64,
    matched_strings: usize,
    matched_exports: usize,
}

fn main() {
    let conn = Connection::open("test.db").unwrap();

    // Load signatures
    let sig_path = "lib_signatures/signatures.json";
    if !std::path::Path::new(sig_path).exists() {
        println!("No signatures found. Run scripts/fetch_lib_signatures.js first.");
        return;
    }

    let sig_content = fs::read_to_string(sig_path).unwrap();
    let signatures: HashMap<String, Vec<LibSignature>> = serde_json::from_str(&sig_content).unwrap();

    println!("Loaded signatures for {} libraries", signatures.len());

    // Build string index from signatures
    let mut string_to_lib: HashMap<String, Vec<(String, String)>> = HashMap::new(); // string -> [(lib, version)]

    for (lib_name, versions) in &signatures {
        for sig in versions {
            let version = sig.version.clone().unwrap_or_default();
            for s in &sig.unique_patterns {
                string_to_lib.entry(s.clone()).or_default().push((lib_name.clone(), version.clone()));
            }
            for s in &sig.strings {
                if s.len() > 10 {  // Only longer strings
                    string_to_lib.entry(s.clone()).or_default().push((lib_name.clone(), version.clone()));
                }
            }
        }
    }

    println!("Built index of {} unique strings\n", string_to_lib.len());

    // Get all modules
    let mut stmt = conn.prepare(
        "SELECT module_name, module_type FROM module_map"
    ).unwrap();

    let modules: Vec<(String, String)> = stmt.query_map([], |row| {
        Ok((row.get::<_, String>(0)?, row.get::<_, String>(1)?))
    }).unwrap().filter_map(|r| r.ok()).collect();

    println!("Matching {} modules against signatures...\n", modules.len());

    let mut matches: Vec<MatchResult> = Vec::new();
    let mut processed = 0;

    for (module_name, module_type) in &modules {
        let path = format!("modules/{}/{}.js", module_type, module_name);
        if let Ok(content) = fs::read_to_string(&path) {
            // Count string matches per library/version
            let mut lib_matches: HashMap<(String, String), (usize, HashSet<String>)> = HashMap::new();

            for (sig_string, libs) in &string_to_lib {
                if content.contains(sig_string) {
                    for (lib, version) in libs {
                        let entry = lib_matches.entry((lib.clone(), version.clone())).or_default();
                        entry.0 += 1;
                        entry.1.insert(sig_string.clone());
                    }
                }
            }

            // Find best match
            if let Some(((lib, version), (count, matched))) = lib_matches.iter().max_by_key(|(_, (c, _))| *c) {
                if *count >= 3 {  // At least 3 matching strings
                    let confidence = (*count as f64 / 20.0).min(1.0);  // Normalize
                    matches.push(MatchResult {
                        module: module_name.clone(),
                        library: lib.clone(),
                        version: version.clone(),
                        confidence,
                        matched_strings: *count,
                        matched_exports: 0,
                    });
                }
            }
        }

        processed += 1;
        if processed % 500 == 0 {
            print!("\rProcessed {}/{} modules...", processed, modules.len());
        }
    }

    println!("\n\nFound {} modules with signature matches\n", matches.len());

    // Group by library
    let mut by_lib: HashMap<String, Vec<&MatchResult>> = HashMap::new();
    for m in &matches {
        by_lib.entry(m.library.clone()).or_default().push(m);
    }

    // Sort by count
    let mut sorted_libs: Vec<_> = by_lib.iter().collect();
    sorted_libs.sort_by(|a, b| b.1.len().cmp(&a.1.len()));

    println!("═══════════════════════════════════════════════════════════════");
    println!("Signature Matches by Library");
    println!("═══════════════════════════════════════════════════════════════\n");

    for (lib, lib_matches) in sorted_libs.iter().take(20) {
        // Find most common version
        let mut version_counts: HashMap<&str, usize> = HashMap::new();
        for m in *lib_matches {
            *version_counts.entry(&m.version).or_default() += 1;
        }
        let best_version = version_counts.iter().max_by_key(|(_, c)| *c).map(|(v, _)| *v).unwrap_or("?");

        println!("{} ({} modules, likely v{})", lib, lib_matches.len(), best_version);

        // Show top matches by confidence
        let mut sorted_matches: Vec<_> = lib_matches.iter().cloned().collect();
        sorted_matches.sort_by(|a, b| b.matched_strings.cmp(&a.matched_strings));

        for m in sorted_matches.iter().take(5) {
            println!("  {:>3} strings: {}  (v{})", m.matched_strings, m.module, m.version);
        }
        if lib_matches.len() > 5 {
            println!("  ... and {} more", lib_matches.len() - 5);
        }
        println!();
    }

    // Save results
    let output_path = "lib_signatures/matches.json";
    fs::write(output_path, serde_json::to_string_pretty(&matches).unwrap()).unwrap();
    println!("\nSaved matches to {}", output_path);

    // Version detection summary
    println!("\n═══════════════════════════════════════════════════════════════");
    println!("Detected Library Versions");
    println!("═══════════════════════════════════════════════════════════════\n");

    for (lib, lib_matches) in &sorted_libs {
        let mut version_counts: HashMap<&str, usize> = HashMap::new();
        for m in *lib_matches {
            *version_counts.entry(&m.version).or_default() += 1;
        }

        let mut versions: Vec<_> = version_counts.iter().collect();
        versions.sort_by(|a, b| b.1.cmp(a.1));

        let top_version = versions.first().map(|(v, _)| &***v).unwrap_or("unknown");
        let confidence = versions.first().map(|(_, c)| **c as f64 / lib_matches.len() as f64 * 100.0).unwrap_or(0.0);

        println!("  {:<40} v{:<15} ({:.0}% confidence)", lib, top_version, confidence);
    }
}
