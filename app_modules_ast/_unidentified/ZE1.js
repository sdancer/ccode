// Module: ZE1
// Type: L
// Lines: 903-946
//
var ZE1 = L(()=>{
    $hA = i$9;
});
function o$9(A, Q, B, G, Z, Y) {
    var J = B & n$9, X = A.length, I = Q.length;
    if (X != I && !(J && I > X)) return !1;
    var W = Y.get(A), K = Y.get(Q);
    if (W && K) return W == Q && K == A;
    var V = -1, H = !0, D = B & a$9 ? new ChA() : void 0;
    (Y.set(A, Q), Y.set(Q, A));
    while(++V < X){
        var F = A[V], E = Q[V];
        if (G) var z = J ? G(E, F, V, Q, A, Y) : G(F, E, V, A, Q, Y);
        if (z !== void 0) {
            if (z) continue;
            H = !1;
            break;
        }
        if (D) {
            if (!aj0(Q, function($, O) {
                if (!$hA(D, O) && (F === $ || Z(F, $, B, G, Y))) return D.push(O);
            })) {
                H = !1;
                break;
            }
        } else if (!(F === E || Z(F, E, B, G, Y))) {
            H = !1;
            break;
        }
    }
    return (Y.delete(A), Y.delete(Q), H);
}
var n$9 = 1, a$9 = 2, UhA;
