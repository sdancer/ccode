// Module: V82
// Type: U
// Lines: 327539-327555
//
var V82 = U((PHZ, K82)=>{
    K82.exports = pm3;
    function pm3(A, Q, B) {
        var G = B || 8192, Z = G >>> 1, Y = null, J = G;
        return function(I) {
            if (I < 1 || I > Z) return A(I);
            if (J + I > G) ((Y = A(G)), (J = 0));
            var W = Q.call(Y, J, (J += I));
            if (J & 7) J = (J | 7) + 1;
            return W;
        };
    }
});
