// Module: nmA
// Type: U
// Lines: 55911-55932
//
var nmA = U((zQQ)=>{
    Object.defineProperty(zQQ, "__esModule", {
        value: !0
    });
    zQQ.SDKType = void 0;
    var EQQ = {}, o3A;
    zQQ.SDKType = {
        _get: (A)=>{
            var Q;
            return (((Q = EQQ[A]) !== null && Q !== void 0 ? Q : "js-mono") + (o3A !== null && o3A !== void 0 ? o3A : ""));
        },
        _setClientType (A, Q) {
            EQQ[A] = Q;
        },
        _setBindingType (A) {
            if (!o3A || o3A === "-react") o3A = "-" + A;
        }
    };
});
