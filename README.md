# Webpack Symbol Extractor & Transposer

A Rust toolkit for reverse engineering webpack bundles — extracting symbols, identifying libraries, and reconstructing original names from minified code.

## Overview

This project analyzes minified webpack bundles to:
1. **Extract** module boundaries and symbols
2. **Identify** third-party libraries and their versions
3. **Reconstruct** original function/class/variable names
4. **Map** dependencies between modules via DAG analysis

## Quick Start

```bash
# Build all tools
cargo build --release

# Extract modules from a webpack bundle
cargo run --bin parse_modules -- bundle.js

# Match against library signatures
node scripts/fetch_lib_signatures.js
cargo run --bin match_signatures

# Reconstruct original names
node scripts/extract_original_names.js
cargo run --bin reconstruct_names
```

## Process Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         WEBPACK BUNDLE                                   │
└───────────────────────────────┬─────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  1. MODULE EXTRACTION                                                    │
│     • Detect webpack runtime patterns (IIFE, webpackChunk)              │
│     • Split into individual modules                                      │
│     • Identify U() (CommonJS) vs L() (lazy/ESM) wrappers                │
└───────────────────────────────┬─────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  2. LIBRARY IDENTIFICATION                                               │
│     • Download npm packages for known libraries                          │
│     • Generate string signatures from original source                    │
│     • Match signatures against bundle modules                            │
│     • Detect exact library versions                                      │
└───────────────────────────────┬─────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  3. DAG PROPAGATION                                                      │
│     • Build dependency graph from require() calls                        │
│     • Forward propagation: if lib X depends on Y, Y might be lib        │
│     • Backward propagation: if lib depends on X, X must be lib          │
│       (libraries never depend on application code)                       │
└───────────────────────────────┬─────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  4. NAME RECONSTRUCTION                                                  │
│     • Extract original names from library source                         │
│     • Match by string literals in function bodies                        │
│     • Score by parameter count similarity                                │
│     • Map minified names → original names                                │
└───────────────────────────────┬─────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  OUTPUT: SQLite Database + JSON Reports                                  │
│     • module_map: all modules with type/category                         │
│     • module_identifications: library attributions                       │
│     • name_mappings: minified → original name mappings                   │
└─────────────────────────────────────────────────────────────────────────┘
```

## Tools Reference

### Module Extraction & Analysis

| Tool | Description |
|------|-------------|
| `parse_modules` | Parse webpack bundle, extract all modules to `modules/` directory |
| `dump_modules_v2` | **Enhanced dump** with init deps, owned functions/vars per module |
| `find_runtime` | Locate webpack runtime code in bundle |
| `analyze_runtime` | Deep analysis of webpack runtime patterns |
| `find_ul` | Find U() and L() module wrapper patterns |
| `build_lu_map` | Build mapping of module IDs to wrapper types |
| `list_lazy_modules` | List all lazy-loaded (L()) modules |
| `dump_modules` | Dump module contents for inspection |

### Library Identification

| Tool | Description |
|------|-------------|
| `match_signatures` | Match modules against library signatures |
| `identify_libs` | Identify libraries by code patterns |
| `identify_specific` | Identify specific known libraries |
| `identify_with_context` | Identify using surrounding context |
| `batch_identify` | Batch identification with LLM assistance |
| `save_identifications` | Save identifications to database |
| `find_identifiable` | Find modules that can be identified |
| `dump_unidentified` | Export unidentified modules for analysis |

### Dependency Analysis

| Tool | Description |
|------|-------------|
| `build_dag` | Build dependency DAG from module references |
| `dag_refined` | Refined DAG with library propagation |
| `dag_backward` | Backward propagation (deps of libs are libs) |
| `trace_modules` | Trace dependency chains |
| `analyze_order` | Analyze module ordering in bundle |

### Name Reconstruction

| Tool | Description |
|------|-------------|
| `reconstruct_names` | Match minified names to original library names |
| `organize_modules` | Organize app modules into categorized folders |

### Utilities

| Tool | Description |
|------|-------------|
| `db_stats` | Show database statistics |
| `categorize_app` | Categorize application (non-library) modules |
| `dump_paired` | Dump paired module comparisons |
| `bench_parse` | Benchmark JS parsing performance |
| `bench_extract` | Benchmark symbol extraction |
| `analyze_minified` | Analyze minification patterns |

## Scripts

| Script | Description |
|--------|-------------|
| `scripts/fetch_lib_signatures.js` | Download npm packages, generate string signatures |
| `scripts/extract_original_names.js` | Extract function/class/variable names from source |

## Database Schema

```sql
-- Module registry
CREATE TABLE module_map (
    module_name TEXT PRIMARY KEY,
    module_type TEXT,  -- 'U' (CommonJS) or 'L' (lazy/ESM)
    line_start INTEGER,
    line_end INTEGER
);

