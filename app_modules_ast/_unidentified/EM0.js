// Module: EM0
// Type: L
// Lines: 505458-505502
//
var samplingCallback = L(()=>{
    bA();
    N9();
    U4();
    b6();
    a4A = l(React runtime(), 1);
});
function uI({ title: A, titleColor: Q = "text", borderColor: B = "suggestion", children: G, subtitle: Z, footerText: Y }) {
    let { currentStepIndex: J, totalSteps: X, title: I, showStepCounter: W } = SJ();
    return rd.default.createElement(rd.default.Fragment, null, rd.default.createElement(T, {
        borderStyle: "round",
        borderColor: B,
        flexDirection: "column"
    }, rd.default.createElement(T, {
        flexDirection: "column",
        paddingX: 1
    }, rd.default.createElement(C, {
        bold: !0,
        color: Q
    }, A || I || "Wizard", W !== !1 && ` (${J + 1}/${X})`), Z && rd.default.createElement(C, {
        dimColor: !0
    }, Z)), rd.default.createElement(T, {
        paddingX: 1,
        flexDirection: "column"
    }, G)), rd.default.createElement(FM0, {
        instructions: Y
    }));
}
var rd;
