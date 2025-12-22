// Module: J0B
// Type: L
// Lines: 134161-134209
//
var safeGet = L(()=>{
    createRenderState();
    AN1();
    B0B();
    createRenderState();
    ot();
    Z0B();
    z1B();
    createRenderState();
    ((YD8 = E1B(function(A, Q) {
        var B = {};
        if (A == null) return B;
        var G = !1;
        if (((Q = V8A(Q, function(Y) {
            return ((Y = wy(Y, A)), G || (G = Y.length > 1), Y);
        })), hO(A, GdA(A), B), G)) B = YdA(B, BD8 | GD8 | ZD8, G0B);
        var Z = Q.length;
        while(Z--)Q0B(B, Q[Z]);
        return B;
    })), (Y0B = YD8));
});
function JD8(A, Q, B, G) {
    if (!LX(A)) return A;
    Q = wy(Q, A);
    var Z = -1, Y = Q.length, J = Y - 1, X = A;
    while(X != null && ++Z < Y){
        var I = vO(Q[Z]), W = B;
        if (I === "__proto__" || I === "constructor" || I === "prototype") return A;
        if (Z != J) {
            var K = X[I];
            if (((W = G ? G(K, I, X) : void 0), W === void 0)) W = LX(K) ? K : rc(Q[Z + 1]) ? [] : {};
        }
        (Bp(X, I, W), (X = X[I]));
    }
    return A;
}
var X0B;
