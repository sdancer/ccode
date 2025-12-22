// Module: Fw0
// Type: U
// Lines: 452387-452403
//
var Fw0 = U((da2)=>{
    Object.defineProperty(da2, "__esModule", {
        value: !0
    });
    da2.backoff = void 0;
    function ce5(A) {
        var Q = Math.random() + 1, B = A.minTimeout, G = B === void 0 ? 500 : B, Z = A.factor, Y = Z === void 0 ? 2 : Z, J = A.attempt, X = A.maxTimeout, I = X === void 0 ? 1 / 0 : X;
        return Math.min(Q * G * Math.pow(Y, J), I);
    }
    da2.backoff = ce5;
});
