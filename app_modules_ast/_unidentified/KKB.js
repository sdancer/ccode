// Module: KKB
// Type: U
// Lines: 196926-196939
//
var KKB = U((IKB)=>{
    Object.defineProperty(IKB, "__esModule", {
        value: !0
    });
    IKB.numToUint8 = void 0;
    function Ax8(A) {
        return new Uint8Array([
            (A & 4278190080) >> 24,
            (A & 16711680) >> 16,
            (A & 65280) >> 8,
            A & 255
        ]);
    }
    IKB.numToUint8 = Ax8;
});
