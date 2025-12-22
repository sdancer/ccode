// Module: Gd1
// Type: L
// Lines: 150270-150354
//
var trackPostpone = L(()=>{
    LZA();
    cx();
    OqA();
    ((xrA = new Set([
        "\x1B",
        ""
    ])), (yrA = `${NE8}8;;`));
});
function Zd1(A) {
    if (!Number.isInteger(A)) return !1;
    return (A >= 4352 && (A <= 4447 || A === 9001 || A === 9002 || (11904 <= A && A <= 12871 && A !== 12351) || (12880 <= A && A <= 19903) || (19968 <= A && A <= 42182) || (43360 <= A && A <= 43388) || (44032 <= A && A <= 55203) || (63744 <= A && A <= 64255) || (65040 <= A && A <= 65049) || (65072 <= A && A <= 65131) || (65281 <= A && A <= 65376) || (65504 <= A && A <= 65510) || (110592 <= A && A <= 110593) || (127488 <= A && A <= 127569) || (131072 <= A && A <= 262141)));
}
function px(A, Q, B) {
    let G = [
        ...A
    ], Z = [], Y = typeof B === "number" ? B : G.length, J = !1, X, I = 0, W = "";
    for (let [K, V] of G.entries()){
        let H = !1;
        if (G2B.includes(V)) {
            let D = /\d[^m]*/.exec(A.slice(K, K + 18));
            if (((X = D && D.length > 0 ? D[0] : void 0), I < Y)) {
                if (((J = !0), X !== void 0)) Z.push(X);
            }
        } else if (J && V === "m") ((J = !1), (H = !0));
        if (!J && !H) I++;
        if (!RE8.test(V) && Zd1(V.codePointAt())) {
            if ((I++, typeof B !== "number")) Y++;
        }
        if (I > Q && I <= Y) W += V;
        else if (I === Q && !J && X !== void 0) W = B2B(Z);
        else if (I >= Y) {
            W += B2B(Z, !0, X);
            break;
        }
    }
    return W;
}
var RE8, G2B, vrA = (A)=>`${G2B[0]}[${A}m`, B2B = (A, Q, B)=>{
    let G = [];
    A = [
        ...A
    ];
    for (let Z of A){
        let Y = Z;
        if (Z.includes(";")) Z = Z.split(";")[0][0] + "0";
        let J = XW.codes.get(Number.parseInt(Z, 10));
        if (J) {
            let X = A.indexOf(J.toString());
            if (X === -1) G.push(vrA(Q ? J : Y));
            else A.splice(X, 1);
        } else if (Q) {
            G.push(vrA(0));
            break;
        } else G.push(vrA(Y));
    }
    if (Q) {
        if (((G = G.filter((Z, Y)=>G.indexOf(Z) === Y)), B !== void 0)) {
            let Z = vrA(XW.codes.get(Number.parseInt(B, 10)));
            G = G.reduce((Y, J)=>(J === Z ? [
                    J,
                    ...Y
                ] : [
                    ...Y,
                    J
                ]), []);
        }
    }
    return G.join("");
};
