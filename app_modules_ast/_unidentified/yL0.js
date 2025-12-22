// Module: yL0
// Type: L
// Lines: 495841-495875
//
var pushViewTransitionAttributes = L(()=>{
    bA();
    A4();
    s1();
    K8();
    $2();
    $L0();
    LI();
    renderElement();
    b4A();
    bjA();
    i7 = l(React runtime(), 1);
});
function AD1({ serverToolsCount: A, serverPromptsCount: Q, serverResourcesCount: B }) {
    let G = [];
    if (A > 0) G.push("tools");
    if (B > 0) G.push("resources");
    if (Q > 0) G.push("prompts");
    return rfA.default.createElement(T, null, rfA.default.createElement(C, {
        bold: !0
    }, "Capabilities: "), rfA.default.createElement(C, {
        color: "text"
    }, G.length > 0 ? rfA.default.createElement(YB, null, G) : "none"));
}
var rfA;
