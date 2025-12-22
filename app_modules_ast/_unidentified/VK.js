// Module: VK
// Type: L
// Lines: 2498-2560
//
var pushStartInstance = L(()=>{
    bE1 = new Set();
});
import { dirname as hE1, join as ZS0 } from "path";
function Pq9(A) {
    if (typeof process > "u" || typeof process.versions > "u" || typeof process.versions.node > "u") return !1;
    let Q = Tq9();
    return Pj0(A, Q);
}
function JS0(A) {
    YS0 = A;
}
function Sq9() {
    if (!zgA) ((zgA = EgA({
        writeFn: (A)=>{
            let Q = nt();
            if (!vA().existsSync(hE1(Q))) vA().mkdirSync(hE1(Q));
            (vA().appendFileSync(Q, A), yq9());
        },
        flushIntervalMs: 1000,
        maxBufferSize: 100,
        immediateMode: O8A()
    })), X3(async ()=>zgA?.dispose()));
    return zgA;
}
function k(A, { level: Q } = {
    level: "debug"
}) {
    if (!Pq9(A)) return;
    if (YS0 && A.includes(`
`)) A = JSON.stringify(A);
    let G = `${new Date().toISOString()} [${Q.toUpperCase()}] ${A.trim()}
`;
    if (Ly()) {
        mb(G);
        return;
    }
    Sq9().write(G);
}
function nt() {
    return (process.env.CLAUDE_CODE_DEBUG_LOGS_DIR ?? ZS0(gQ(), "debug", `${m0()}.txt`));
}
function bO(A, Q) {
    return;
}
var O8A, Tq9, Ly, YS0 = !1, zgA = null, yq9;
