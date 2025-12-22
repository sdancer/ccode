// Module: kLA
// Type: L
// Lines: 200142-200166
//
var rpcCall = L(()=>{
    renderElement();
    fn1 = kn1;
});
function fLA() {}
function rA1(A, Q, B) {
    if (!Q || kHB[A] > kHB[B]) return fLA;
    else return Q[A].bind(Q);
}
function bHB(A) {
    let Q = A.logger, B = A.logLevel ?? "off";
    if (!Q) return Ab8;
    let G = fHB.get(Q);
    if (G && G[0] === B) return G[1];
    let Z = {
        error: rA1("error", Q, B),
        warn: rA1("warn", Q, B),
        info: rA1("info", Q, B),
        debug: rA1("debug", Q, B)
    };
    return (fHB.set(Q, [
        B,
        Z
    ]), Z);
}
var kHB, Ab8, fHB;
