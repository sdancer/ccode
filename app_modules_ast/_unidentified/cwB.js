// Module: cwB
// Type: L
// Lines: 224001-224026
//
var cwB = L(()=>{
    dwB();
});
function vr1(A = {}) {
    var Q;
    let B = (Q = A.logger) !== null && Q !== void 0 ? Q : mT.info, G = new Ov({
        additionalAllowedHeaderNames: A.additionalAllowedHeaderNames,
        additionalAllowedQueryParameters: A.additionalAllowedQueryParameters
    });
    return {
        name: xr1,
        async sendRequest (Z, Y) {
            if (!B.enabled) return Y(Z);
            B(`Request: ${G.sanitize(Z)}`);
            let J = await Y(Z);
            return (B(`Response status code: ${J.status}`), B(`Headers: ${G.sanitize(J.headers)}`), J);
        }
    };
}
var xr1 = "logPolicy";
