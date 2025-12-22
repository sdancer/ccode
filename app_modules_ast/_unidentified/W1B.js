// Module: W1B
// Type: L
// Lines: 133787-133808
//
var W1B = L(()=>{
    bt();
    EEA();
    XC();
    X1B = FH ? FH.isConcatSpreadable : void 0;
    I1B = JH8;
});
function K1B(A, Q, B, G, Z) {
    var Y = -1, J = A.length;
    (B || (B = I1B), Z || (Z = []));
    while(++Y < J){
        var X = A[Y];
        if (Q > 0 && B(X)) if (Q > 1) K1B(X, Q - 1, B, G, Z);
        else Q8A(Z, X);
        else if (!G) Z[Z.length] = X;
    }
    return Z;
}
var V1B;
