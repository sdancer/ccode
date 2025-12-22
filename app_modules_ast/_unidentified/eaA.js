// Module: eaA
// Type: U
// Lines: 127820-127832
//
var eaA = U((AdQ)=>{
    Object.defineProperty(AdQ, "__esModule", {
        value: !0
    });
    AdQ.NOOP_LOGGER_PROVIDER = AdQ.NoopLoggerProvider = void 0;
    var c28 = taA();
    class pg1 {
        getLogger(A, Q, B) {
            return new c28.NoopLogger();
        }
    }
    AdQ.NoopLoggerProvider = pg1;
    AdQ.NOOP_LOGGER_PROVIDER = new pg1();
});
