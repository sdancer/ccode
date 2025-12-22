use anyhow::Result;
use std::env;
use std::fs;
use std::io::{BufRead, BufReader};

use webpack_symbols::identify::identifier::LibraryIdentifier;

#[tokio::main]
async fn main() -> Result<()> {
    let args: Vec<String> = env::args().collect();
    let db_path = args.get(1).map(|s| s.as_str()).unwrap_or("test.db");
    let js_path = args.get(2).map(|s| s.as_str());
    let use_ai = args.iter().any(|a| a == "--ai");
    let limit: usize = args
        .iter()
        .position(|a| a == "--limit")
        .and_then(|i| args.get(i + 1))
        .and_then(|s| s.parse().ok())
        .unwrap_or(50);

    // Get API key from environment
    let api_key = env::var("ANTHROPIC_API_KEY").ok();

    if use_ai && api_key.is_none() {
        eprintln!("Warning: --ai flag set but ANTHROPIC_API_KEY not found in environment");
    }

    let identifier = LibraryIdentifier::new(db_path, api_key)?;

    println!("Library Identification Tool");
    println!("═══════════════════════════════════════════════════════════════\n");

    // Show current stats
    let stats = identifier.get_stats()?;
    println!("Cache Statistics:");
    println!("  Total cached: {}", stats.get("total_cached").unwrap_or(&0));
    println!("  Identified:   {}", stats.get("identified").unwrap_or(&0));
    println!("  Unique hashes: {}", stats.get("unique_hashes").unwrap_or(&0));
    println!();

    // Load source file if provided (for extracting module code)
    let source_lines: Option<Vec<String>> = js_path.and_then(|path| {
        fs::File::open(path).ok().map(|f| {
            BufReader::new(f)
                .lines()
                .filter_map(|l| l.ok())
                .collect()
        })
    });

    // Get unidentified symbols
    let unidentified = identifier.get_unidentified_symbols(limit)?;
    println!("Found {} unidentified symbols (limit: {})\n", unidentified.len(), limit);

    if unidentified.is_empty() {
        println!("All symbols have been identified!");
        return Ok(());
    }

    println!("Identifying symbols...");
    println!("───────────────────────────────────────");

    let mut identified_count = 0;
    let mut pattern_count = 0;
    let mut ai_count = 0;
    let mut unknown_count = 0;

    for (name, body_hash, signature) in &unidentified {
        // Try to extract module code from source if available
        let module_code: Option<String> = source_lines.as_ref().and_then(|lines| {
            // Find the line with this symbol
            for (i, line) in lines.iter().enumerate() {
                if line.contains(&format!("var {} = ", name)) ||
                   line.contains(&format!("function {}(", name)) {
                    // Extract up to 50 lines of context
                    let end = (i + 50).min(lines.len());
                    return Some(lines[i..end].join("\n"));
                }
            }
            None
        });

        let result = identifier
            .identify(&name, module_code.as_deref(), use_ai)
            .await?;

        let method = result.identification_method.as_deref().unwrap_or("unknown");
        match method {
            "pattern" => pattern_count += 1,
            "ai" => ai_count += 1,
            _ => unknown_count += 1,
        }

        if result.library_name.is_some() {
            identified_count += 1;
        }

        let lib_display = result.library_name.as_deref().unwrap_or("?");
        let clear_display = result.cleartext_name.as_deref().unwrap_or("");
        let conf = result.confidence.unwrap_or(0.0);

        println!(
            "  {:6} -> {:20} {:20} ({:.0}% via {})",
            name,
            lib_display,
            clear_display,
            conf * 100.0,
            method
        );

        // Show hash (truncated)
        if !body_hash.is_empty() {
            println!("         hash: {}...", &body_hash[..16.min(body_hash.len())]);
        }
    }

    println!("\n───────────────────────────────────────");
    println!("Results:");
    println!("  Identified: {}", identified_count);
    println!("  By pattern: {}", pattern_count);
    println!("  By AI:      {}", ai_count);
    println!("  Unknown:    {}", unknown_count);

    // Show updated stats
    let stats = identifier.get_stats()?;
    println!("\nUpdated Cache:");
    println!("  Total cached: {}", stats.get("total_cached").unwrap_or(&0));
    println!("  Identified:   {}", stats.get("identified").unwrap_or(&0));

    Ok(())
}
