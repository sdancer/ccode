// Module: $N0
// Type: L
// Lines: 475908-475935
//
var $N0 = L(()=>{
    s1();
    g1();
    pushStartInstance();
    trackUsedThenable();
    createRenderState();
    trackUsedThenable();
    wW();
    wW();
    hK();
    Go();
    Y$();
    zB();
});
async function O49(A) {
    if ((k("performStartupChecks called"), !sZ(!0))) {
        k("Trust not accepted for current directory - skipping plugin installations");
        return;
    }
    try {
        (k("Starting background plugin installations"), await IH1(A));
    } catch (Q) {
        k(`Error initiating background plugin installations: ${Q}`);
    }
}
