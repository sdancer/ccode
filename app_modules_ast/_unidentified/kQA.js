// Module: kQA
// Type: L
// Lines: 243208-243305
//
var renderElement = L(()=>{
    bA();
    n6();
    U4();
    ((vQA = l(React runtime(), 1)), (CPB = vQA.default.createContext(!1)));
});
function uA0(A) {
    if (V0(process.env.CLAUDE_CODE_DISABLE_TERMINAL_TITLE)) return;
    if (process.platform === "win32") process.title = A ? `✳ ${A}` : A;
    else process.stdout.write(`\x1B]0;${A ? `✳ ${A}` : ""}\x07`);
}
async function UPB(A) {
    if (A.startsWith("<local-command-stdout>")) return;
    let Q = "{";
    try {
        let B = await yK({
            systemPrompt: [
                "Analyze if this message indicates a new conversation topic. If it does, extract a 2-3 word title that captures the new topic. Format your response as a JSON object with two fields: 'isNewTopic' (boolean) and 'title' (string, or null if isNewTopic is false). Only include these fields, no other text. ONLY generate the JSON object, no other text (eg. no markdown)."
            ],
            userPrompt: A,
            assistantPrompt: Q,
            signal: new AbortController().signal,
            options: {
                querySource: "terminal_update_title",
                agents: [],
                isNonInteractiveSession: !1,
                hasAppendSystemPrompt: !1,
                mcpTools: []
            }
        }), G = Q + B.message.content.filter((Y)=>Y.type === "text").map((Y)=>Y.text).join(""), Z = _5(G);
        if (Z && typeof Z === "object" && "isNewTopic" in Z && "title" in Z) {
            if (Z.isNewTopic && Z.title) uA0(Z.title);
        }
    } catch (B) {
        t(B);
    }
}
function wI() {
    return new Promise((A)=>{
        process.stdout.write("\x1B[2J\x1B[3J\x1B[H", ()=>{
            A();
        });
    });
}
function R23(A, Q) {
    let B = A.split(`
`), G = [];
    for (let Y of B){
        let J = LG(Y);
        if (J <= Q) G.push(Y.trimEnd());
        else {
            let X = 0;
            while(X < J){
                let I = lqA(Y, X, X + Q);
                (G.push(I.trimEnd()), (X += Q));
            }
        }
    }
    let Z = G.length - gA0;
    if (Z === 1) return {
        aboveTheFold: G.slice(0, gA0 + 1).join(`
`).trimEnd(),
        remainingLines: 0
    };
    return {
        aboveTheFold: G.slice(0, gA0).join(`
`).trimEnd(),
        remainingLines: Math.max(0, Z)
    };
}
function wPB(A, Q) {
    let B = A.trimEnd();
    if (!B) return "";
    let { aboveTheFold: G, remainingLines: Z } = R23(B, Math.max(Q - M23, 10));
    return [
        G,
        Z > 0 ? V1.dim(`… +${Z} lines ${$PB()}`) : ""
    ].filter(Boolean).join(`
`);
}
var gA0 = 3, M23 = 9;
