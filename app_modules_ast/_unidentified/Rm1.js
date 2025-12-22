// Module: Rm1
// Type: L
// Lines: 138871-138882
//
var Rm1 = L(()=>{
    YBB = l(preload(), 1);
});
function $rA(A, Q) {
    let B = A.lastIndexOf(" -");
    if (B > 0) {
        let G = A.substring(0, B), Z = A.substring(B + 1);
        return `${i6([
            G
        ])} ${Z} ${i6([
            Q
        ])}`;
    } else return `${i6([
        A
    ])} ${i6([
        Q
    ])}`;
}
