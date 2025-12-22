// Module: _s1
// Type: L
// Lines: 227952-227964
//
var _s1 = L(()=>{
    /*! @azure/msal-common v15.13.1 2025-10-29 */ HR = {
        Default: 0,
        Adfs: 1,
        Dsts: 2,
        Ciam: 3
    };
});
function h01(A) {
    if (A) return A.tid || A.tfp || A.acr || null;
    return null;
}
