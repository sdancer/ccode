// Module: wM0
// Type: L
// Lines: 506578-506628
//
var defaultOnDefaultTransitionIndicator = L(()=>{
    bA();
    z$();
    $2();
    ((p$ = l(React runtime(), 1)), (FFA = [
        "automatic",
        ...fP
    ]));
});
function QI9() {
    let { goNext: A, goBack: Q, updateWizardData: B, wizardData: G } = SJ();
    _1((Y, J)=>{
        if (J.escape) Q();
    });
    let Z = (Y)=>{
        (B({
            selectedColor: Y,
            finalAgent: {
                agentType: G.agentType,
                whenToUse: G.whenToUse,
                getSystemPrompt: ()=>G.systemPrompt,
                tools: G.selectedTools,
                ...(G.selectedModel ? {
                    model: G.selectedModel
                } : {}),
                ...(Y ? {
                    color: Y
                } : {}),
                source: G.location
            }
        }), A());
    };
    return bs.default.createElement(uI, {
        subtitle: "Choose background color",
        footerText: bs.default.createElement(YB, null, bs.default.createElement(I0, {
            shortcut: "↑↓",
            action: "navigate"
        }), bs.default.createElement(I0, {
            shortcut: "Enter",
            action: "select"
        }), bs.default.createElement(I0, {
            shortcut: "Esc",
            action: "go back"
        }))
    }, bs.default.createElement(T, {
        marginTop: 1
    }, bs.default.createElement(MD1, {
        agentName: G.agentType || "agent",
        currentColor: "automatic",
        onConfirm: Z
    })));
}
var bs;
