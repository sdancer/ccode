// Module: UM0
// Type: L
// Lines: 506471-506502
//
var pushStartInstance = L(()=>{
    bA();
    P3();
    Q9();
    u_ = l(React runtime(), 1);
});
function eX9() {
    let { goNext: A, goBack: Q, updateWizardData: B, wizardData: G } = SJ(), Z = (Y)=>{
        (B({
            selectedModel: Y
        }), A());
    };
    return r4A.default.createElement(uI, {
        subtitle: "Select model",
        footerText: r4A.default.createElement(YB, null, r4A.default.createElement(I0, {
            shortcut: "↑↓",
            action: "navigate"
        }), r4A.default.createElement(I0, {
            shortcut: "Enter",
            action: "select"
        }), r4A.default.createElement(I0, {
            shortcut: "Esc",
            action: "go back"
        }))
    }, r4A.default.createElement(OD1, {
        initialModel: G.selectedModel,
        onComplete: Z,
        onCancel: Q
    }));
}
var r4A;
