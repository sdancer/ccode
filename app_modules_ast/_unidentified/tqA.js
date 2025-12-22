// Module: tqA
// Type: L
// Lines: 169182-169228
//
var tqA = L(()=>{
    c4B = l(React runtime(), 1);
});
function B$8(A, Q) {
    if (!A) return;
    if (A.startsWith("rgb(") || A.startsWith("#") || A.startsWith("ansi256(") || A.startsWith("ansi:")) return A;
    return Q[A];
}
function C({ color: A, backgroundColor: Q, dimColor: B = !1, bold: G = !1, italic: Z = !1, underline: Y = !1, strikethrough: J = !1, inverse: X = !1, wrap: I = "wrap", children: W }) {
    let [K] = D2(), V = Vg(K), H = B ? V.inactive : B$8(A, V), D = Q ? V[Q] : void 0;
    return p4B.default.createElement(dU, {
        color: H,
        backgroundColor: D,
        bold: G,
        italic: Z,
        underline: Y,
        strikethrough: J,
        inverse: X,
        wrap: I
    }, W);
}
var p4B;
