// Module: nL2
// Type: L
// Lines: 390622-390691
//
var nL2 = L(()=>{
    bA();
    K8();
    lw();
    WJ1();
    pushStartInstance();
    createRenderState();
    n6();
    ((V9 = l(React runtime(), 1)), (wxA = l(React runtime(), 1)), (KJ5 = [
        S8,
        y8
    ]));
});
function VD0({ toolName: A, description: Q }) {
    let B = L$(), G = W_(), Z = Br();
    return XZ.createElement(T, {
        flexDirection: "column",
        borderStyle: "round",
        borderColor: "warning",
        paddingX: 1
    }, XZ.createElement(T, {
        marginBottom: 1
    }, XZ.createElement(R9, null), XZ.createElement(C, {
        color: "warning",
        bold: !0
    }, " ", "Waiting for team lead approval")), G && Z && XZ.createElement(T, {
        marginBottom: 1
    }, XZ.createElement(oG1, {
        name: G,
        color: Z
    })), XZ.createElement(T, null, XZ.createElement(C, {
        dimColor: !0
    }, "Tool: "), XZ.createElement(C, null, A)), XZ.createElement(T, null, XZ.createElement(C, {
        dimColor: !0
    }, "Action: "), XZ.createElement(C, null, Q)), B && XZ.createElement(T, {
        marginTop: 1
    }, XZ.createElement(C, {
        dimColor: !0
    }, "Permission request sent to team ", '"', B, '"', " leader")));
}
var XZ;
