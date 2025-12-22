// Module: M0
// Type: L
// Lines: 2635-2716
//
var pushStartInstance = L(()=>{
    _EA = [];
});
import { join as xq9, dirname as vq9 } from "path";
function mE1() {
    if (!gE1) gE1 = qA("perf_hooks").performance;
    return gE1;
}
function k9(A) {
    if (!VS0) return;
    if ((mE1().mark(A), CgA)) HS0.set(A, process.memoryUsage());
}
function uE1(A) {
    return A.toFixed(3);
}
function IS0(A) {
    return (A / 1024 / 1024).toFixed(2);
}
function WS0() {
    if (!CgA) return "Startup profiling not enabled";
    let Q = mE1().getEntriesByType("mark");
    if (Q.length === 0) return "No profiling checkpoints recorded";
    let B = [];
    (B.push("=".repeat(80)), B.push("STARTUP PROFILING REPORT"), B.push("=".repeat(80)), B.push(""));
    let G = 0;
    for (let J of Q){
        let X = uE1(J.startTime), I = uE1(J.startTime - G), W = HS0.get(J.name), K = W ? ` | RSS: ${IS0(W.rss)}MB, Heap: ${IS0(W.heapUsed)}MB` : "";
        (B.push(`[+${X.padStart(8)}ms] (+${I.padStart(7)}ms) ${J.name}${K}`), (G = J.startTime));
    }
    let Z = Q[Q.length - 1], Y = uE1(Z?.startTime ?? 0);
    return (B.push(""), B.push(`Total startup time: ${Y}ms`), B.push("=".repeat(80)), B.join(`
`));
}
function DS0() {
    if ((hq9(), CgA)) {
        let A = bq9(), Q = vq9(A), B = vA();
        if (!B.existsSync(Q)) B.mkdirSync(Q);
        (B.writeFileSync(A, WS0(), {
            encoding: "utf8",
            flush: !0
        }), k("Startup profiling report:"), k(WS0()));
    }
}
function bq9() {
    return xq9(gQ(), "startup-perf", `${m0()}.txt`);
}
function hq9() {
    if (!KS0) return;
    let Q = mE1().getEntriesByType("mark");
    if (Q.length === 0) return;
    let B = new Map();
    for (let Z of Q)B.set(Z.name, Z.startTime);
    let G = {};
    for (let [Z, [Y, J]] of Object.entries(fq9)){
        let X = B.get(Y), I = B.get(J);
        if (X !== void 0 && I !== void 0) G[`${Z}_ms`] = Math.round(I - X);
    }
    ((G.checkpoint_count = Q.length), r("tengu_startup_perf", G));
}
var CgA, kq9 = 0.005, KS0, VS0, HS0, gE1 = null, fq9;
