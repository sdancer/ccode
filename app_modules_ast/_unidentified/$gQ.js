// Module: $gQ
// Type: U
// Lines: 126566-126597
//
var rpcCall = U((zgQ)=>{
    Object.defineProperty(zgQ, "__esModule", {
        value: !0
    });
    zgQ.DiagComponentLogger = void 0;
    var gQ8 = iAA();
    class EgQ {
        constructor(A){
            this._namespace = A.namespace || "DiagComponentLogger";
        }
        debug(...A) {
            return xwA("debug", this._namespace, A);
        }
        error(...A) {
            return xwA("error", this._namespace, A);
        }
        info(...A) {
            return xwA("info", this._namespace, A);
        }
        warn(...A) {
            return xwA("warn", this._namespace, A);
        }
        verbose(...A) {
            return xwA("verbose", this._namespace, A);
        }
    }
    zgQ.DiagComponentLogger = EgQ;
    function xwA(A, Q, B) {
        let G = (0, gQ8.getGlobal)("diag");
        if (!G) return;
        return (B.unshift(Q), G[A](...B));
    }
});
