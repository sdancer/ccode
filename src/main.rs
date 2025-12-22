use anyhow::Result;
use clap::{Parser, Subcommand};
use std::path::PathBuf;

mod cli;
mod compare;
mod parser;
mod store;
mod transpose;

use cli::{compare::run_compare, explore::run_explore, extract::run_extract, transpose::run_transpose};

#[derive(Parser)]
#[command(name = "webpack-symbols")]
#[command(about = "Extract, compare, and transpose symbols from webpack bundles")]
#[command(version)]
struct Cli {
    #[command(subcommand)]
    command: Commands,
}

#[derive(Subcommand)]
enum Commands {
    /// Extract symbols from a webpack bundle
    Extract {
        /// Path to the webpack bundle
        bundle: PathBuf,

        /// Version identifier for this bundle
        #[arg(short, long)]
        version: Option<String>,

        /// Bundle name (defaults to filename)
        #[arg(short, long)]
        name: Option<String>,

        /// Path to the SQLite database
        #[arg(short, long, default_value = "symbols.db")]
        db: PathBuf,
    },

    /// Compare symbols between two bundle versions
    Compare {
        /// Source version to compare from
        #[arg(long)]
        from: String,

        /// Target version to compare to
        #[arg(long)]
        to: String,

        /// Path to the SQLite database
        #[arg(short, long, default_value = "symbols.db")]
        db: PathBuf,

        /// Output format (text, json)
        #[arg(short, long, default_value = "text")]
        format: String,
    },

    /// Transpose a symbol from one version to another
    Transpose {
        /// Symbol to transpose (e.g., "a.prototype.b")
        #[arg(short, long)]
        symbol: String,

        /// Source version
        #[arg(long)]
        from: String,

        /// Target version
        #[arg(long)]
        to: String,

        /// Path to the SQLite database
        #[arg(short, long, default_value = "symbols.db")]
        db: PathBuf,

        /// Minimum confidence threshold (0.0 - 1.0)
        #[arg(long, default_value = "0.5")]
        min_confidence: f64,
    },

    /// Export symbol mappings between versions
    Export {
        /// Source version
        #[arg(long)]
        from: String,

        /// Target version
        #[arg(long)]
        to: String,

        /// Path to the SQLite database
        #[arg(short, long, default_value = "symbols.db")]
        db: PathBuf,

        /// Output format (json, csv)
        #[arg(short, long, default_value = "json")]
        format: String,

        /// Output file (stdout if not specified)
        #[arg(short, long)]
        output: Option<PathBuf>,
    },

    /// Interactively explore symbols in a bundle
    Explore {
        /// Version to explore
        #[arg(short, long)]
        version: String,

        /// Path to the SQLite database
        #[arg(short, long, default_value = "symbols.db")]
        db: PathBuf,
    },
}

fn main() -> Result<()> {
    let cli = Cli::parse();

    match cli.command {
        Commands::Extract {
            bundle,
            version,
            name,
            db,
        } => {
            run_extract(&bundle, version.as_deref(), name.as_deref(), &db)?;
        }
        Commands::Compare { from, to, db, format } => {
            run_compare(&db, &from, &to, &format)?;
        }
        Commands::Transpose {
            symbol,
            from,
            to,
            db,
            min_confidence,
        } => {
            run_transpose(&db, &symbol, &from, &to, min_confidence)?;
        }
        Commands::Export {
            from,
            to,
            db,
            format,
            output,
        } => {
            cli::export::run_export(&db, &from, &to, &format, output.as_deref())?;
        }
        Commands::Explore { version, db } => {
            run_explore(&db, &version)?;
        }
    }

    Ok(())
}
