// Module: xn
// Type: L
// Lines: 228287-228334
//
var xn = L(()=>{
    Sn();
    yn();
    bY();
    ZQA();
    Iu(); /*! @azure/msal-common v15.13.1 2025-10-29 */ 
});
function DLB(A, Q) {
    let B, G = A.canonicalAuthority;
    if (G) {
        let Z = new X8(G).getUrlComponents().HostNameAndPort;
        B = VLB(Z, A.cloudDiscoveryMetadata?.metadata, fC.CONFIG, Q) || VLB(Z, ys1.metadata, fC.HARDCODED_VALUES, Q) || A.knownAuthorities;
    }
    return B || [];
}
function VLB(A, Q, B, G) {
    if ((G?.trace(`getAliasesFromMetadata called with source: ${B}`), A && Q)) {
        let Z = XMA(Q, A);
        if (Z) return (G?.trace(`getAliasesFromMetadata: found cloud discovery metadata in ${B}, returning aliases`), Z.aliases);
        else G?.trace(`getAliasesFromMetadata: did not find cloud discovery metadata in ${B}`);
    }
    return null;
}
function FLB(A) {
    return XMA(ys1.metadata, A);
}
function XMA(A, Q) {
    for(let B = 0; B < A.length; B++){
        let G = A[B];
        if (G.aliases.includes(Q)) return G;
    }
    return null;
}
var HLB, Ss1, ys1, xs1;
