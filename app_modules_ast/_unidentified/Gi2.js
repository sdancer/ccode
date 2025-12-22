// Module: Gi2
// Type: L
// Lines: 446933-446978
//
var pushStartInstance = L(()=>{
    CkA();
    B$();
    Fs5 = /[:_-]/g;
});
import { dirname as ws5, basename as qs5, join as Ns5, sep as Ls5 } from "path";
function Rs5(A, Q) {
    if (!A) return {
        directory: Q || i1(),
        prefix: ""
    };
    let B = R4(A, Q);
    if (A.endsWith("/") || A.endsWith(Ls5)) return {
        directory: B,
        prefix: ""
    };
    let G = ws5(B), Z = qs5(A);
    return {
        directory: G,
        prefix: Z
    };
}
function _s5(A) {
    let Q = Zi2.get(A);
    if (Q) return Q;
    try {
        let Z = vA().readdirSync(A).filter((Y)=>Y.isDirectory() && !Y.name.startsWith(".")).map((Y)=>({
                name: Y.name,
                path: Ns5(A, Y.name),
                type: "directory"
            })).slice(0, 100);
        return (Zi2.set(A, Z), Z);
    } catch (B) {
        return (t(B instanceof Error ? B : Error(String(B))), []);
    }
}
async function Yi2(A, Q = {}) {
    let { basePath: B = i1(), maxResults: G = 10 } = Q, { directory: Z, prefix: Y } = Rs5(A, B), J = _s5(Z), X = Y.toLowerCase();
    return J.filter((W)=>W.name.toLowerCase().startsWith(X)).slice(0, G).map((W)=>({
            id: W.path,
            displayText: W.name + "/",
            description: "directory",
            type: "directory"
        }));
}
var Os5 = 500, Ms5 = 300000, Zi2;
