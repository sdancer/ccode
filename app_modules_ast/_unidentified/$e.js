// Module: $e
// Type: U
// Lines: 54945-55006
//
var createRenderState = U((j0Q)=>{
    Object.defineProperty(j0Q, "__esModule", {
        value: !0
    });
    j0Q._getCurrentPageUrlSafe = j0Q._addDocumentEventListenerSafe = j0Q._addWindowEventListenerSafe = j0Q._isServerEnv = j0Q._getDocumentSafe = j0Q._getWindowSafe = void 0;
    var UQ4 = ()=>{
        return typeof window < "u" ? window : null;
    };
    j0Q._getWindowSafe = UQ4;
    var wQ4 = ()=>{
        var A;
        let Q = j0Q._getWindowSafe();
        return (A = Q === null || Q === void 0 ? void 0 : Q.document) !== null && A !== void 0 ? A : null;
    };
    j0Q._getDocumentSafe = wQ4;
    var qQ4 = ()=>{
        if (j0Q._getDocumentSafe() !== null) return !1;
        let A = typeof process < "u" && process.versions != null && process.versions.node != null;
        return typeof EdgeRuntime === "string" || A;
    };
    j0Q._isServerEnv = qQ4;
    var NQ4 = (A, Q)=>{
        let B = j0Q._getWindowSafe();
        if (typeof (B === null || B === void 0 ? void 0 : B.addEventListener) === "function") B.addEventListener(A, Q);
    };
    j0Q._addWindowEventListenerSafe = NQ4;
    var LQ4 = (A, Q)=>{
        let B = j0Q._getDocumentSafe();
        if (typeof (B === null || B === void 0 ? void 0 : B.addEventListener) === "function") B.addEventListener(A, Q);
    };
    j0Q._addDocumentEventListenerSafe = LQ4;
    var OQ4 = ()=>{
        var A;
        try {
            return (A = j0Q._getWindowSafe()) === null || A === void 0 ? void 0 : A.location.href.split(/[?#]/)[0];
        } catch (Q) {
            return;
        }
    };
    j0Q._getCurrentPageUrlSafe = OQ4;
});
