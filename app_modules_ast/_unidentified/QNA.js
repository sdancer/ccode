// Module: QNA
// Type: L
// Lines: 169733-169806
//
var pushViewTransitionAttributes = L(()=>{
    L1A();
    JF = {
        CURSOR_VISIBLE: 25,
        ALT_SCREEN: 47,
        ALT_SCREEN_CLEAR: 1049,
        MOUSE_NORMAL: 1000,
        MOUSE_BUTTON: 1002,
        MOUSE_ANY: 1003,
        FOCUS_EVENTS: 1004,
        BRACKETED_PASTE: 2004,
        SYNCHRONIZED_UPDATE: 2026
    };
    ((G6B = jsA(JF.SYNCHRONIZED_UPDATE)), (Z6B = TsA(JF.SYNCHRONIZED_UPDATE)), (Y6B = jsA(JF.BRACKETED_PASTE)), (J6B = TsA(JF.BRACKETED_PASTE)), (X6B = jsA(JF.FOCUS_EVENTS)), (I6B = TsA(JF.FOCUS_EVENTS)), (T1A = jsA(JF.CURSOR_VISIBLE)), (ANA = TsA(JF.CURSOR_VISIBLE)));
});
function W6B(A, Q, B) {
    let G = A._eventHandlers;
    if (!G) return;
    let Z = O2B[Q];
    if (!Z) return;
    let Y = B ? Z.capture : Z.bubble;
    if (!Y) return;
    return G[Y];
}
function K$8(A, Q) {
    let B = [], G = A;
    while(G){
        let Z = G === A, Y = W6B(G, Q.type, !0), J = W6B(G, Q.type, !1);
        if (Y) B.unshift({
            node: G,
            handler: Y,
            phase: Z ? "at_target" : "capturing"
        });
        if (J && (Q.bubbles || Z)) B.push({
            node: G,
            handler: J,
            phase: Z ? "at_target" : "bubbling"
        });
        G = G.parentNode;
    }
    return B;
}
function V$8(A, Q) {
    let B;
    for (let { node: G, handler: Z, phase: Y } of A){
        if (Q._isImmediatePropagationStopped()) break;
        if (Q._isPropagationStopped() && G !== B) break;
        (Q._setEventPhase(Y), Q._setCurrentTarget(G));
        try {
            Z(Q);
        } catch (J) {
            t(J instanceof Error ? J : Error(String(J)));
        }
        B = G;
    }
}
function Hg(A, Q) {
    Q._setTarget(A);
    let B = K$8(A, Q);
    return (V$8(B, Q), Q._setEventPhase("none"), Q._setCurrentTarget(null), !Q.defaultPrevented);
}
function K6B(A, Q) {
    return ox.deferredUpdates(()=>Hg(A, Q));
}
