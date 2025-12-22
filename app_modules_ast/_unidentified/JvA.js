// Module: JvA
// Type: L
// Lines: 423741-423789
//
var JvA = L(()=>{
    pushStartInstance();
    KB();
    B$();
    restoreViewTransitionName();
    createRenderState();
    tR();
    g1();
    s1();
    uJ();
    createRenderState();
    Nr();
    A_();
    samplingCallback();
    wZ();
});
function hS2(A, Q, { verbose: B }) {
    let G = [];
    if (A.allowedTools && A.allowedTools.length > 0) {
        let Z = A.allowedTools.length;
        G.push(`${Z} tool${Z === 1 ? "" : "s"} allowed`);
    }
    if (A.model) G.push(A.model);
    if (G.length === 0) return null;
    return T$.createElement(b0, {
        height: 1
    }, T$.createElement(C, null, T$.createElement(YB, null, G)));
}
function gS2({ skill: A }, { verbose: Q }) {
    if (!A) return null;
    return A;
}
function uS2() {
    return T$.createElement(b0, {
        height: 1
    }, T$.createElement(C, {
        dimColor: !0
    }, "Loading…"));
}
function mS2() {
    return T$.createElement(o3, null);
}
function dS2(A, { verbose: Q }) {
    return T$.createElement(n8, {
        result: A,
        verbose: Q
    });
}
var T$;
