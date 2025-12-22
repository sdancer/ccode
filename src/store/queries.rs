// Additional complex queries for the database

use anyhow::Result;
use rusqlite::{params, Connection};
use std::collections::HashMap;

use super::models::*;

/// Find symbols with similar signatures in another bundle
pub fn find_similar_signatures(
    conn: &Connection,
    source_bundle_id: i64,
    target_bundle_id: i64,
) -> Result<Vec<(Symbol, Symbol)>> {
    let mut stmt = conn.prepare(
        "SELECT
            s1.id, s1.module_id, s1.kind, s1.name, s1.parent_id, s1.body_hash, s1.signature, s1.metadata,
            s2.id, s2.module_id, s2.kind, s2.name, s2.parent_id, s2.body_hash, s2.signature, s2.metadata
         FROM symbols s1
         JOIN modules m1 ON s1.module_id = m1.id
         JOIN symbols s2 ON s1.signature = s2.signature AND s1.kind = s2.kind
         JOIN modules m2 ON s2.module_id = m2.id
         WHERE m1.bundle_id = ?1 AND m2.bundle_id = ?2
         AND s1.signature IS NOT NULL"
    )?;

    let pairs = stmt.query_map(params![source_bundle_id, target_bundle_id], |row| {
        let kind1_str: String = row.get(2)?;
        let meta1_str: Option<String> = row.get(7)?;
        let kind2_str: String = row.get(10)?;
        let meta2_str: Option<String> = row.get(15)?;

        Ok((
            Symbol {
                id: row.get(0)?,
                module_id: row.get(1)?,
                kind: SymbolKind::from_str(&kind1_str).unwrap_or(SymbolKind::Variable),
                name: row.get(3)?,
                parent_id: row.get(4)?,
                body_hash: row.get(5)?,
                signature: row.get(6)?,
                metadata: meta1_str.and_then(|s| serde_json::from_str(&s).ok()),
            },
            Symbol {
                id: row.get(8)?,
                module_id: row.get(9)?,
                kind: SymbolKind::from_str(&kind2_str).unwrap_or(SymbolKind::Variable),
                name: row.get(11)?,
                parent_id: row.get(12)?,
                body_hash: row.get(13)?,
                signature: row.get(14)?,
                metadata: meta2_str.and_then(|s| serde_json::from_str(&s).ok()),
            },
        ))
    })?;

    pairs.collect::<Result<Vec<_>, _>>().map_err(Into::into)
}

/// Find symbols with matching body hashes between bundles
pub fn find_matching_body_hashes(
    conn: &Connection,
    source_bundle_id: i64,
    target_bundle_id: i64,
) -> Result<Vec<(Symbol, Symbol)>> {
    let mut stmt = conn.prepare(
        "SELECT
            s1.id, s1.module_id, s1.kind, s1.name, s1.parent_id, s1.body_hash, s1.signature, s1.metadata,
            s2.id, s2.module_id, s2.kind, s2.name, s2.parent_id, s2.body_hash, s2.signature, s2.metadata
         FROM symbols s1
         JOIN modules m1 ON s1.module_id = m1.id
         JOIN symbols s2 ON s1.body_hash = s2.body_hash
         JOIN modules m2 ON s2.module_id = m2.id
         WHERE m1.bundle_id = ?1 AND m2.bundle_id = ?2
         AND s1.body_hash IS NOT NULL"
    )?;

    let pairs = stmt.query_map(params![source_bundle_id, target_bundle_id], |row| {
        let kind1_str: String = row.get(2)?;
        let meta1_str: Option<String> = row.get(7)?;
        let kind2_str: String = row.get(10)?;
        let meta2_str: Option<String> = row.get(15)?;

        Ok((
            Symbol {
                id: row.get(0)?,
                module_id: row.get(1)?,
                kind: SymbolKind::from_str(&kind1_str).unwrap_or(SymbolKind::Variable),
                name: row.get(3)?,
                parent_id: row.get(4)?,
                body_hash: row.get(5)?,
                signature: row.get(6)?,
                metadata: meta1_str.and_then(|s| serde_json::from_str(&s).ok()),
            },
            Symbol {
                id: row.get(8)?,
                module_id: row.get(9)?,
                kind: SymbolKind::from_str(&kind2_str).unwrap_or(SymbolKind::Variable),
                name: row.get(11)?,
                parent_id: row.get(12)?,
                body_hash: row.get(13)?,
                signature: row.get(14)?,
                metadata: meta2_str.and_then(|s| serde_json::from_str(&s).ok()),
            },
        ))
    })?;

    pairs.collect::<Result<Vec<_>, _>>().map_err(Into::into)
}

