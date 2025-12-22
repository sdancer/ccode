// Module: DM0
// Type: L
// Lines: 505433-505458
//
var pushStartInstance = L(()=>{
    HM0();
    vX9 = l(React runtime(), 1);
});
function FM0({ instructions: A = a4A.default.createElement(YB, null, a4A.default.createElement(I0, {
    shortcut: "↑↓",
    action: "navigate"
}), a4A.default.createElement(I0, {
    shortcut: "Enter",
    action: "select"
}), a4A.default.createElement(I0, {
    shortcut: "Esc",
    action: "go back"
})) }) {
    let Q = qQ();
    return a4A.default.createElement(T, {
        marginLeft: 3
    }, a4A.default.createElement(C, {
        dimColor: !0
    }, Q.pending ? `Press ${Q.keyName} again to exit` : A));
}
var a4A;
