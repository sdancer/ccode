// Module: HJ9
// Type: L
// Lines: 501822-501846
//
var HJ9 = L(()=>{
    lH1();
    ((rO0 = l(React runtime(), 1)), (UG7 = {
        type: "local-jsx",
        name: "status",
        description: "Show Claude Code status including version, model, account, API connectivity, and tool statuses",
        isEnabled: ()=>!0,
        isHidden: !1,
        async call (A, Q) {
            return rO0.createElement(eDA, {
                onClose: A,
                context: Q,
                defaultTab: "Status"
            });
        },
        userFacingName () {
            return "status";
        }
    }), (VJ9 = UG7));
});
var sO0, wG7, DJ9;
