// Module: CLQ
// Type: U
// Lines: 103724-103738
//
var CLQ = U((ELQ)=>{
    Object.defineProperty(ELQ, "__esModule", {
        value: !0
    });
    ELQ.uint32ArrayFrom = void 0;
    function VO6(A) {
        if (!Uint32Array.from) {
            var Q = new Uint32Array(A.length), B = 0;
            while(B < A.length)((Q[B] = A[B]), (B += 1));
            return Q;
        }
        return Uint32Array.from(A);
    }
    ELQ.uint32ArrayFrom = VO6;
});