/// Find string anchors shared between bundles (symbols using same strings)
pub fn find_shared_string_anchors(
    conn: &Connection,
    source_bundle_id: i64,
    target_bundle_id: i64,
) -> Result<HashMap<String, Vec<(i64, i64)>>> {
    let mut stmt = conn.prepare(
        "SELECT st1.value, st1.symbol_id, st2.symbol_id
         FROM strings st1
         JOIN modules m1 ON st1.module_id = m1.id
         JOIN strings st2 ON st1.value = st2.value
         JOIN modules m2 ON st2.module_id = m2.id
         WHERE m1.bundle_id = ?1 AND m2.bundle_id = ?2
         AND st1.symbol_id IS NOT NULL AND st2.symbol_id IS NOT NULL"
    )?;

    let mut result: HashMap<String, Vec<(i64, i64)>> = HashMap::new();

    stmt.query_map(params![source_bundle_id, target_bundle_id], |row| {
        Ok((
            row.get::<_, String>(0)?,
            row.get::<_, i64>(1)?,
            row.get::<_, i64>(2)?,
        ))
    })?
    .filter_map(|r| r.ok())
    .for_each(|(value, sym1, sym2)| {
        result.entry(value).or_default().push((sym1, sym2));
    });

    Ok(result)
}

/// Get call graph edges for a bundle
pub fn get_bundle_call_graph(
    conn: &Connection,
    bundle_id: i64,
) -> Result<Vec<(i64, i64, String)>> {
    let mut stmt = conn.prepare(
        "SELECT c.caller_id, c.callee_id, c.call_type
         FROM calls c
         JOIN symbols s1 ON c.caller_id = s1.id
         JOIN modules m1 ON s1.module_id = m1.id
         WHERE m1.bundle_id = ?1"
    )?;

    let edges = stmt.query_map(params![bundle_id], |row| {
        Ok((row.get(0)?, row.get(1)?, row.get(2)?))
    })?;

    edges.collect::<Result<Vec<_>, _>>().map_err(Into::into)
}

/// Find symbols by kind in a bundle
pub fn find_symbols_by_kind(
    conn: &Connection,
    bundle_id: i64,
    kind: SymbolKind,
) -> Result<Vec<Symbol>> {
    let mut stmt = conn.prepare(
        "SELECT s.id, s.module_id, s.kind, s.name, s.parent_id, s.body_hash, s.signature, s.metadata
         FROM symbols s
         JOIN modules m ON s.module_id = m.id
         WHERE m.bundle_id = ?1 AND s.kind = ?2"
    )?;

    let symbols = stmt.query_map(params![bundle_id, kind.as_str()], |row| {
        let kind_str: String = row.get(2)?;
        let metadata_str: Option<String> = row.get(7)?;

        Ok(Symbol {
            id: row.get(0)?,
            module_id: row.get(1)?,
            kind: SymbolKind::from_str(&kind_str).unwrap_or(SymbolKind::Variable),
            name: row.get(3)?,
            parent_id: row.get(4)?,
            body_hash: row.get(5)?,
            signature: row.get(6)?,
            metadata: metadata_str.and_then(|s| serde_json::from_str(&s).ok()),
        })
    })?;

    symbols.collect::<Result<Vec<_>, _>>().map_err(Into::into)
}

/// Search symbols by name pattern
pub fn search_symbols(
    conn: &Connection,
    bundle_id: i64,
    pattern: &str,
) -> Result<Vec<Symbol>> {
    let mut stmt = conn.prepare(
        "SELECT s.id, s.module_id, s.kind, s.name, s.parent_id, s.body_hash, s.signature, s.metadata
         FROM symbols s
         JOIN modules m ON s.module_id = m.id
         WHERE m.bundle_id = ?1 AND s.name LIKE ?2"
    )?;

    let search_pattern = format!("%{}%", pattern);
    let symbols = stmt.query_map(params![bundle_id, search_pattern], |row| {
        let kind_str: String = row.get(2)?;
        let metadata_str: Option<String> = row.get(7)?;

        Ok(Symbol {
            id: row.get(0)?,
            module_id: row.get(1)?,
            kind: SymbolKind::from_str(&kind_str).unwrap_or(SymbolKind::Variable),
            name: row.get(3)?,
            parent_id: row.get(4)?,
            body_hash: row.get(5)?,
            signature: row.get(6)?,
            metadata: metadata_str.and_then(|s| serde_json::from_str(&s).ok()),
        })
    })?;

    symbols.collect::<Result<Vec<_>, _>>().map_err(Into::into)
}
