// Module: _49
// Type: L
// Lines: 475971-476007
//
var _49 = L(()=>{
    cV();
    wk();
    bA();
    getViewTransitionClassName();
    A2();
    ((TfA = l(React runtime(), 1)), (v4A = l(React runtime(), 1)));
});
function D27(A) {
    let Q = A.toLowerCase(), B = l4();
    if (Q.includes("claude-3-opus")) return {
        isDeprecated: !0,
        modelName: "Claude 3 Opus",
        retirementDate: B === "bedrock" ? "January 15, 2026" : "January 5, 2026"
    };
    if (Q.includes("claude-3-7-sonnet")) {
        let G;
        if (B === "vertex") G = "May 11, 2026";
        else if (B === "bedrock") G = "April 28, 2026";
        else G = "February 10, 2026";
        return {
            isDeprecated: !0,
            modelName: "Claude 3.7 Sonnet",
            retirementDate: G
        };
    }
    return {
        isDeprecated: !1
    };
}
function WH1(A) {
    if (!A) return null;
    let Q = D27(A);
    if (!Q.isDeprecated) return null;
    return `⚠ ${Q.modelName} will be retired on ${Q.retirementDate}. Consider switching to a newer model.`;
}
