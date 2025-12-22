// Module: teQ
// Type: U
// Lines: 132593-132616
//
var teQ = U((reQ)=>{
    Object.defineProperty(reQ, "__esModule", {
        value: !0
    });
    reQ.Logger = void 0;
    var HV8 = f9(), DV8 = aeQ();
    class oeQ {
        instrumentationScope;
        _sharedState;
        constructor(A, Q){
            ((this.instrumentationScope = A), (this._sharedState = Q));
        }
        emit(A) {
            let Q = A.context || HV8.context.active(), B = new DV8.LogRecordImpl(this._sharedState, this.instrumentationScope, {
                context: Q,
                ...A
            });
            (this._sharedState.activeProcessor.onEmit(B, Q), B._makeReadonly());
        }
    }
    reQ.Logger = oeQ;
});
