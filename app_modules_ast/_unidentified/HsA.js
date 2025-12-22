// Module: HsA
// Type: L
// Lines: 168299-168313
//
var rpcCall = L(()=>{
    Ci = class Ci extends iC8 {
        emit(A, ...Q) {
            if (A === "error") return super.emit(A, ...Q);
            let B = this.rawListeners(A);
            if (B.length === 0) return !1;
            let G = Q[0] instanceof dZA ? Q[0] : null;
            for (let Z of B)if ((Z.apply(this, Q), G?.didStopImmediatePropagation())) break;
            return !0;
        }
    };
});
var q4B, N4B, DsA;
