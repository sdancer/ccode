// Module: NfA
// Type: L
// Lines: 473154-473170
//
var NfA = L(()=>{
    bDA();
});
function eV1(A, Q) {
    let B = hI(A, Q?.in), G = B.getFullYear(), Z = Uq(B, 0);
    (Z.setFullYear(G + 1, 0, 4), Z.setHours(0, 0, 0, 0));
    let Y = P4A(Z), J = Uq(B, 0);
    (J.setFullYear(G, 0, 4), J.setHours(0, 0, 0, 0));
    let X = P4A(J);
    if (B.getTime() >= Y.getTime()) return G + 1;
    else if (B.getTime() >= X.getTime()) return G;
    else return G - 1;
}
