// Module: Ru1
// Type: U
// Lines: 132654-132668
//
var Ru1 = U((GAB)=>{
    Object.defineProperty(GAB, "__esModule", {
        value: !0
    });
    GAB.NoopLogRecordProcessor = void 0;
    class BAB {
        forceFlush() {
            return Promise.resolve();
        }
        onEmit(A, Q) {}
        shutdown() {
            return Promise.resolve();
        }
    }
    GAB.NoopLogRecordProcessor = BAB;
});
