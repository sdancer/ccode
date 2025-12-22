// Module: a9B
// Type: L
// Lines: 167164-167198
//
var a9B = L(()=>{
    PrA();
    createRenderState();
    frA();
    b9B();
    Xd1();
    canHydrateInstance();
    createRenderState();
    l9B = new WeakMap();
    pd1 = cd1;
});
function nd1(A) {
    if (YsA.has(A)) return A;
    if (ld1.has(A)) return ld1.get(A);
    if (A.startsWith(JsA)) return PC8;
    if (((A = A.slice(2)), A.startsWith("38"))) return XW.color.close;
    else if (A.startsWith("48")) return XW.bgColor.close;
    let Q = XW.codes.get(parseInt(A, 10));
    if (Q) return XW.color.ansi(Q);
    else return XW.reset.open;
}
function SN(A) {
    return A.map((Q)=>Q.code).join("");
}
var o9B, r9B, s9B, YsA, ld1, JsA = "\x1B]8;;", id1, t9B = "\x07", p5G, PC8;
