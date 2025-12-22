// Module: Q79
// Type: L
// Lines: 491662-491755
//
var Q79 = L(()=>{
    i0();
});
async function U67() {
    let A = F2A();
    if (A.length === 0) return null;
    let Q = A.sort((G, Z)=>Z.content.length - G.content.length).map((G)=>`${G.path}: ${G.content.length.toLocaleString()} chars`);
    return {
        type: "claudemd_files",
        severity: "warning",
        message: A.length === 1 ? `Large CLAUDE.md file detected (${A[0].content.length.toLocaleString()} chars > ${wm.toLocaleString()})` : `${A.length} large CLAUDE.md files detected (each > ${wm.toLocaleString()} chars)`,
        details: Q,
        currentValue: A.length,
        threshold: wm
    };
}
async function w67(A) {
    if (!A) return null;
    let Q = lkA(A);
    if (Q <= q4A) return null;
    let B = A.activeAgents.filter((Z)=>Z.source !== "built-in").map((Z)=>{
        let Y = `${Z.agentType}: ${Z.whenToUse}`;
        return {
            name: Z.agentType,
            tokens: jZ(Y)
        };
    }).sort((Z, Y)=>Y.tokens - Z.tokens), G = B.slice(0, 5).map((Z)=>`${Z.name}: ~${Z.tokens.toLocaleString()} tokens`);
    if (B.length > 5) G.push(`(${B.length - 5} more custom agents)`);
    return {
        type: "agent_descriptions",
        severity: "warning",
        message: `Large agent descriptions (~${Q.toLocaleString()} tokens > ${q4A.toLocaleString()})`,
        details: G,
        currentValue: Q,
        threshold: q4A
    };
}
async function q67(A, Q, B) {
    let G = A.filter((Z)=>Z.isMcp);
    if (G.length === 0) return null;
    if (lY()) return null;
    try {
        let { mcpToolTokens: Z, mcpToolDetails: Y } = await dyA(A, Q, B);
        if (Z <= BFA) return null;
        let J = new Map();
        for (let W of Y){
            let V = W.name.split("__")[1] || "unknown", H = J.get(V) || {
                count: 0,
                tokens: 0
            };
            J.set(V, {
                count: H.count + 1,
                tokens: H.tokens + W.tokens
            });
        }
        let X = Array.from(J.entries()).sort((W, K)=>K[1].tokens - W[1].tokens), I = X.slice(0, 5).map(([W, K])=>`${W}: ${K.count} tools (~${K.tokens.toLocaleString()} tokens)`);
        if (X.length > 5) I.push(`(${X.length - 5} more servers)`);
        return {
            type: "mcp_tools",
            severity: "warning",
            message: `Large MCP tools context (~${Z.toLocaleString()} tokens > ${BFA.toLocaleString()})`,
            details: I,
            currentValue: Z,
            threshold: BFA
        };
    } catch (Z) {
        let Y = G.reduce((J, X)=>{
            let I = (X.name?.length || 0) + X.description.length;
            return J + jZ(I.toString());
        }, 0);
        if (Y <= BFA) return null;
        return {
            type: "mcp_tools",
            severity: "warning",
            message: `Large MCP tools context (~${Y.toLocaleString()} tokens estimated > ${BFA.toLocaleString()})`,
            details: [
                `${G.length} MCP tools detected (token count estimated)`
            ],
            currentValue: Y,
            threshold: BFA
        };
    }
}
async function B79(A, Q, B) {
    let [G, Z, Y] = await Promise.all([
        U67(),
        w67(Q),
        q67(A, B, Q)
    ]);
    return {
        claudeMdWarning: G,
        agentWarning: Z,
        mcpWarning: Y
    };
}
var BFA = 25000;
