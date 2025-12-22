// Module: FXB
// Type: U
// Lines: 194332-194345
//
var FXB = U((HXB)=>{
    Object.defineProperty(HXB, "__esModule", {
        value: !0
    });
    HXB.numToUint8 = void 0;
    function CT8(A) {
        return new Uint8Array([
            (A & 4278190080) >> 24,
            (A & 16711680) >> 16,
            (A & 65280) >> 8,
            A & 255
        ]);
    }
    HXB.numToUint8 = CT8;
});
