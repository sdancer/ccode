// Module: EE1
// Type: L
// Lines: 1392-1449
//
var renderElement = L(()=>{
    IE1();
    MhA();
    dt();
    UEA = Ow9;
});
function jw9(A, Q, B, G, Z, Y) {
    var J = B & Mw9, X = UEA(A), I = X.length, W = UEA(Q), K = W.length;
    if (I != K && !J) return !1;
    var V = I;
    while(V--){
        var H = X[V];
        if (!(J ? H in Q : _w9.call(Q, H))) return !1;
    }
    var D = Y.get(A), F = Y.get(Q);
    if (D && F) return D == Q && F == A;
    var E = !0;
    (Y.set(A, Q), Y.set(Q, A));
    var z = J;
    while(++V < I){
        H = X[V];
        var $ = A[H], O = Q[H];
        if (G) var N = J ? G(O, $, H, Q, A, Y) : G($, O, H, A, Q, Y);
        if (!(N === void 0 ? $ === O || Z($, O, B, G, Y) : N)) {
            E = !1;
            break;
        }
        z || (z = H == "constructor");
    }
    if (E && !z) {
        var M = A.constructor, R = Q.constructor;
        if (M != R && "constructor" in A && "constructor" in Q && !(typeof M == "function" && M instanceof M && typeof R == "function" && R instanceof R)) E = !1;
    }
    return (Y.delete(A), Y.delete(Q), E);
}
var Mw9 = 1, Rw9, _w9, UT0;
