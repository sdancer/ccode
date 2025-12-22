// Module: GH1
// Type: L
// Lines: 473791-473809
//
var GH1 = L(()=>{
    qfA();
    qs();
    bDA();
    ZO();
});
function iQ9(A, Q) {
    let B = Ns(), G = Q?.firstWeekContainsDate ?? Q?.locale?.options?.firstWeekContainsDate ?? B.firstWeekContainsDate ?? B.locale?.options?.firstWeekContainsDate ?? 1, Z = BH1(A, Q), Y = Uq(Q?.in || A, 0);
    return (Y.setFullYear(Z, 0, G), Y.setHours(0, 0, 0, 0), ud(Y, Q));
}
