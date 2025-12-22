use anyhow::{Context, Result};
use sha2::{Sha256, Digest};
use std::fs;
use std::path::Path;
use swc_common::{
    comments::SingleThreadedComments,
    sync::Lrc,
    FileName, SourceMap,
};
use swc_ecma_parser::{Lexer, Parser, StringInput, Syntax, EsSyntax};
use swc_ecma_visit::VisitWith;

use super::visitor::{ExtractedCall, ExtractedString, ExtractedSymbol, SymbolVisitor};
use super::webpack::{detect_webpack_modules, WebpackModule};

/// Result of extracting symbols from a bundle
#[derive(Debug)]
pub struct ExtractionResult {
    pub file_hash: String,
    pub modules: Vec<ModuleExtraction>,
}

/// Extracted data for a single webpack module
#[derive(Debug)]
pub struct ModuleExtraction {
    pub module_id: String,
    pub size: usize,
    pub body_hash: String,
    pub symbols: Vec<ExtractedSymbol>,
    pub strings: Vec<ExtractedString>,
    pub calls: Vec<ExtractedCall>,
}

/// Extract all symbols from a webpack bundle
pub fn extract_bundle(path: &Path) -> Result<ExtractionResult> {
    let source = fs::read_to_string(path)
        .with_context(|| format!("Failed to read file: {:?}", path))?;

    let file_hash = compute_hash(&source);

    // Parse the JavaScript
    let cm: Lrc<SourceMap> = Default::default();

    let fm = cm.new_source_file(
        Lrc::new(FileName::Real(path.to_path_buf())),
        source.clone(),
    );

    let comments = SingleThreadedComments::default();

    let lexer = Lexer::new(
        Syntax::Es(EsSyntax {
            jsx: true,
            ..Default::default()
        }),
        Default::default(),
        StringInput::from(&*fm),
        Some(&comments),
    );

    let mut parser = Parser::new_from(lexer);

    let module = parser
        .parse_module()
        .map_err(|e| {
            anyhow::anyhow!("Failed to parse JavaScript: {:?}", e)
        })?;

    // Detect webpack modules
    let webpack_modules = detect_webpack_modules(&module);

    // Extract symbols from each module
    let mut modules = Vec::new();

    for wm in webpack_modules {
        let extraction = extract_module(&wm, &source)?;
        modules.push(extraction);
    }

    Ok(ExtractionResult { file_hash, modules })
}

fn extract_module(wm: &WebpackModule, source: &str) -> Result<ModuleExtraction> {
    let mut visitor = SymbolVisitor::new();

    // Visit all statements in the module
    for stmt in &wm.body {
        stmt.visit_with(&mut visitor);
    }

    // Compute body hash from the source span
    let start = wm.span.lo.0 as usize;
    let end = wm.span.hi.0 as usize;
    let module_source = if end <= source.len() && start < end {
        &source[start..end]
    } else {
        ""
    };
    let body_hash = compute_hash(module_source);
    let size = module_source.len();

    Ok(ModuleExtraction {
        module_id: wm.id.clone(),
        size,
        body_hash,
        symbols: visitor.symbols,
        strings: visitor.strings,
        calls: visitor.calls,
    })
}

fn compute_hash(content: &str) -> String {
    let mut hasher = Sha256::new();
    hasher.update(content.as_bytes());
    hex::encode(hasher.finalize())
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::io::Write;
    use tempfile::NamedTempFile;

    #[test]
    fn test_extract_simple_function() {
        let code = r#"
            function hello(name) {
                return "Hello, " + name;
            }
        "#;

        let mut file = NamedTempFile::new().unwrap();
        file.write_all(code.as_bytes()).unwrap();

        let result = extract_bundle(file.path()).unwrap();
        assert_eq!(result.modules.len(), 1);

        let module = &result.modules[0];
        assert!(!module.symbols.is_empty());

        // Should find the hello function
        let hello = module.symbols.iter().find(|s| s.name == "hello");
        assert!(hello.is_some());
    }

    #[test]
    fn test_extract_webpack_iife() {
        let code = r#"
            (function(modules) {
                // webpack runtime
            })([
                function(module, exports) {
                    function add(a, b) { return a + b; }
                    module.exports = add;
                },
                function(module, exports) {
                    var multiply = function(a, b) { return a * b; };
                }
            ]);
        "#;

        let mut file = NamedTempFile::new().unwrap();
        file.write_all(code.as_bytes()).unwrap();

        let result = extract_bundle(file.path()).unwrap();

        // Should detect multiple webpack modules
        assert!(result.modules.len() >= 1);
    }

    #[test]
    fn test_extract_class() {
        let code = r#"
            class Calculator {
                add(a, b) {
                    return a + b;
                }
                multiply(a, b) {
                    return a * b;
                }
            }
        "#;

        let mut file = NamedTempFile::new().unwrap();
        file.write_all(code.as_bytes()).unwrap();

        let result = extract_bundle(file.path()).unwrap();
        let module = &result.modules[0];

        // Should find the class
        let class = module.symbols.iter().find(|s| s.name == "Calculator");
        assert!(class.is_some());

        // Should find methods
        let add = module.symbols.iter().find(|s| s.name == "Calculator.add");
        assert!(add.is_some());
    }
}
