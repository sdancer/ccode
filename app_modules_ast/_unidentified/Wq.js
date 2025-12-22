// Module: Wq
// Type: U
// Lines: 431294-431354
//
var renderElement = U((sk2)=>{
    Object.defineProperty(sk2, "__esModule", {
        value: !0
    });
    var OC0 = FQ(), DR5 = 0, ak2 = 1;
    function FR5(A) {
        let { spanId: Q, traceId: B } = A.spanContext(), { data: G, op: Z, parent_span_id: Y, status: J, tags: X, origin: I } = ok2(A);
        return OC0.dropUndefinedKeys({
            data: G,
            op: Z,
            parent_span_id: Y,
            span_id: Q,
            status: J,
            tags: X,
            trace_id: B,
            origin: I
        });
    }
    function ER5(A) {
        let { traceId: Q, spanId: B } = A.spanContext(), G = rk2(A);
        return OC0.generateSentryTraceHeader(Q, B, G);
    }
    function zR5(A) {
        if (typeof A === "number") return nk2(A);
        if (Array.isArray(A)) return A[0] + A[1] / 1e9;
        if (A instanceof Date) return nk2(A.getTime());
        return OC0.timestampInSeconds();
    }
    function nk2(A) {
        return A > 9999999999 ? A / 1000 : A;
    }
    function ok2(A) {
        if (CR5(A)) return A.getSpanJSON();
        if (typeof A.toJSON === "function") return A.toJSON();
        return {};
    }
    function CR5(A) {
        return typeof A.getSpanJSON === "function";
    }
    function rk2(A) {
        let { traceFlags: Q } = A.spanContext();
        return Boolean(Q & ak2);
    }
    sk2.TRACE_FLAG_NONE = DR5;
    sk2.TRACE_FLAG_SAMPLED = ak2;
    sk2.spanIsSampled = rk2;
    sk2.spanTimeInputToSeconds = zR5;
    sk2.spanToJSON = ok2;
    sk2.spanToTraceContext = FR5;
    sk2.spanToTraceHeader = ER5;
});
