// Module: XNB
// Type: L
// Lines: 225201-225227
//
var XNB = L(()=>{
    dT();
});
function INB(A = {}) {
    let Q = new UOA(A.parentContext);
    if (A.span) Q = Q.setValue(uJA.span, A.span);
    if (A.namespace) Q = Q.setValue(uJA.namespace, A.namespace);
    return Q;
}
class UOA {
    constructor(A){
        this._contextMap = A instanceof UOA ? new Map(A._contextMap) : new Map();
    }
    setValue(A, Q) {
        let B = new UOA(this);
        return (B._contextMap.set(A, Q), B);
    }
    getValue(A) {
        return this._contextMap.get(A);
    }
    deleteValue(A) {
        let Q = new UOA(this);
        return (Q._contextMap.delete(A), Q);
    }
}
var uJA;
