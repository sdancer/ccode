// Module: jU0
// Type: L
// Lines: 447421-447471
//
var jU0 = L(()=>{
    CkA();
    i0();
    g1();
    restoreViewTransitionName();
    aB();
    pushStartInstance();
    GJ();
    getViewTransitionClassName();
    xy();
    _Y();
    s1();
    renderElement();
    zB();
    K6();
    pushStartInstance();
    Wi2 = l(createRenderState(), 1);
    ((qkA = []), ($kA = []));
});
function PU0(A) {
    if (/\d\s*<<\s*\d/.test(A) || /\[\[\s*\d+\s*<<\s*\d+\s*\]\]/.test(A) || /\$\(\(.*<<.*\)\)/.test(A)) return !1;
    return /<<-?\s*(?:(['"]?)(\w+)\1|\\(\w+))/.test(A);
}
function cs5(A) {
    let Q = /'(?:[^'\\]|\\.)*\n(?:[^'\\]|\\.)*'/, B = /"(?:[^"\\]|\\.)*\n(?:[^"\\]|\\.)*"/;
    return Q.test(A) || B.test(A);
}
function Ei2(A, Q = !0) {
    if (PU0(A) || cs5(A)) {
        let G = `'${A.replace(/'/g, `'"'"'`)}'`;
        if (PU0(A)) return G;
        return Q ? `${G} < /dev/null` : G;
    }
    if (Q) return i6([
        A,
        "<",
        "/dev/null"
    ]);
    return i6([
        A
    ]);
}
function ps5(A) {
    return /(?:^|[\s;&|])<(?![<(])\s*\S+/.test(A);
}
function zi2(A) {
    if (PU0(A)) return !1;
    if (ps5(A)) return !1;
    return !0;
}
