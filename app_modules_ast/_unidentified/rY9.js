// Module: rY9
// Type: L
// Lines: 500781-500883
//
var rY9 = L(()=>{
    bA();
    QfA();
    pushStartInstance();
    U4();
    b6();
    b8();
    ZZ();
    aV = l(React runtime(), 1);
});
function ZG7(A, Q) {
    if (A === dO0) return dO0.length + IbA;
    let B = Q ? Math.min(A.length, Q - IbA - cO0) : A.length;
    return Math.max(0, B) + IbA + cO0;
}
function YG7(A, Q) {
    let B = Q - IbA - cO0;
    if (A.length <= B) return A;
    if (B <= 1) return A.charAt(0);
    return A.slice(0, B - 1) + "…";
}
function BJ9({ tabs: A, selectedIndex: Q, availableWidth: B, showAllProjects: G = !1 }) {
    let Z = G ? "Resume (All Projects)" : "Resume", Y = Z.length + 1, J = Math.max(BG7, GG7), X = B - Y - J - 2, I = Math.max(0, Math.min(Q, A.length - 1)), W = Math.max(20, Math.floor(X / 2)), K = A.map((O)=>ZG7(O, W)), V = 0, H = A.length;
    if (K.reduce((O, N, M)=>O + N + (M < K.length - 1 ? 1 : 0), 0) > X) {
        let O = X - QG7, N = K[I] ?? 0;
        ((V = I), (H = I + 1));
        while(V > 0 || H < A.length){
            let M = V > 0, R = H < A.length;
            if (M) {
                let j = (K[V - 1] ?? 0) + 1;
                if (N + j <= O) {
                    (V--, (N += j));
                    continue;
                }
            }
            if (R) {
                let j = (K[H] ?? 0) + 1;
                if (N + j <= O) {
                    (H++, (N += j));
                    continue;
                }
            }
            break;
        }
    }
    let F = V, E = A.length - H, z = A.slice(V, H), $ = z.map((O, N)=>V + N);
    return i4A.default.createElement(T, {
        flexDirection: "row",
        gap: 1
    }, i4A.default.createElement(C, {
        color: "suggestion"
    }, Z), F > 0 && i4A.default.createElement(C, {
        dimColor: !0
    }, sY9, F), z.map((O, N)=>{
        let R = $[N] === I, j = O === dO0 ? O : `#${YG7(O, W - IbA)}`;
        return i4A.default.createElement(C, {
            key: O,
            backgroundColor: R ? "suggestion" : void 0,
            color: R ? "inverseText" : void 0,
            bold: R
        }, " ", j, " ");
    }), E > 0 ? i4A.default.createElement(C, {
        dimColor: !0
    }, tY9, E, eY9) : i4A.default.createElement(C, {
        dimColor: !0
    }, AJ9));
}
var i4A, dO0 = "All", IbA = 2, cO0 = 1, sY9 = "← ", tY9 = "→", eY9 = " (tab to cycle)", AJ9 = "(tab to cycle)", QJ9 = 2, QG7, BG7, GG7;
