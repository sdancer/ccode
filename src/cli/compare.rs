use std::path::Path;

use anyhow::Result;

use crate::compare::{compare_bundles, Report};
use crate::store::Database;

pub fn run_compare(db_path: &Path, from_version: &str, to_version: &str, format: &str) -> Result<()> {
    let db = Database::open(db_path)?;

    // Find bundles
    let source_bundle = db
        .find_bundle_by_version(from_version)?
        .ok_or_else(|| anyhow::anyhow!("Bundle version '{}' not found", from_version))?;

    let target_bundle = db
        .find_bundle_by_version(to_version)?
        .ok_or_else(|| anyhow::anyhow!("Bundle version '{}' not found", to_version))?;

    println!(
        "Comparing {} ({}) -> {} ({})...\n",
        source_bundle.name, from_version, target_bundle.name, to_version
    );

    // Run comparison
    let diff = compare_bundles(&db, source_bundle.id, target_bundle.id)?;
    let report = Report::new(diff);

    // Output report
    match format {
        "json" => {
            println!("{}", serde_json::to_string_pretty(&report.to_json())?);
        }
        "text" | _ => {
            println!("{}", report.to_text());
        }
    }

    Ok(())
}
