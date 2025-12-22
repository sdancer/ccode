// Module: bwA
// Type: U
// Lines: 128039-128062
//
var bwA = U((LdQ)=>{
    Object.defineProperty(LdQ, "__esModule", {
        value: !0
    });
    LdQ.isTracingSuppressed = LdQ.unsuppressTracing = LdQ.suppressTracing = void 0;
    var I98 = f9(), sg1 = (0, I98.createContextKey)("OpenTelemetry SDK Context Key SUPPRESS_TRACING");
    function W98(A) {
        return A.setValue(sg1, !0);
    }
    LdQ.suppressTracing = W98;
    function K98(A) {
        return A.deleteValue(sg1);
    }
    LdQ.unsuppressTracing = K98;
    function V98(A) {
        return A.getValue(sg1) === !0;
    }
    LdQ.isTracingSuppressed = V98;
});
