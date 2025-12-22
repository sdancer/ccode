// Module: t51
// Type: U
// Lines: 339403-339458
//
var t51 = U((a82)=>{
    Object.defineProperty(a82, "__esModule", {
        value: !0
    });
    a82.getOtlpEncoder = a82.encodeAsString = a82.encodeAsLongBits = a82.toLongBits = a82.hrTimeToNanos = void 0;
    var em3 = c3(), JY0 = c82();
    function XY0(A) {
        let Q = BigInt(1e9);
        return BigInt(A[0]) * Q + BigInt(A[1]);
    }
    a82.hrTimeToNanos = XY0;
    function l82(A) {
        let Q = Number(BigInt.asUintN(32, A)), B = Number(BigInt.asUintN(32, A >> BigInt(32)));
        return {
            low: Q,
            high: B
        };
    }
    a82.toLongBits = l82;
    function IY0(A) {
        let Q = XY0(A);
        return l82(Q);
    }
    a82.encodeAsLongBits = IY0;
    function i82(A) {
        return XY0(A).toString();
    }
    a82.encodeAsString = i82;
    var Ad3 = typeof BigInt < "u" ? i82 : em3.hrTimeToNanoseconds;
    function p82(A) {
        return A;
    }
    function n82(A) {
        if (A === void 0) return;
        return (0, JY0.hexToBinary)(A);
    }
    var Qd3 = {
        encodeHrTime: IY0,
        encodeSpanContext: JY0.hexToBinary,
        encodeOptionalSpanContext: n82
    };
    function Bd3(A) {
        if (A === void 0) return Qd3;
        let Q = A.useLongBits ?? !0, B = A.useHex ?? !1;
        return {
            encodeHrTime: Q ? IY0 : Ad3,
            encodeSpanContext: B ? p82 : JY0.hexToBinary,
            encodeOptionalSpanContext: B ? p82 : n82
        };
    }
    a82.getOtlpEncoder = Bd3;
});
