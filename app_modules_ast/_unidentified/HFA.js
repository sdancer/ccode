// Module: HFA
// Type: L
// Lines: 505043-505071
//
var main = L(()=>{
    restoreViewTransitionName();
    aB();
    aQ();
    IS();
    pushStartInstance();
    zB();
});
function xs({ title: A, titleColor: Q = "text", borderColor: B = "suggestion", children: G, subtitle: Z }) {
    return xS.createElement(T, {
        borderStyle: "round",
        borderColor: B,
        flexDirection: "column"
    }, xS.createElement(T, {
        flexDirection: "column",
        paddingX: 1
    }, xS.createElement(C, {
        bold: !0,
        color: Q
    }, A), Z && xS.createElement(C, {
        dimColor: !0
    }, Z)), xS.createElement(T, {
        paddingX: 1,
        flexDirection: "column"
    }, G));
}
var xS;
