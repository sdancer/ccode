use anyhow::Result;
use std::env;

use webpack_symbols::identify::identifier::LibraryIdentifier;

#[tokio::main]
async fn main() -> Result<()> {
    let args: Vec<String> = env::args().collect();
    let db_path = args.get(1).map(|s| s.as_str()).unwrap_or("test.db");
    let use_ai = args.iter().any(|a| a == "--ai");

    let api_key = env::var("ANTHROPIC_API_KEY").ok();
    let identifier = LibraryIdentifier::new(db_path, api_key)?;

    // Specific symbols we know have library patterns
    let targets = vec![
        "arrow_11103",  // Anthropic SDK (api.anthropic.com)
        "arrow_4473",   // RxJS (Observable, Subject)
        "arrow_8279",   // highlight.js (language names)
        "arrow_30442",  // AWS SDK
        "q4Q",          // Anthropic (api.anthropic.com)
        "afQ",          // Anthropic (anthropic.)
        "OpB",          // CSS properties
        "arrow_66289",  // Crypto OIDs
        "$72",          // gRPC
    ];

    println!("Identifying Specific Library Modules");
    println!("═══════════════════════════════════════════════════════════════\n");

    for name in &targets {
        println!("Analyzing: {}", name);

        match identifier.identify(name, None, use_ai).await {
            Ok(result) => {
                let lib = result.library_name.as_deref().unwrap_or("?");
                let path = result.module_path.as_deref().unwrap_or("");
                let method = result.identification_method.as_deref().unwrap_or("?");
                let conf = result.confidence.unwrap_or(0.0);

                println!("  Library:    {}", lib);
                println!("  Path:       {}", path);
                println!("  Method:     {}", method);
                println!("  Confidence: {:.0}%", conf * 100.0);

                if let Some(strings) = &result.sample_strings {
                    let preview = if strings.len() > 100 {
                        format!("{}...", &strings[..100])
                    } else {
                        strings.clone()
                    };
                    println!("  Strings:    {}", preview);
                }
                println!();
            }
            Err(e) => {
                println!("  Error: {}\n", e);
            }
        }
    }

    // Show updated stats
    let stats = identifier.get_stats()?;
    println!("───────────────────────────────────────");
    println!("Cache: {} identified / {} total",
        stats.get("identified").unwrap_or(&0),
        stats.get("total_cached").unwrap_or(&0));

    Ok(())
}
