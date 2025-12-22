// Module: DA9
// Type: L
// Lines: 467057-467078
//
var DA9 = L(()=>{
    bA();
    X2();
    pushStartInstance();
});
function FA9(A, Q, B, G, Z, Y, J, X, I) {
    let [{ queuedCommands: W }] = IQ();
    _1((K, V)=>{
        if (!V.escape) return;
        if (G === "transcript") return;
        if (I) return;
        if (Z?.aborted) return;
        if (!Z) return;
        if (B) return;
        if (wDA() && J === "INSERT") return;
        if (W.length > 0) {
            if (Y) Y();
        }
        (r("tengu_cancel", {}), A(()=>[]), Q());
    });
}
