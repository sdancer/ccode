// Module: J79
// Type: L
// Lines: 492183-492204
//
var J79 = L(()=>{
    wL0();
    ((Z79 = l(React runtime(), 1)), (N67 = {
        name: "doctor",
        description: "Diagnose and verify your Claude Code installation and settings",
        isEnabled: ()=>!process.env.DISABLE_DOCTOR_COMMAND,
        isHidden: !1,
        userFacingName () {
            return "doctor";
        },
        type: "local-jsx",
        call (A, Q, B) {
            return new Promise((G)=>G(Z79.default.createElement(rH1, {
                    onDone: A
                })));
        }
    }), (Y79 = N67));
});
