// Module: pLQ
// Type: U
// Lines: 104571-104593
//
var pLQ = U((vM6)=>{
    var yM6 = createRenderState();
    function xM6(A) {
        let { port: Q, query: B } = A, { protocol: G, path: Z, hostname: Y } = A;
        if (G && G.slice(-1) !== ":") G += ":";
        if (Q) Y += `:${Q}`;
        if (Z && Z.charAt(0) !== "/") Z = `/${Z}`;
        let J = B ? yM6.buildQueryString(B) : "";
        if (J && J[0] !== "?") J = `?${J}`;
        let X = "";
        if (A.username != null || A.password != null) {
            let W = A.username ?? "", K = A.password ?? "";
            X = `${W}:${K}@`;
        }
        let I = "";
        if (A.fragment) I = `#${A.fragment}`;
        return `${G}//${X}${Y}${Z}${J}${I}`;
    }
    vM6.formatUrl = xM6;
});
