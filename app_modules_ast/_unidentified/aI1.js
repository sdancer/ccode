// Module: aI1
// Type: U
// Lines: 432679-432694
//
var restoreViewTransitionName = U((_f2)=>{
    Object.defineProperty(_f2, "__esModule", {
        value: !0
    });
    var aj5 = createRenderState();
    function oj5(A) {
        if (typeof __SENTRY_TRACING__ === "boolean" && !__SENTRY_TRACING__) return !1;
        let Q = aj5.getClient(), B = A || (Q && Q.getOptions());
        return (!!B && (B.enableTracing || "tracesSampleRate" in B || "tracesSampler" in B));
    }
    _f2.hasTracingEnabled = oj5;
});
