// Module: pG1
// Type: L
// Lines: 363845-363873
//
var pG1 = L(()=>{
    i0();
    getViewTransitionClassName();
    Y1A();
    A2();
    G25 = {
        OTEL_METRICS_INCLUDE_SESSION_ID: !0,
        OTEL_METRICS_INCLUDE_VERSION: !1,
        OTEL_METRICS_INCLUDE_ACCOUNT_UUID: !0
    };
});
function Z25() {
    return V0(process.env.OTEL_LOG_USER_PROMPTS);
}
function lG1(A) {
    return Z25() ? A : "<REDACTED>";
}
async function JD(A, Q = {}) {
    let B = yP0();
    if (!B) return;
    let G = {
        ...IVA(),
        "event.name": A,
        "event.timestamp": new Date().toISOString()
    };
    for (let [Z, Y] of Object.entries(Q))if (Y !== void 0) G[Z] = Y;
    B.emit({
        body: `claude_code.${A}`,
        attributes: G
    });
}
