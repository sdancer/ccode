use rusqlite::Connection;
use std::collections::HashMap;
use std::fs;
use std::io::Read;

fn main() {
    let conn = Connection::open("test.db").unwrap();
    
    // Define category patterns
    let categories: Vec<(&str, Vec<&str>)> = vec![
        ("api-client", vec!["messages.create", "beta.messages", "anthropic", "api.anthropic.com"]),
        ("oauth", vec!["oauth", "authorize", "token", "CONSOLE_AUTHORIZE"]),
        ("tools", vec!["canUseTool", "ToolResult", "tool_use", "inputJSONSchema"]),
        ("permissions", vec!["permission", "allow", "deny", "sandbox"]),
        ("mcp", vec!["MCP", "mcp_", "modelcontextprotocol"]),
        ("hooks", vec!["hook", "Hook", "pre_tool", "post_tool"]),
        ("streaming", vec!["stream", "content_block", "message_delta"]),
        ("terminal-ui", vec!["terminal", "render", "ink", "Box", "Text"]),
        ("settings", vec!["settings", "config", "CONFIG_DIR"]),
        ("git", vec!["git ", "commit", "branch", "diff"]),
        ("system-prompt", vec!["systemPrompt", "system_prompt", "SYSTEM_PROMPT"]),
        ("cost-tracking", vec!["cost", "usage", "tokens", "billing"]),
        ("agents", vec!["agent", "Agent", "asyncAgent"]),
        ("commands", vec!["slash_command", "command", "/help", "/clear"]),
    ];
    
    // Get all L modules
    let mut stmt = conn.prepare(
        "SELECT module_name, start_line, end_line FROM module_map WHERE module_type = 'L' ORDER BY start_line"
    ).unwrap();
    
    let modules: Vec<(String, i64, i64)> = stmt.query_map([], |row| {
        Ok((
            row.get::<_, String>(0)?,
            row.get::<_, i64>(1)?,
            row.get::<_, i64>(2)?,
        ))
    }).unwrap().filter_map(|r| r.ok()).collect();
    
    let mut categorized: HashMap<String, Vec<(String, i64)>> = HashMap::new();
    let mut uncategorized: Vec<(String, i64)> = Vec::new();
    
    for (name, start, end) in &modules {
        let path = format!("modules/L/{}.js", name);
        if let Ok(mut file) = fs::File::open(&path) {
            let mut content = String::new();
            if file.read_to_string(&mut content).is_ok() {
                let size = end - start;
                let mut found_category = false;
                
                for (cat_name, patterns) in &categories {
                    for pattern in patterns {
                        if content.contains(pattern) {
                            categorized.entry(cat_name.to_string())
                                .or_default()
                                .push((name.clone(), size));
                            found_category = true;
                            break;
                        }
                    }
                    if found_category { break; }
                }
                
                if !found_category && size > 50 {
                    uncategorized.push((name.clone(), size));
                }
            }
        }
    }
    
    println!("Claude Code Application Modules by Category");
    println!("════════════════════════════════════════════════════════════════\n");
    
    let mut sorted_cats: Vec<_> = categorized.iter().collect();
    sorted_cats.sort_by(|a, b| b.1.len().cmp(&a.1.len()));
    
    for (category, mods) in sorted_cats {
        let total_lines: i64 = mods.iter().map(|(_, s)| s).sum();
        println!("## {} ({} modules, {} lines)", category, mods.len(), total_lines);
        
        let mut sorted_mods = mods.clone();
        sorted_mods.sort_by(|a, b| b.1.cmp(&a.1));
        
        for (name, size) in sorted_mods.iter().take(10) {
            println!("  {:>6} lines: {}", size, name);
        }
        if sorted_mods.len() > 10 {
            println!("  ... and {} more", sorted_mods.len() - 10);
        }
        println!();
    }
    
    println!("\n## Uncategorized large modules (>50 lines): {}", uncategorized.len());
    uncategorized.sort_by(|a, b| b.1.cmp(&a.1));
    for (name, size) in uncategorized.iter().take(20) {
        println!("  {:>6} lines: {}", size, name);
    }
}
