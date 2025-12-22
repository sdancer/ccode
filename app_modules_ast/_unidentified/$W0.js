// Module: $W0
// Type: L
// Lines: 365748-365785
//
var $W0 = L(()=>{
    i0();
    rSA = EVA.getInstance();
});
function Qr({ todos: A, isStandalone: Q = !1 }) {
    if (A.length === 0) return null;
    let B = ID.createElement(ID.Fragment, null, A.map((G, Z)=>{
        let Y = G.status === "completed" ? B1.checkboxOn : B1.checkboxOff;
        return ID.createElement(T, {
            key: Z
        }, ID.createElement(C, {
            dimColor: G.status === "completed"
        }, Y, " "), ID.createElement(C, {
            bold: G.status === "in_progress",
            dimColor: G.status === "completed",
            strikethrough: G.status === "completed"
        }, G.content));
    }));
    if (Q) return ID.createElement(T, {
        flexDirection: "column",
        marginTop: 1,
        marginLeft: 2
    }, ID.createElement(C, {
        bold: !0,
        dimColor: !0
    }, "Todos"), B);
    return ID.createElement(T, {
        flexDirection: "column"
    }, B);
}
var ID;
