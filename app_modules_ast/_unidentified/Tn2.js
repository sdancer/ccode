// Module: Tn2
// Type: L
// Lines: 451150-451184
//
var samplingCallback = L(()=>{
    bf = l(React runtime(), 1);
});
function Pn2(A) {
    return [];
}
function vK1(A) {
    return {
        isBtw: !1,
        question: ""
    };
}
async function Sn2({ question: A, cacheSafeParams: Q }) {
    let B = {
        ...Q.toolUseContext,
        options: {
            ...Q.toolUseContext.options,
            maxThinkingTokens: 0
        }
    }, G = await V9A({
        promptMessages: [
            h0({
                content: A
            })
        ],
        cacheSafeParams: {
            ...Q,
            toolUseContext: B
        },
        canUseTool: async ()=>({
                behavior: "deny",
                message: "Side questions cannot use tools",
                decisionReason: {
                    type: "other",
                    reason: "side_question"
                }
            }),
        querySource: "side_question",
        forkLabel: "side_question"
    }), Y = G.messages.find((X)=>X.type === "assistant")?.message?.content?.find((X)=>X.type === "text");
    return {
        response: Y && Y.type === "text" ? Y.text.trim() : null,
        usage: G.totalUsage
    };
}
var Ze5;
