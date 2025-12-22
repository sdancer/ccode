// Module: DKB
// Type: U
// Lines: 196939-196953
//
var DKB = U((VKB)=>{
    Object.defineProperty(VKB, "__esModule", {
        value: !0
    });
    VKB.uint32ArrayFrom = void 0;
    function Qx8(A) {
        if (!Uint32Array.from) {
            var Q = new Uint32Array(A.length), B = 0;
            while(B < A.length)((Q[B] = A[B]), (B += 1));
            return Q;
        }
        return Uint32Array.from(A);
    }
    VKB.uint32ArrayFrom = Qx8;
});
