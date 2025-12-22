// Module: GuQ
// Type: U
// Lines: 126937-126960
//
var GuQ = U((QuQ)=>{
    Object.defineProperty(QuQ, "__esModule", {
        value: !0
    });
    QuQ.NoopContextManager = void 0;
    var DB8 = vwA();
    class AuQ {
        active() {
            return DB8.ROOT_CONTEXT;
        }
        with(A, Q, B, ...G) {
            return Q.call(B, ...G);
        }
        bind(A, Q) {
            return Q;
        }
        enable() {
            return this;
        }
        disable() {
            return this;
        }
    }
    QuQ.NoopContextManager = AuQ;
});
