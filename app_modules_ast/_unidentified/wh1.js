// Module: wh1
// Type: U
// Lines: 123163-123180
//
var wh1 = U((Lr7, NfQ)=>{
    function ve6(A) {
        return A.indexOf("\x00") === -1;
    }
    function ke6(A) {
        if (A.length === 0) return !1;
        for(let Q = 0; Q < A.length; Q++)if (A.charCodeAt(Q) < 48 || A.charCodeAt(Q) > 57) return !1;
        return !0;
    }
    function fe6(A) {
        return new Promise((Q)=>{
            setTimeout(Q, A).unref();
        });
    }
    NfQ.exports = {
        isValidLastEventId: ve6,
        isASCIINumber: ke6,
        delay: fe6
    };
});
