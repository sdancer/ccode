// Module: Xs1
// Type: L
// Lines: 225010-225025
//
var Xs1 = L(()=>{
    yqB();
});
function fqB(A = {}) {
    let Q = $01(A.userAgentPrefix);
    return {
        name: va8,
        async sendRequest (B, G) {
            if (!B.headers.has(kqB)) B.headers.set(kqB, await Q);
            return G(B);
        }
    };
}
var kqB, va8 = "userAgentPolicy";
