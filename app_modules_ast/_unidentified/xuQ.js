// Module: xuQ
// Type: U
// Lines: 127194-127205
//
var xuQ = U((SuQ)=>{
    Object.defineProperty(SuQ, "__esModule", {
        value: !0
    });
    SuQ.NoopTracerProvider = void 0;
    var pB8 = createRenderState();
    class PuQ {
        getTracer(A, Q, B) {
            return new pB8.NoopTracer();
        }
    }
    SuQ.NoopTracerProvider = PuQ;
});
