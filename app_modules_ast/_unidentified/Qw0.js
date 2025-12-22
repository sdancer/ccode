// Module: Qw0
// Type: L
// Lines: 451557-451606
//
var Qw0 = L(()=>{
    i4();
    bA();
    KB();
    vW = l(React runtime(), 1);
});
function in2({ message: A, messages: Q, toolUseID: B, progressMessagesForMessage: G, style: Z, tool: Y, tools: J, verbose: X, width: I }) {
    let [W] = D2(), K = ln2.useContext(cU);
    if (!A.toolUseResult || !Y) return null;
    let V = Y.renderToolResultMessage(A.toolUseResult, yi(G), {
        style: Z,
        theme: W,
        tools: J,
        verbose: X
    });
    if (V === null) return null;
    return MS.createElement(T, {
        flexDirection: "column"
    }, MS.createElement(T, {
        flexDirection: "row",
        width: I
    }, V, !K && MS.createElement(C, null, dn2)), MS.createElement(J4A, null, MS.createElement(bK1, {
        hookEvent: "PostToolUse",
        messages: Q,
        toolUseID: B,
        verbose: X
    })));
}
var MS, ln2;
