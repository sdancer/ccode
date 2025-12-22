use std::path::Path;
use std::time::Instant;

use anyhow::{Context, Result};

use crate::parser::extract_bundle;
use crate::store::models::{NewBundle, NewCall, NewModule, NewStringLiteral, NewSymbol};
use crate::store::Database;

pub fn run_extract(
    bundle_path: &Path,
    version: Option<&str>,
    name: Option<&str>,
    db_path: &Path,
) -> Result<()> {
    let total_start = Instant::now();
    println!("Extracting symbols from {:?}...", bundle_path);

    // Open or create database
    let db = Database::open(db_path)?;

    // Extract symbols from the bundle
    let extract_start = Instant::now();
    let result = extract_bundle(bundle_path)
        .with_context(|| format!("Failed to extract symbols from {:?}", bundle_path))?;
    let extract_time = extract_start.elapsed();

    // Determine bundle name
    let bundle_name = name
        .map(String::from)
        .unwrap_or_else(|| {
            bundle_path
                .file_name()
                .and_then(|n| n.to_str())
                .map(String::from)
                .unwrap_or_else(|| "unknown".to_string())
        });

    let bundle_version = version.map(String::from);

    // Check if bundle already exists
    if let Some(ver) = &bundle_version {
        if db.get_bundle_by_version(&bundle_name, ver)?.is_some() {
            println!("Bundle {} version {} already exists, skipping.", bundle_name, ver);
            return Ok(());
        }
    }

    // Start transaction for fast inserts
    let insert_start = Instant::now();
    db.begin_transaction()?;

    // Insert bundle
    let bundle_id = db.insert_bundle(&NewBundle {
        name: bundle_name.clone(),
        version: bundle_version.clone(),
        path: bundle_path.to_string_lossy().to_string(),
        hash: result.file_hash.clone(),
    })?;

    let mut total_symbols = 0;
    let mut total_strings = 0;
    let mut total_calls = 0;

    // Insert modules and symbols
    for module_extraction in &result.modules {
        let module_id = db.insert_module(&NewModule {
            bundle_id,
            module_id: module_extraction.module_id.clone(),
            size: module_extraction.size as i64,
            body_hash: Some(module_extraction.body_hash.clone()),
        })?;

        // Track symbol name -> id for call graph
        let mut symbol_name_to_id = std::collections::HashMap::new();

        // Build symbol batch
        let symbols: Vec<NewSymbol> = module_extraction.symbols.iter().map(|symbol| {
            NewSymbol {
                module_id,
                kind: symbol.kind,
                name: symbol.name.clone(),
                parent_id: None,
                body_hash: symbol.body_hash.clone(),
                signature: symbol.signature.clone(),
                metadata: None,
            }
        }).collect();

        // Insert symbols and track IDs
        let symbol_ids = db.insert_symbols_batch(&symbols)?;
        for (symbol, id) in module_extraction.symbols.iter().zip(symbol_ids.iter()) {
            symbol_name_to_id.insert(symbol.name.clone(), *id);
        }
        total_symbols += symbols.len();

        // Build string batch
        let strings: Vec<NewStringLiteral> = module_extraction.strings.iter().map(|string| {
            let symbol_id = string
                .parent_symbol
                .as_ref()
                .and_then(|name| symbol_name_to_id.get(name).copied());

            NewStringLiteral {
                module_id,
                symbol_id,
                value: string.value.clone(),
                context: Some(string.context.as_str().to_string()),
            }
        }).collect();

        db.insert_strings_batch(&strings)?;
        total_strings += strings.len();

        // Build call batch
        let calls: Vec<NewCall> = module_extraction.calls.iter().filter_map(|call| {
            if let (Some(&caller_id), Some(&callee_id)) = (
                symbol_name_to_id.get(&call.caller),
                symbol_name_to_id.get(&call.callee),
            ) {
                Some(NewCall {
                    caller_id,
                    callee_id,
                    call_type: call.call_type,
                })
            } else {
                None
            }
        }).collect();

        db.insert_calls_batch(&calls)?;
        total_calls += calls.len();
    }

    // Commit transaction
    db.commit_transaction()?;
    let insert_time = insert_start.elapsed();

    // Print summary
    println!("\nExtraction complete!");
    println!("───────────────────────────────────────");
    println!("  Bundle:    {}", bundle_name);
    if let Some(ver) = &bundle_version {
        println!("  Version:   {}", ver);
    }
    println!("  Modules:   {}", result.modules.len());
    println!("  Symbols:   {}", total_symbols);
    println!("  Strings:   {}", total_strings);
    println!("  Calls:     {}", total_calls);
    println!("  File hash: {}...", &result.file_hash[..16]);
    println!("───────────────────────────────────────");
    println!("  Parse+Extract: {:?}", extract_time);
    println!("  DB Insert:     {:?}", insert_time);
    println!("  Total:         {:?}", total_start.elapsed());

    Ok(())
}
