// Module: SA2
// Type: L
// Lines: 308519-308552
//
var SA2 = L(()=>{
    try {
        nTA = (()=>{
            throw new Error("Cannot require module " + "../../color-diff.node");
        })();
    } catch (A) {
        nTA = null;
    }
    ((KS3 = nTA?.ColorDiff), (VS3 = nTA?.ColorFile), (HS3 = nTA?.ColorDiff));
});
async function kA2() {
    if (yA2) return;
    if (((yA2 = !0), KK(process.env.CLAUDE_CODE_SYNTAX_HIGHLIGHT))) return;
    if (t7()) try {
        let A = await Promise.resolve().then(()=>(SA2(), PA2));
        ((xA2 = A.ColorDiff), (vA2 = A.ColorFile));
    } catch (A) {
        k(`[ColorDiff] Rust module unavailable, falling back to JS: ${A instanceof Error ? A.message : String(A)}`);
    }
    else k("[ColorDiff] Not in bundled mode, using JS fallback");
}
function fA2() {
    return xA2;
}
function bA2() {
    return vA2;
}
var xA2 = null, vA2 = null, yA2 = !1;
