use std::collections::HashMap;
use std::fs;
use std::path::Path;

use rusqlite::Connection;
use serde::Deserialize;
use swc_common::{SourceMap, FileName, GLOBALS, Globals, comments::SingleThreadedComments, sync::Lrc};
use swc_ecma_ast::*;
use swc_ecma_codegen::{text_writer::JsWriter, Emitter, Config as CodegenConfig};
use swc_ecma_parser::{parse_file_as_module, Syntax, EsSyntax};
use swc_ecma_visit::{VisitMut, VisitMutWith};

#[derive(Debug, Deserialize)]
struct NameMapping {
    minified: String,
    original: String,
    library: String,
    confidence: f64,
}

/// AST visitor that replaces minified identifiers with original names
struct SymbolReplacer {
    mappings: HashMap<String, (String, String)>, // minified -> (original, library)
    replacements: usize,
}

impl SymbolReplacer {
    fn new(mappings: HashMap<String, (String, String)>) -> Self {
        Self { mappings, replacements: 0 }
    }

    fn replace_ident(&mut self, ident: &mut Ident) {
        let name = ident.sym.as_str();
        if let Some((original, _lib)) = self.mappings.get(name) {
            // Replace with original name
            ident.sym = original.clone().into();
            self.replacements += 1;
        }
    }
}

impl VisitMut for SymbolReplacer {
    fn visit_mut_ident(&mut self, n: &mut Ident) {
        self.replace_ident(n);
    }

    fn visit_mut_binding_ident(&mut self, n: &mut BindingIdent) {
        self.replace_ident(&mut n.id);
    }
}

fn main() {
    let conn = Connection::open("test.db").expect("Failed to open database");

    // Load name mappings
    let mut mappings: HashMap<String, (String, String)> = HashMap::new();

    // From name_mappings.json
    let mappings_path = "lib_signatures/name_mappings.json";
    if Path::new(mappings_path).exists() {
        if let Ok(content) = fs::read_to_string(mappings_path) {
            if let Ok(name_mappings) = serde_json::from_str::<Vec<NameMapping>>(&content) {
                for m in name_mappings {
                    if m.confidence >= 0.5 {
                        mappings.insert(m.minified.clone(), (m.original.clone(), m.library.clone()));
                    }
                }
            }
        }
    }

    // From library_cache
    let mut stmt = conn.prepare(
        "SELECT minified_name, cleartext_name, library_name FROM library_cache
         WHERE cleartext_name IS NOT NULL AND library_name IS NOT NULL
         AND library_name != 'claude-code'"
    ).unwrap();

    if let Ok(rows) = stmt.query_map([], |row| {
        Ok((
            row.get::<_, String>(0)?,
            row.get::<_, String>(1)?,
            row.get::<_, String>(2)?,
        ))
    }) {
        for row in rows.flatten() {
            mappings.insert(row.0, (row.1, row.2));
        }
    }

    println!("Loaded {} symbol mappings\n", mappings.len());

    // Create output directory
    let out_dir = Path::new("app_modules_ast");
    if out_dir.exists() {
        fs::remove_dir_all(out_dir).ok();
    }
    fs::create_dir_all(out_dir).unwrap();

    // Process app_modules
    let app_dir = Path::new("app_modules");
    let mut total_files = 0;
    let mut total_replacements = 0;

    GLOBALS.set(&Globals::new(), || {
        process_directory(app_dir, out_dir, &mappings, &mut total_files, &mut total_replacements);
    });

    println!("\n═══════════════════════════════════════════════════════════════");
    println!("AST-based Deobfuscation Summary");
    println!("═══════════════════════════════════════════════════════════════\n");
    println!("Files processed: {}", total_files);
    println!("Total replacements: {}", total_replacements);
    println!("\nOutput: {}/", out_dir.display());
}

fn process_directory(
    src_dir: &Path,
    out_dir: &Path,
    mappings: &HashMap<String, (String, String)>,
    total_files: &mut usize,
    total_replacements: &mut usize,
) {
    for entry in fs::read_dir(src_dir).unwrap() {
        let entry = entry.unwrap();
        let path = entry.path();

        if path.is_dir() {
            let dir_name = path.file_name().unwrap();
            let new_out_dir = out_dir.join(dir_name);
            fs::create_dir_all(&new_out_dir).ok();
            process_directory(&path, &new_out_dir, mappings, total_files, total_replacements);
        } else if path.extension().map(|e| e == "js").unwrap_or(false) {
            if let Some(replacements) = process_file(&path, out_dir, mappings) {
                *total_files += 1;
                *total_replacements += replacements;
                if replacements > 0 {
                    println!("  {} - {} replacements", path.file_name().unwrap().to_str().unwrap(), replacements);
                }
            }
        }
    }
}

fn process_file(
    src_path: &Path,
    out_dir: &Path,
    mappings: &HashMap<String, (String, String)>,
) -> Option<usize> {
    let content = fs::read_to_string(src_path).ok()?;

    // Skip if too small
    if content.len() < 50 {
        // Just copy
        let out_path = out_dir.join(src_path.file_name()?);
        fs::write(&out_path, &content).ok();
        return Some(0);
    }

    // Find where the actual code starts (skip our comment headers)
    let code_start = content.find("var ").unwrap_or(0);
    let code = &content[code_start..];

    // Create source map
    let cm: Lrc<SourceMap> = Lrc::new(SourceMap::default());
    let fm = cm.new_source_file(
        Lrc::new(FileName::Custom(src_path.to_string_lossy().to_string())),
        code.to_string(),
    );

    // Parse
    let comments = SingleThreadedComments::default();
    let module = parse_file_as_module(
        &fm,
        Syntax::Es(EsSyntax::default()),
        EsVersion::Es2022,
        Some(&comments),
        &mut vec![],
    );

    let mut module = match module {
        Ok(m) => m,
        Err(_) => {
            // Parse failed, just copy original
            let out_path = out_dir.join(src_path.file_name()?);
            fs::write(&out_path, &content).ok();
            return Some(0);
        }
    };

    // Apply symbol replacement
    let mut replacer = SymbolReplacer::new(mappings.clone());
    module.visit_mut_with(&mut replacer);

    // Emit code
    let mut buf = vec![];
    {
        let wr = JsWriter::new(cm.clone(), "\n", &mut buf, None);
        let mut emitter = Emitter {
            cfg: CodegenConfig::default().with_minify(false),
            cm: cm.clone(),
            comments: Some(&comments),
            wr: Box::new(wr),
        };
        emitter.emit_module(&module).ok()?;
    }

    let output = String::from_utf8(buf).ok()?;

    // Write with header preserved
    let out_path = out_dir.join(src_path.file_name()?);
    let header = &content[..code_start];
    let full_output = format!("{}{}", header, output);
    fs::write(&out_path, full_output).ok();

    Some(replacer.replacements)
}
