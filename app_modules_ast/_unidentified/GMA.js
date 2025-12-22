// Module: GMA
// Type: L
// Lines: 227871-227893
//
var GMA = L(()=>{
    Sn();
    yn();
    _K();
    bY();
    Iu();
    EW(); /*! @azure/msal-common v15.13.1 2025-10-29 */ 
});
function sJA(A, Q) {
    if (!A) throw BQ(y0A);
    try {
        let B = Q(A);
        return JSON.parse(B);
    } catch (B) {
        throw BQ(Ln);
    }
}
function Pv(A) {
    if (!A) throw BQ(Ln);
    let Q = A.split(Qu.CLIENT_INFO_SEPARATOR, 2);
    return {
        uid: Q[0],
        utid: Q.length < 2 ? c0.EMPTY_STRING : Q[1]
    };
}
