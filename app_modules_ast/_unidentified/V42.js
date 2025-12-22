// Module: V42
// Type: U
// Lines: 325923-325939
//
var V42 = U((W42)=>{
    Object.defineProperty(W42, "__esModule", {
        value: !0
    });
    W42.MultiMetricStorage = void 0;
    class I42 {
        _backingStorages;
        constructor(A){
            this._backingStorages = A;
        }
        record(A, Q, B, G) {
            this._backingStorages.forEach((Z)=>{
                Z.record(A, Q, B, G);
            });
        }
    }
    W42.MultiMetricStorage = I42;
});
