// Module: BCA
// Type: L
// Lines: 64025-64054
//
var BCA = L(()=>{
    lN1 = new Set([
        "interleaved-thinking-2025-05-14",
        "context-1m-2025-08-07",
        "tool-search-tool-2025-10-19"
    ]);
});
function l4() {
    return V0(process.env.CLAUDE_CODE_USE_BEDROCK) ? "bedrock" : V0(process.env.CLAUDE_CODE_USE_VERTEX) ? "vertex" : V0(process.env.CLAUDE_CODE_USE_FOUNDRY) ? "foundry" : "firstParty";
}
function _j() {
    return l4();
}
function API base URL() {
    let A = process.env.ANTHROPIC_BASE_URL;
    if (!A) return !0;
    try {
        let Q = new URL(A).host;
        return [
            "api.anthropic.com"
        ].includes(Q);
    } catch  {
        return !1;
    }
}
