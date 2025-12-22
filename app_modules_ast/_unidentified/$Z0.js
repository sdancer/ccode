// Module: $Z0
// Type: U
// Lines: 324070-324100
//
var $Z0 = U((rB2)=>{
    Object.defineProperty(rB2, "__esModule", {
        value: !0
    });
    rB2.getSignificand = rB2.getNormalBase2 = rB2.MIN_VALUE = rB2.MAX_NORMAL_EXPONENT = rB2.MIN_NORMAL_EXPONENT = rB2.SIGNIFICAND_WIDTH = void 0;
    rB2.SIGNIFICAND_WIDTH = 52;
    var fh3 = 2146435072, bh3 = 1048575, CZ0 = 1023;
    rB2.MIN_NORMAL_EXPONENT = -CZ0 + 1;
    rB2.MAX_NORMAL_EXPONENT = CZ0;
    rB2.MIN_VALUE = Math.pow(2, -1022);
    function hh3(A) {
        let Q = new DataView(new ArrayBuffer(8));
        return (Q.setFloat64(0, A), ((Q.getUint32(0) & fh3) >> 20) - CZ0);
    }
    rB2.getNormalBase2 = hh3;
    function gh3(A) {
        let Q = new DataView(new ArrayBuffer(8));
        Q.setFloat64(0, A);
        let B = Q.getUint32(0), G = Q.getUint32(4);
        return (B & bh3) * Math.pow(2, 32) + G;
    }
    rB2.getSignificand = gh3;
});
