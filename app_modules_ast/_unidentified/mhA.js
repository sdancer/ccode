// Module: mhA
// Type: L
// Lines: 1588-1621
//
var mhA = L(()=>{
    xT0();
    zy();
    I8A = vT0;
});
function pw9(A, Q, B, G) {
    var Z = B.length, Y = Z, J = !G;
    if (A == null) return !Y;
    A = Object(A);
    while(Z--){
        var X = B[Z];
        if (J && X[2] ? X[1] !== A[X[0]] : !(X[0] in A)) return !1;
    }
    while(++Z < Y){
        X = B[Z];
        var I = X[0], W = A[I], K = X[1];
        if (J && X[2]) {
            if (W === void 0 && !(I in A)) return !1;
        } else {
            var V = new Ey();
            if (G) var H = G(W, K, I, A, Q, V);
            if (!(H === void 0 ? I8A(K, W, dw9 | cw9, G, V) : H)) return !1;
        }
    }
    return !0;
}
var dw9 = 1, cw9 = 2, kT0;
