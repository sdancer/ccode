// Module: tZ1
// Type: L
// Lines: 378245-378316
//
var tZ1 = L(()=>{
    read_string_buffer();
    EL();
    KB();
    pushStartInstance();
    createRenderState();
    z4();
    pushStartInstance();
    getViewTransitionClassName();
});
function kVA() {
    let A = j5(), Q = fK0(A);
    return kO(A) - Q;
}
function lC2() {
    let A = kVA(), Q = A - kK0, B = process.env.CLAUDE_AUTOCOMPACT_PCT_OVERRIDE;
    if (B) {
        let G = parseFloat(B);
        if (!isNaN(G) && G > 0 && G <= 100) {
            let Z = Math.floor(A * (G / 100));
            return Math.min(Z, Q);
        }
    }
    return Q;
}
function G9A(A) {
    let Q = lC2(), B = am() ? Q : kVA(), G = Math.max(0, Math.round(((B - A) / B) * 100)), Z = B - d65, Y = B - c65, J = A >= Z, X = A >= Y, I = am() && A >= Q;
    return {
        percentLeft: G,
        isAboveWarningThreshold: J,
        isAboveErrorThreshold: X,
        isAboveAutoCompactThreshold: I
    };
}
function am() {
    if (V0(process.env.DISABLE_COMPACT)) return !1;
    return v1().autoCompactEnabled;
}
async function p65(A, Q) {
    if (Q === "session_memory") return !1;
    if (!am()) return !1;
    let B = dK(A), { isAboveAutoCompactThreshold: G } = G9A(B);
    return G;
}
async function iC2(A, Q, B) {
    if (V0(process.env.DISABLE_COMPACT)) return {
        wasCompacted: !1
    };
    if (!(await p65(A, B))) return {
        wasCompacted: !1
    };
    let Z = await sZ1(A, Q.agentId, lC2());
    if (Z) return {
        wasCompacted: !0,
        compactionResult: Z
    };
    try {
        let Y = await cZ1(A, Q, !0, void 0, !0);
        return (hVA(void 0), {
            wasCompacted: !0,
            compactionResult: Y
        });
    } catch (Y) {
        if (!czA(Y, qyA)) t(Y instanceof Error ? Y : Error(String(Y)));
        return {
            wasCompacted: !1
        };
    }
}
var kK0 = 13000, d65 = 20000, c65 = 20000;
