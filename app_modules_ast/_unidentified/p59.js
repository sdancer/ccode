// Module: p59
// Type: L
// Lines: 491021-491057
//
var p59 = L(()=>{
    bA();
    $2();
    af = l(React runtime(), 1);
});
function l59({ feature: A, isUsed: Q, isFocused: B }) {
    let G = Q ? B1.tick : B1.circle, Z = Q ? "success" : "inactive", Y = B ? "suggestion" : void 0;
    return id.default.createElement(T, {
        flexDirection: "column"
    }, id.default.createElement(T, {
        gap: 1
    }, id.default.createElement(C, {
        color: Y
    }, B ? B1.pointer : " "), id.default.createElement(C, {
        color: Z
    }, G), id.default.createElement(C, {
        color: Y,
        bold: B
    }, A.name)), B && id.default.createElement(T, {
        flexDirection: "column",
        marginLeft: 4
    }, id.default.createElement(C, {
        dimColor: !0
    }, A.description), !Q && A.tryItPrompt && id.default.createElement(C, {
        color: "warning",
        dimColor: !0
    }, "Try it: ", A.tryItPrompt)));
}
var id;
