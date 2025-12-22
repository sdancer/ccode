// Module: nH9
// Type: L
// Lines: 528753-528837
//
var createRenderState = L(()=>{
    restoreViewTransitionName();
    aQ();
});
function nW7(A) {
    let Q = A.match(lW7);
    if (!Q || !Q[1]) return null;
    let B = Q[1].trim(), G = Q.index + Q[0].length, Y = A.slice(G).match(/^\s*\n(?:\s*\n)?(.+?)(?:\n|$)/);
    if (Y && Y[1]) {
        let X = Y[1].match(iW7);
        if (X && X[1]) {
            let I = X[1].trim();
            return {
                title: B,
                instructions: I
            };
        }
    }
    return {
        title: B
    };
}
function aW7() {
    return {
        agentType: "magic-docs",
        whenToUse: "Update Magic Docs",
        tools: [
            S8
        ],
        model: "sonnet",
        source: "built-in",
        baseDir: "built-in",
        getSystemPrompt: ()=>""
    };
}
async function oW7(A, Q) {
    let { messages: B, systemPrompt: G, userContext: Z, systemContext: Y, toolUseContext: J } = Q, X = K2A(J.readFileState), I = {
        ...J,
        readFileState: X
    };
    if (!vA().existsSync(A.path)) {
        qF1.delete(A.path);
        return;
    }
    let K = await D3.call({
        file_path: A.path
    }, I), V = "", H = K.data;
    if (H.type === "text") V = H.file.content;
    let D = nW7(V);
    if (!D) {
        qF1.delete(A.path);
        return;
    }
    let F = await iH9(V, A.path, D.title, D.instructions), E = async (z, $)=>{
        if (z.name === S8 && typeof $ === "object" && $ !== null && "file_path" in $) {
            let O = $.file_path;
            if (typeof O === "string" && O === A.path) return {
                behavior: "allow",
                updatedInput: $
            };
        }
        return {
            behavior: "deny",
            message: `only ${S8} is allowed for ${A.path}`,
            decisionReason: {
                type: "other",
                reason: `only ${S8} is allowed`
            }
        };
    };
    for await (let z of j9A({
        agentDefinition: aW7(),
        promptMessages: [
            h0({
                content: F
            })
        ],
        toolUseContext: I,
        canUseTool: E,
        isAsync: !0,
        forkContextMessages: B,
        querySource: "magic_docs",
        override: {
            systemPrompt: G,
            userContext: Z,
            systemContext: Y
        }
    }));
}
async function aH9() {}
var lW7, iW7, qF1, RqJ;
