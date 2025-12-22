// Module: It2
// Type: L
// Lines: 463060-463099
//
var samplingCallback = L(()=>{
    bA();
    getViewTransitionClassName();
    pushViewTransitionAttributes();
    pushStartInstance();
    A2();
    P_ = l(React runtime(), 1);
});
function Wt2(A, Q) {
    let B = new Set();
    for (let G of A)if (!Q.has(G)) B.add(G);
    return B;
}
function Kt2(A, Q) {
    for (let B of A)if (!Q.has(B)) return !1;
    return !0;
}
function Vt2({ message: A, isTranscriptMode: Q }) {
    if (!(Q && A.timestamp && A.type === "assistant" && A.message.content.some((Z)=>Z.type === "text"))) return null;
    let G = new Date(A.timestamp).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: !0
    });
    return ow0.default.createElement(T, {
        marginTop: 1,
        minWidth: G.length
    }, ow0.default.createElement(C, {
        dimColor: !0
    }, G));
}
var ow0;
