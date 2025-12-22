// Module: gn2
// Type: L
// Lines: 451460-451494
//
var gn2 = L(()=>{
    KB();
    OXA();
    i4();
    qI();
    CE0();
    createRenderState();
    OS = l(React runtime(), 1);
});
function un2({ input: A, progressMessagesForMessage: Q, style: B, tool: G, tools: Z, messages: Y, verbose: J }) {
    let { columns: X } = HB(), [I] = D2();
    if (!G) return xkA.createElement(o3, null);
    let W = G.inputSchema.safeParse(A);
    if (!W.success) return xkA.createElement(o3, null);
    return G.renderToolUseRejectedMessage(W.data, {
        columns: X,
        messages: Y,
        tools: Z,
        verbose: J,
        progressMessagesForMessage: yi(Q),
        style: B,
        theme: I
    });
}
var xkA;
