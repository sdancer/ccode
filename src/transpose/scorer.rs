use std::collections::HashMap;

use super::heuristics::{MatchCandidate, MatchReason};

/// Combine multiple match candidates into final scores
pub struct Scorer {
    /// Weight for each match reason
    weights: HashMap<MatchReason, f64>,
    /// Minimum confidence threshold
    min_confidence: f64,
}

impl Scorer {
    pub fn new(min_confidence: f64) -> Self {
        let mut weights = HashMap::new();
        weights.insert(MatchReason::ExactName, 1.0);
        weights.insert(MatchReason::BodyHash, 0.9);
        weights.insert(MatchReason::StringAnchor, 0.6);
        weights.insert(MatchReason::Signature, 0.5);
        weights.insert(MatchReason::CallGraph, 0.4);
        weights.insert(MatchReason::StructuralSimilarity, 0.3);

        Self {
            weights,
            min_confidence,
        }
    }

    /// Combine candidates for the same source symbol
    pub fn combine_scores(&self, candidates: &[MatchCandidate]) -> Vec<ScoredMatch> {
        // Group by source_id
        let mut by_source: HashMap<i64, Vec<&MatchCandidate>> = HashMap::new();
        for candidate in candidates {
            by_source
                .entry(candidate.source_id)
                .or_default()
                .push(candidate);
        }

        let mut results = Vec::new();

        for (source_id, source_candidates) in by_source {
            // Group by target_id
            let mut by_target: HashMap<i64, Vec<&MatchCandidate>> = HashMap::new();
            for candidate in source_candidates {
                by_target
                    .entry(candidate.target_id)
                    .or_default()
                    .push(candidate);
            }

            // Combine scores for each target
            let mut target_scores: Vec<(i64, f64, Vec<MatchReason>)> = by_target
                .into_iter()
                .map(|(target_id, candidates)| {
                    let (score, reasons) = self.combine_candidate_scores(&candidates);
                    (target_id, score, reasons)
                })
                .collect();

            // Sort by score descending
            target_scores.sort_by(|a, b| b.1.partial_cmp(&a.1).unwrap());

            // Take the best match if above threshold
            if let Some((target_id, score, reasons)) = target_scores.into_iter().next() {
                if score >= self.min_confidence {
                    results.push(ScoredMatch {
                        source_id,
                        target_id,
                        confidence: score,
                        reasons,
                    });
                }
            }
        }

        // Sort results by confidence
        results.sort_by(|a, b| b.confidence.partial_cmp(&a.confidence).unwrap());

        results
    }

    fn combine_candidate_scores(&self, candidates: &[&MatchCandidate]) -> (f64, Vec<MatchReason>) {
        let mut total_score = 0.0;
        let mut total_weight = 0.0;
        let mut reasons = Vec::new();

        for candidate in candidates {
            let weight = self.weights.get(&candidate.reason).copied().unwrap_or(0.5);
            total_score += candidate.score * weight;
            total_weight += weight;
            if !reasons.contains(&candidate.reason) {
                reasons.push(candidate.reason);
            }
        }

        let combined = if total_weight > 0.0 {
            (total_score / total_weight).min(1.0)
        } else {
            0.0
        };

        // Boost score if multiple reasons agree
        let boost = match reasons.len() {
            1 => 1.0,
            2 => 1.1,
            3 => 1.2,
            _ => 1.3,
        };

        ((combined * boost).min(1.0), reasons)
    }
}

#[derive(Debug, Clone)]
pub struct ScoredMatch {
    pub source_id: i64,
    pub target_id: i64,
    pub confidence: f64,
    pub reasons: Vec<MatchReason>,
}

impl ScoredMatch {
    pub fn reason_string(&self) -> String {
        self.reasons
            .iter()
            .map(|r| r.as_str())
            .collect::<Vec<_>>()
            .join("+")
    }
}

impl Default for Scorer {
    fn default() -> Self {
        Self::new(0.5)
    }
}
