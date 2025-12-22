// Module: eJA
// Type: L
// Lines: 228136-228193
//
var eJA = L(()=>{
    _K();
    EW(); /*! @azure/msal-common v15.13.1 2025-10-29 */ 
});
var CF = {};
M5(CF, {
    stripLeadingHashOrQuery: ()=>KLB,
    normalizeUrlForComparison: ()=>No8,
    mapToQueryString: ()=>Sv,
    getDeserializedResponse: ()=>Ps1
});
function WLB(A) {
    if (!A) return A;
    let Q = A.toLowerCase();
    if (BY.endsWith(Q, "?")) Q = Q.slice(0, -1);
    else if (BY.endsWith(Q, "?/")) Q = Q.slice(0, -2);
    if (!BY.endsWith(Q, "/")) Q += "/";
    return Q;
}
function KLB(A) {
    if (A.startsWith("#/")) return A.substring(2);
    else if (A.startsWith("#") || A.startsWith("?")) return A.substring(1);
    return A;
}
function Ps1(A) {
    if (!A || A.indexOf("=") < 0) return null;
    try {
        let Q = KLB(A), B = Object.fromEntries(new URLSearchParams(Q));
        if (B.code || B.ear_jwe || B.error || B.error_description || B.state) return B;
    } catch (Q) {
        throw BQ(f0A);
    }
    return null;
}
function Sv(A, Q = !0, B) {
    let G = [];
    return (A.forEach((Z, Y)=>{
        if (!Q && B && Y in B) G.push(`${Y}=${Z}`);
        else G.push(`${Y}=${encodeURIComponent(Z)}`);
    }), G.join("&"));
}
function No8(A) {
    if (!A) return A;
    let Q = A.split("#")[0];
    try {
        let B = new URL(Q), G = B.origin + B.pathname + B.search;
        return WLB(G);
    } catch (B) {
        return WLB(Q);
    }
}
