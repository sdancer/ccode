// Module: js2
// Type: L
// Lines: 460939-460988
//
var rpcCall = L(()=>{
    bA();
    A4();
    i4();
    aB();
    sK1();
    createRenderState();
    KB();
    zxA();
    I_();
    q2 = l(React runtime(), 1);
});
function Ts2({ message: { retryAttempt: A, error: Q, retryInMs: B, maxRetries: G } }) {
    let [Z, Y] = tK1.useState(0);
    if ((BG(()=>Y((X)=>X + 1000), 1000), tK1.useEffect(()=>Y(0), [
        A
    ]), A < 4)) return null;
    let J = Math.max(0, Math.round((B - Z) / 1000));
    return fd.createElement(b0, null, fd.createElement(T, {
        flexDirection: "column"
    }, fd.createElement(C, {
        color: "error"
    }, TQ2(Q)), fd.createElement(C, {
        dimColor: !0
    }, "Retrying in ", J, " ", J === 1 ? "second" : "seconds", "… (attempt", " ", A, "/", G, ")", process.env.API_TIMEOUT_MS ? ` · API_TIMEOUT_MS=${process.env.API_TIMEOUT_MS}ms, try increasing it` : "")));
}
var fd, tK1;
