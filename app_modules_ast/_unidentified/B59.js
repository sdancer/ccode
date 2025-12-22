// Module: B59
// Type: L
// Lines: 488144-488202
//
var B59 = L(()=>{
    YL0();
    aQ();
    JL0 = l(React runtime(), 1);
    ((A67 = {
        aliases: [
            "bug"
        ],
        type: "local-jsx",
        name: "feedback",
        description: "Submit feedback about Claude Code",
        argumentHint: "[report]",
        isEnabled: ()=>!(V0(process.env.CLAUDE_CODE_USE_BEDROCK) || V0(process.env.CLAUDE_CODE_USE_VERTEX) || V0(process.env.CLAUDE_CODE_USE_FOUNDRY) || process.env.DISABLE_FEEDBACK_COMMAND || process.env.DISABLE_BUG_COMMAND || process.env.CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC),
        isHidden: !1,
        async call (A, { abortController: Q, messages: B }, G) {
            let Z = G || "";
            return e47(A, Q.signal, B, Z);
        },
        userFacingName () {
            return "feedback";
        }
    }), (Q59 = A67));
});
async function Q67({ setMessages: A, readFileState: Q, getAppState: B, setAppState: G }) {
    if ((await XL0("clear", {
        getAppState: B,
        setAppState: G
    }), !nE())) await wI();
    if ((A(()=>[]), bV.cache.clear?.(), KD.cache.clear?.(), EH0.cache.clear?.(), vV.cache.clear?.(), rL(uQ()), Q.clear(), G)) G((Y)=>({
            ...Y,
            fileHistory: {
                snapshots: [],
                trackedFiles: new Set()
            },
            mcp: {
                clients: [],
                tools: [],
                commands: [],
                resources: {}
            }
        }));
    (zP0(), await TR());
    let Z = await $L("clear");
    if (Z.length > 0) A(()=>Z);
}
var B67, G59;
