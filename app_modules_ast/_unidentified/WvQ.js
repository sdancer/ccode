// Module: WvQ
// Type: U
// Lines: 119033-119068
//
var commandLoop = U((so7, IvQ)=>{
    var { kConnected: ZvQ, kSize: YvQ } = nJ();
    class JvQ {
        constructor(A){
            this.value = A;
        }
        deref() {
            return this.value[ZvQ] === 0 && this.value[YvQ] === 0 ? void 0 : this.value;
        }
    }
    class XvQ {
        constructor(A){
            this.finalizer = A;
        }
        register(A, Q) {
            if (A.on) A.on("disconnect", ()=>{
                if (A[ZvQ] === 0 && A[YvQ] === 0) this.finalizer(Q);
            });
        }
        unregister(A) {}
    }
    IvQ.exports = function() {
        if (process.env.NODE_V8_COVERAGE && process.version.startsWith("v18")) return (process._rawDebug("Using compatibility WeakRef and FinalizationRegistry"), {
            WeakRef: JvQ,
            FinalizationRegistry: XvQ
        });
        return {
            WeakRef,
            FinalizationRegistry
        };
    };
});
