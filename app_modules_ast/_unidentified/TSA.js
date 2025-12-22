// Module: TSA
// Type: U
// Lines: 356274-356316
//
var createRenderState = U((kX2)=>{
    Object.defineProperty(kX2, "__esModule", {
        value: !0
    });
    kX2.durationMessageToDuration = je3;
    kX2.msToDuration = Te3;
    kX2.durationToMs = Pe3;
    kX2.isDuration = Se3;
    kX2.isDurationMessage = ye3;
    kX2.parseDuration = ve3;
    kX2.durationToString = ke3;
    function je3(A) {
        return {
            seconds: Number.parseInt(A.seconds),
            nanos: A.nanos
        };
    }
    function Te3(A) {
        return {
            seconds: (A / 1000) | 0,
            nanos: ((A % 1000) * 1e6) | 0
        };
    }
    function Pe3(A) {
        return (A.seconds * 1000 + A.nanos / 1e6) | 0;
    }
    function Se3(A) {
        return typeof A.seconds === "number" && typeof A.nanos === "number";
    }
    function ye3(A) {
        return typeof A.seconds === "string" && typeof A.nanos === "number";
    }
    var xe3 = /^(\d+)(?:\.(\d+))?s$/;
    function ve3(A) {
        let Q = A.match(xe3);
        if (!Q) return null;
        return {
            seconds: Number.parseInt(Q[1], 10),
            nanos: Q[2] ? Number.parseInt(Q[2].padEnd(9, "0"), 10) : 0
        };
    }
    function ke3(A) {
        if (A.nanos === 0) return `${A.seconds}s`;
        let Q;
        if (A.nanos % 1e6 === 0) Q = 1e6;
        else if (A.nanos % 1000 === 0) Q = 1000;
        else Q = 1;
        return `${A.seconds}.${A.nanos / Q}s`;
    }
});
