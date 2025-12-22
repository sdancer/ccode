// Module: Lr
// Type: L
// Lines: 388373-388494
//
var createRenderState = L(()=>{
    TZ();
    X51();
    waitForOAuthCallback();
    getViewTransitionClassName();
    z4();
    pushStartInstance();
    uK0();
    createRenderState();
    so();
    i0();
    pushStartInstance();
    OT();
    NN2();
    uJ();
    Nr();
    g1();
    s1();
    su();
    KB();
    rm();
    A_();
    i0();
    lyA();
    Q9();
    LI();
    EL();
    renderElement();
    iyA();
    nyA();
    PN2();
    yH0();
    eyA();
    AxA();
    LI();
    trackUsedThenable();
    createRenderState();
});
function ZxA(A) {
    let Q = A.toLowerCase();
    return (Q === "ultrathink" || Q === "think ultra hard" || Q === "think ultrahard");
}
function QHA(A, Q = !1) {
    let B = Q ? zY5 : EY5;
    return B[A % B.length];
}
function aH0(A, Q) {
    let B = [], G = 0;
    for (let Z of Q){
        if (Z.start > G) B.push({
            text: A.slice(G, Z.start),
            isTrigger: !1,
            start: G
        });
        (B.push({
            text: A.slice(Z.start, Z.end),
            isTrigger: !0,
            start: Z.start
        }), (G = Z.end));
    }
    if (G < A.length) B.push({
        text: A.slice(G),
        isTrigger: !1,
        start: G
    });
    return B;
}
function em(A, Q) {
    if (process.env.MAX_THINKING_TOKENS) {
        let B = parseInt(process.env.MAX_THINKING_TOKENS, 10);
        if (B > 0) r("tengu_thinking", {
            provider: _j(),
            tokenCount: B
        });
        return B;
    }
    return Math.max(...A.filter((B)=>B.type === "user" && !B.isMeta).map(UY5), Q ?? 0);
}
function $Y5(A) {
    return A === "high" ? nH0.ULTRATHINK : 0;
}
function UY5(A) {
    if (A.isMeta) return 0;
    if (A.thinkingMetadata) {
        let { level: G, disabled: Z } = A.thinkingMetadata;
        if (Z) return 0;
        let Y = $Y5(G);
        if (Y > 0) r("tengu_thinking", {
            provider: _j(),
            tokenCount: Y
        });
        return Y;
    }
    let Q = wY5(A), { tokens: B } = YxA(Q);
    if (B > 0) r("tengu_thinking", {
        provider: _j(),
        tokenCount: B
    });
    return B;
}
function wY5(A) {
    if (typeof A.message.content === "string") return A.message.content;
    return A.message.content.map((Q)=>(Q.type === "text" ? Q.text : "")).join("");
}
function YxA(A) {
    let Q = /\bultrathink\b/i.test(A);
    return {
        tokens: Q ? nH0.ULTRATHINK : nH0.NONE,
        level: Q ? "high" : "none"
    };
}
function lY1(A) {
    let Q = [], B = A.matchAll(CY5);
    for (let G of B)if (G.index !== void 0) Q.push({
        word: G[0],
        start: G.index,
        end: G.index + G[0].length
    });
    return Q;
}
function qY5(A) {
    let Q = l4();
    if (Q === "foundry" || Q === "firstParty") return !A.toLowerCase().includes("claude-3-");
    let B = A.toLowerCase();
    return B.includes("sonnet-4") || B.includes("opus-4");
}
function iY1() {
    if (process.env.MAX_THINKING_TOKENS) return parseInt(process.env.MAX_THINKING_TOKENS, 10) > 0;
    let { settings: A } = WS();
    if (A.alwaysThinkingEnabled === !1) return !1;
    return qY5(j5());
}
var GxA, aN2, EY5, zY5, nH0, CY5;
