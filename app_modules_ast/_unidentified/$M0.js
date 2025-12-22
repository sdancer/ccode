// Module: $M0
// Type: L
// Lines: 506381-506434
//
var defaultOnDefaultTransitionIndicator = L(()=>{
    bA();
    bA();
    $2();
    LI();
    KPA();
    createRenderState();
    describeNativeComponentFrame();
    describeNativeComponentFrame();
    pushViewTransitionAttributes();
    trackUsedThenable();
    fN0();
    createRenderState();
    createRenderState();
    N61();
    L61();
    startFakeNavigation();
    createRenderState();
    renderNode();
    flushCompletedQueues();
    D9A();
    GV = l(React runtime(), 1);
});
function sX9({ tools: A }) {
    let { goNext: Q, goBack: B, updateWizardData: G, wizardData: Z } = SJ(), Y = (X)=>{
        (G({
            selectedTools: X
        }), Q());
    }, J = Z.selectedTools;
    return o4A.default.createElement(uI, {
        subtitle: "Select tools",
        footerText: o4A.default.createElement(YB, null, o4A.default.createElement(I0, {
            shortcut: "Enter",
            action: "toggle selection"
        }), o4A.default.createElement(I0, {
            shortcut: "↑↓",
            action: "navigate"
        }), o4A.default.createElement(I0, {
            shortcut: "Esc",
            action: "go back"
        }))
    }, o4A.default.createElement(LD1, {
        tools: A,
        initialTools: J,
        onComplete: Y,
        onCancel: B
    }));
}
var o4A;
