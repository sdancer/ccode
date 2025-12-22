// Module: B52
// Type: U
// Lines: 340131-340148
//
var B52 = U((A52)=>{
    Object.defineProperty(A52, "__esModule", {
        value: !0
    });
    A52.parseRetryAfterToMills = A52.isExportRetryable = void 0;
    function Lc3(A) {
        return [
            429,
            502,
            503,
            504
        ].includes(A);
    }
    A52.isExportRetryable = Lc3;
    function Oc3(A) {
        if (A == null) return;
        let Q = Number.parseInt(A, 10);
        if (Number.isInteger(Q)) return Q > 0 ? Q * 1000 : -1;
        let B = new Date(A).getTime() - Date.now();
        if (B >= 0) return B;
        return 0;
    }
    A52.parseRetryAfterToMills = Oc3;
});
