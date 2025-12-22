// Module: bK0
// Type: L
// Lines: 378349-378378
//
var createRenderState = L(()=>{
    R5();
    BJ();
    A2();
    g1();
    ((l65 = {}), (nC2 = l65));
});
function hK0(A) {
    return Number.isInteger(A);
}
function gK0() {
    let A = oC2();
    if (A.effortLevel !== void 0) return A.effortLevel;
    let Q = process.env.CLAUDE_CODE_EFFORT_LEVEL;
    if (Q) {
        if (Q === "unset") return;
        let Z = parseInt(Q, 10);
        if (!isNaN(Z) && hK0(Z)) return Z;
        if ([
            "low",
            "medium",
            "high"
        ].includes(Q)) return Q;
    }
    let G = HQ().effortLevel;
    if (G === "unset") return;
    if (G !== void 0) {
        if (typeof G === "number" && hK0(G)) return G;
        if (typeof G === "string" && [
            "low",
            "medium",
            "high"
        ].includes(G)) return G;
    }
    return;
}
