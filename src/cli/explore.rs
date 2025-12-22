use std::io::{self, BufRead, Write};
use std::path::Path;

use anyhow::Result;

use crate::store::models::SymbolKind;
use crate::store::queries;
use crate::store::Database;

pub fn run_explore(db_path: &Path, version: &str) -> Result<()> {
    let db = Database::open(db_path)?;

    // Find bundle
    let bundle = db
        .find_bundle_by_version(version)?
        .ok_or_else(|| anyhow::anyhow!("Bundle version '{}' not found", version))?;

    let stats = db.get_bundle_stats(bundle.id)?;

    println!("═══════════════════════════════════════════════════════════════");
    println!("  Exploring: {} ({})", bundle.name, version);
    println!("═══════════════════════════════════════════════════════════════");
    println!("  Modules: {}  Symbols: {}  Strings: {}",
             stats.module_count, stats.symbol_count, stats.string_count);
    println!();
    println!("Commands:");
    println!("  modules          - List all modules");
    println!("  symbols [kind]   - List symbols (optionally filter by kind)");
    println!("  search <pattern> - Search symbols by name");
    println!("  strings <value>  - Find symbols using a string");
    println!("  info <name>      - Show detailed info for a symbol");
    println!("  callers <name>   - Show what calls this symbol");
    println!("  callees <name>   - Show what this symbol calls");
    println!("  quit             - Exit");
    println!();

    let stdin = io::stdin();
    let mut stdout = io::stdout();

    loop {
        print!("explore> ");
        stdout.flush()?;

        let mut line = String::new();
        if stdin.lock().read_line(&mut line)? == 0 {
            break;
        }

        let parts: Vec<&str> = line.trim().split_whitespace().collect();
        if parts.is_empty() {
            continue;
        }

        let command = parts[0];
        let args = &parts[1..];

        match command {
            "quit" | "exit" | "q" => break,
            "modules" => list_modules(&db, bundle.id)?,
            "symbols" => list_symbols(&db, bundle.id, args.first().copied())?,
            "search" => {
                if let Some(pattern) = args.first() {
                    search_symbols(&db, bundle.id, pattern)?;
                } else {
                    println!("Usage: search <pattern>");
                }
            }
            "strings" => {
                if let Some(value) = args.first() {
                    find_by_string(&db, bundle.id, value)?;
                } else {
                    println!("Usage: strings <value>");
                }
            }
            "info" => {
                if let Some(name) = args.first() {
                    show_symbol_info(&db, bundle.id, name)?;
                } else {
                    println!("Usage: info <symbol_name>");
                }
            }
            "callers" => {
                if let Some(name) = args.first() {
                    show_callers(&db, bundle.id, name)?;
                } else {
                    println!("Usage: callers <symbol_name>");
                }
            }
            "callees" => {
                if let Some(name) = args.first() {
                    show_callees(&db, bundle.id, name)?;
                } else {
                    println!("Usage: callees <symbol_name>");
                }
            }
            "help" | "?" => {
                println!("Commands: modules, symbols, search, strings, info, callers, callees, quit");
            }
            _ => {
                println!("Unknown command: {}", command);
            }
        }
        println!();
    }

    Ok(())
}

fn list_modules(db: &Database, bundle_id: i64) -> Result<()> {
    let modules = db.get_modules_by_bundle(bundle_id)?;

    println!("Modules ({}):", modules.len());
    println!("─────────────────────────────────────────────");
    for module in modules.iter().take(50) {
        println!(
            "  {} (size: {}, hash: {}...)",
            module.module_id,
            module.size,
            module.body_hash.as_ref().map(|h| &h[..8]).unwrap_or("none")
        );
    }
    if modules.len() > 50 {
        println!("  ... and {} more", modules.len() - 50);
    }

    Ok(())
}

fn list_symbols(db: &Database, bundle_id: i64, kind_filter: Option<&str>) -> Result<()> {
    let symbols = if let Some(kind_str) = kind_filter {
        if let Some(kind) = SymbolKind::from_str(kind_str) {
            queries::find_symbols_by_kind(&db.conn, bundle_id, kind)?
        } else {
            println!("Unknown kind: {}. Valid: function, class, variable, property, method, parameter, import, export", kind_str);
            return Ok(());
        }
    } else {
        db.get_symbols_by_bundle(bundle_id)?
    };

    println!("Symbols ({}):", symbols.len());
    println!("─────────────────────────────────────────────");
    for symbol in symbols.iter().take(50) {
        println!("  [{}] {}", symbol.kind.as_str(), symbol.name);
    }
    if symbols.len() > 50 {
        println!("  ... and {} more", symbols.len() - 50);
    }

    Ok(())
}

