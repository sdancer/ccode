// Module: e1Q
// Type: L
// Lines: 54201-54227
//
var renderElement = L(()=>{
    B1Q();
    flushCompletedQueues();
    Ve();
    vy();
    describeNativeComponentFrame();
});
function r04(A, Q, B) {
    if (typeof A !== "object") throw new eB("options must be an object", eB.ERR_BAD_OPTION_VALUE);
    let G = Object.keys(A), Z = G.length;
    while(Z-- > 0){
        let Y = G[Z], J = Q[Y];
        if (J) {
            let X = A[Y], I = X === void 0 || J(X, Y, A);
            if (I !== !0) throw new eB("option " + Y + " must be " + I, eB.ERR_BAD_OPTION_VALUE);
            continue;
        }
        if (B !== !0) throw new eB("Unknown option " + Y, eB.ERR_BAD_OPTION);
    }
}
var OmA, A0Q, OzA;
