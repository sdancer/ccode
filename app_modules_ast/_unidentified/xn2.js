// Module: xn2
// Type: L
// Lines: 451374-451404
//
var rpcCall = L(()=>{
    bA();
    Z6();
    N9();
    createRenderState();
    W0A();
    U4();
    b6();
    ((WG = l(React runtime(), 1)), (jkA = l(React runtime(), 1)));
});
function fK1({ session: A }) {
    if (A.status === "completed") return TkA.default.createElement(C, {
        bold: !0,
        color: "success",
        dimColor: !0
    }, "done");
    if (A.status === "failed") return TkA.default.createElement(C, {
        bold: !0,
        color: "error",
        dimColor: !0
    }, "error");
    if (!A.todoList.length) return TkA.default.createElement(C, {
        dimColor: !0
    }, A.status, "…");
    let Q = A.todoList.filter((G)=>G.status === "completed").length, B = A.todoList.length;
    return TkA.default.createElement(C, {
        dimColor: !0
    }, Q, "/", B);
}
var TkA;
