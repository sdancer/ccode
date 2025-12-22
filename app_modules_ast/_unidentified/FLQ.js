// Module: FLQ
// Type: U
// Lines: 103711-103724
//
var FLQ = U((HLQ)=>{
    Object.defineProperty(HLQ, "__esModule", {
        value: !0
    });
    HLQ.numToUint8 = void 0;
    function KO6(A) {
        return new Uint8Array([
            (A & 4278190080) >> 24,
            (A & 16711680) >> 16,
            (A & 65280) >> 8,
            A & 255
        ]);
    }
    HLQ.numToUint8 = KO6;
});
