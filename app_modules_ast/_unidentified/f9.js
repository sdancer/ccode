// Module: f9
// Type: U
// Lines: 127558-127779
//
var f9 = U((rG)=>{
    Object.defineProperty(rG, "__esModule", {
        value: !0
    });
    rG.trace = rG.propagation = rG.metrics = rG.diag = rG.context = rG.INVALID_SPAN_CONTEXT = rG.INVALID_TRACEID = rG.INVALID_SPANID = rG.isValidSpanId = rG.isValidTraceId = rG.isSpanContextValid = rG.createTraceState = rG.TraceFlags = rG.SpanStatusCode = rG.SpanKind = rG.SamplingDecision = rG.ProxyTracerProvider = rG.ProxyTracer = rG.defaultTextMapSetter = rG.defaultTextMapGetter = rG.ValueType = rG.createNoopMeter = rG.DiagLogLevel = rG.DiagConsoleLogger = rG.ROOT_CONTEXT = rG.createContextKey = rG.baggageEntryMetadataFromString = void 0;
    var _28 = createRenderState();
    Object.defineProperty(rG, "baggageEntryMetadataFromString", {
        enumerable: !0,
        get: function() {
            return _28.baggageEntryMetadataFromString;
        }
    });
    var cmQ = vwA();
    Object.defineProperty(rG, "createContextKey", {
        enumerable: !0,
        get: function() {
            return cmQ.createContextKey;
        }
    });
    Object.defineProperty(rG, "ROOT_CONTEXT", {
        enumerable: !0,
        get: function() {
            return cmQ.ROOT_CONTEXT;
        }
    });
    var j28 = renderElement();
    Object.defineProperty(rG, "DiagConsoleLogger", {
        enumerable: !0,
        get: function() {
            return j28.DiagConsoleLogger;
        }
    });
    var T28 = laA();
    Object.defineProperty(rG, "DiagLogLevel", {
        enumerable: !0,
        get: function() {
            return T28.DiagLogLevel;
        }
    });
    var P28 = Ig1();
    Object.defineProperty(rG, "createNoopMeter", {
        enumerable: !0,
        get: function() {
            return P28.createNoopMeter;
        }
    });
    var S28 = sgQ();
    Object.defineProperty(rG, "ValueType", {
        enumerable: !0,
        get: function() {
            return S28.ValueType;
        }
    });
    var pmQ = Kg1();
    Object.defineProperty(rG, "defaultTextMapGetter", {
        enumerable: !0,
        get: function() {
            return pmQ.defaultTextMapGetter;
        }
    });
    Object.defineProperty(rG, "defaultTextMapSetter", {
        enumerable: !0,
        get: function() {
            return pmQ.defaultTextMapSetter;
        }
    });
    var y28 = Ng1();
    Object.defineProperty(rG, "ProxyTracer", {
        enumerable: !0,
        get: function() {
            return y28.ProxyTracer;
        }
    });
    var x28 = Lg1();
    Object.defineProperty(rG, "ProxyTracerProvider", {
        enumerable: !0,
        get: function() {
            return x28.ProxyTracerProvider;
        }
    });
    var v28 = huQ();
    Object.defineProperty(rG, "SamplingDecision", {
        enumerable: !0,
        get: function() {
            return v28.SamplingDecision;
        }
    });
    var k28 = uuQ();
    Object.defineProperty(rG, "SpanKind", {
        enumerable: !0,
        get: function() {
            return k28.SpanKind;
        }
    });
    var f28 = duQ();
    Object.defineProperty(rG, "SpanStatusCode", {
        enumerable: !0,
        get: function() {
            return f28.SpanStatusCode;
        }
    });
    var b28 = Eg1();
    Object.defineProperty(rG, "TraceFlags", {
        enumerable: !0,
        get: function() {
            return b28.TraceFlags;
        }
    });
    var h28 = QmQ();
    Object.defineProperty(rG, "createTraceState", {
        enumerable: !0,
        get: function() {
            return h28.createTraceState;
        }
    });
    var ug1 = raA();
    Object.defineProperty(rG, "isSpanContextValid", {
        enumerable: !0,
        get: function() {
            return ug1.isSpanContextValid;
        }
    });
    Object.defineProperty(rG, "isValidTraceId", {
        enumerable: !0,
        get: function() {
            return ug1.isValidTraceId;
        }
    });
    Object.defineProperty(rG, "isValidSpanId", {
        enumerable: !0,
        get: function() {
            return ug1.isValidSpanId;
        }
    });
    var mg1 = aaA();
    Object.defineProperty(rG, "INVALID_SPANID", {
        enumerable: !0,
        get: function() {
            return mg1.INVALID_SPANID;
        }
    });
    Object.defineProperty(rG, "INVALID_TRACEID", {
        enumerable: !0,
        get: function() {
            return mg1.INVALID_TRACEID;
        }
    });
    Object.defineProperty(rG, "INVALID_SPAN_CONTEXT", {
        enumerable: !0,
        get: function() {
            return mg1.INVALID_SPAN_CONTEXT;
        }
    });
    var lmQ = ZmQ();
    Object.defineProperty(rG, "context", {
        enumerable: !0,
        get: function() {
            return lmQ.context;
        }
    });
    var imQ = XmQ();
    Object.defineProperty(rG, "diag", {
        enumerable: !0,
        get: function() {
            return imQ.diag;
        }
    });
    var nmQ = CmQ();
    Object.defineProperty(rG, "metrics", {
        enumerable: !0,
        get: function() {
            return nmQ.metrics;
        }
    });
    var amQ = xmQ();
    Object.defineProperty(rG, "propagation", {
        enumerable: !0,
        get: function() {
            return amQ.propagation;
        }
    });
    var omQ = dmQ();
    Object.defineProperty(rG, "trace", {
        enumerable: !0,
        get: function() {
            return omQ.trace;
        }
    });
    rG.default = {
        context: lmQ.context,
        diag: imQ.diag,
        metrics: nmQ.metrics,
        propagation: amQ.propagation,
        trace: omQ.trace
    };
});
