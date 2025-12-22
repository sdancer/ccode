// Module: HL0
// Type: L
// Lines: 490063-490088
//
var HL0 = L(()=>{
    R5();
    pE();
    BJ();
    A2();
    BN();
});
function ifA({ ratio: A, width: Q, fillColor: B, emptyColor: G }) {
    let Z = Math.min(1, Math.max(0, A)), Y = Math.floor(Z * Q), J = [
        lfA[lfA.length - 1].repeat(Y)
    ];
    if (Y < Q) {
        let X = Z * Q - Y, I = Math.floor(X * lfA.length);
        J.push(lfA[I]);
        let W = Q - Y - 1;
        if (W > 0) J.push(lfA[0].repeat(W));
    }
    return j59.default.createElement(C, {
        color: B,
        backgroundColor: G
    }, J.join(""));
}
var j59, lfA;
