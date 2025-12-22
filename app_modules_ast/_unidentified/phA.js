// Module: phA
// Type: L
// Lines: 1679-1692
//
var pushStyleAttribute = L(()=>{
    renderElement();
    zy();
    W8A = rw9;
});
function ew9(A, Q) {
    if (CG(A)) return !1;
    var B = typeof A;
    if (B == "number" || B == "symbol" || B == "boolean" || A == null || W8A(A)) return !0;
    return tw9.test(A) || !sw9.test(A) || (Q != null && A in Object(Q));
}
var sw9, tw9, K8A;
