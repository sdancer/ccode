// Module: DK
// Type: L
// Lines: 64054-64108
//
var DK = L(()=>{
    aQ();
});
function R84(A) {
    let Q = l4();
    if (Q === "foundry") return !0;
    if (Q === "firstParty") return !A.includes("claude-3-");
    return A.includes("claude-opus-4") || A.includes("claude-sonnet-4");
}
function _84(A) {
    let Q = A.toLowerCase();
    return (Q.includes("claude-opus-4") || Q.includes("claude-sonnet-4") || Q.includes("claude-haiku-4"));
}
function iN1(A) {
    return A.includes("-structured-");
}
function L4Q() {
    let A = l4();
    if (A === "vertex" || A === "bedrock") return w4Q;
    return U4Q;
}
function j84() {
    return ((l4() === "firstParty" || l4() === "foundry") && !V0(process.env.CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS));
}
function O4Q(A, Q) {
    let B = GN(A);
    if (!Q || Q.length === 0) return B;
    if (VB()) return (console.warn("Warning: Custom betas are only available for API key users. Ignoring provided betas."), B);
    let G = [];
    for (let Z of Q)if (N4Q.includes(Z)) G.push(Z);
    else console.warn(`Warning: Beta header '${Z}' is not allowed. Only the following betas are supported: ${N4Q.join(", ")}`);
    return [
        ...B,
        ...G.filter((Z)=>!B.includes(Z))
    ];
}
function bdA() {
    (nN1.cache?.clear?.(), GN.cache?.clear?.(), aN1.cache?.clear?.());
}
var N4Q, nN1, GN, aN1;
