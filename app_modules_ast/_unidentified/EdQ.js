// Module: EdQ
// Type: U
// Lines: 127916-127932
//
var EdQ = U((DdQ)=>{
    Object.defineProperty(DdQ, "__esModule", {
        value: !0
    });
    DdQ.API_BACKWARDS_COMPATIBILITY_VERSION = DdQ.makeGetter = DdQ._global = DdQ.GLOBAL_LOGS_API_KEY = void 0;
    var t28 = HdQ();
    DdQ.GLOBAL_LOGS_API_KEY = Symbol.for("io.opentelemetry.js.api.logs");
    DdQ._global = t28._globalThis;
    function e28(A, Q, B) {
        return (G)=>(G === A ? Q : B);
    }
    DdQ.makeGetter = e28;
    DdQ.API_BACKWARDS_COMPATIBILITY_VERSION = 1;
});
