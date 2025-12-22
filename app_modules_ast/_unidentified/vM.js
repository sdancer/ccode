// Module: vM
// Type: L
// Lines: 133532-133581
//
var vM = L(()=>{
    n6();
    Q9();
    getViewTransitionClassName();
    i0();
    i0();
    i0();
    lAB = l(React runtime(), 1);
});
function lV8(A, Q) {
    return ((Q.input_tokens / 1e6) * A.inputTokens + (Q.output_tokens / 1e6) * A.outputTokens + ((Q.cache_read_input_tokens ?? 0) / 1e6) * A.promptCacheReadTokens + ((Q.cache_creation_input_tokens ?? 0) / 1e6) * A.promptCacheWriteTokens + (Q.server_tool_use?.web_search_requests ?? 0) * A.webSearchRequests);
}
function iV8(A) {
    return (A.input_tokens + (A.cache_read_input_tokens ?? 0) + (A.cache_creation_input_tokens ?? 0));
}
function nV8(A, Q) {
    let B = _N(A), G = nAB[B];
    if (G === X1A && iV8(Q) > 200000) return xu1;
    if (!G) return (r("tengu_unknown_model_cost", {
        model: A,
        shortName: B
    }), NE1(), nAB[_N(oAB)]);
    return G;
}
function OoA(A, Q) {
    let B = nV8(A, Q);
    return lV8(B, Q);
}
function aAB(A) {
    if (Number.isInteger(A)) return `$${A}`;
    return `$${A.toFixed(2)}`;
}
function Bi(A) {
    return `${aAB(A.inputTokens)}/${aAB(A.outputTokens)} per Mtok`;
}
var X1A, NoA, LoA, xu1, vu1, ku1, nAB;
