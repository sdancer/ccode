// Module: yJ9
// Type: L
// Lines: 502605-502642
//
var yJ9 = L(()=>{
    GL0();
    ((QM0 = l(React runtime(), 1)), (dG7 = {
        type: "local-jsx",
        name: "permissions",
        aliases: [
            "allowed-tools"
        ],
        description: "Manage allow & deny tool permission rules",
        isEnabled: ()=>!0,
        isHidden: !1,
        async call (A) {
            return QM0.createElement(fH1, {
                onExit: A
            });
        },
        userFacingName () {
            return "permissions";
        }
    }), (SJ9 = dG7));
});
function cG7({ planContent: A, planPath: Q, editorName: B }) {
    return aX.createElement(T, {
        flexDirection: "column"
    }, aX.createElement(C, {
        bold: !0
    }, "Current Plan"), aX.createElement(C, {
        dimColor: !0
    }, Q), aX.createElement(T, {
        marginTop: 1
    }, aX.createElement(C, null, A)), B && aX.createElement(T, {
        marginTop: 1
    }, aX.createElement(C, {
        dimColor: !0
    }, '"/plan open"'), aX.createElement(C, {
        dimColor: !0
    }, " to edit this plan in "), aX.createElement(C, {
        bold: !0,
        dimColor: !0
    }, B)));
}
var aX, pG7, xJ9;
