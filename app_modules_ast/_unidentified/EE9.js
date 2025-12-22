// Module: EE9
// Type: L
// Lines: 535459-535522
//
var EE9 = L(()=>{
    bA();
    VE9();
    ZZ();
    DE9();
    pushStartInstance();
    X2();
    s1();
    JE = l(React runtime(), 1);
});
function L_0(A, Q = process.argv) {
    for(let B = 0; B < Q.length; B++){
        let G = Q[B];
        if (G?.startsWith(`${A}=`)) return G.slice(A.length + 1);
        if (G === A && B + 1 < Q.length) return Q[B + 1];
    }
    return;
}
function CE9() {
    if (process.env.CLAUDE_CODE_REMOTE === "true") return;
    (zE9(xL), zE9(rVA));
}
function zE9(A) {
    let Q = j5(), B = HZA(A.model, Q);
    if (!cD1(B)) return;
    try {
        Fo.call({
            prompt: "Warmup",
            subagent_type: A.agentType,
            description: "Warmup"
        }, {
            options: {
                agentDefinitions: {
                    allAgents: [
                        A
                    ],
                    activeAgents: [
                        A
                    ]
                },
                commands: [],
                debug: !1,
                mainLoopModel: j5(),
                tools: [],
                verbose: !1,
                maxThinkingTokens: 1000,
                mcpClients: [],
                mcpResources: {},
                isNonInteractiveSession: !1
            },
            abortController: new AbortController(),
            readFileState: new pO({
                max: 1000
            }),
            getAppState: async ()=>ps(),
            setAppState: async ()=>{},
            setMessages: async ()=>{},
            setInProgressToolUseIDs: async ()=>{},
            setResponseLength: async ()=>{},
            updateFileHistoryState: async ()=>{},
            agentId: A$("warmup"),
            messages: []
        }, async ()=>({
                behavior: "deny",
                message: "Warmup",
                decisionReason: {
                    type: "other",
                    reason: "Warmup"
                }
            }), PF({
            content: "Warmup"
        }), ()=>{}).catch(()=>{});
    } catch  {}
}
