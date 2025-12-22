// Module: VEA
// Type: L
// Lines: 308-322
//
var VEA = L(()=>{
    o6A();
    ic = V$9;
});
function F$9(A) {
    var Q = this.__data__, B = ic(Q, A);
    if (B < 0) return !1;
    var G = Q.length - 1;
    if (B == G) Q.pop();
    else D$9.call(Q, B, 1);
    return (--this.size, !0);
}
var H$9, D$9, Wj0;
