// Module: $g1
// Type: U
// Lines: 127056-127095
//
var $g1 = U((zuQ)=>{
    Object.defineProperty(zuQ, "__esModule", {
        value: !0
    });
    zuQ.getSpanContext = zuQ.setSpanContext = zuQ.deleteSpan = zuQ.setSpan = zuQ.getActiveSpan = zuQ.getSpan = void 0;
    var UB8 = vwA(), wB8 = oaA(), qB8 = fwA(), zg1 = (0, UB8.createContextKey)("OpenTelemetry Context Key SPAN");
    function Cg1(A) {
        return A.getValue(zg1) || void 0;
    }
    zuQ.getSpan = Cg1;
    function NB8() {
        return Cg1(qB8.ContextAPI.getInstance().active());
    }
    zuQ.getActiveSpan = NB8;
    function EuQ(A, Q) {
        return A.setValue(zg1, Q);
    }
    zuQ.setSpan = EuQ;
    function LB8(A) {
        return A.deleteValue(zg1);
    }
    zuQ.deleteSpan = LB8;
    function OB8(A, Q) {
        return EuQ(A, new wB8.NonRecordingSpan(Q));
    }
    zuQ.setSpanContext = OB8;
    function MB8(A) {
        var Q;
        return (Q = Cg1(A)) === null || Q === void 0 ? void 0 : Q.spanContext();
    }
    zuQ.getSpanContext = MB8;
});
