// Module: IAB
// Type: U
// Lines: 132668-132693
//
var IAB = U((JAB)=>{
    Object.defineProperty(JAB, "__esModule", {
        value: !0
    });
    JAB.MultiLogRecordProcessor = void 0;
    var CV8 = c3();
    class YAB {
        processors;
        forceFlushTimeoutMillis;
        constructor(A, Q){
            ((this.processors = A), (this.forceFlushTimeoutMillis = Q));
        }
        async forceFlush() {
            let A = this.forceFlushTimeoutMillis;
            await Promise.all(this.processors.map((Q)=>(0, CV8.callWithTimeout)(Q.forceFlush(), A)));
        }
        onEmit(A, Q) {
            this.processors.forEach((B)=>B.onEmit(A, Q));
        }
        async shutdown() {
            await Promise.all(this.processors.map((A)=>A.shutdown()));
        }
    }
    JAB.MultiLogRecordProcessor = YAB;
});
