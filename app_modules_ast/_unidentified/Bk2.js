// Module: Bk2
// Type: U
// Lines: 430381-430449
//
var Bk2 = U((Qk2)=>{
    Object.defineProperty(Qk2, "__esModule", {
        value: !0
    });
    var ev2 = XC0(), O_ = qvA(), Ak2 = new RegExp("^[ \\t]*([0-9a-f]{32})?-?([0-9a-f]{16})?-?([01])?[ \\t]*$");
    function IC0(A) {
        if (!A) return;
        let Q = A.match(Ak2);
        if (!Q) return;
        let B;
        if (Q[3] === "1") B = !0;
        else if (Q[3] === "0") B = !1;
        return {
            traceId: Q[1],
            parentSampled: B,
            parentSpanId: Q[2]
        };
    }
    function Aq5(A, Q) {
        let B = IC0(A), G = ev2.baggageHeaderToDynamicSamplingContext(Q), { traceId: Z, parentSpanId: Y, parentSampled: J } = B || {};
        if (!B) return {
            traceparentData: B,
            dynamicSamplingContext: void 0,
            propagationContext: {
                traceId: Z || O_.uuid4(),
                spanId: O_.uuid4().substring(16)
            }
        };
        else return {
            traceparentData: B,
            dynamicSamplingContext: G || {},
            propagationContext: {
                traceId: Z || O_.uuid4(),
                parentSpanId: Y || O_.uuid4().substring(16),
                spanId: O_.uuid4().substring(16),
                sampled: J,
                dsc: G || {}
            }
        };
    }
    function Qq5(A, Q) {
        let B = IC0(A), G = ev2.baggageHeaderToDynamicSamplingContext(Q), { traceId: Z, parentSpanId: Y, parentSampled: J } = B || {};
        if (!B) return {
            traceId: Z || O_.uuid4(),
            spanId: O_.uuid4().substring(16)
        };
        else return {
            traceId: Z || O_.uuid4(),
            parentSpanId: Y || O_.uuid4().substring(16),
            spanId: O_.uuid4().substring(16),
            sampled: J,
            dsc: G || {}
        };
    }
    function Bq5(A = O_.uuid4(), Q = O_.uuid4().substring(16), B) {
        let G = "";
        if (B !== void 0) G = B ? "-1" : "-0";
        return `${A}-${Q}${G}`;
    }
    Qk2.TRACEPARENT_REGEXP = Ak2;
    Qk2.extractTraceparentData = IC0;
    Qk2.generateSentryTraceHeader = Bq5;
    Qk2.propagationContextFromHeaders = Qq5;
    Qk2.tracingContextFromHeaders = Aq5;
});
