// Module: du1
// Type: L
// Lines: 133975-133992
//
var du1 = L(()=>{
    pE1();
    dt();
    ToA = gH8;
});
function uH8(A, Q) {
    return function(B, G) {
        if (B == null) return B;
        if (!Uy(B)) return A(B, G);
        var Z = B.length, Y = Q ? Z : -1, J = Object(B);
        while(Q ? Y-- : ++Y < Z)if (G(J[Y], Y, J) === !1) break;
        return B;
    };
}
var b1B;
