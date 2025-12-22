// Module: PTB
// Type: L
// Lines: 241584-241609
//
var PTB = L(()=>{
    createRenderState();
    KB1();
    Us1();
    createRenderState();
    ee1();
    QTB();
    createRenderState();
    nN();
    BTB();
    createRenderState();
    tN = g7("ManagedIdentityCredential");
});
function EB1(A) {
    return Array.isArray(A) ? A : [
        A
    ];
}
function qXA(A, Q) {
    if (!A.match(/^[0-9a-zA-Z-_.:/]+$/)) {
        let B = Error("Invalid scope was specified by the user or calling client");
        throw (Q.getToken.info(MG(A, B)), B);
    }
}
function zB1(A) {
    return A.replace(/\/.default$/, "");
}
