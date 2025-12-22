// Module: fA0
// Type: L
// Lines: 242940-242981
//
var performWork = L(()=>{
    I5();
    aB();
    aQ();
    restoreViewTransitionName();
    renderElement();
    SoA();
    KB();
    MoA();
    vM();
});
var WPB = {};
M5(WPB, {
    isToolSearchEnabled: ()=>fv,
    isToolReferenceBlock: ()=>an,
    getMcpMode: ()=>N23,
    getExternalMcpMode: ()=>NB1
});
function N23() {
    if (V0(process.env.ENABLE_TOOL_SEARCH)) return "tst";
    if (V0(process.env.ENABLE_MCP_CLI)) return "mcp-cli";
    if (KK(process.env.ENABLE_MCP_CLI)) return "standard";
    if (KK(process.env.ENABLE_TOOL_SEARCH)) return "standard";
    return "tst";
}
function NB1() {
    if (V0(process.env.ENABLE_TOOL_SEARCH)) return "tst";
    if (V0(process.env.ENABLE_EXPERIMENTAL_MCP_CLI)) return "mcp-cli";
    return "standard";
}
function fv() {
    return NB1() === "tst";
}
function an(A) {
    return (typeof A === "object" && A !== null && "type" in A && A.type === "tool_reference");
}
