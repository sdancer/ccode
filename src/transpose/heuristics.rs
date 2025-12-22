use std::collections::{HashMap, HashSet};

use crate::store::models::Symbol;
use crate::store::Database;
use anyhow::Result;

/// Match candidates found by a heuristic
#[derive(Debug, Clone)]
pub struct MatchCandidate {
    pub source_id: i64,
    pub target_id: i64,
    pub score: f64,
    pub reason: MatchReason,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub enum MatchReason {
    ExactName,
    BodyHash,
    Signature,
    StringAnchor,
    CallGraph,
    StructuralSimilarity,
}

impl MatchReason {
    pub fn as_str(&self) -> &'static str {
        match self {
            MatchReason::ExactName => "exact_name",
            MatchReason::BodyHash => "body_hash",
            MatchReason::Signature => "signature",
            MatchReason::StringAnchor => "string_anchor",
            MatchReason::CallGraph => "call_graph",
            MatchReason::StructuralSimilarity => "structural",
        }
    }

    pub fn base_score(&self) -> f64 {
        match self {
            MatchReason::ExactName => 1.0,
            MatchReason::BodyHash => 0.9,
            MatchReason::Signature => 0.5,
            MatchReason::StringAnchor => 0.6,
            MatchReason::CallGraph => 0.4,
            MatchReason::StructuralSimilarity => 0.3,
        }
    }
}

/// Find matches by exact body hash
pub fn match_by_body_hash(
    db: &Database,
    source_bundle_id: i64,
    target_bundle_id: i64,
) -> Result<Vec<MatchCandidate>> {
    let source_symbols = db.get_symbols_by_bundle(source_bundle_id)?;
    let target_symbols = db.get_symbols_by_bundle(target_bundle_id)?;

    // Build hash -> symbols map for target
    let target_by_hash: HashMap<String, Vec<&Symbol>> = target_symbols
        .iter()
        .filter(|s| s.body_hash.is_some())
        .fold(HashMap::new(), |mut acc, s| {
            acc.entry(s.body_hash.clone().unwrap())
                .or_default()
                .push(s);
            acc
        });

    let mut candidates = Vec::new();

    for source in &source_symbols {
        if let Some(hash) = &source.body_hash {
            if let Some(targets) = target_by_hash.get(hash) {
                for target in targets {
                    // Skip if names are the same (will be matched by exact name)
                    if source.name != target.name {
                        candidates.push(MatchCandidate {
                            source_id: source.id,
                            target_id: target.id,
                            score: MatchReason::BodyHash.base_score(),
                            reason: MatchReason::BodyHash,
                        });
                    }
                }
            }
        }
    }

    Ok(candidates)
}

/// Find matches by signature similarity
pub fn match_by_signature(
    db: &Database,
    source_bundle_id: i64,
    target_bundle_id: i64,
) -> Result<Vec<MatchCandidate>> {
    let source_symbols = db.get_symbols_by_bundle(source_bundle_id)?;
    let target_symbols = db.get_symbols_by_bundle(target_bundle_id)?;

    // Build signature -> symbols map for target
    let target_by_sig: HashMap<String, Vec<&Symbol>> = target_symbols
        .iter()
        .filter(|s| s.signature.is_some())
        .fold(HashMap::new(), |mut acc, s| {
            acc.entry(s.signature.clone().unwrap())
                .or_default()
                .push(s);
            acc
        });

    let mut candidates = Vec::new();

    for source in &source_symbols {
        if let Some(sig) = &source.signature {
            if let Some(targets) = target_by_sig.get(sig) {
                // Only consider if the signature is distinctive enough
                if targets.len() <= 5 {
                    for target in targets {
                        if source.name != target.name && source.kind == target.kind {
                            candidates.push(MatchCandidate {
                                source_id: source.id,
                                target_id: target.id,
                                score: MatchReason::Signature.base_score(),
                                reason: MatchReason::Signature,
                            });
                        }
                    }
                }
            }
        }
    }

    Ok(candidates)
}

/// Find matches by string literal anchors
pub fn match_by_string_anchors(
    db: &Database,
    source_bundle_id: i64,
    target_bundle_id: i64,
) -> Result<Vec<MatchCandidate>> {
    let source_strings = db.get_strings_by_bundle(source_bundle_id)?;
    let target_strings = db.get_strings_by_bundle(target_bundle_id)?;

    // Build value -> symbol_ids map for both
    let source_string_to_symbols: HashMap<&str, HashSet<i64>> = source_strings
        .iter()
        .filter(|s| s.symbol_id.is_some() && is_good_anchor(&s.value))
        .fold(HashMap::new(), |mut acc, s| {
            acc.entry(s.value.as_str())
                .or_default()
                .insert(s.symbol_id.unwrap());
            acc
        });

    let target_string_to_symbols: HashMap<&str, HashSet<i64>> = target_strings
        .iter()
        .filter(|s| s.symbol_id.is_some() && is_good_anchor(&s.value))
        .fold(HashMap::new(), |mut acc, s| {
            acc.entry(s.value.as_str())
                .or_default()
                .insert(s.symbol_id.unwrap());
            acc
        });

    let mut candidates = Vec::new();
    let mut seen_pairs: HashSet<(i64, i64)> = HashSet::new();

    // Find symbols that share unique strings
    for (value, source_symbols) in &source_string_to_symbols {
        if let Some(target_symbols) = target_string_to_symbols.get(*value) {
            // Only consider if the string is distinctive (not used by too many symbols)
            if source_symbols.len() <= 3 && target_symbols.len() <= 3 {
                for &source_id in source_symbols {
                    for &target_id in target_symbols {
                        if !seen_pairs.contains(&(source_id, target_id)) {
                            seen_pairs.insert((source_id, target_id));
                            candidates.push(MatchCandidate {
                                source_id,
                                target_id,
                                score: MatchReason::StringAnchor.base_score(),
                                reason: MatchReason::StringAnchor,
                            });
                        }
                    }
                }
            }
        }
    }

    Ok(candidates)
}

