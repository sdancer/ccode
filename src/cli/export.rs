use std::fs::File;
use std::io::Write;
use std::path::Path;

use anyhow::Result;

use crate::store::Database;
use crate::transpose::mapper::{build_mappings, get_mappings_with_details};

pub fn run_export(
    db_path: &Path,
    from_version: &str,
    to_version: &str,
    format: &str,
    output: Option<&Path>,
) -> Result<()> {
    let db = Database::open(db_path)?;

    // Find bundles
    let source_bundle = db
        .find_bundle_by_version(from_version)?
        .ok_or_else(|| anyhow::anyhow!("Bundle version '{}' not found", from_version))?;

    let target_bundle = db
        .find_bundle_by_version(to_version)?
        .ok_or_else(|| anyhow::anyhow!("Bundle version '{}' not found", to_version))?;

    eprintln!(
        "Exporting mappings {} -> {}...",
        from_version, to_version
    );

    // Build mappings if they don't exist
    let existing = db.get_mappings_between(source_bundle.id, target_bundle.id)?;
    if existing.is_empty() {
        eprintln!("Building mappings...");
        build_mappings(&db, source_bundle.id, target_bundle.id, 0.5)?;
    }

    // Get mappings with details
    let mappings = get_mappings_with_details(&db, source_bundle.id, target_bundle.id)?;

    eprintln!("Found {} mappings", mappings.len());

    // Format output
    let content = match format {
        "csv" => {
            let mut lines = vec!["source_name,target_name,source_kind,target_kind,confidence,reason".to_string()];
            for m in &mappings {
                lines.push(format!(
                    "{},{},{},{},{:.3},{}",
                    escape_csv(&m.source_name),
                    escape_csv(&m.target_name),
                    m.source_kind.as_str(),
                    m.target_kind.as_str(),
                    m.confidence,
                    escape_csv(&m.reason)
                ));
            }
            lines.join("\n")
        }
        "json" | _ => {
            let json_mappings: Vec<serde_json::Value> = mappings
                .iter()
                .map(|m| {
                    serde_json::json!({
                        "source": {
                            "name": m.source_name,
                            "kind": m.source_kind.as_str()
                        },
                        "target": {
                            "name": m.target_name,
                            "kind": m.target_kind.as_str()
                        },
                        "confidence": m.confidence,
                        "reason": m.reason
                    })
                })
                .collect();

            serde_json::json!({
                "from_version": from_version,
                "to_version": to_version,
                "mapping_count": mappings.len(),
                "mappings": json_mappings
            })
            .to_string()
        }
    };

    // Write output
    if let Some(path) = output {
        let mut file = File::create(path)?;
        file.write_all(content.as_bytes())?;
        eprintln!("Written to {:?}", path);
    } else {
        println!("{}", content);
    }

    Ok(())
}

fn escape_csv(s: &str) -> String {
    if s.contains(',') || s.contains('"') || s.contains('\n') {
        format!("\"{}\"", s.replace('"', "\"\""))
    } else {
        s.to_string()
    }
}
