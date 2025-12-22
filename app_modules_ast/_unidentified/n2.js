// Module: n2
// Type: L
// Lines: 493-536
//
var n2 = L(()=>{
    FhA();
    QE1.Cache = gt;
    Y0 = QE1;
});
function o9(A) {
    for(let Q = 0; Q < A.length; Q += 2000)process.stdout.write(A.substring(Q, Q + 2000));
}
function mb(A) {
    for(let Q = 0; Q < A.length; Q += 2000)process.stderr.write(A.substring(Q, Q + 2000));
}
function _$9(A) {
    let Q = [], B = A.match(/^MCP server ["']([^"']+)["']/);
    if (B && B[1]) (Q.push("mcp"), Q.push(B[1].toLowerCase()));
    else {
        let Y = A.match(/^([^:[]+):/);
        if (Y && Y[1]) Q.push(Y[1].trim().toLowerCase());
    }
    let G = A.match(/^\[([^\]]+)]/);
    if (G && G[1]) Q.push(G[1].trim().toLowerCase());
    if (A.toLowerCase().includes("statsig event:")) Q.push("statsig");
    let Z = A.match(/:\s*([^:]+?)(?:\s+(?:type|mode|status|event))?:/);
    if (Z && Z[1]) {
        let Y = Z[1].trim().toLowerCase();
        if (Y.length < 30 && !Y.includes(" ")) Q.push(Y);
    }
    return Array.from(new Set(Q));
}
function j$9(A, Q) {
    if (!Q) return !0;
    if (A.length === 0) return !1;
    if (Q.isExclusive) return !A.some((B)=>Q.exclude.includes(B));
    else return A.some((B)=>Q.include.includes(B));
}
function Pj0(A, Q) {
    if (!Q) return !0;
    let B = _$9(A);
    return j$9(B, Q);
}
var Tj0;
