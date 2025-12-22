// Module: P9B
// Type: L
// Lines: 165985-166029
//
var P9B = L(()=>{
    _9B();
    T9B = l(ReactDevToolsBackend(), 1);
    T9B.default.connectToDevTools();
});
var v9B, S9B, y9B = (A, Q)=>{
    if (A === Q) return;
    if (!A) return Q;
    let B = {}, G = !1;
    for (let Z of Object.keys(A))if (Q ? !Object.hasOwn(Q, Z) : !0) ((B[Z] = void 0), (G = !0));
    if (Q) {
        for (let Z of Object.keys(Q))if (Q[Z] !== A[Z]) ((B[Z] = Q[Z]), (G = !0));
    }
    return G ? B : void 0;
}, k9B = (A)=>{
    if ("childNodes" in A) for (let Q of A.childNodes)k9B(Q);
    A.yogaNode = void 0;
}, x9B = (A)=>{
    let Q = A.yogaNode;
    if (Q) (Q.unsetMeasureFunc(), k9B(A), Q.freeRecursive());
}, bd1 = (A)=>{
    let Q = A;
    while(Q.parentNode)Q = Q.parentNode;
    return Q;
}, gd1 = (A)=>{
    if (A.internal_static) return A;
    for (let Q of A.childNodes){
        if (Q.nodeName === "#text") continue;
        let B = gd1(Q);
        if (B) return B;
    }
    return;
}, hd1, ox;
