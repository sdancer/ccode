use std::fs;
use std::time::Instant;
use swc_common::{
    comments::SingleThreadedComments,
    sync::Lrc,
    FileName, SourceMap,
};
use swc_ecma_parser::{Lexer, Parser, StringInput, Syntax, EsSyntax};
use swc_ecma_visit::VisitWith;

// Import the visitor from the library
use webpack_symbols::parser::visitor::SymbolVisitor;

fn main() {
    let args: Vec<String> = std::env::args().collect();
    if args.len() < 2 {
        eprintln!("Usage: bench_extract <file.js>");
        std::process::exit(1);
    }

    let path = &args[1];

    println!("Reading file...");
    let source = fs::read_to_string(path).expect("Failed to read file");
    println!("  {} bytes", source.len());

    println!("\nParsing...");
    let start = Instant::now();

    let cm: Lrc<SourceMap> = Default::default();
    let fm = cm.new_source_file(
        Lrc::new(FileName::Real(path.into())),
        source,
    );

    let comments = SingleThreadedComments::default();
    let lexer = Lexer::new(
        Syntax::Es(EsSyntax { jsx: true, ..Default::default() }),
        Default::default(),
        StringInput::from(&*fm),
        Some(&comments),
    );

    let mut parser = Parser::new_from(lexer);
    let module = parser.parse_module().expect("Parse failed");
    println!("  Parse: {:?}", start.elapsed());

    println!("\nExtracting symbols...");
    let start = Instant::now();
    let mut visitor = SymbolVisitor::new();
    module.visit_with(&mut visitor);
    println!("  Extract: {:?}", start.elapsed());

    println!("\nResults:");
    println!("  Symbols: {}", visitor.symbols.len());
    println!("  Strings: {}", visitor.strings.len());
    println!("  Calls: {}", visitor.calls.len());
}
