// Module: Sj0
// Type: L
// Lines: 536-607
//
var Sj0 = L(()=>{
    n2();
    Tj0 = Y0((A)=>{
        if (!A || A.trim() === "") return null;
        let Q = A.split(",").map((Y)=>Y.trim()).filter(Boolean);
        if (Q.length === 0) return null;
        let B = Q.some((Y)=>Y.startsWith("!")), G = Q.some((Y)=>!Y.startsWith("!"));
        if (B && G) return null;
        let Z = Q.map((Y)=>Y.replace(/^!/, "").toLowerCase());
        return {
            include: B ? [] : Z,
            exclude: B ? Z : [],
            isExclusive: B
        };
    });
});
import * as r9 from "fs";
import { stat as T$9, open as P$9 } from "fs/promises";
function sI(A, Q) {
    let B = performance.now();
    try {
        return Q();
    } finally{
        let G = performance.now() - B;
        if (G > S$9) k(`[SLOW OPERATION DETECTED] fs.${A} (${G.toFixed(1)}ms)`);
    }
}
function tI(A, Q) {
    if (!A.existsSync(Q)) return {
        resolvedPath: Q,
        isSymlink: !1
    };
    try {
        let B = A.realpathSync(Q);
        return {
            resolvedPath: B,
            isSymlink: B !== Q
        };
    } catch (B) {
        return {
            resolvedPath: Q,
            isSymlink: !1
        };
    }
}
function ut(A) {
    let Q = [], B = vA();
    Q.push(A);
    let { resolvedPath: G, isSymlink: Z } = tI(B, A);
    if (Z && G !== A) Q.push(G);
    return Q;
}
function vA() {
    return x$9;
}
async function* yj0(A) {
    let B = await P$9(A, "r");
    try {
        let Z = (await B.stat()).size, Y = "", J = Buffer.alloc(4096);
        while(Z > 0){
            let X = Math.min(4096, Z);
            ((Z -= X), await B.read(J, 0, X, Z));
            let W = (J.toString("utf8", 0, X) + Y).split(`
`);
            Y = W[0] || "";
            for(let K = W.length - 1; K >= 1; K--){
                let V = W[K];
                if (V) yield V;
            }
        }
        if (Y) yield Y;
    } finally{
        await B.close();
    }
}
var S$9 = 5, y$9, x$9;
