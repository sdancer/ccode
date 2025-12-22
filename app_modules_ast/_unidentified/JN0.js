// Module: JN0
// Type: L
// Lines: 473765-473791
//
var JN0 = L(()=>{
    renderElement();
    NfA();
    performWork();
    ZO();
});
function BH1(A, Q) {
    let B = hI(A, Q?.in), G = B.getFullYear(), Z = Ns(), Y = Q?.firstWeekContainsDate ?? Q?.locale?.options?.firstWeekContainsDate ?? Z.firstWeekContainsDate ?? Z.locale?.options?.firstWeekContainsDate ?? 1, J = Uq(Q?.in || A, 0);
    (J.setFullYear(G + 1, 0, Y), J.setHours(0, 0, 0, 0));
    let X = ud(J, Q), I = Uq(Q?.in || A, 0);
    (I.setFullYear(G, 0, Y), I.setHours(0, 0, 0, 0));
    let W = ud(I, Q);
    if (+B >= +X) return G + 1;
    else if (+B >= +W) return G;
    else return G - 1;
}
