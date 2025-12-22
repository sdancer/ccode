// Module: A89
// Type: L
// Lines: 481107-481282
//
var createRenderState = L(()=>{
    v2();
    e69();
    qxA();
    KB();
    xw();
    pushStartInstance();
    ((_hY = u.strictObject({
        message_prefix: u.string().describe("The prefix of the user message to rewind to (searches backwards for first match)"),
        course_correction: u.string().describe("The new instructions to inject after rewinding, explaining what to do differently"),
        restore_code: u.boolean().default(!0).describe("Whether to restore code changes using file history (default: true)")
    })), (jhY = u.object({
        target_message_preview: u.string().describe("Preview of the message that was rewound to"),
        course_correction: u.string().describe("The course correction that was injected"),
        code_restored: u.boolean().describe("Whether code was restored")
    })));
});
function mN0(A) {
    let Q = A.filter((G)=>G.isMcp);
    if (Q.length === 0) return `Search for or select MCP tools to make them available for use.

**MANDATORY PREREQUISITE - THIS IS A HARD REQUIREMENT**

You MUST use this tool to load MCP tools BEFORE calling them directly.

This is a BLOCKING REQUIREMENT - MCP tools listed below are NOT available until you load them using this tool.

**Why this is non-negotiable:**
- MCP tools are deferred and not loaded until discovered via this tool
- Calling an MCP tool without first loading it will fail

**Query modes:**

1. **Direct selection** - Use \`select:<tool_name>\` when you know exactly which tool you need:
   - "select:mcp__slack__read_channel"
   - "select:mcp__filesystem__list_directory"
   - Returns just that tool if it exists

2. **Keyword search** - Use keywords when you're unsure which tool to use:
   - "list directory" - find tools for listing directories
   - "read file" - find tools for reading files
   - "slack message" - find slack messaging tools
   - Returns up to 5 matching tools ranked by relevance

**CORRECT Usage Patterns:**

<example>
User: List files in the src directory
Assistant: I can see mcp__filesystem__list_directory in the available tools. Let me select it.
[Calls MCPSearch with query: "select:mcp__filesystem__list_directory"]
[Calls the MCP tool]
</example>

<example>
User: I need to work with slack somehow
Assistant: Let me search for slack tools.
[Calls MCPSearch with query: "slack"]
Assistant: Found several options including mcp__slack__read_channel.
[Calls the MCP tool]
</example>

**INCORRECT Usage Pattern - NEVER DO THIS:**

<bad-example>
User: Read my slack messages
Assistant: [Directly calls mcp__slack__read_channel without loading it first]
WRONG - You must load the tool FIRST using this tool
</bad-example>`;
    return `Search for or select MCP tools to make them available for use.

**MANDATORY PREREQUISITE - THIS IS A HARD REQUIREMENT**

You MUST use this tool to load MCP tools BEFORE calling them directly.

This is a BLOCKING REQUIREMENT - MCP tools listed below are NOT available until you load them using this tool.

**Why this is non-negotiable:**
- MCP tools are deferred and not loaded until discovered via this tool
- Calling an MCP tool without first loading it will fail

**Query modes:**

1. **Direct selection** - Use \`select:<tool_name>\` when you know exactly which tool you need:
   - "select:mcp__slack__read_channel"
   - "select:mcp__filesystem__list_directory"
   - Returns just that tool if it exists

2. **Keyword search** - Use keywords when you're unsure which tool to use:
   - "list directory" - find tools for listing directories
   - "read file" - find tools for reading files
   - "slack message" - find slack messaging tools
   - Returns up to 5 matching tools ranked by relevance

**CORRECT Usage Patterns:**

<example>
User: List files in the src directory
Assistant: I can see mcp__filesystem__list_directory in the available tools. Let me select it.
[Calls MCPSearch with query: "select:mcp__filesystem__list_directory"]
[Calls the MCP tool]
</example>

<example>
User: I need to work with slack somehow
Assistant: Let me search for slack tools.
[Calls MCPSearch with query: "slack"]
Assistant: Found several options including mcp__slack__read_channel.
[Calls the MCP tool]
</example>

**INCORRECT Usage Pattern - NEVER DO THIS:**

<bad-example>
User: Read my slack messages
Assistant: [Directly calls mcp__slack__read_channel without loading it first]
WRONG - You must load the tool FIRST using this tool
</bad-example>

Available MCP tools (must be loaded before use):
${Q.map((G)=>G.name).join(`
`)}`;
}
var Q89 = "MCPSearch";
function B89(A) {
    return `Search MCP tools: "${A.query ?? "..."}"`;
}
function G89() {
    return pd.createElement(o3, null);
}
function Z89(A) {
    let Q = typeof A === "string" ? A : Array.isArray(A) ? A.filter((B)=>B.type === "text").map((B)=>"text" in B ? B.text : "").join(`
`) : "Unknown error";
    return pd.createElement(C, {
        color: "error"
    }, Q);
}
function Y89() {
    return null;
}
function J89(A) {
    let { matches: Q } = A;
    if (Q.length === 0) return pd.createElement(C, {
        dimColor: !0
    }, "No matching MCP tools found");
    return pd.createElement(C, null, Q.join(`
`));
}
var pd;
