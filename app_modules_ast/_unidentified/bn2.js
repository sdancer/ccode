// Module: bn2
// Type: L
// Lines: 451430-451460
//
var createRenderState = L(()=>{
    bA();
    i4();
    SkA = l(React runtime(), 1);
});
function hn2({ progressMessagesForMessage: A, tool: Q, tools: B, param: G, verbose: Z }) {
    if (typeof G.content === "string" && G.content.includes(E_)) return OS.createElement(b0, {
        height: 1
    }, OS.createElement(hv, null));
    if (typeof G.content === "string" && G.content.startsWith(Aw0)) {
        let Y = G.content.substring(Aw0.length);
        return OS.createElement(HX1, {
            plan: Y
        });
    }
    if (typeof G.content === "string" && G.content.startsWith(ykA)) {
        let Y = G.content.substring(ykA.length);
        return OS.createElement(fn2, {
            feedback: Y
        });
    }
    if (!Q) return OS.createElement(n8, {
        result: G.content,
        verbose: Z
    });
    return Q.renderToolUseErrorMessage(G.content, {
        progressMessagesForMessage: yi(A),
        tools: B,
        verbose: Z
    });
}
var OS;
