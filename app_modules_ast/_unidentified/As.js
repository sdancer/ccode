// Module: As
// Type: U
// Lines: 436001-436025
//
var As = U((Eg2)=>{
    var { _optionalChain: Fg2 } = FQ();
    Object.defineProperty(Eg2, "__esModule", {
        value: !0
    });
    function yf5(A) {
        let Q = Fg2([
            A,
            "call",
            (G)=>G(),
            "access",
            (G)=>G.getClient,
            "call",
            (G)=>G(),
            "optionalAccess",
            (G)=>G.getOptions,
            "call",
            (G)=>G()
        ]);
        return ((Fg2([
            Q,
            "optionalAccess",
            (G)=>G.instrumenter
        ]) || "sentry") !== "sentry");
    }
    Eg2.shouldDisableAutoInstrumentation = yf5;
});
