// Module: iC
// Type: L
// Lines: 244242-244322
//
var pushStartInstance = L(()=>{
    i0();
    restoreViewTransitionName();
    aQ();
    g1();
    canHydrateInstance();
});
import { readFileSync as RPB, writeFileSync as x23, appendFileSync as v23, unlinkSync as k23, mkdirSync as _PB, existsSync as RXA, statSync as f23, readdirSync as b23 } from "fs";
import { dirname as h23, join as lA0 } from "path";
function FRA() {
    return lA0(jB1(), "tasks");
}
function jPB() {
    let A = FRA();
    if (!RXA(A)) _PB(A, {
        recursive: !0
    });
}
function Ww(A) {
    return lA0(FRA(), `${A}.output`);
}
function Ou(A, Q) {
    try {
        jPB();
        let B = Ww(A), G = h23(B);
        if (!RXA(G)) _PB(G, {
            recursive: !0
        });
        v23(B, Q, "utf8");
    } catch (B) {
        t(B instanceof Error ? B : Error(String(B)));
    }
}
function iA0(A, Q) {
    try {
        let B = Ww(A);
        if (!RXA(B)) return {
            content: "",
            newOffset: Q
        };
        let Z = f23(B).size;
        if (Z <= Q) return {
            content: "",
            newOffset: Q
        };
        return {
            content: RPB(B, "utf8").slice(Q),
            newOffset: Z
        };
    } catch (B) {
        return (t(B instanceof Error ? B : Error(String(B))), {
            content: "",
            newOffset: Q
        });
    }
}
function _XA(A) {
    try {
        let Q = Ww(A);
        if (!RXA(Q)) return "";
        return RPB(Q, "utf8");
    } catch (Q) {
        return (t(Q instanceof Error ? Q : Error(String(Q))), "");
    }
}
function Mu(A) {
    jPB();
    let Q = Ww(A);
    if (!RXA(Q)) x23(Q, "", "utf8");
    return Q;
}
function TPB() {
    try {
        let A = FRA();
        if (!RXA(A)) return;
        let Q = b23(A);
        for (let B of Q)if (B.endsWith(".output")) try {
            k23(lA0(A, B));
        } catch  {}
    } catch  {}
}
