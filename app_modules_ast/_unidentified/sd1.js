// Module: sd1
// Type: L
// Lines: 167396-167415
//
var sd1 = L(()=>{
    hZA();
});
function iqA(A, Q) {
    let B = Math.min(A.x, Q.x), G = Math.min(A.y, Q.y), Z = Math.max(A.x + A.width, Q.x + Q.width), Y = Math.max(A.y + A.height, Q.y + Q.height);
    return {
        x: B,
        y: G,
        width: Z - B,
        height: Y - G
    };
}
function WsA(A, Q) {
    return Q.x >= 0 && Q.y >= 0 && Q.x < A.width && Q.y < A.height;
}
var Y4B = ()=>{};
function IW(A, Q) {
    if (A === void 0) return;
    if (Number.isInteger(A)) return;
    k(`${Q} should be an integer, got ${A}`, {
        level: "warn"
    });
}
