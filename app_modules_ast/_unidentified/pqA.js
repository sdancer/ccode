// Module: pqA
// Type: L
// Lines: 167198-167225
//
var pqA = L(()=>{
    OqA();
    ((o9B = new Set([
        27,
        155
    ])), (r9B = "[".codePointAt(0)), (s9B = "]".codePointAt(0)), (YsA = new Set()), (ld1 = new Map()));
    for (let [A, Q] of XW.codes)(YsA.add(XW.color.ansi(Q)), ld1.set(XW.color.ansi(A), XW.color.ansi(Q)));
    ((id1 = JsA.split("").map((A)=>A.charCodeAt(0))), (p5G = t9B.charCodeAt(0)), (PC8 = `\x1B]8;;${t9B}`));
});
function zi(A) {
    return XsA([], A);
}
function XsA(A, Q) {
    let B = [
        ...A
    ];
    for (let G of Q)if (G.code === XW.reset.open) B = [];
    else if (YsA.has(G.code)) B = B.filter((Z)=>Z.endCode !== G.code);
    else if (G.code === XW.bold.open || G.code === XW.dim.open) {
        if (!B.find((Y)=>Y.code === G.code && Y.endCode === G.endCode)) B.push(G);
    } else ((B = B.filter((Y)=>Y.endCode !== G.endCode)), B.push(G));
    return B;
}
