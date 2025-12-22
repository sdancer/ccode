// Module: jLB
// Type: L
// Lines: 230092-230134
//
var jLB = L(()=>{
    bY();
    lT();
    Du();
    /*! @azure/msal-common v15.13.1 2025-10-29 */ LMA.IMDS_OPTIONS = {
        headers: {
            Metadata: "true"
        }
    };
});
var VJ = {};
M5(VJ, {
    wasClockTurnedBack: ()=>vt1,
    toSecondsFromDate: ()=>Ar8,
    toDateFromSeconds: ()=>OMA,
    nowSeconds: ()=>aN,
    isTokenExpired: ()=>YXA,
    isCacheExpired: ()=>Qr8,
    delay: ()=>Br8
});
function aN() {
    return Math.round(new Date().getTime() / 1000);
}
function Ar8(A) {
    return A.getTime() / 1000;
}
function OMA(A) {
    if (A) return new Date(Number(A) * 1000);
    return new Date();
}
function YXA(A, Q) {
    let B = Number(A) || 0;
    return aN() + Q > B;
}
function Qr8(A, Q) {
    let B = Number(A) + Q * 24 * 60 * 60 * 1000;
    return Date.now() > B;
}
function vt1(A) {
    return Number(A) > aN();
}
function Br8(A, Q) {
    return new Promise((B)=>setTimeout(()=>B(Q), A));
}
