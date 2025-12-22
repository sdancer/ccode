use std::collections::{HashMap, HashSet};

use crate::store::models::{Symbol, SymbolKind};
use crate::store::Database;
use anyhow::Result;

/// Result of comparing two bundles
#[derive(Debug)]
pub struct DiffResult {
    pub added: Vec<Symbol>,
    pub removed: Vec<Symbol>,
    pub modified: Vec<SymbolDiff>,
    pub unchanged: Vec<Symbol>,
    pub possibly_renamed: Vec<(Symbol, Symbol, f64)>, // (old, new, confidence)
}

/// A symbol that was modified between versions
#[derive(Debug)]
pub struct SymbolDiff {
    pub old: Symbol,
    pub new: Symbol,
    pub changes: Vec<ChangeType>,
}

#[derive(Debug, Clone)]
pub enum ChangeType {
    BodyChanged,
    SignatureChanged,
    KindChanged,
    ParentChanged,
}

/// Compare symbols between two bundle versions
pub fn compare_bundles(db: &Database, source_bundle_id: i64, target_bundle_id: i64) -> Result<DiffResult> {
    let source_symbols = db.get_symbols_by_bundle(source_bundle_id)?;
    let target_symbols = db.get_symbols_by_bundle(target_bundle_id)?;

    // Build lookup maps by name
    let source_by_name: HashMap<String, &Symbol> = source_symbols
        .iter()
        .map(|s| (s.name.clone(), s))
        .collect();

    let target_by_name: HashMap<String, &Symbol> = target_symbols
        .iter()
        .map(|s| (s.name.clone(), s))
        .collect();

    // Build lookup maps by body hash for rename detection
    let _source_by_hash: HashMap<String, Vec<&Symbol>> = source_symbols
        .iter()
        .filter(|s| s.body_hash.is_some())
        .fold(HashMap::new(), |mut acc, s| {
            acc.entry(s.body_hash.clone().unwrap())
                .or_default()
                .push(s);
            acc
        });

    let target_by_hash: HashMap<String, Vec<&Symbol>> = target_symbols
        .iter()
        .filter(|s| s.body_hash.is_some())
        .fold(HashMap::new(), |mut acc, s| {
            acc.entry(s.body_hash.clone().unwrap())
                .or_default()
                .push(s);
            acc
        });

    let source_names: HashSet<&String> = source_by_name.keys().collect();
    let target_names: HashSet<&String> = target_by_name.keys().collect();

    let mut added = Vec::new();
    let mut removed = Vec::new();
    let mut modified = Vec::new();
    let mut unchanged = Vec::new();
    let mut possibly_renamed = Vec::new();

    // Find added symbols
    for name in target_names.difference(&source_names) {
        let symbol = target_by_name[*name];
        added.push(symbol.clone());
    }

    // Find removed symbols and detect renames
    for name in source_names.difference(&target_names) {
        let source_symbol = source_by_name[*name];

        // Check if this might be a rename by looking for matching body hash
        if let Some(hash) = &source_symbol.body_hash {
            if let Some(target_candidates) = target_by_hash.get(hash) {
                // Find candidates that are in the "added" list (new names)
                for target_candidate in target_candidates {
                    if !source_by_name.contains_key(&target_candidate.name) {
                        // This looks like a rename
                        let confidence = calculate_rename_confidence(source_symbol, target_candidate);
                        if confidence > 0.5 {
                            possibly_renamed.push((
                                source_symbol.clone(),
                                (*target_candidate).clone(),
                                confidence,
                            ));
                            continue;
                        }
                    }
                }
            }
        }

        removed.push(source_symbol.clone());
    }

    // Find modified and unchanged symbols
    for name in source_names.intersection(&target_names) {
        let source_symbol = source_by_name[*name];
        let target_symbol = target_by_name[*name];

        let changes = detect_changes(source_symbol, target_symbol);

        if changes.is_empty() {
            unchanged.push(source_symbol.clone());
        } else {
            modified.push(SymbolDiff {
                old: source_symbol.clone(),
                new: target_symbol.clone(),
                changes,
            });
        }
    }

    // Remove confirmed renames from added/removed lists
    let renamed_source_ids: HashSet<i64> = possibly_renamed.iter().map(|(s, _, _)| s.id).collect();
    let renamed_target_ids: HashSet<i64> = possibly_renamed.iter().map(|(_, t, _)| t.id).collect();

    removed.retain(|s| !renamed_source_ids.contains(&s.id));
    added.retain(|s| !renamed_target_ids.contains(&s.id));

    Ok(DiffResult {
        added,
        removed,
        modified,
        unchanged,
        possibly_renamed,
    })
}

