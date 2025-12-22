// Module: Tu2
// Type: U
// Lines: 437567-437579
//
var trackPostpone = U((ju2)=>{
    Object.defineProperty(ju2, "__esModule", {
        value: !0
    });
    function eh5(A) {
        return typeof A === "number" && isFinite(A);
    }
    function Ag5(A, { startTimestamp: Q, ...B }) {
        if (Q && A.startTimestamp > Q) A.startTimestamp = Q;
        return A.startChild({
            startTimestamp: Q,
            ...B
        });
    }
    ju2._startChild = Ag5;
    ju2.isMeasurementValue = eh5;
});
