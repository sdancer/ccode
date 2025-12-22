// Module: B4B
// Type: L
// Lines: 167275-167359
//
var B4B = L(()=>{
    TrA();
});
function SC8(A, Q) {
    A = A.slice(Q);
    for(let G = 1; G < id1.length; G++)if (A.charCodeAt(G) !== id1[G]) return;
    let B = A.indexOf("\x07", JsA.length);
    if (B === -1) return;
    return A.slice(0, B + 1);
}
function fC8(A) {
    for(let Q = 2; Q < A.length; Q++){
        let B = A.charCodeAt(Q);
        if (B === kC8) return Q;
        if (B === vC8) continue;
        if (B >= yC8 && B <= xC8) continue;
        break;
    }
    return -1;
}
function bC8(A, Q) {
    A = A.slice(Q);
    let B = fC8(A);
    if (B === -1) return;
    return A.slice(0, B + 1);
}
function hC8(A) {
    if (!A.includes(";")) return [
        A
    ];
    let Q = A.slice(2, -1).split(";"), B = [];
    for(let G = 0; G < Q.length; G++){
        let Z = Q[G];
        if (Z === "38" || Z === "48") {
            if (G + 2 < Q.length && Q[G + 1] === "5") {
                (B.push(Q.slice(G, G + 3).join(";")), (G += 2));
                continue;
            } else if (G + 4 < Q.length && Q[G + 1] === "2") {
                (B.push(Q.slice(G, G + 5).join(";")), (G += 4));
                continue;
            }
        }
        B.push(Z);
    }
    return B.map((G)=>`\x1B[${G}m`);
}
function bZA(A, Q = Number.POSITIVE_INFINITY) {
    let B = [], G = 0, Z = 0;
    while(G < A.length){
        let Y = A.codePointAt(G);
        if (o9B.has(Y)) {
            let I, W = A.codePointAt(G + 1);
            if (W === s9B) {
                if (((I = SC8(A, G)), I)) B.push({
                    type: "ansi",
                    code: I,
                    endCode: nd1(I)
                });
            } else if (W === r9B) {
                if (((I = bC8(A, G)), I)) {
                    let K = hC8(I);
                    for (let V of K)B.push({
                        type: "ansi",
                        code: V,
                        endCode: nd1(V)
                    });
                }
            }
            if (I) {
                G += I.length;
                continue;
            }
        }
        let J = rd1(Y), X = String.fromCodePoint(Y);
        if ((B.push({
            type: "char",
            value: X,
            fullWidth: J
        }), (G += X.length), (Z += J ? 2 : X.length), Z >= Q)) break;
    }
    return B;
}
var yC8 = 48, xC8 = 57, vC8 = 59, kC8 = 109;
