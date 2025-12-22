// Module: qg1
// Type: U
// Lines: 127123-127162
//
var createRenderState = U((MuQ)=>{
    Object.defineProperty(MuQ, "__esModule", {
        value: !0
    });
    MuQ.NoopTracer = void 0;
    var gB8 = fwA(), LuQ = $g1(), Ug1 = oaA(), uB8 = raA(), wg1 = gB8.ContextAPI.getInstance();
    class OuQ {
        startSpan(A, Q, B = wg1.active()) {
            if (Boolean(Q === null || Q === void 0 ? void 0 : Q.root)) return new Ug1.NonRecordingSpan();
            let Z = B && (0, LuQ.getSpanContext)(B);
            if (mB8(Z) && (0, uB8.isSpanContextValid)(Z)) return new Ug1.NonRecordingSpan(Z);
            else return new Ug1.NonRecordingSpan();
        }
        startActiveSpan(A, Q, B, G) {
            let Z, Y, J;
            if (arguments.length < 2) return;
            else if (arguments.length === 2) J = Q;
            else if (arguments.length === 3) ((Z = Q), (J = B));
            else ((Z = Q), (Y = B), (J = G));
            let X = Y !== null && Y !== void 0 ? Y : wg1.active(), I = this.startSpan(A, Z, X), W = (0, LuQ.setSpan)(X, I);
            return wg1.with(W, J, void 0, I);
        }
    }
    MuQ.NoopTracer = OuQ;
    function mB8(A) {
        return (typeof A === "object" && typeof A.spanId === "string" && typeof A.traceId === "string" && typeof A.traceFlags === "number");
    }
});
