// Module: Lg1
// Type: U
// Lines: 127205-127234
//
var Lg1 = U((kuQ)=>{
    Object.defineProperty(kuQ, "__esModule", {
        value: !0
    });
    kuQ.ProxyTracerProvider = void 0;
    var lB8 = Ng1(), iB8 = xuQ(), nB8 = new iB8.NoopTracerProvider();
    class vuQ {
        getTracer(A, Q, B) {
            var G;
            return (G = this.getDelegateTracer(A, Q, B)) !== null && G !== void 0 ? G : new lB8.ProxyTracer(this, A, Q, B);
        }
        getDelegate() {
            var A;
            return (A = this._delegate) !== null && A !== void 0 ? A : nB8;
        }
        setDelegate(A) {
            this._delegate = A;
        }
        getDelegateTracer(A, Q, B) {
            var G;
            return (G = this._delegate) === null || G === void 0 ? void 0 : G.getTracer(A, Q, B);
        }
    }
    kuQ.ProxyTracerProvider = vuQ;
});
