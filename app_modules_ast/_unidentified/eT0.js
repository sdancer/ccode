// Module: eT0
// Type: L
// Lines: 1817-1837
//
var eT0 = L(()=>{
    tT0 = Dq9;
});
function Fq9(A, Q, B) {
    Q = wy(Q, A);
    var G = -1, Z = Q.length, Y = !1;
    while(++G < Z){
        var J = vO(Q[G]);
        if (!(Y = A != null && B(A, J))) break;
        A = A[J];
    }
    if (Y || ++G != Z) return Y;
    return ((Z = A == null ? 0 : A.length), !!Z && G8A(Z) && rc(J, Z) && (CG(A) || db(A)));
}
var AP0;
