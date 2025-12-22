use super::diff::{ChangeType, DiffResult};

/// Generate a formatted report from diff results
pub struct Report {
    diff: DiffResult,
}

impl Report {
    pub fn new(diff: DiffResult) -> Self {
        Self { diff }
    }

    /// Generate text report
    pub fn to_text(&self) -> String {
        let mut output = String::new();
        let stats = self.diff.stats();

        // Header
        output.push_str("═══════════════════════════════════════════════════════════════\n");
        output.push_str("                    WEBPACK SYMBOL DIFF REPORT                  \n");
        output.push_str("═══════════════════════════════════════════════════════════════\n\n");

        // Summary
        output.push_str("SUMMARY\n");
        output.push_str("───────────────────────────────────────────────────────────────\n");
        output.push_str(&format!("  Source symbols:  {}\n", stats.total_source));
        output.push_str(&format!("  Target symbols:  {}\n", stats.total_target));
        output.push_str(&format!("  Added:           {} (+)\n", stats.added_count));
        output.push_str(&format!("  Removed:         {} (-)\n", stats.removed_count));
        output.push_str(&format!("  Modified:        {} (~)\n", stats.modified_count));
        output.push_str(&format!("  Renamed:         {} (→)\n", stats.renamed_count));
        output.push_str(&format!("  Unchanged:       {}\n", stats.unchanged_count));
        output.push_str(&format!("  Churn:           {:.1}%\n", stats.churn_percentage));
        output.push_str("\n");

        // Renamed symbols (high value for reverse engineering)
        if !self.diff.possibly_renamed.is_empty() {
            output.push_str("RENAMED SYMBOLS\n");
            output.push_str("───────────────────────────────────────────────────────────────\n");
            for (old, new, confidence) in &self.diff.possibly_renamed {
                output.push_str(&format!(
                    "  {} → {} ({:.0}% confidence)\n",
                    old.name,
                    new.name,
                    confidence * 100.0
                ));
            }
            output.push_str("\n");
        }

        // Modified symbols
        if !self.diff.modified.is_empty() {
            output.push_str("MODIFIED SYMBOLS\n");
            output.push_str("───────────────────────────────────────────────────────────────\n");
            for diff in &self.diff.modified {
                output.push_str(&format!("  ~ {}\n", diff.old.name));
                for change in &diff.changes {
                    output.push_str(&format!("      {}\n", format_change(change)));
                }
            }
            output.push_str("\n");
        }

        // Added symbols (by kind)
        if !self.diff.added.is_empty() {
            output.push_str("ADDED SYMBOLS\n");
            output.push_str("───────────────────────────────────────────────────────────────\n");
            let by_kind = self.diff.added_by_kind();
            for (kind, symbols) in by_kind {
                output.push_str(&format!("  [{}]\n", kind.as_str().to_uppercase()));
                for symbol in symbols.iter().take(20) {
                    output.push_str(&format!("    + {}\n", symbol.name));
                }
                if symbols.len() > 20 {
                    output.push_str(&format!("    ... and {} more\n", symbols.len() - 20));
                }
            }
            output.push_str("\n");
        }

        // Removed symbols (by kind)
        if !self.diff.removed.is_empty() {
            output.push_str("REMOVED SYMBOLS\n");
            output.push_str("───────────────────────────────────────────────────────────────\n");
            let by_kind = self.diff.removed_by_kind();
            for (kind, symbols) in by_kind {
                output.push_str(&format!("  [{}]\n", kind.as_str().to_uppercase()));
                for symbol in symbols.iter().take(20) {
                    output.push_str(&format!("    - {}\n", symbol.name));
                }
                if symbols.len() > 20 {
                    output.push_str(&format!("    ... and {} more\n", symbols.len() - 20));
                }
            }
        }

        output
    }

    /// Generate JSON report
    pub fn to_json(&self) -> serde_json::Value {
        let stats = self.diff.stats();

        serde_json::json!({
            "summary": {
                "source_count": stats.total_source,
                "target_count": stats.total_target,
                "added": stats.added_count,
                "removed": stats.removed_count,
                "modified": stats.modified_count,
                "renamed": stats.renamed_count,
                "unchanged": stats.unchanged_count,
                "churn_percentage": stats.churn_percentage
            },
            "renamed": self.diff.possibly_renamed.iter().map(|(old, new, conf)| {
                serde_json::json!({
                    "old_name": old.name,
                    "new_name": new.name,
                    "old_kind": old.kind.as_str(),
                    "new_kind": new.kind.as_str(),
                    "confidence": conf
                })
            }).collect::<Vec<_>>(),
            "modified": self.diff.modified.iter().map(|d| {
                serde_json::json!({
                    "name": d.old.name,
                    "kind": d.old.kind.as_str(),
                    "changes": d.changes.iter().map(|c| format_change(c)).collect::<Vec<_>>()
                })
            }).collect::<Vec<_>>(),
            "added": self.diff.added.iter().map(|s| {
                serde_json::json!({
                    "name": s.name,
                    "kind": s.kind.as_str()
                })
            }).collect::<Vec<_>>(),
            "removed": self.diff.removed.iter().map(|s| {
                serde_json::json!({
                    "name": s.name,
                    "kind": s.kind.as_str()
                })
            }).collect::<Vec<_>>()
        })
    }
}

fn format_change(change: &ChangeType) -> String {
    match change {
        ChangeType::BodyChanged => "body changed".to_string(),
        ChangeType::SignatureChanged => "signature changed".to_string(),
        ChangeType::KindChanged => "kind changed".to_string(),
        ChangeType::ParentChanged => "parent changed".to_string(),
    }
}
