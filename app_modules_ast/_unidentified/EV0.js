// Module: EV0
// Type: L
// Lines: 379784-379807
//
var EV0 = L(()=>{
    NBA();
    eC2();
    v$2();
});
function g$2(A, Q, B) {
    if (!zV0(A)) return null;
    if (!FV0(Q).isValid) return null;
    let Z = B(), Y = FV0(Z);
    if (!Y.isValid) return {
        result: !1,
        message: `Claude Code settings.json validation failed after edit:
${Y.error}

Full schema:
${Y.fullSchema}
IMPORTANT: Do not update the env unless explicitly instructed to do so.`,
        errorCode: 10
    };
    return null;
}
