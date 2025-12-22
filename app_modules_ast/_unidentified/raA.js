// Module: raA
// Type: U
// Lines: 127095-127123
//
var raA = U((quQ)=>{
    Object.defineProperty(quQ, "__esModule", {
        value: !0
    });
    quQ.wrapSpanContext = quQ.isSpanContextValid = quQ.isValidSpanId = quQ.isValidTraceId = void 0;
    var $uQ = aaA(), SB8 = oaA(), yB8 = /^([0-9a-f]{32})$/i, xB8 = /^[0-9a-f]{16}$/i;
    function UuQ(A) {
        return yB8.test(A) && A !== $uQ.INVALID_TRACEID;
    }
    quQ.isValidTraceId = UuQ;
    function wuQ(A) {
        return xB8.test(A) && A !== $uQ.INVALID_SPANID;
    }
    quQ.isValidSpanId = wuQ;
    function vB8(A) {
        return UuQ(A.traceId) && wuQ(A.spanId);
    }
    quQ.isSpanContextValid = vB8;
    function kB8(A) {
        return new SB8.NonRecordingSpan(A);
    }
    quQ.wrapSpanContext = kB8;
});
