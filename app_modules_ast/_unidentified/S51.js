// Module: S51
// Type: U
// Lines: 324100-324128
//
var S51 = U((tB2)=>{
    Object.defineProperty(tB2, "__esModule", {
        value: !0
    });
    tB2.nextGreaterSquare = tB2.ldexp = void 0;
    function lh3(A, Q) {
        if (A === 0 || A === Number.POSITIVE_INFINITY || A === Number.NEGATIVE_INFINITY || Number.isNaN(A)) return A;
        return A * Math.pow(2, Q);
    }
    tB2.ldexp = lh3;
    function ih3(A) {
        return (A--, (A |= A >> 1), (A |= A >> 2), (A |= A >> 4), (A |= A >> 8), (A |= A >> 16), A++, A);
    }
    tB2.nextGreaterSquare = ih3;
});
