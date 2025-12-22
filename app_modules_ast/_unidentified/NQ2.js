// Module: NQ2
// Type: L
// Lines: 318001-318022
//
var NQ2 = L(()=>{
    describeNativeComponentFrame();
    createRenderState();
    KPA();
    VPA();
});
function tWA(A) {
    if (A === "general-purpose") return;
    let B = yE1().get(A);
    if (B && fP.includes(B)) return E$[B];
    return;
}
function eWA(A, Q) {
    let B = yE1();
    if (!Q) {
        B.delete(A);
        return;
    }
    if (fP.includes(Q)) B.set(A, Q);
}
var fP, E$;
