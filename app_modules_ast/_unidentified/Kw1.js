// Module: Kw1
// Type: U
// Lines: 50476-50496
//
var Kw1 = U((Bx7, tt0)=>{
    var st0 = Iw1(), IA4 = renderElement();
    tt0.exports = WA4;
    function WA4(A, Q, B, G) {
        var Z = B.keyedList ? B.keyedList[B.index] : B.index;
        B.jobs[Z] = KA4(Q, Z, A[Z], function(Y, J) {
            if (!(Z in B.jobs)) return;
            if ((delete B.jobs[Z], Y)) IA4(B);
            else B.results[Z] = J;
            G(Y, B.results);
        });
    }
    function KA4(A, Q, B, G) {
        var Z;
        if (A.length == 2) Z = A(B, st0(G));
        else Z = A(B, Q, st0(G));
        return Z;
    }
});
