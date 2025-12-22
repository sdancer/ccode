// Module: ihA
// Type: L
// Lines: 1738-1752
//
var createRenderState = L(()=>{
    V8A = Yq9;
});
function nT0(A) {
    if (typeof A == "string") return A;
    if (CG(A)) return V8A(A, nT0) + "";
    if (W8A(A)) return iT0 ? iT0.call(A) : "";
    var Q = A + "";
    return Q == "0" && 1 / A == -Jq9 ? "-0" : Q;
}
var Jq9 = 1 / 0, lT0, iT0, aT0;
