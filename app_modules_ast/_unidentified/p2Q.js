// Module: p2Q
// Type: L
// Lines: 60180-60203
//
var p2Q = L(()=>{
    createRenderState();
    createChildReconciler();
});
function a2Q(A, Q, B, G) {
    return c2Q(A, Q, B, G);
}
function o2Q(A, Q) {
    let B = Q.slice(0).sort((Z, Y)=>{
        let J = Z.offset - Y.offset;
        if (J === 0) return Z.length - Y.length;
        return J;
    }), G = A.length;
    for(let Z = B.length - 1; Z >= 0; Z--){
        let Y = B[Z];
        if (Y.offset + Y.length <= G) A = WdA(A, Y);
        else throw Error("Overlapping edit");
        G = Y.offset;
    }
    return A;
}
var l2Q, i2Q, VN1, n2Q;
