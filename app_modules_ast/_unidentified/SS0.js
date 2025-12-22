// Module: SS0
// Type: L
// Lines: 2978-3012
//
var SS0 = L(()=>{
    ot();
    T8A();
    PS0 = EN9;
});
function zN9(A, Q, B, G, Z, Y, J) {
    var X = SEA(A, B), I = SEA(Q, B), W = J.get(I);
    if (W) {
        TEA(A, B, W);
        return;
    }
    var K = Y ? Y(X, I, B + "", A, Q, J) : void 0, V = K === void 0;
    if (V) {
        var H = CG(I), D = !H && Cy(I), F = !H && !D && Y8A(I);
        if (((K = I), H || D || F)) if (CG(X)) K = X;
        else if (LS0(X)) K = LgA(X);
        else if (D) ((V = !1), (K = PEA(I, !0)));
        else if (F) ((V = !1), (K = NgA(I, !0)));
        else K = [];
        else if (j8A(I) || db(I)) {
            if (((K = X), db(X))) K = PS0(X);
            else if (!LX(X) || n6A(X)) K = MgA(I);
        } else V = !1;
    }
    if (V) (J.set(I, K), Z(K, I, G, Y, J), J.delete(I));
    TEA(A, B, K);
}
var yS0;
