// Module: Ve
// Type: L
// Lines: 52198-52220
//
var Ve = L(()=>{
    sq();
    createRenderState();
    n1.inherits(G1Q, eB, {
        __CANCEL__: !0
    });
    tq = G1Q;
});
function ky(A, Q, B) {
    let G = B.config.validateStatus;
    if (!B.status || !G || G(B.status)) A(B);
    else Q(new eB("Request failed with status code " + B.status, [
        eB.ERR_BAD_REQUEST,
        eB.ERR_BAD_RESPONSE
    ][Math.floor(B.status / 100) - 4], B.config, B.request, B));
}
