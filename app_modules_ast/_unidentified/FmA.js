// Module: FmA
// Type: L
// Lines: 52220-52235
//
var FmA = L(()=>{
    sq();
});
function uw1(A) {
    return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(A);
}
function mw1(A, Q) {
    return Q ? A.replace(/\/?\/$/, "") + "/" + Q.replace(/^\/+/, "") : A;
}
function He(A, Q, B) {
    let G = !uw1(Q);
    if (A && (G || B == !1)) return mw1(A, Q);
    return Q;
}
var EmA = ()=>{};
