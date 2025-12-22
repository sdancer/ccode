// Module: $l1
// Type: L
// Lines: 188656-188697
//
var performWork = L(()=>{
    jg();
    ((dN = new WeakMap()), (cN = new WeakMap()));
    di.NEWLINE_CHARS = new Set([
        `
`,
        "\r"
    ]);
    di.NEWLINE_REGEXP = /\r\n|[\n\r]/g;
});
function EeA(A) {
    if (typeof A !== "object") return {};
    return A ?? {};
}
function rZB(A) {
    if (!A) return !0;
    for(let Q in A)return !1;
    return !0;
}
function sZB(A, Q) {
    return Object.prototype.hasOwnProperty.call(A, Q);
}
var c_8, oZB = (A)=>{
    return c_8.test(A);
}, Ul1 = (A)=>((Ul1 = Array.isArray), Ul1(A)), wl1, tZB = (A, Q)=>{
    if (typeof Q !== "number" || !Number.isInteger(Q)) throw new F2(`${A} must be an integer`);
    if (Q < 0) throw new F2(`${A} must be a positive integer`);
    return Q;
}, zeA = (A)=>{
    try {
        return JSON.parse(A);
    } catch (Q) {
        return;
    }
};
