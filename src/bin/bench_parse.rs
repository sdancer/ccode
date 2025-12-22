use std::fs;
use std::time::Instant;
use swc_common::{
    comments::SingleThreadedComments,
    sync::Lrc,
    FileName, SourceMap,
};
use swc_ecma_parser::{Lexer, Parser, StringInput, Syntax, EsSyntax};

fn main() {
    let args: Vec<String> = std::env::args().collect();
    if args.len() < 2 {
        eprintln!("Usage: bench_parse <file.js>");
        std::process::exit(1);
    }

    let path = &args[1];

    println!("Reading file...");
    let start = Instant::now();
    let source = fs::read_to_string(path).expect("Failed to read file");
    println!("  Read {} bytes in {:?}", source.len(), start.elapsed());

    println!("\nParsing with swc...");
    let start = Instant::now();

    let cm: Lrc<SourceMap> = Default::default();
    let fm = cm.new_source_file(
        Lrc::new(FileName::Real(path.into())),
        source,
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

    let parse_start = Instant::now();
    let module = parser.parse_module();
    let parse_time = parse_start.elapsed();

    let total_time = start.elapsed();

    match module {
        Ok(m) => {
            println!("  Parse time: {:?}", parse_time);
            println!("  Total time: {:?}", total_time);
            println!("  Module items: {}", m.body.len());
        }
        Err(e) => {
            eprintln!("  Parse error: {:?}", e);
        }
    }
}
