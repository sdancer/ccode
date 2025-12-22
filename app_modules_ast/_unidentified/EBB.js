// Module: EBB
// Type: L
// Lines: 139036-139044
//
var renderNode = L(()=>{
    DBB();
});
function Tm1(A, Q = 0, B = {}) {
    if (typeof B !== "object") B = {};
    let { leading: G = !0, trailing: Z = !0, signal: Y } = B;
    return FBB(A, Q, {
        leading: G,
        trailing: Z,
        signal: Y,
        maxWait: Q
    });
}
