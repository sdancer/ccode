// Module: nI1
// Type: U
// Lines: 432548-432572
//
var nI1 = U((Of2)=>{
    Object.defineProperty(Of2, "__esModule", {
        value: !0
    });
    var vC0 = FQ(), kj5 = sK(), fj5 = iI1(), Lf2 = !1;
    function bj5() {
        if (Lf2) return;
        ((Lf2 = !0), vC0.addGlobalErrorInstrumentationHandler(kC0), vC0.addGlobalUnhandledRejectionInstrumentationHandler(kC0));
    }
    function kC0() {
        let A = fj5.getActiveTransaction();
        if (A) (kj5.DEBUG_BUILD && vC0.logger.log("[Tracing] Transaction: internal_error -> Global error occured"), A.setStatus("internal_error"));
    }
    kC0.tag = "sentry_tracingErrorCallback";
    Of2.registerErrorInstrumentation = bj5;
});
