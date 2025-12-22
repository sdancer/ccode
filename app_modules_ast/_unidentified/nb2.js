// Module: nb2
// Type: U
// Lines: 435221-435244
//
var nb2 = U((ib2)=>{
    Object.defineProperty(ib2, "__esModule", {
        value: !0
    });
    function Py5(A, Q) {
        let B = Q && xy5(Q) ? Q.getClient() : Q, G = B && B.getDsn(), Z = B && B.getOptions().tunnel;
        return yy5(A, G) || Sy5(A, Z);
    }
    function Sy5(A, Q) {
        if (!Q) return !1;
        return lb2(A) === lb2(Q);
    }
    function yy5(A, Q) {
        return Q ? A.includes(Q.host) : !1;
    }
    function lb2(A) {
        return A[A.length - 1] === "/" ? A.slice(0, -1) : A;
    }
    function xy5(A) {
        return A.getClient !== void 0;
    }
    ib2.isSentryRequestUrl = Py5;
});
