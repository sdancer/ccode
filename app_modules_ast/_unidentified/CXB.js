// Module: CXB
// Type: U
// Lines: 194345-194359
//
var CXB = U((EXB)=>{
    Object.defineProperty(EXB, "__esModule", {
        value: !0
    });
    EXB.uint32ArrayFrom = void 0;
    function $T8(A) {
        if (!Uint32Array.from) {
            var Q = new Uint32Array(A.length), B = 0;
            while(B < A.length)((Q[B] = A[B]), (B += 1));
            return Q;
        }
        return Uint32Array.from(A);
    }
    EXB.uint32ArrayFrom = $T8;
});
