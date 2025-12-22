// Module: ql2
// Type: L
// Lines: 445426-445437
//
var ql2 = L(()=>{
    waitForOAuthCallback();
});
function HDA(A) {
    return Nl2.useMemo(()=>{
        let Q = A?.find((B)=>B.name === "ide");
        if (!Q) return null;
        return Q.type === "connected" ? "connected" : "disconnected";
    }, [
        A
    ]);
}
var Nl2;
