// Module: yDA
// Type: L
// Lines: 468346-468520
//
var pushViewTransitionAttributes = L(()=>{
    KB();
    Nr();
    A_();
    KB();
    renderElement();
    canHydrateInstance();
    createRenderState();
    JvA();
    PA9();
    pushStartInstance();
    pushStartInstance();
    createRenderState();
    i0();
});
function wQ7() {
    (uA0(""), r6(0));
}
async function xV1(A) {
    let { input: Q, helpers: B, isLoading: G, mode: Z, commands: Y, onInputChange: J, setPastedContents: X, setIsLoading: I, setToolJSX: W, getToolUseContext: K, messages: V, mainLoopModel: H, pastedContents: D, ideSelection: F, setUserInputOnProcessing: E, setAbortController: z, onQuery: $, resetLoadingState: O, thinkingTokens: N, thinkingEnabled: M, setAppState: R, onBeforeQuery: j, onSideQuestion: P, isSideQuestionProcessing: f } = A, { setCursorOffset: y, clearBuffer: m, resetHistory: g } = B;
    if (Q.trim() === "") return;
    let s = vK1(Q.trim());
    if (s.isBtw && P) {
        if (f || !s.question) return;
        (J(""), y(0), m(), await P(s.question));
        return;
    }
    if ([
        "exit",
        "quit",
        ":q",
        ":q!",
        ":wq",
        ":wq!"
    ].includes(Q.trim())) {
        if (Y.find((YA)=>YA.name === "exit")) xV1({
            ...A,
            input: "/exit"
        });
        else wQ7();
        return;
    }
    let p = Q, v = _7B(Q), d = 0;
    for (let AA of v){
        let YA = D[AA.id];
        if (YA && YA.type === "text") ((p = p.replace(AA.match, YA.content)), d++);
    }
    if ((r("tengu_paste_text", {
        pastedTextCount: d
    }), G)) {
        if (Z !== "prompt") return;
        (w$({
            value: p,
            mode: "prompt"
        }, R), J(""), y(0), X({}), g(), m());
        return;
    }
    (xA9(), await qQ7({
        input: p,
        mode: Z,
        messages: V,
        mainLoopModel: H,
        pastedContents: D,
        ideSelection: F,
        thinkingTokens: N,
        thinkingEnabled: M,
        querySource: A.querySource,
        commands: Y,
        isLoading: G,
        setIsLoading: I,
        setToolJSX: W,
        getToolUseContext: K,
        setUserInputOnProcessing: E,
        setAbortController: z,
        onQuery: $,
        resetLoadingState: O,
        setAppState: R,
        onBeforeQuery: j,
        resetHistory: g
    }));
}
async function qQ7(A) {
    let { input: Q, mode: B, messages: G, mainLoopModel: Z, pastedContents: Y, ideSelection: J, thinkingTokens: X, thinkingEnabled: I, querySource: W, isLoading: K, setIsLoading: V, setToolJSX: H, getToolUseContext: D, setUserInputOnProcessing: F, setAbortController: E, onQuery: z, setAppState: $, onBeforeQuery: O, resetHistory: N } = A, M = !K, R = Q4();
    if (M) E(R);
    try {
        let j = NQ7(B, X, Q, I);
        xG("query_process_user_input_start");
        let { messages: P, shouldQuery: f, allowedTools: y, maxThinkingTokens: m, model: g } = await mf({
            input: Q,
            mode: B,
            setIsLoading: V,
            setToolJSX: H,
            context: D(G, [], R, [], void 0, Z),
            pastedContents: Y,
            ideSelection: J,
            messages: G,
            setUserInputOnProcessing: F,
            isAlreadyProcessing: K,
            thinkingMetadata: j,
            querySource: W
        });
        if ((xG("query_process_user_input_end"), QZ())) (xG("query_file_history_snapshot_start"), P.filter(_r).forEach((s)=>{
            bWA((p)=>{
                $((v)=>({
                        ...v,
                        fileHistory: p(v.fileHistory)
                    }));
            }, s.uuid);
        }), xG("query_file_history_snapshot_end"));
        if ((H(null), P.length)) (N(), await z(P, R, f, y ?? [], g ?? Z, m, B === "prompt" ? O : void 0, Q));
        else if ((N(), !K)) E(null);
    } finally{
        V(!1);
    }
}
function NQ7(A, Q, B, G) {
    if (A !== "prompt") return;
    let Z = Q > 0, Y = Z ? lY1(B) : [], J = !G && !Z;
    return {
        level: J ? "none" : "high",
        disabled: J,
        triggers: Y.map((I)=>({
                start: I.start,
                end: I.end,
                text: B.slice(I.start, I.end)
            }))
    };
}
