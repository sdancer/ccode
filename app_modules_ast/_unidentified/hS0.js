// Module: hS0
// Type: L
// Lines: 3070-3090
//
var hS0 = L(()=>{
    bS0 = CN9;
});
function $N9(A, Q, B) {
    return ((Q = gS0(Q === void 0 ? A.length - 1 : Q, 0)), function() {
        var G = arguments, Z = -1, Y = gS0(G.length - Q, 0), J = Array(Y);
        while(++Z < Y)J[Z] = G[Q + Z];
        Z = -1;
        var X = Array(Q + 1);
        while(++Z < Q)X[Z] = G[Z];
        return ((X[Q] = B(J)), bS0(A, this, X));
    });
}
var gS0, _gA;
