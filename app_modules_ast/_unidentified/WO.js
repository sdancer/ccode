// Module: WO
// Type: L
// Lines: 505508-505546
//
var defaultOnDefaultTransitionIndicator = L(()=>{
    HM0();
    pushStartInstance();
    g_();
    samplingCallback();
});
function kX9() {
    let { goNext: A, updateWizardData: Q, cancel: B } = SJ();
    return vs.default.createElement(uI, {
        subtitle: "Choose location",
        footerText: vs.default.createElement(YB, null, vs.default.createElement(I0, {
            shortcut: "↑↓",
            action: "navigate"
        }), vs.default.createElement(I0, {
            shortcut: "Enter",
            action: "select"
        }), vs.default.createElement(I0, {
            shortcut: "Esc",
            action: "cancel"
        }))
    }, vs.default.createElement(T, {
        marginTop: 1
    }, vs.default.createElement(T0, {
        key: "location-select",
        options: [
            {
                label: "Project (.claude/agents/)",
                value: "projectSettings"
            },
            {
                label: "Personal (~/.claude/agents/)",
                value: "userSettings"
            }
        ],
        onChange: (Z)=>{
            (Q({
                location: Z
            }), A());
        },
        onCancel: ()=>B()
    })));
}
var vs;
