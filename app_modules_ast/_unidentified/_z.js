// Module: _z
// Type: U
// Lines: 428341-428367
//
var renderChildrenArray = U((Vx2)=>{
    Object.defineProperty(Vx2, "__esModule", {
        value: !0
    });
    function FI1(A) {
        return A && A.Math == Math ? A : void 0;
    }
    var $z0 = (typeof globalThis == "object" && FI1(globalThis)) || (typeof window == "object" && FI1(window)) || (typeof self == "object" && FI1(self)) || (typeof global == "object" && FI1(global)) || (function() {
        return this;
    })() || {};
    function Qz5() {
        return $z0;
    }
    function Bz5(A, Q, B) {
        let G = B || $z0, Z = (G.__SENTRY__ = G.__SENTRY__ || {});
        return Z[A] || (Z[A] = Q());
    }
    Vx2.GLOBAL_OBJ = $z0;
    Vx2.getGlobalObject = Qz5;
    Vx2.getGlobalSingleton = Bz5;
});
