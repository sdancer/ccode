// Module: Q80
// Type: L
// Lines: 273600-273645
//
var Q80 = L(()=>{
    LT();
});
var B80 = 4, zcB = 400000, ov = 50;
function ZL(A) {
    return A;
}
function A$(A) {
    return A;
}
async function DP() {
    let A = i1();
    if (PjA.has(A)) return PjA.get(A) ?? null;
    try {
        let Q = await SeA();
        if ((k(`Git remote URL: ${Q}`), !Q)) return (k("No git remote URL found"), PjA.set(A, null), null);
        let B = VBA(Q);
        return (k(`Parsed repository: ${B} from URL: ${Q}`), PjA.set(A, B), B);
    } catch (Q) {
        return (k(`Error detecting repository: ${Q}`), PjA.set(A, null), null);
    }
}
function VBA(A) {
    let Q = A.trim(), B = [
        /github\.com[:/]([^/]+\/[^/.]+?)(\.git)?$/,
        /github\.com[:/]([^/]+\/[^/.]+)$/
    ];
    for (let G of B){
        let Z = Q.match(G);
        if (Z && Z[1]) return (k(`Parsed repository: ${Z[1]} from ${Q}`), Z[1]);
    }
    if (!Q.includes("://") && !Q.includes("@") && Q.includes("/")) {
        let G = Q.split("/");
        if (G.length === 2 && G[0] && G[1]) {
            let Z = G[1].replace(/\.git$/, "");
            return `${G[0]}/${Z}`;
        }
    }
    return (k(`Could not parse repository from: ${Q}`), null);
}
var PjA;
