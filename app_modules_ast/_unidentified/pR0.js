// Module: pR0
// Type: L
// Lines: 527588-527608
//
var pR0 = L(()=>{
    LI();
});
function EF1(A, Q, B) {
    let G = Q?.server;
    if (G) {
        let Z = A[G] || [], Y = G;
        if (Z.length === 0 && B) {
            let J = B[G];
            if (J && A[J]) ((Z = A[J]), (Y = J));
        }
        return Z.map((J)=>({
                ...J,
                server: B7(Y)
            }));
    }
    return Object.entries(A).flatMap(([Z, Y])=>Y.map((J)=>({
                ...J,
                server: B7(Z)
            })));
}
var lR0 = ()=>{};
var tI7, iR0, eI7, nR0, AW7, BH9, QW7, BW7, GH9, GW7, ZH9, ZW7, YH9;