fn search_symbols(db: &Database, bundle_id: i64, pattern: &str) -> Result<()> {
    let symbols = queries::search_symbols(&db.conn, bundle_id, pattern)?;

    println!("Search results for '{}':", pattern);
    println!("─────────────────────────────────────────────");
    for symbol in symbols.iter().take(30) {
        println!("  [{}] {}", symbol.kind.as_str(), symbol.name);
    }
    if symbols.len() > 30 {
        println!("  ... and {} more matches", symbols.len() - 30);
    }
    if symbols.is_empty() {
        println!("  No symbols found matching '{}'", pattern);
    }

    Ok(())
}

fn find_by_string(db: &Database, bundle_id: i64, value: &str) -> Result<()> {
    let strings = db.find_strings_by_value(bundle_id, value)?;

    println!("Symbols using string '{}':", value);
    println!("─────────────────────────────────────────────");

    if strings.is_empty() {
        println!("  No matches found");
        return Ok(());
    }

    let symbols = db.get_symbols_by_bundle(bundle_id)?;
    let symbol_map: std::collections::HashMap<i64, &_> =
        symbols.iter().map(|s| (s.id, s)).collect();

    for string in &strings {
        if let Some(symbol_id) = string.symbol_id {
            if let Some(symbol) = symbol_map.get(&symbol_id) {
                println!(
                    "  [{}] {} (context: {})",
                    symbol.kind.as_str(),
                    symbol.name,
                    string.context.as_deref().unwrap_or("unknown")
                );
            }
        }
    }

    Ok(())
}

fn show_symbol_info(db: &Database, bundle_id: i64, name: &str) -> Result<()> {
    let symbol = db.find_symbol_by_name(bundle_id, name)?;

    match symbol {
        Some(s) => {
            println!("Symbol: {}", s.name);
            println!("─────────────────────────────────────────────");
            println!("  Kind:      {}", s.kind.as_str());
            println!("  ID:        {}", s.id);
            println!("  Module ID: {}", s.module_id);
            if let Some(sig) = &s.signature {
                println!("  Signature: {}", sig);
            }
            if let Some(hash) = &s.body_hash {
                println!("  Body hash: {}", hash);
            }
            if let Some(parent) = s.parent_id {
                println!("  Parent ID: {}", parent);
            }
        }
        None => {
            println!("Symbol '{}' not found", name);
        }
    }

    Ok(())
}

fn show_callers(db: &Database, bundle_id: i64, name: &str) -> Result<()> {
    let symbol = db.find_symbol_by_name(bundle_id, name)?;

    match symbol {
        Some(s) => {
            let calls = db.get_calls_by_callee(s.id)?;
            println!("Callers of '{}':", name);
            println!("─────────────────────────────────────────────");

            if calls.is_empty() {
                println!("  No callers found");
                return Ok(());
            }

            let symbols = db.get_symbols_by_bundle(bundle_id)?;
            let symbol_map: std::collections::HashMap<i64, &_> =
                symbols.iter().map(|s| (s.id, s)).collect();

            for call in &calls {
                if let Some(caller) = symbol_map.get(&call.caller_id) {
                    println!("  {} ({})", caller.name, call.call_type.as_str());
                }
            }
        }
        None => {
            println!("Symbol '{}' not found", name);
        }
    }

    Ok(())
}

fn show_callees(db: &Database, bundle_id: i64, name: &str) -> Result<()> {
    let symbol = db.find_symbol_by_name(bundle_id, name)?;

    match symbol {
        Some(s) => {
            let calls = db.get_calls_by_caller(s.id)?;
            println!("'{}' calls:", name);
            println!("─────────────────────────────────────────────");

            if calls.is_empty() {
                println!("  No outgoing calls found");
                return Ok(());
            }

            let symbols = db.get_symbols_by_bundle(bundle_id)?;
            let symbol_map: std::collections::HashMap<i64, &_> =
                symbols.iter().map(|s| (s.id, s)).collect();

            for call in &calls {
                if let Some(callee) = symbol_map.get(&call.callee_id) {
                    println!("  {} ({})", callee.name, call.call_type.as_str());
                }
            }
        }
        None => {
            println!("Symbol '{}' not found", name);
        }
    }

    Ok(())
}

