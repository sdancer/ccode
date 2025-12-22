use std::collections::HashMap;

use anyhow::Result;

use super::heuristics::{
    match_by_body_hash, match_by_call_graph, match_by_signature, match_by_string_anchors,
    MatchCandidate, MatchReason,
};
use super::scorer::{ScoredMatch, Scorer};
use crate::store::models::{NewMapping, Symbol};
use crate::store::Database;

/// Result of transposing a symbol
#[derive(Debug)]
pub struct TransposeResult {
    pub source_symbol: Symbol,
    pub target_symbol: Option<Symbol>,
    pub confidence: f64,
    pub reasons: Vec<MatchReason>,
}

/// Transpose a single symbol from source to target version
pub fn transpose_symbol(
    db: &Database,
    source_bundle_id: i64,
    target_bundle_id: i64,
    symbol_name: &str,
    min_confidence: f64,
) -> Result<TransposeResult> {
    // Find the source symbol
    let source_symbol = db
        .find_symbol_by_name(source_bundle_id, symbol_name)?
        .ok_or_else(|| anyhow::anyhow!("Symbol '{}' not found in source bundle", symbol_name))?;

    // Check if we already have a mapping
    if let Some(mapping) = db.get_mapping(source_bundle_id, target_bundle_id, source_symbol.id)? {
        if mapping.confidence >= min_confidence {
            let target_symbol = db.get_symbols_by_bundle(target_bundle_id)?
                .into_iter()
                .find(|s| s.id == mapping.target_symbol_id);

            return Ok(TransposeResult {
                source_symbol,
                target_symbol,
                confidence: mapping.confidence,
                reasons: vec![MatchReason::BodyHash], // Simplified, could parse from mapping
            });
        }
    }

    // Try to find a match
    let all_candidates = gather_candidates(db, source_bundle_id, target_bundle_id)?;

    // Filter to candidates for this symbol
    let symbol_candidates: Vec<MatchCandidate> = all_candidates
        .into_iter()
        .filter(|c| c.source_id == source_symbol.id)
        .collect();

    if symbol_candidates.is_empty() {
        return Ok(TransposeResult {
            source_symbol,
            target_symbol: None,
            confidence: 0.0,
            reasons: vec![],
        });
    }

    // Score and find best match
    let scorer = Scorer::new(min_confidence);
    let scored = scorer.combine_scores(&symbol_candidates);

    if let Some(best) = scored.into_iter().next() {
        if best.confidence >= min_confidence {
            let target_symbol = db.get_symbols_by_bundle(target_bundle_id)?
                .into_iter()
                .find(|s| s.id == best.target_id);

            // Store the mapping
            if let Some(ref target) = target_symbol {
                db.insert_mapping(&NewMapping {
                    source_bundle_id,
                    target_bundle_id,
                    source_symbol_id: source_symbol.id,
                    target_symbol_id: target.id,
                    confidence: best.confidence,
                    match_reason: best.reason_string(),
                })?;
            }

            return Ok(TransposeResult {
                source_symbol,
                target_symbol,
                confidence: best.confidence,
                reasons: best.reasons,
            });
        }
    }

    Ok(TransposeResult {
        source_symbol,
        target_symbol: None,
        confidence: 0.0,
        reasons: vec![],
    })
}

/// Build all mappings between two bundle versions
pub fn build_mappings(
    db: &Database,
    source_bundle_id: i64,
    target_bundle_id: i64,
    min_confidence: f64,
) -> Result<Vec<ScoredMatch>> {
    // Gather all candidates from all heuristics
    let mut all_candidates = gather_candidates(db, source_bundle_id, target_bundle_id)?;

    // First pass: find high-confidence matches
    let scorer = Scorer::new(min_confidence);
    let initial_matches = scorer.combine_scores(&all_candidates);

    // Build known mappings for call graph analysis
    let known_mappings: Vec<(i64, i64)> = initial_matches
        .iter()
        .filter(|m| m.confidence >= 0.7)
        .map(|m| (m.source_id, m.target_id))
        .collect();

    // Second pass: use call graph with known mappings
    if !known_mappings.is_empty() {
        let call_graph_candidates = match_by_call_graph(
            db,
            source_bundle_id,
            target_bundle_id,
            &known_mappings,
        )?;
        all_candidates.extend(call_graph_candidates);
    }

    // Final scoring
    let final_matches = scorer.combine_scores(&all_candidates);

    // Store all mappings
    for matched in &final_matches {
        db.insert_mapping(&NewMapping {
            source_bundle_id,
            target_bundle_id,
            source_symbol_id: matched.source_id,
            target_symbol_id: matched.target_id,
            confidence: matched.confidence,
            match_reason: matched.reason_string(),
        })?;
    }

    Ok(final_matches)
}

fn gather_candidates(
    db: &Database,
    source_bundle_id: i64,
    target_bundle_id: i64,
) -> Result<Vec<MatchCandidate>> {
    let mut all_candidates = Vec::new();

    // Add exact name matches
    let source_symbols = db.get_symbols_by_bundle(source_bundle_id)?;
    let target_symbols = db.get_symbols_by_bundle(target_bundle_id)?;

    let target_by_name: HashMap<&str, &Symbol> = target_symbols
        .iter()
        .map(|s| (s.name.as_str(), s))
        .collect();

    for source in &source_symbols {
        if let Some(target) = target_by_name.get(source.name.as_str()) {
            all_candidates.push(MatchCandidate {
                source_id: source.id,
                target_id: target.id,
                score: MatchReason::ExactName.base_score(),
                reason: MatchReason::ExactName,
            });
        }
    }

    // Body hash matches
    let hash_candidates = match_by_body_hash(db, source_bundle_id, target_bundle_id)?;
    all_candidates.extend(hash_candidates);

    // Signature matches
    let sig_candidates = match_by_signature(db, source_bundle_id, target_bundle_id)?;
    all_candidates.extend(sig_candidates);

    // String anchor matches
    let string_candidates = match_by_string_anchors(db, source_bundle_id, target_bundle_id)?;
    all_candidates.extend(string_candidates);

    Ok(all_candidates)
}

/// Get all mappings between two versions with symbol details
pub fn get_mappings_with_details(
    db: &Database,
    source_bundle_id: i64,
    target_bundle_id: i64,
) -> Result<Vec<MappingDetails>> {
    let mappings = db.get_mappings_between(source_bundle_id, target_bundle_id)?;
    let source_symbols = db.get_symbols_by_bundle(source_bundle_id)?;
    let target_symbols = db.get_symbols_by_bundle(target_bundle_id)?;

    let source_map: HashMap<i64, &Symbol> = source_symbols.iter().map(|s| (s.id, s)).collect();
    let target_map: HashMap<i64, &Symbol> = target_symbols.iter().map(|s| (s.id, s)).collect();

    let mut results = Vec::new();

    for mapping in mappings {
        if let (Some(source), Some(target)) = (
            source_map.get(&mapping.source_symbol_id),
            target_map.get(&mapping.target_symbol_id),
        ) {
            results.push(MappingDetails {
                source_name: source.name.clone(),
                target_name: target.name.clone(),
                source_kind: source.kind,
                target_kind: target.kind,
                confidence: mapping.confidence,
                reason: mapping.match_reason,
            });
        }
    }

    Ok(results)
}

#[derive(Debug)]
pub struct MappingDetails {
    pub source_name: String,
    pub target_name: String,
    pub source_kind: crate::store::models::SymbolKind,
    pub target_kind: crate::store::models::SymbolKind,
    pub confidence: f64,
    pub reason: String,
}
