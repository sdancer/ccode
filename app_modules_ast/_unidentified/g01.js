// Module: g01
// Type: L
// Lines: 228096-228136
//
var g01 = L(()=>{
    bY();
    tJA();
    b01();
    _K();
    _s1();
    js1();
    YMA();
    EW(); /*! @azure/msal-common v15.13.1 2025-10-29 */ 
});
var u01 = {};
M5(u01, {
    isKmsi: ()=>Ts1,
    getJWSPayload: ()=>ILB,
    extractTokenClaims: ()=>Wu,
    checkMaxAge: ()=>JMA
});
function Wu(A, Q) {
    let B = ILB(A);
    try {
        let G = Q(B);
        return JSON.parse(G);
    } catch (G) {
        throw BQ(On);
    }
}
function Ts1(A) {
    if (!A.signin_state) return !1;
    let Q = [
        "kmsi",
        "dvc_dmjd"
    ];
    return A.signin_state.some((G)=>Q.includes(G.trim().toLowerCase()));
}
function ILB(A) {
    if (!A) throw BQ(x0A);
    let B = /^([^\.\s]*)\.([^\.\s]+)\.([^\.\s]*)$/.exec(A);
    if (!B || B.length < 4) throw BQ(On);
    return B[2];
}
function JMA(A, Q) {
    if (Q === 0 || Date.now() - 300000 > A + Q) throw BQ(g0A);
}
