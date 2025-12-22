// Module: LI
// Type: L
// Lines: 525770-525825
//
var LI = L(()=>{
    zB();
    hIA();
    I5();
    aB();
    restoreViewTransitionName();
    lR();
    pushStartInstance();
    i0();
    getViewTransitionClassName();
});
function aBA() {
    return parseInt(process.env.MCP_TOOL_TIMEOUT || "", 10) || II7;
}
function WI7() {
    if (V0(process.env.ENABLE_TOOL_SEARCH) && V0(process.env.ENABLE_EXPERIMENTAL_MCP_CLI) && !hV9) ((hV9 = !0), console.warn(V1.yellow(`Warning: Both ENABLE_TOOL_SEARCH and ENABLE_EXPERIMENTAL_MCP_CLI are set to true.
These are mutually exclusive. Using Tool Search mode.`)));
}
function lY() {
    return (WI7(), NB1() === "mcp-cli");
}
function ss() {
    return lY() && !KK(process.env.ENABLE_MCP_CLI_ENDPOINT);
}
function z9A(A) {
    let Q = A.match(/^mcp-cli\s+(call|read)\s+([a-zA-Z0-9_-]+)\/([a-zA-Z0-9_-]+)(?:\s+([\s\S]+))?$/);
    if (!Q) return null;
    let [, B, G, Z, Y = ""] = Q;
    if (!B || !G || !Z) return null;
    return {
        command: B,
        server: G,
        tool: Z,
        toolName: Z,
        args: Y,
        fullCommand: A
    };
}
function QR0(A) {
    let Q = jF(A);
    if (!Q || !Q.toolName) return null;
    return `${Q.serverName}/${Q.toolName}`;
}
var II7 = 1e8, hV9 = !1;
