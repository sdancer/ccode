// Module: V19
// Type: L
// Lines: 470106-470132
//
var V19 = L(()=>{
    bA();
    PS = l(React runtime(), 1);
});
import { randomUUID as H19 } from "crypto";
function dV1({ hideThanksAfterMs: A, onOpen: Q, onSelect: B }) {
    let [G, Z] = ws.useState("closed"), Y = ws.useRef(H19()), J = ws.useCallback(()=>{
        (Z("thanks"), setTimeout(()=>Z("closed"), A));
    }, [
        A
    ]), X = ws.useCallback(()=>{
        if (G !== "closed") return;
        (Z("open"), (Y.current = H19()), Q(Y.current));
    }, [
        G,
        Q
    ]), I = ws.useCallback((W)=>{
        if (W === "dismissed") Z("closed");
        else J();
        B(Y.current, W);
    }, [
        J,
        B
    ]);
    return {
        state: G,
        open: X,
        handleSelect: I
    };
}
var ws;
