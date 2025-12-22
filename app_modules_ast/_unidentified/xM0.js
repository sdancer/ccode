// Module: xM0
// Type: L
// Lines: 513864-513911
//
var createRenderState = L(()=>{
    nfA();
    QfA();
    X2();
    SD1 = l(React runtime(), 1);
});
import { join as uZ7 } from "path";
function mZ7(A) {
    let Q = A.getFullYear(), B = String(A.getMonth() + 1).padStart(2, "0"), G = String(A.getDate()).padStart(2, "0"), Z = String(A.getHours()).padStart(2, "0"), Y = String(A.getMinutes()).padStart(2, "0"), J = String(A.getSeconds()).padStart(2, "0");
    return `${Q}-${B}-${G}-${Z}${Y}${J}`;
}
function dZ7(A) {
    let Q = A.find((Z)=>Z.type === "user");
    if (!Q || Q.type !== "user") return "";
    let B = Q.message?.content, G = "";
    if (typeof B === "string") G = B.trim();
    else if (Array.isArray(B)) {
        let Z = B.find((Y)=>Y.type === "text");
        if (Z && "text" in Z) G = Z.text.trim();
    }
    if (((G = G.split(`
`)[0] || ""), G.length > 50)) G = G.substring(0, 50) + "...";
    return G;
}
function cZ7(A) {
    return A.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
}
async function pZ7(A) {
    let Q = A.options.tools || [];
    return UW9(A.messages, Q);
}
var wW9, lZ7, qW9;
