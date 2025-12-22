// Module: IA9
// Type: L
// Lines: 467007-467041
//
var rpcCall = L(()=>{
    pushStartInstance();
    JA9 = l(React runtime(), 1);
});
function WA9() {
    let [A, Q] = WfA.useState(()=>{
        let Y = QN();
        if (!hU() || VB()) return "valid";
        if (Y) return "loading";
        return "missing";
    }), [B, G] = WfA.useState(null), Z = WfA.useCallback(async ()=>{
        if (!hU() || VB()) {
            Q("valid");
            return;
        }
        let Y = QN();
        if (!Y) {
            Q("missing");
            return;
        }
        try {
            let X = (await VA9(Y, !1)) ? "valid" : "invalid";
            Q(X);
            return;
        } catch (J) {
            (G(J), Q("error"));
            return;
        }
    }, []);
    return {
        status: A,
        reverify: Z,
        error: B
    };
}
var WfA;
