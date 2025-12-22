// Module: fNB
// Type: L
// Lines: 225852-225905
//
var createRenderState = L(()=>{
    ((kNB = l(vNB(), 1)), (Cs1 = kNB.state));
});
function wn(A, Q, B) {
    let { parameterPath: G, mapper: Z } = Q, Y;
    if (typeof G === "string") G = [
        G
    ];
    if (Array.isArray(G)) {
        if (G.length > 0) if (Z.isConstant) Y = Z.defaultValue;
        else {
            let J = bNB(A, G);
            if (!J.propertyFound && B) J = bNB(B, G);
            let X = !1;
            if (!J.propertyFound) X = Z.required || (G[0] === "options" && G.length === 2);
            Y = X ? Z.defaultValue : J.propertyValue;
        }
    } else {
        if (Z.required) Y = {};
        for(let J in G){
            let X = Z.type.modelProperties[J], I = G[J], W = wn(A, {
                parameterPath: I,
                mapper: X
            }, B);
            if (W !== void 0) {
                if (!Y) Y = {};
                Y[J] = W;
            }
        }
    }
    return Y;
}
function bNB(A, Q) {
    let B = {
        propertyFound: !1
    }, G = 0;
    for(; G < Q.length; ++G){
        let Z = Q[G];
        if (A && Z in A) A = A[Z];
        else break;
    }
    if (G === Q.length) ((B.propertyValue = A), (B.propertyFound = !0));
    return B;
}
function sa8(A) {
    return hNB in A;
}
function Au(A) {
    if (sa8(A)) return Au(A[hNB]);
    let Q = Cs1.operationRequestMap.get(A);
    if (!Q) ((Q = {}), Cs1.operationRequestMap.set(A, Q));
    return Q;
}
var hNB;
