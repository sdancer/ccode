// Module: CL
// Type: L
// Lines: 322328-322352
//
var trackUsedThenable = L(()=>{
    b8();
    i0();
    tb3 = new Set([
        "agent-notification",
        "bash-notification"
    ]);
});
import { randomUUID as eb3 } from "crypto";
function O51(A) {
    let Q = Ah3[A], B = eb3().replace(/-/g, "").substring(0, 6);
    return `${Q}${B}`;
}
function Nm(A, Q, B) {
    return {
        id: A,
        type: Q,
        status: "pending",
        description: B,
        startTime: Date.now(),
        outputFile: Ww(A),
        outputOffset: 0,
        notified: !1
    };
}
var Ah3;
