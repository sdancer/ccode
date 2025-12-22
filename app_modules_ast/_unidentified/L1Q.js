// Module: L1Q
// Type: L
// Lines: 52958-52987
//
var L1Q = L(()=>{
    createRenderState();
    N1Q = M04;
});
function R04(A, Q) {
    A = A || 10;
    let B = Array(A), G = Array(A), Z = 0, Y = 0, J;
    return ((Q = Q !== void 0 ? Q : 1000), function(I) {
        let W = Date.now(), K = G[Y];
        if (!J) J = W;
        ((B[Z] = I), (G[Z] = W));
        let V = Y, H = 0;
        while(V !== Z)((H += B[V++]), (V = V % A));
        if (((Z = (Z + 1) % A), Z === Y)) Y = (Y + 1) % A;
        if (W - J < Q) return;
        let D = K && W - K;
        return D ? Math.round((H * 1000) / D) : void 0;
    });
}
var O1Q;
