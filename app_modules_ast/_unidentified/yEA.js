// Module: yEA
// Type: L
// Lines: 2913-2934
//
var yEA = L(()=>{
    jEA();
    o6A();
    ((JN9 = Object.prototype), (XN9 = JN9.hasOwnProperty));
    Bp = IN9;
});
function WN9(A, Q, B, G) {
    var Z = !B;
    B || (B = {});
    var Y = -1, J = Q.length;
    while(++Y < J){
        var X = Q[Y], I = G ? G(B[X], A[X], X, B, A) : void 0;
        if (I === void 0) I = A[X];
        if (Z) Qp(B, X, I);
        else Bp(B, X, I);
    }
    return B;
}
var hO;
