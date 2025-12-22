// Module: U2A
// Type: L
// Lines: 322804-322886
//
var createRenderState = L(()=>{
    renderElement();
    PTA();
    g1();
    s1();
    A_();
    KKA();
});
import { randomUUID as NB2 } from "crypto";
function Qh3(A) {
    if (A.type !== "attachment") return A;
    let Q = A.attachment;
    if (Q.type === "new_file") return {
        ...A,
        attachment: {
            ...Q,
            type: "file"
        }
    };
    if (Q.type === "new_directory") return {
        ...A,
        attachment: {
            ...Q,
            type: "directory"
        }
    };
    return A;
}
function _PA(A) {
    try {
        let Q = A.map(Qh3), B = LB2(Q);
        if (B[B.length - 1]?.type === "user") B.push(PF({
            content: W2A
        }));
        return B;
    } catch (Q) {
        throw (t(Q), Q);
    }
}
async function No(A, Q) {
    try {
        let B = null, G = null, Z;
        if (A === void 0) B = await dcB(0);
        else if (Q) {
            G = [];
            for (let J of await bp(Q)){
                if (J.type === "assistant" || J.type === "user") {
                    let X = Bh3(J);
                    if (X) G.push(X);
                }
                Z = J.session_id;
            }
        } else if (typeof A === "string") ((B = await D80(A)), (Z = A));
        else B = A;
        if (!B && !G) return null;
        if (B) {
            if ((D51(B), _B1(B), _31(B), !Z)) Z = dX(B);
            G = B.messages;
        }
        G = _PA(G);
        let Y = await $L("resume", Z);
        return (G.push(...Y), {
            messages: G,
            fileHistorySnapshots: B?.fileHistorySnapshots,
            sessionId: Z
        });
    } catch (B) {
        throw (t(B), B);
    }
}
function Bh3(A) {
    if (A.type === "assistant") return {
        type: A.type,
        message: A.message,
        uuid: NB2(),
        timestamp: new Date().toISOString(),
        requestId: void 0
    };
    else if (A.type === "user") return {
        type: A.type,
        message: A.message,
        uuid: NB2(),
        timestamp: new Date().toISOString()
    };
    return;
}