fn detect_changes(source: &Symbol, target: &Symbol) -> Vec<ChangeType> {
    let mut changes = Vec::new();

    if source.body_hash != target.body_hash {
        changes.push(ChangeType::BodyChanged);
    }

    if source.signature != target.signature {
        changes.push(ChangeType::SignatureChanged);
    }

    if source.kind != target.kind {
        changes.push(ChangeType::KindChanged);
    }

    if source.parent_id != target.parent_id {
        changes.push(ChangeType::ParentChanged);
    }

    changes
}

fn calculate_rename_confidence(source: &Symbol, target: &Symbol) -> f64 {
    let mut confidence: f64 = 0.0;

    // Same body hash is a strong signal
    if source.body_hash == target.body_hash && source.body_hash.is_some() {
        confidence += 0.5;
    }

    // Same signature
    if source.signature == target.signature && source.signature.is_some() {
        confidence += 0.2;
    }

    // Same kind
    if source.kind == target.kind {
        confidence += 0.1;
    }

    // Similar name pattern (e.g., both start with same prefix)
    if names_similar(&source.name, &target.name) {
        confidence += 0.2;
    }

    confidence.min(1.0)
}

fn names_similar(a: &str, b: &str) -> bool {
    // Check for common prefixes
    let common_prefix_len = a
        .chars()
        .zip(b.chars())
        .take_while(|(ca, cb)| ca == cb)
        .count();

    let min_len = a.len().min(b.len());

    // If they share at least 30% of characters as prefix
    if min_len > 0 && common_prefix_len * 100 / min_len >= 30 {
        return true;
    }

    // Check for edit distance (for short names)
    if a.len() <= 5 && b.len() <= 5 {
        let distance = levenshtein(a, b);
        return distance <= 2;
    }

    false
}

fn levenshtein(a: &str, b: &str) -> usize {
    let a_chars: Vec<char> = a.chars().collect();
    let b_chars: Vec<char> = b.chars().collect();

    let m = a_chars.len();
    let n = b_chars.len();

    if m == 0 {
        return n;
    }
    if n == 0 {
        return m;
    }

    let mut matrix = vec![vec![0usize; n + 1]; m + 1];

    for i in 0..=m {
        matrix[i][0] = i;
    }
    for j in 0..=n {
        matrix[0][j] = j;
    }

    for i in 1..=m {
        for j in 1..=n {
            let cost = if a_chars[i - 1] == b_chars[j - 1] { 0 } else { 1 };
            matrix[i][j] = (matrix[i - 1][j] + 1)
                .min(matrix[i][j - 1] + 1)
                .min(matrix[i - 1][j - 1] + cost);
        }
    }

    matrix[m][n]
}

/// Get summary statistics for a diff
#[derive(Debug)]
pub struct DiffStats {
    pub total_source: usize,
    pub total_target: usize,
    pub added_count: usize,
    pub removed_count: usize,
    pub modified_count: usize,
    pub unchanged_count: usize,
    pub renamed_count: usize,
    pub churn_percentage: f64,
}

impl DiffResult {
    pub fn stats(&self) -> DiffStats {
        let total_source = self.removed.len() + self.modified.len() + self.unchanged.len() + self.possibly_renamed.len();
        let total_target = self.added.len() + self.modified.len() + self.unchanged.len() + self.possibly_renamed.len();

        let changed = self.added.len() + self.removed.len() + self.modified.len();
        let churn = if total_source > 0 {
            (changed as f64 / total_source as f64) * 100.0
        } else {
            0.0
        };

        DiffStats {
            total_source,
            total_target,
            added_count: self.added.len(),
            removed_count: self.removed.len(),
            modified_count: self.modified.len(),
            unchanged_count: self.unchanged.len(),
            renamed_count: self.possibly_renamed.len(),
            churn_percentage: churn,
        }
    }

    /// Get symbols by kind
    pub fn added_by_kind(&self) -> HashMap<SymbolKind, Vec<&Symbol>> {
        let mut by_kind: HashMap<SymbolKind, Vec<&Symbol>> = HashMap::new();
        for symbol in &self.added {
            by_kind.entry(symbol.kind).or_default().push(symbol);
        }
        by_kind
    }

    pub fn removed_by_kind(&self) -> HashMap<SymbolKind, Vec<&Symbol>> {
        let mut by_kind: HashMap<SymbolKind, Vec<&Symbol>> = HashMap::new();
        for symbol in &self.removed {
            by_kind.entry(symbol.kind).or_default().push(symbol);
        }
        by_kind
    }
}
