// Module: lz0
// Type: U
// Lines: 429342-429366
//
var lz0 = U((tx2)=>{
    Object.defineProperty(tx2, "__esModule", {
        value: !0
    });
    var cz0 = renderChildrenArray(), pz0 = Dd(), qI1 = null;
    function P$5(A) {
        (pz0.addHandler("unhandledrejection", A), pz0.maybeInstrument("unhandledrejection", S$5));
    }
    function S$5() {
        ((qI1 = cz0.GLOBAL_OBJ.onunhandledrejection), (cz0.GLOBAL_OBJ.onunhandledrejection = function(A) {
            let Q = A;
            if ((pz0.triggerHandlers("unhandledrejection", Q), qI1 && !qI1.__SENTRY_LOADER__)) return qI1.apply(this, arguments);
            return !0;
        }), (cz0.GLOBAL_OBJ.onunhandledrejection.__SENTRY_INSTRUMENTED__ = !0));
    }
    tx2.addGlobalUnhandledRejectionInstrumentationHandler = P$5;
});