-- Library identifications
CREATE TABLE module_identifications (
    module_name TEXT PRIMARY KEY,
    library TEXT,
    source_file TEXT,
    description TEXT,
    confidence REAL
);

-- Reconstructed names
CREATE TABLE name_mappings (
    minified_name TEXT PRIMARY KEY,
    original_name TEXT,
    library TEXT,
    confidence REAL,
    match_type TEXT
);
```

## Output Files

```
lib_signatures/
├── npm_cache/           # Downloaded npm packages
├── signatures.json      # Library string signatures
├── matches.json         # Module → library matches
├── names/
│   ├── all_declarations.json   # Original names from source
│   ├── signature_index.json    # Index by function signature
│   └── string_index.json       # Index by string literals
└── name_mappings.json   # Final minified → original mappings

modules/
├── U/                   # CommonJS modules
│   ├── abc.js
│   └── ...
└── L/                   # Lazy/ESM modules
    ├── xyz.js
    └── ...

app_modules/             # Organized application code
├── api/                 # API client modules
├── auth/                # OAuth/authentication
├── tools/               # Tool implementations (bash, edit, read, etc.)
├── mcp/                 # MCP protocol client
├── config/              # Settings and configuration
├── hooks/               # Pre/post tool hooks
├── agents/              # Agent spawning and communication
├── ui/                  # Terminal UI components
├── streaming/           # Event streaming
├── git/                 # Git integration
├── commands/            # Slash commands
├── cost/                # Usage/cost tracking
├── permissions/         # Permission system
├── _unidentified/       # Potential app modules (not yet categorized)
├── MODULE_MAPPING.json  # Full mapping data
└── MODULE_MAPPING.md    # Human-readable mapping
```

## Example Results

**Library Detection:**
```
react-dom         (1,190 modules)  v19.3.0-canary
highlight.js        (195 modules)  v11.10.0
lodash              (180 modules)  v4.17.21
undici               (67 modules)  v7.16.0
@grpc/grpc-js        (53 modules)  v1.14.1
zod                  (50 modules)  v4.3.0-canary
```

**Name Reconstruction:**
```
Minified    Original                  Library        Confidence
────────────────────────────────────────────────────────────────
$1Q      →  renderElement             react-dom      100%
Ao0      →  perl                      highlight.js   100%
AG       →  assertRequestHandler      undici         100%
f81      →  _fillMissingExtensionFields node-forge   100%
```

## Key Insights

### Module Wrapper Types

- **U() modules**: CommonJS-style, synchronous requires
- **L() modules**: Lazy-loaded, ESM-style with `__esModule` marker

### DAG Propagation Logic

```
Forward:  If module A depends on B, and A is library X,
          then B might be part of library X

Backward: If library module A depends on B,
          then B must be a library module
          (libraries never depend on application code)
```

### Signature Matching

Libraries are identified by unique string literals:
- Error messages: `"Invalid state transition"`
- Constants: `"application/json"`
- Library-specific patterns: `"webpack"`, `"react"`

## Dependencies

```toml
[dependencies]
swc_ecma_parser = "30"      # JavaScript parsing
swc_ecma_ast = "19"         # AST types
rusqlite = "0.32"           # SQLite database
regex = "1.10"              # Pattern matching
serde = "1.0"               # Serialization
serde_json = "1.0"          # JSON handling
```

## License

MIT
