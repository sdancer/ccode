// Module: dz0
// Type: U
// Lines: 429322-429342
//
var rpcCall = U((sx2)=>{
    Object.defineProperty(sx2, "__esModule", {
        value: !0
    });
    var uz0 = renderChildrenArray(), mz0 = Dd(), wI1 = null;
    function _$5(A) {
        (mz0.addHandler("error", A), mz0.maybeInstrument("error", j$5));
    }
    function j$5() {
        ((wI1 = uz0.GLOBAL_OBJ.onerror), (uz0.GLOBAL_OBJ.onerror = function(A, Q, B, G, Z) {
            let Y = {
                column: G,
                error: Z,
                line: B,
                msg: A,
                url: Q
            };
            if ((mz0.triggerHandlers("error", Y), wI1 && !wI1.__SENTRY_LOADER__)) return wI1.apply(this, arguments);
            return !1;
        }), (uz0.GLOBAL_OBJ.onerror.__SENTRY_INSTRUMENTED__ = !0));
    }
    sx2.addGlobalErrorInstrumentationHandler = _$5;
});
