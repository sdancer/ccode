// Module: EH2
// Type: U
// Lines: 363324-363339
//
var EH2 = U((DH2)=>{
    Object.defineProperty(DH2, "__esModule", {
        value: !0
    });
    DH2.NoopSpanProcessor = void 0;
    class HH2 {
        onStart(A, Q) {}
        onEnd(A) {}
        shutdown() {
            return Promise.resolve();
        }
        forceFlush() {
            return Promise.resolve();
        }
    }
    DH2.NoopSpanProcessor = HH2;
});
