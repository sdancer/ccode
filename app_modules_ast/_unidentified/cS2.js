// Module: cS2
// Type: L
// Lines: 423789-423816
//
var cS2 = L(()=>{
    bA();
    qI();
    SK();
    i4();
    b6();
    T$ = l(React runtime(), 1);
});
function bX1(A, Q) {
    if (!Q) return A;
    return A.map((B)=>{
        if (B.type === "user") return {
            ...B,
            sourceToolUseID: Q
        };
        return B;
    });
}
function hX1(A, Q) {
    let B = A.message.content.find((G)=>G.type === "tool_use" && G.name === Q);
    return B && B.type === "tool_use" ? B.id : void 0;
}
function $F5(A) {
    if (A.source !== "plugin" || !A.pluginInfo?.repository) return !1;
    let Q = A.pluginInfo.repository.lastIndexOf("@");
    if (Q <= 0) return !1;
    let B = A.pluginInfo.repository.slice(Q + 1);
    return ujA.has(B);
}
var zF5, CF5, lr;