/// Find matches by call graph topology
pub fn match_by_call_graph(
    db: &Database,
    source_bundle_id: i64,
    target_bundle_id: i64,
    known_mappings: &[(i64, i64)], // Already established source->target mappings
) -> Result<Vec<MatchCandidate>> {
    let source_symbols = db.get_symbols_by_bundle(source_bundle_id)?;
    let target_symbols = db.get_symbols_by_bundle(target_bundle_id)?;

    // Build call graph for both bundles
    let source_callers: HashMap<i64, Vec<i64>> = build_caller_map(db, &source_symbols)?;
    let source_callees: HashMap<i64, Vec<i64>> = build_callee_map(db, &source_symbols)?;
    let target_callers: HashMap<i64, Vec<i64>> = build_caller_map(db, &target_symbols)?;
    let target_callees: HashMap<i64, Vec<i64>> = build_callee_map(db, &target_symbols)?;

    // Build mapping lookup
    let source_to_target: HashMap<i64, i64> = known_mappings.iter().cloned().collect();

    let mut candidates = Vec::new();

    for source in &source_symbols {
        // Skip if already mapped
        if source_to_target.contains_key(&source.id) {
            continue;
        }

        // Get source's callers and callees that are already mapped
        let mapped_callers: Vec<i64> = source_callers
            .get(&source.id)
            .map(|callers| {
                callers
                    .iter()
                    .filter_map(|c| source_to_target.get(c).copied())
                    .collect()
            })
            .unwrap_or_default();

        let mapped_callees: Vec<i64> = source_callees
            .get(&source.id)
            .map(|callees| {
                callees
                    .iter()
                    .filter_map(|c| source_to_target.get(c).copied())
                    .collect()
            })
            .unwrap_or_default();

        if mapped_callers.is_empty() && mapped_callees.is_empty() {
            continue;
        }

        // Find target symbols with similar call patterns
        for target in &target_symbols {
            let target_caller_set: HashSet<i64> = target_callers
                .get(&target.id)
                .cloned()
                .unwrap_or_default()
                .into_iter()
                .collect();

            let target_callee_set: HashSet<i64> = target_callees
                .get(&target.id)
                .cloned()
                .unwrap_or_default()
                .into_iter()
                .collect();

            // Count matching callers and callees
            let matching_callers = mapped_callers
                .iter()
                .filter(|c| target_caller_set.contains(c))
                .count();

            let matching_callees = mapped_callees
                .iter()
                .filter(|c| target_callee_set.contains(c))
                .count();

            let total_edges = mapped_callers.len() + mapped_callees.len();
            let matching_edges = matching_callers + matching_callees;

            if matching_edges > 0 && total_edges > 0 {
                let edge_score = matching_edges as f64 / total_edges as f64;
                let score = MatchReason::CallGraph.base_score() * edge_score;

                if score > 0.2 {
                    candidates.push(MatchCandidate {
                        source_id: source.id,
                        target_id: target.id,
                        score,
                        reason: MatchReason::CallGraph,
                    });
                }
            }
        }
    }

    Ok(candidates)
}

fn build_caller_map(db: &Database, symbols: &[Symbol]) -> Result<HashMap<i64, Vec<i64>>> {
    let mut map: HashMap<i64, Vec<i64>> = HashMap::new();

    for symbol in symbols {
        let calls = db.get_calls_by_callee(symbol.id)?;
        if !calls.is_empty() {
            map.insert(symbol.id, calls.iter().map(|c| c.caller_id).collect());
        }
    }

    Ok(map)
}

fn build_callee_map(db: &Database, symbols: &[Symbol]) -> Result<HashMap<i64, Vec<i64>>> {
    let mut map: HashMap<i64, Vec<i64>> = HashMap::new();

    for symbol in symbols {
        let calls = db.get_calls_by_caller(symbol.id)?;
        if !calls.is_empty() {
            map.insert(symbol.id, calls.iter().map(|c| c.callee_id).collect());
        }
    }

    Ok(map)
}

/// Check if a string is a good anchor for matching
fn is_good_anchor(s: &str) -> bool {
    // Must be reasonably long
    if s.len() < 5 {
        return false;
    }

    // Skip common patterns
    let skip_patterns = [
        "undefined",
        "function",
        "object",
        "string",
        "number",
        "boolean",
        "prototype",
        "constructor",
        "__proto__",
    ];

    if skip_patterns.contains(&s.to_lowercase().as_str()) {
        return false;
    }

    // Should contain some meaningful characters
    let alpha_count = s.chars().filter(|c| c.is_alphabetic()).count();
    alpha_count >= 3
}
