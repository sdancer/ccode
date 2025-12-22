// Module: B9A
// Type: L
// Lines: 378164-378245
//
var getViewTransitionClassName = L(()=>{
    rpcCall();
    z4();
    pushStartInstance();
    aQ();
    KB();
    EL();
    waitForOAuthCallback();
    pushStartInstance();
    LT();
    G0A();
    OT();
    su();
    oZ1 = l(React runtime(), 1);
    ((b65 = new Set([
        y8,
        T4,
        kX,
        OV,
        rM,
        DI,
        S8,
        zI
    ])), (yK0 = new Set()), (xK0 = new Set()), (mC2 = new Map()), (nZ1 = []));
});
async function rZ1() {
    return (await pX("tengu_session_memory")) && (await pX("tengu_sm_compact"));
}
function m65(A, Q, B, G) {
    let Z = dK(A), Y = pZ1("auto", Z ?? 0), J = [
        h0({
            content: W51(Q, !0),
            isCompactSummary: !0,
            isVisibleInTranscriptOnly: !0
        })
    ], X = _K0(G);
    return {
        boundaryMarker: Y,
        summaryMessages: J,
        attachments: X ? [
            X
        ] : [],
        hookResults: [],
        messagesToKeep: B,
        preCompactTokenCount: Z,
        postCompactTokenCount: vK0(J)
    };
}
async function sZ1(A, Q, B) {
    if (!(await rZ1())) return null;
    await MC2();
    let G = NC2(), Z = RC2();
    if (!Z) return null;
    if (await gC2(Z)) return (r("tengu_sm_compact_empty_template", {}), null);
    try {
        let Y;
        if (G) {
            let W = A.findIndex((K)=>K.uuid === G);
            if (W === -1) ((Y = []), r("tengu_sm_compact_summarized_id_not_found", {}));
            else Y = A.slice(W + 1);
        } else ((Y = []), r("tengu_sm_compact_resumed_session", {}));
        let J = m65(A, Z, Y, Q), X = [
            J.boundaryMarker,
            ...J.summaryMessages,
            ...J.attachments,
            ...J.hookResults,
            ...Y
        ], I = vK0(X);
        if (B !== void 0 && I >= B) return (r("tengu_sm_compact_threshold_exceeded", {
            postCompactTokenCount: I,
            autoCompactThreshold: B
        }), null);
        return {
            ...J,
            postCompactTokenCount: I
        };
    } catch  {
        return null;
    }
}
