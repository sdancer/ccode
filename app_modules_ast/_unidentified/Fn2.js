// Module: Fn2
// Type: L
// Lines: 450426-450484
//
var Fn2 = L(()=>{
    K6();
    VW();
});
function ot5(A, Q) {
    if (A === Q) return !0;
    if (!A || !Q) return !1;
    return (A.filesCount === Q.filesCount && A.linesAdded === Q.linesAdded && A.linesRemoved === Q.linesRemoved);
}
function rt5(A, Q) {
    if (A.size !== Q.size) return !1;
    for (let [B, G] of A){
        let Z = Q.get(B);
        if (!Z) return !1;
        if (G.added !== Z.added || G.removed !== Z.removed || G.isBinary !== Z.isBinary) return !1;
    }
    return !0;
}
function st5(A, Q, B) {
    let G = B?.stats ?? null, Z = B?.perFileStats ?? new Map();
    if (!ot5(A, G)) return !0;
    if (!rt5(Q, Z)) return !0;
    return !1;
}
function En2() {
    let [A, Q] = IQ(), B = qDA.useCallback(async ()=>{
        return;
    }, [
        Q
    ]);
    return (qDA.useEffect(()=>{
        B();
    }, [
        B
    ]), BG(()=>{
        B();
    }, at5), qDA.useMemo(()=>{
        if (!A.gitDiff.stats) return null;
        return {
            stats: A.gitDiff.stats,
            perFileStats: A.gitDiff.perFileStats,
            hunks: A.gitDiff.hunks
        };
    }, [
        A.gitDiff.stats,
        A.gitDiff.perFileStats,
        A.gitDiff.hunks
    ]));
}
var qDA, at5 = 1e4;
