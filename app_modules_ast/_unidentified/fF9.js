// Module: fF9
// Type: L
// Lines: 533141-533151
//
var fF9 = L(()=>{
    WebSocket();
    s1();
    il();
    renderChildrenArray();
});
function bF9(A, Q = {}, B) {
    if (A.protocol === "ws:" || A.protocol === "wss:") return new $_0(A, Q, B);
    else throw Error(`Unsupported protocol: ${A.protocol}`);
}
