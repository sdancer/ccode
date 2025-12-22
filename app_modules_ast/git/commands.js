// Module: xw
// Type: L
// Lines: 308199-308511
//
var xw = L(()=>{
    restoreViewTransitionName();
    s1();
    i0();
    JdA();
    g1();
    b8();
    aQ();
    createRenderState();
    pushStartInstance();
    getViewTransitionClassName();
});
function HL(A, Q) {
    return A.flatMap((B, G)=>(G ? [
            Q(G),
            B
        ] : [
            B
        ]));
}
function jA2({ patch: A, dim: Q, width: B }) {
    let [G] = D2(), Z = _A2.useMemo(()=>IS3(A.lines, A.oldStart, B, Q, G), [
        A.lines,
        A.oldStart,
        B,
        Q,
        G
    ]);
    return C3.createElement(T, {
        flexDirection: "column",
        flexGrow: 1
    }, Z.map((Y, J)=>C3.createElement(T, {
            key: J
        }, Y)));
}
function ZS3(A) {
    return A.map((Q)=>{
        if (Q.startsWith("+")) return {
            code: " " + Q.slice(1),
            i: 0,
            type: "add",
            originalCode: Q.slice(1)
        };
        if (Q.startsWith("-")) return {
            code: " " + Q.slice(1),
            i: 0,
            type: "remove",
            originalCode: Q.slice(1)
        };
        return {
            code: Q,
            i: 0,
            type: "nochange",
            originalCode: Q
        };
    });
}
function YS3(A) {
    let Q = [], B = 0;
    while(B < A.length){
        let G = A[B];
        if (!G) {
            B++;
            continue;
        }
        if (G.type === "remove") {
            let Z = [
                G
            ], Y = B + 1;
            while(Y < A.length && A[Y]?.type === "remove"){
                let X = A[Y];
                if (X) Z.push(X);
                Y++;
            }
            let J = [];
            while(Y < A.length && A[Y]?.type === "add"){
                let X = A[Y];
                if (X) J.push(X);
                Y++;
            }
            if (Z.length > 0 && J.length > 0) {
                let X = Math.min(Z.length, J.length);
                for(let I = 0; I < X; I++){
                    let W = Z[I], K = J[I];
                    if (W && K) ((W.wordDiff = !0), (K.wordDiff = !0), (W.matchedLine = K), (K.matchedLine = W));
                }
                (Q.push(...Z.filter(Boolean)), Q.push(...J.filter(Boolean)), (B = Y));
            } else (Q.push(G), B++);
        } else (Q.push(G), B++);
    }
    return Q;
}
function JS3(A, Q) {
    return oPB(A, Q, {
        ignoreCase: !1
    });
}
function XS3(A, Q, B, G, Z) {
    let { type: Y, i: J, wordDiff: X, matchedLine: I, originalCode: W } = A;
    if (!X || !I) return null;
    let K = Y === "remove" ? W : I.originalCode, V = Y === "remove" ? I.originalCode : W, H = JS3(K, V), D = K.length + V.length;
    if (H.filter((P)=>P.added || P.removed).reduce((P, f)=>P + f.value.length, 0) / D > GS3 || G) return null;
    let z = Y === "add" ? "+" : "-", $ = "  ", O = z.length + $.length, N = Math.max(1, Q - B - 1 - O), M = [], R = [], j = 0;
    if ((H.forEach((P, f)=>{
        let y = !1, m;
        if (Y === "add") {
            if (P.added) ((y = !0), (m = "diffAddedWord"));
            else if (!P.removed) y = !0;
        } else if (Y === "remove") {
            if (P.removed) ((y = !0), (m = "diffRemovedWord"));
            else if (!P.added) y = !0;
        }
        if (!y) return;
        lx(P.value, N, "wrap").split(`
`).forEach((p, v)=>{
            if (!p) return;
            if (v > 0 || j + p.length > N) {
                if (R.length > 0) (M.push([
                    ...R
                ]), (R = []), (j = 0));
            }
            (R.push(C3.createElement(C, {
                key: `part-${f}-${v}`,
                backgroundColor: m,
                color: Z ? "text" : void 0,
                dimColor: G
            }, p)), (j += p.length));
        });
    }), R.length > 0)) M.push(R);
    return M.map((P, f)=>{
        let y = `${Y}-${J}-${f}`;
        return C3.createElement(C, {
            key: y
        }, C3.createElement(j31, {
            i: f === 0 ? J : void 0,
            width: B
        }), C3.createElement(C, {
            backgroundColor: Y === "add" ? G ? "diffAddedDimmed" : "diffAdded" : G ? "diffRemovedDimmed" : "diffRemoved"
        }, C3.createElement(C, {
            dimColor: G
        }, z, $), P));
    });
}
function IS3(A, Q, B, G, Z) {
    let Y = Math.max(1, Math.floor(B)), J = ZS3(A), X = YS3(J), I = WS3(X, Q), W = Math.max(...I.map(({ i: V })=>V), 0), K = Math.max(W.toString().length + 2, 0);
    return I.flatMap((V)=>{
        let { type: H, code: D, i: F, wordDiff: E, matchedLine: z } = V;
        if (E && z) {
            let R = XS3(V, Y, K, G, Z);
            if (R !== null) return R;
        }
        let $ = 2, O = Math.max(1, Y - K - 1 - $);
        return lx(D, O, "wrap").split(`
`).map((R, j)=>{
            let P = `${H}-${F}-${j}`;
            switch(H){
                case "add":
                    return C3.createElement(C, {
                        key: P
                    }, C3.createElement(j31, {
                        i: j === 0 ? F : void 0,
                        width: K
                    }), C3.createElement(C, {
                        color: Z ? "text" : void 0,
                        backgroundColor: G ? "diffAddedDimmed" : "diffAdded",
                        dimColor: G
                    }, C3.createElement(C, {
                        dimColor: G
                    }, "+ "), R));
                case "remove":
                    return C3.createElement(C, {
                        key: P
                    }, C3.createElement(j31, {
                        i: j === 0 ? F : void 0,
                        width: K
                    }), C3.createElement(C, {
                        color: Z ? "text" : void 0,
                        backgroundColor: G ? "diffRemovedDimmed" : "diffRemoved",
                        dimColor: G
                    }, C3.createElement(C, {
                        dimColor: G
                    }, "- "), R));
                case "nochange":
                    return C3.createElement(C, {
                        key: P
                    }, C3.createElement(j31, {
                        i: j === 0 ? F : void 0,
                        width: K
                    }), C3.createElement(C, {
                        color: Z ? "text" : void 0,
                        dimColor: G
                    }, "  ", R));
            }
        });
    });
}
function j31({ i: A, width: Q, hidden: B }) {
    if (B) return null;
    return C3.createElement(C, {
        dimColor: !0
    }, A !== void 0 ? A.toString().padStart(Q) : " ".repeat(Q), " ");
}
function WS3(A, Q) {
    let B = Q, G = [], Z = [
        ...A
    ];
    while(Z.length > 0){
        let Y = Z.shift(), { code: J, type: X, originalCode: I, wordDiff: W, matchedLine: K } = Y, V = {
            code: J,
            type: X,
            i: B,
            originalCode: I,
            wordDiff: W,
            matchedLine: K
        };
        switch(X){
            case "nochange":
                (B++, G.push(V));
                break;
            case "add":
                (B++, G.push(V));
                break;
            case "remove":
                {
                    G.push(V);
                    let H = 0;
                    while(Z[0]?.type === "remove"){
                        B++;
                        let D = Z.shift(), { code: F, type: E, originalCode: z, wordDiff: $, matchedLine: O } = D, N = {
                            code: F,
                            type: E,
                            i: B,
                            originalCode: z,
                            wordDiff: $,
                            matchedLine: O
                        };
                        (G.push(N), H++);
                    }
                    B -= H;
                    break;
                }
        }
    }
    return G;
}
var C3, _A2, GS3 = 0.4;
