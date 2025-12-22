use rusqlite::{params, Connection};

fn main() {
    let conn = Connection::open("test.db").expect("Failed to open database");

    // Manual identifications based on L->U context analysis
    let identifications = vec![
        // (l_module, library_name, module_path, cleartext_name, confidence)
        ("Lh1", "undici", "undici", "fetch client", 0.95),
        ("BW0", "@opentelemetry/sdk", "@opentelemetry/sdk-node", "OpenTelemetry SDK", 0.95),
        ("kY9", "qrcode", "qrcode", "QR code generator", 0.95),
        ("hqA", "ws", "ws", "WebSocket", 0.95),
        ("RaA", "@aws-sdk/node-http-handler", "@aws-sdk/node-http-handler", "AWS HTTP handler", 0.90),

        // U modules that are clear from their exports
        ("AG", "undici", "undici/lib/core/errors", "UndiciError", 0.95),
        ("CGA", "undici", "undici/lib/fetch/response", "Response", 0.95),
        ("CUA", "undici", "undici/lib/fetch/formdata", "FormData", 0.95),
        ("Fb1", "undici", "undici/lib/proxy-agent", "ProxyAgent", 0.95),

        ("B71", "@opentelemetry/sdk-metrics", "@opentelemetry/sdk-metrics", "OTLPMetricExporter", 0.95),
        ("CH2", "@opentelemetry/sdk-trace-base", "@opentelemetry/sdk-trace-base", "TracerProvider", 0.95),
        ("Mo", "@opentelemetry/sdk-metrics", "@opentelemetry/sdk-metrics", "MeterProvider", 0.95),
        ("Tu1", "@opentelemetry/sdk-logs", "@opentelemetry/sdk-logs", "LoggerProvider", 0.95),

        ("NY9", "qrcode", "qrcode/lib/renderer/terminal", "terminal renderer", 0.90),
        ("PY9", "qrcode", "qrcode/lib/renderer/svg", "SVG renderer", 0.90),
        ("vY9", "qrcode", "qrcode/lib/browser", "browser renderer", 0.90),

        ("AsA", "ws", "ws/lib/websocket", "WebSocket", 0.95),
        ("Td1", "ws", "ws/lib/sender", "Sender", 0.95),
        ("_d1", "ws", "ws/lib/receiver", "Receiver", 0.95),
        ("R9B", "ws", "ws/lib/websocket-server", "WebSocketServer", 0.95),

        ("ZN", "got", "got/source/core", "HTTP/2 handler", 0.85),
        ("pG", "@smithy/middleware-endpoint", "@smithy/middleware-endpoint", "endpoint middleware", 0.90),
        ("uiA", "@aws-sdk/client-s3", "@aws-sdk/client-s3", "S3 client", 0.85),
        ("bNQ", "@aws-sdk/client-s3", "@aws-sdk/client-s3", "S3 commands", 0.85),

        // Previously identified
        ("arrow_11103", "@anthropic-ai/sdk", "@anthropic-ai/sdk", "Anthropic client", 0.95),
        ("arrow_4473", "rxjs", "rxjs", "RxJS exports", 0.95),
        ("arrow_8279", "highlight.js", "highlight.js/lib/languages", "language definitions", 0.95),
        ("q4Q", "@anthropic-ai/sdk", "@anthropic-ai/sdk/core", "API base URL", 0.95),
        ("afQ", "@anthropic-ai/sdk", "@anthropic-ai/sdk", "Anthropic namespace", 0.90),
        ("OpB", "known-css-properties", "known-css-properties", "CSS properties", 0.90),
        ("$72", "@grpc/grpc-js", "@grpc/grpc-js", "gRPC client", 0.95),

        // New identifications from string analysis
        ("arrow_8609", "mime-db", "mime-db", "MIME types database", 0.95),
        ("arrow_66289", "node-forge", "node-forge/lib/oids", "crypto OIDs", 0.95),
        ("arrow_30442", "@opentelemetry/semantic-conventions", "@opentelemetry/semantic-conventions", "OTel attributes", 0.95),
        ("arrow_36542", "react-devtools", "react-devtools-shared", "React DevTools", 0.90),
        ("arrow_41908", "chokidar", "chokidar", "file watcher", 0.90),

        // highlight.js language modules (C++ patterns)
        ("ti9", "highlight.js", "highlight.js/lib/languages/cpp", "C++ language", 0.95),
        ("Ti9", "highlight.js", "highlight.js/lib/languages/cpp", "C++ language alt", 0.95),
        ("Nn9", "highlight.js", "highlight.js/lib/languages/cpp", "C++ language variant", 0.95),

        // Programming language highlight.js modules
        ("so9", "highlight.js", "highlight.js/lib/languages/perl", "Perl language", 0.95),
        ("Ho9", "highlight.js", "highlight.js/lib/languages/julia", "Julia language", 0.95),
        ("arrow_8026", "highlight.js", "highlight.js/lib/languages/swift", "Swift language", 0.95),
        ("Ks9", "highlight.js", "highlight.js/lib/languages/stan", "Stan language", 0.95),
        ("Ws9", "highlight.js", "highlight.js/lib/languages/pgsql", "PostgreSQL language", 0.95),
        ("Bn9", "highlight.js", "highlight.js/lib/languages/c", "C preprocessor", 0.90),

        // HTML elements lists (likely from sanitize-html or similar)
        ("arrow_8009", "sanitize-html", "sanitize-html", "HTML elements", 0.85),
        ("arrow_7921", "sanitize-html", "sanitize-html", "HTML elements alt", 0.85),
        ("arrow_7398", "sanitize-html", "sanitize-html", "HTML elements variant", 0.85),
        ("arrow_6671", "sanitize-html", "sanitize-html", "HTML elements list", 0.85),

        // AWS SDK client modules
        ("arrow_21216", "@aws-sdk/client-lambda", "@aws-sdk/client-lambda", "Lambda client config", 0.90),
        ("arrow_25138", "@aws-sdk/client-acm", "@aws-sdk/client-acm", "ACM client config", 0.90),
        ("arrow_20283", "@aws-sdk/client-cloudwatch", "@aws-sdk/client-cloudwatch", "CloudWatch config", 0.85),

        // Unicode/charset data
        ("Ls6", "whatwg-encoding", "whatwg-encoding", "encoding labels", 0.90),
        ("arrow_47498", "unicode-canonical-property-names-ecmascript", "unicode-data", "Unicode normalization", 0.85),
        ("arrow_82640", "unicode-canonical-property-names-ecmascript", "unicode-data", "Unicode math symbols", 0.85),

        // Misc
        ("arrow_90639", "referrer-policy", "referrer-policy", "referrer policies", 0.90),
        ("arrow_55731", "unique-names-generator", "unique-names-generator", "adjective word list", 0.85),
        ("arrow_7509", "highlight.js", "highlight.js/lib/languages/mathematica", "Mathematica language", 0.95),

        // More highlight.js language modules from string analysis
        ("dn9", "highlight.js", "highlight.js/lib/languages/delphi", "Delphi/Pascal language", 0.95),
        ("ta9", "highlight.js", "highlight.js/lib/languages/isbl", "ISBL language", 0.95),
        ("To9", "highlight.js", "highlight.js/lib/languages/livecodeserver", "LiveCode language", 0.95),
        ("uo9", "highlight.js", "highlight.js/lib/languages/lsl", "LSL (Second Life) language", 0.95),

        // Zod validation library
        ("BSB", "zod", "zod", "ZodError class", 0.95),
        ("arrow_56308", "zod", "zod", "ZodError", 0.95),
        ("LyB", "zod", "zod", "ZodError export", 0.95),
        ("arrow_58261", "zod", "zod", "ZodError variant", 0.95),
        ("arrow_116920", "zod", "zod", "ZodError instance", 0.90),
        ("arrow_56697", "zod", "zod", "ZodType class", 0.95),
        ("arrow_58432", "zod", "zod", "ZodType export", 0.95),
        ("mRA", "zod", "zod/lib/types", "ZodType core", 0.95),
        ("wZB", "zod", "zod/lib/types", "string validators", 0.90),

        // Batch 1: React ecosystem
        ("j9B", "react-devtools", "react-devtools-backend", "ReactDevToolsBackend", 0.95),
        ("TBB", "react-dom", "react-dom", "React DOM runtime", 0.95),

        // OpenTelemetry protobuf
        ("s51", "@opentelemetry/otlp-transformer", "@opentelemetry/otlp-transformer", "OTel protobuf", 0.95),
        ("KaQ", "@opentelemetry/semantic-conventions", "@opentelemetry/semantic-conventions", "OTel attributes", 0.95),

        // HTML parsing (parse5 ecosystem)
        ("YX1", "parse5", "parse5", "HTML5 parser", 0.95),
        ("e12", "parse5", "parse5/lib/parser", "HTML parser", 0.95),
        ("rTA", "parse5", "parse5/lib/tokenizer", "HTML tokenizer", 0.95),
        ("cA2", "parse5", "parse5/lib/entities", "HTML entities data", 0.95),
        ("aJ1", "domino", "domino/lib/Element", "DOM elements", 0.90),
        ("PF2", "@xmldom/xmldom", "@xmldom/xmldom", "XML/HTML entities", 0.90),

        // node-forge (crypto)
        ("K50", "node-forge", "node-forge/lib/tls", "TLS implementation", 0.95),
        ("f81", "node-forge", "node-forge/lib/pki", "PKI/X.509", 0.95),
        ("M7", "node-forge", "node-forge/lib/util", "forge utilities", 0.95),

        // Lodash
        ("Ys2", "lodash", "lodash", "Lodash utilities", 0.95),

        // Tree-sitter
        ("yO2", "web-tree-sitter", "web-tree-sitter", "tree-sitter bindings", 0.95),
        ("SBB", "web-tree-sitter", "web-tree-sitter/tree-sitter.wasm", "tree-sitter WASM", 0.95),

        // URI/encoding
        ("yDB", "tr46", "tr46", "IDNA mapping", 0.90),
        ("UT2", "uri-js", "uri-js", "URI parser", 0.95),

        // Markdown
        ("$o", "marked", "marked", "Markdown parser", 0.95),

        // Storage
        ("Jp2", "localforage", "localforage", "IndexedDB wrapper", 0.95),

        // BigNumber
        ("va1", "bignumber.js", "bignumber.js", "BigNumber", 0.95),

        // TypeScript helpers
        ("zI2", "tslib", "tslib", "TS decorators", 0.90),
        ("Sm0", "tslib", "tslib", "TS helpers", 0.90),

        // Commander CLI
        ("aV9", "commander", "commander", "CLI framework", 0.95),

        // highlight.js (more modules)
        ("ha0", "highlight.js", "highlight.js/lib/languages/mathematica", "Mathematica symbols", 0.95),
        ("Np0", "highlight.js", "highlight.js/lib/core", "highlight.js core", 0.90),

        // Smithy (AWS)
        ("Lh", "@smithy/smithy-client", "@smithy/smithy-client", "Smithy HTTP", 0.90),
        ("TY", "undici", "undici/lib/client", "Undici client", 0.90),
        ("wYQ", "@smithy/middleware-stack", "@smithy/middleware-stack", "middleware stack", 0.90),

        // MCP Protocol
        ("TxB", "@modelcontextprotocol/sdk", "@modelcontextprotocol/sdk", "MCP client", 0.95),

        // Undici (more modules)
        ("qPQ", "undici", "undici/lib/handler", "request handler", 0.90),
        ("CN", "undici", "undici/lib/fetch", "fetch internals", 0.90),
        ("R3", "undici", "undici/lib/core", "core utilities", 0.90),
        ("PUA", "undici", "undici/lib/client", "HTTP client", 0.90),
        ("TPQ", "undici", "undici/lib/handler", "request handler", 0.90),

        // React
        ("JA", "react", "react", "React runtime", 0.95),

        // gRPC (more modules)
        ("KX2", "@grpc/grpc-js", "@grpc/grpc-js", "retry call", 0.95),
        ("pJ2", "@grpc/grpc-js", "@grpc/grpc-js", "HTTP/2 connector", 0.95),
        ("co", "@grpc/grpc-js", "@grpc/grpc-js", "gRPC core", 0.95),
        ("gJ2", "@grpc/grpc-js", "@grpc/grpc-js", "HTTP/2 call", 0.95),
        ("eY0", "@grpc/grpc-js", "@grpc/grpc-js", "intercepting call", 0.95),

        // Protobuf
        ("uJ0", "protobufjs", "protobufjs", "google protobuf", 0.95),
        ("DY2", "protobufjs", "protobufjs", "descriptor", 0.95),

        // Google Auth
        ("N0A", "google-auth-library", "google-auth-library", "OAuth2 client", 0.95),

        // follow-redirects
        ("V1Q", "follow-redirects", "follow-redirects", "HTTP redirects", 0.90),

        // Zod (more)
        ("PXA", "zod", "zod/lib/types", "zod internals", 0.90),

        // Azure MSAL
        ("CLB", "@azure/msal-common", "@azure/msal-common", "MSAL common", 0.95),

        // Color conversion
        ("Yp1", "color-convert", "color-convert", "color conversion", 0.95),

        // OpenTelemetry (more)
        ("urQ", "@opentelemetry/semantic-conventions", "@opentelemetry/semantic-conventions", "resource attrs", 0.95),

        // TypeScript helpers (more)
        ("_i1", "tslib", "tslib", "TS async helpers", 0.90),
        ("An1", "tslib", "tslib", "TS helpers", 0.90),

        // MCP (more)
        ("$dB", "@modelcontextprotocol/sdk", "@modelcontextprotocol/sdk", "MCP protocol", 0.95),

        // highlight.js - Arma 3 SQF
        ("Js9", "highlight.js", "highlight.js/lib/languages/sqf", "Arma 3 SQF language", 0.95),

        // Additional from ordering analysis
        ("ht0", "mime-db", "mime-db", "MIME types database", 0.95),

        // Claude Code Application Modules
        // API Client
        ("qr", "claude-code", "src/api/query", "API query with streaming", 0.99),
        ("UE9", "claude-code", "src/api/messages", "API message handling", 0.99),
        ("ME9", "claude-code", "src/api/messages", "message creation", 0.99),
        ("sv", "claude-code", "src/api/response", "API response processing", 0.99),
        ("eA9", "claude-code", "src/api/client", "API client config", 0.99),

        // OAuth
        ("BJ", "claude-code", "src/auth/oauth-config", "OAuth endpoints", 0.99),
        ("$o", "claude-code", "src/auth/oauth-flow", "OAuth flow", 0.99),
        ("D39", "claude-code", "src/auth/tokens", "token management", 0.99),

        // Permissions
        ("yO2", "claude-code", "src/permissions/core", "permission logic", 0.99),
        ("Go", "claude-code", "src/permissions/rules", "permission rules", 0.99),
        ("C5A", "claude-code", "src/permissions/sandbox", "sandbox enforcement", 0.99),
        ("E_0", "claude-code", "src/permissions/prompt", "tool permission prompt", 0.99),
        ("_FA", "claude-code", "src/permissions/mode", "permission mode", 0.99),

        // Tools
        ("AV9", "claude-code", "src/tools/registry", "tool registry", 0.99),
        ("hq0", "claude-code", "src/tools/execution", "tool execution", 0.99),
        ("dH", "claude-code", "src/tools/bash", "Bash tool", 0.99),
        ("FX9", "claude-code", "src/tools/edit", "Edit tool", 0.99),
        ("lH", "claude-code", "src/tools/read", "Read tool", 0.99),
        ("EA9", "claude-code", "src/tools/glob", "Glob tool", 0.99),
        ("zm", "claude-code", "src/tools/grep", "Grep tool", 0.99),
        ("IPA", "claude-code", "src/tools/write", "Write tool", 0.99),

        // MCP
        ("RI9", "claude-code", "src/mcp/client", "MCP client", 0.99),
        ("LM0", "claude-code", "src/mcp/server-manager", "MCP server management", 0.99),
        ("z4", "claude-code", "src/mcp/cli", "MCP CLI integration", 0.99),

        // Settings
        ("UI9", "claude-code", "src/config/settings", "settings storage", 0.99),
        ("y21", "claude-code", "src/config/loader", "config loading", 0.99),
        ("_BA", "claude-code", "src/config/project", "project settings", 0.99),
        ("zJ1", "claude-code", "src/config/claude-md", "CLAUDE.md parsing", 0.99),

        // Hooks
        ("aD1", "claude-code", "src/hooks/execution", "hook execution", 0.99),
        ("TTA", "claude-code", "src/hooks/registry", "hook registry", 0.99),
        ("pJ9", "claude-code", "src/hooks/pre-tool", "pre-tool hooks", 0.99),
        ("nz2", "claude-code", "src/hooks/post-tool", "post-tool hooks", 0.99),

        // Agents
        ("Ke2", "claude-code", "src/agents/spawn", "agent spawning", 0.99),
        ("He2", "claude-code", "src/agents/communication", "agent communication", 0.99),
        ("fI9", "claude-code", "src/agents/background", "background agents", 0.99),
        ("DI9", "claude-code", "src/agents/tasks", "agent task tracking", 0.99),

        // Terminal UI
        ("tN0", "claude-code", "src/ui/terminal", "terminal renderer", 0.99),
        ("ee2", "claude-code", "src/ui/layout", "layout components", 0.99),
        ("GJ9", "claude-code", "src/ui/text", "text rendering", 0.99),

        // Streaming
        ("YQB", "claude-code", "src/streaming/events", "event handling", 0.99),
        ("YGB", "claude-code", "src/streaming/content", "content blocks", 0.99),

        // Git
        ("xw", "claude-code", "src/git/commands", "git commands", 0.99),
        ("EL", "claude-code", "src/git/diff", "diff parsing", 0.99),
        ("LA9", "claude-code", "src/git/commit", "commit handling", 0.99),

        // Commands
        ("nc0", "claude-code", "src/commands/registry", "command registry", 0.99),
        ("kK1", "claude-code", "src/commands/execution", "command execution", 0.99),
        ("zF1", "claude-code", "src/commands/help", "/help command", 0.99),

        // Cost tracking
        ("j69", "claude-code", "src/cost/calculator", "cost calculation", 0.99),
        ("DL0", "claude-code", "src/cost/usage", "usage aggregation", 0.99),
    ];

    println!("Saving {} identifications to library_cache...", identifications.len());

    let mut saved = 0;
    for (name, library, path, cleartext, confidence) in &identifications {
        let result = conn.execute(
            "INSERT OR REPLACE INTO library_cache
             (body_hash, minified_name, library_name, module_path, cleartext_name, confidence, identification_method)
             VALUES (?1, ?2, ?3, ?4, ?5, ?6, 'manual')",
            params![
                format!("module_{}", name),
                name,
                library,
                path,
                cleartext,
                confidence,
            ],
        );

        if result.is_ok() {
            saved += 1;
            println!("  {} -> {} ({})", name, library, cleartext);
        }
    }

    println!("\nSaved {} identifications", saved);

    // Show summary by library
    println!("\n\nLibrary Summary:");
    println!("───────────────────────────────────────");

    let mut stmt = conn.prepare(
        "SELECT library_name, COUNT(*) as cnt, GROUP_CONCAT(minified_name, ', ') as modules
         FROM library_cache
         WHERE library_name IS NOT NULL
         GROUP BY library_name
         ORDER BY cnt DESC"
    ).unwrap();

    let rows = stmt.query_map([], |row| {
        Ok((
            row.get::<_, String>(0)?,
            row.get::<_, i64>(1)?,
            row.get::<_, String>(2)?,
        ))
    }).unwrap();

    for row in rows {
        if let Ok((lib, cnt, modules)) = row {
            let display = if modules.len() > 50 {
                format!("{}...", &modules[..50])
            } else {
                modules
            };
            println!("  {} ({} modules): {}", lib, cnt, display);
        }
    }
}
