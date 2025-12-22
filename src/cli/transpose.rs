use std::path::Path;

use anyhow::Result;

use crate::store::Database;
use crate::transpose::{transpose_symbol, TransposeResult};

pub fn run_transpose(
    db_path: &Path,
    symbol: &str,
    from_version: &str,
    to_version: &str,
    min_confidence: f64,
) -> Result<()> {
    let db = Database::open(db_path)?;

    // Find bundles
    let source_bundle = db
        .find_bundle_by_version(from_version)?
        .ok_or_else(|| anyhow::anyhow!("Bundle version '{}' not found", from_version))?;

    let target_bundle = db
        .find_bundle_by_version(to_version)?
        .ok_or_else(|| anyhow::anyhow!("Bundle version '{}' not found", to_version))?;

    println!("Transposing '{}' from {} to {}...\n", symbol, from_version, to_version);

    // Run transposition
    let result = transpose_symbol(
        &db,
        source_bundle.id,
        target_bundle.id,
        symbol,
        min_confidence,
    )?;

    // Display result
    print_transpose_result(&result);

    Ok(())
}

fn print_transpose_result(result: &TransposeResult) {
    println!("Source Symbol");
    println!("─────────────────────────────────────────────");
    println!("  Name: {}", result.source_symbol.name);
    println!("  Kind: {}", result.source_symbol.kind.as_str());
    if let Some(sig) = &result.source_symbol.signature {
        println!("  Signature: {}", sig);
    }
    if let Some(hash) = &result.source_symbol.body_hash {
        println!("  Body hash: {}...", &hash[..16]);
    }
    println!();

    if let Some(target) = &result.target_symbol {
        println!("Target Symbol (Transposed)");
        println!("─────────────────────────────────────────────");
        println!("  Name: {}", target.name);
        println!("  Kind: {}", target.kind.as_str());
        if let Some(sig) = &target.signature {
            println!("  Signature: {}", sig);
        }
        if let Some(hash) = &target.body_hash {
            println!("  Body hash: {}...", &hash[..16]);
        }
        println!();

        println!("Match Details");
        println!("─────────────────────────────────────────────");
        println!("  Confidence: {:.1}%", result.confidence * 100.0);
        println!(
            "  Reasons: {}",
            result
                .reasons
                .iter()
                .map(|r| r.as_str())
                .collect::<Vec<_>>()
                .join(", ")
        );

        // Highlight name change if present
        if result.source_symbol.name != target.name {
            println!();
            println!("  ⚠️  Symbol was RENAMED:");
            println!("     {} → {}", result.source_symbol.name, target.name);
        }
    } else {
        println!("No Match Found");
        println!("─────────────────────────────────────────────");
        println!("  Could not find a matching symbol in the target version.");
        println!("  The symbol may have been removed or significantly changed.");
        println!();
        println!("  Tips:");
        println!("  - Try lowering the confidence threshold with --min-confidence");
        println!("  - Run 'compare' to see what symbols changed between versions");
        println!("  - The symbol might have been inlined or merged with another");
    }
}
