// Module: TZ
// Type: L
// Lines: 518642-518806
//
var TZ = L(()=>{
    commitMutationEffectsOnFiber();
    VYB();
    createRenderState();
    CYB();
    createRenderState();
    rm();
    cy();
    getViewTransitionClassName();
    A2();
    aQ();
    g1();
    KB();
    Q9();
    DK();
    EL();
    wk();
    z4();
    pushStartInstance();
    performWork();
    createRenderState();
    ayA();
    AWS HTTP handler();
    eI();
    X51();
    BCA();
    cy();
    createRenderState();
    s1();
    createRenderState();
    lyA();
    i0();
    createRenderState();
    tR();
    A2();
    thA();
    Q9();
    Nr();
    so();
    MoA();
    vM();
});
import { randomBytes as OJ7 } from "crypto";
function _J7() {
    return OJ7(4).toString("hex");
}
function TJ7(A, Q) {
    let B = !1, G = !1;
    for(let Z = 0; Z < Q; Z++){
        let Y = A[Z], J = 0;
        for(let X = Z - 1; X >= 0 && A[X] === "\\"; X--)J++;
        if (J % 2 === 1) continue;
        if (Y === "'" && !G) B = !B;
        else if (Y === '"' && !B) G = !G;
    }
    return B || G;
}
function PJ7(A, Q) {
    let B = A.lastIndexOf(`
`, Q - 1) + 1, G = !1, Z = !1;
    for(let Y = B; Y < Q; Y++){
        let J = A[Y], X = 0;
        for(let I = Y - 1; I >= B && A[I] === "\\"; I--)X++;
        if (X % 2 === 1) continue;
        if (J === "'" && !Z) G = !G;
        else if (J === '"' && !G) Z = !Z;
        else if (J === "#" && !G && !Z) return !0;
    }
    return !1;
}
function GR0(A) {
    let Q = new Map();
    if (!A.includes("<<")) return {
        processedCommand: A,
        heredocs: Q
    };
    let B = new RegExp(jJ7.source, "g"), G = [], Z;
    while((Z = B.exec(A)) !== null){
        let W = Z.index;
        if (TJ7(A, W)) continue;
        if (PJ7(A, W)) continue;
        let K = Z[0], V = Z[3], H = W + K.length, F = A.slice(H).indexOf(`
`);
        if (F === -1) continue;
        let E = H + F, $ = A.slice(E + 1).split(`
`), O = -1;
        for(let y = 0; y < $.length; y++)if ($[y].trim() === V) {
            O = y;
            break;
        }
        if (O === -1) continue;
        let M = $.slice(0, O + 1).join(`
`).length, R = E + 1 + M, j = A.slice(W, H), P = A.slice(E, R), f = j + P;
        G.push({
            fullText: f,
            delimiter: V,
            operatorStartIndex: W,
            operatorEndIndex: H,
            contentStartIndex: E,
            contentEndIndex: R
        });
    }
    if (G.length === 0) return {
        processedCommand: A,
        heredocs: Q
    };
    let Y = G.filter((W, K, V)=>{
        for (let H of V){
            if (W === H) continue;
            if (W.operatorStartIndex > H.contentStartIndex && W.operatorStartIndex < H.contentEndIndex) return !1;
        }
        return !0;
    });
    if (Y.length === 0) return {
        processedCommand: A,
        heredocs: Q
    };
    if (new Set(Y.map((W)=>W.contentStartIndex)).size < Y.length) return {
        processedCommand: A,
        heredocs: Q
    };
    Y.sort((W, K)=>K.contentEndIndex - W.contentEndIndex);
    let X = _J7(), I = A;
    return (Y.forEach((W, K)=>{
        let V = Y.length - 1 - K, H = `${MJ7}${V}_${X}${RJ7}`;
        (Q.set(H, W), (I = I.slice(0, W.operatorStartIndex) + H + I.slice(W.operatorEndIndex, W.contentStartIndex) + I.slice(W.contentEndIndex)));
    }), {
        processedCommand: I,
        heredocs: Q
    });
}
function SJ7(A, Q) {
    let B = A;
    for (let [G, Z] of Q)B = B.replaceAll(G, Z.fullText);
    return B;
}
function SK9(A, Q) {
    if (Q.size === 0) return A;
    return A.map((B)=>SJ7(B, Q));
}
var MJ7 = "__HEREDOC_", RJ7 = "__", jJ7;
