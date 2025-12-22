// Module: ig1
// Type: U
// Lines: 127859-127889
//
var ig1 = U((JdQ)=>{
    Object.defineProperty(JdQ, "__esModule", {
        value: !0
    });
    JdQ.ProxyLoggerProvider = void 0;
    var i28 = eaA(), n28 = lg1();
    class YdQ {
        getLogger(A, Q, B) {
            var G;
            return (G = this._getDelegateLogger(A, Q, B)) !== null && G !== void 0 ? G : new n28.ProxyLogger(this, A, Q, B);
        }
        _getDelegate() {
            var A;
            return (A = this._delegate) !== null && A !== void 0 ? A : i28.NOOP_LOGGER_PROVIDER;
        }
        _setDelegate(A) {
            this._delegate = A;
        }
        _getDelegateLogger(A, Q, B) {
            var G;
            return (G = this._delegate) === null || G === void 0 ? void 0 : G.getLogger(A, Q, B);
        }
    }
    JdQ.ProxyLoggerProvider = YdQ;
});
