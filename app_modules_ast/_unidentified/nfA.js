// Module: nfA
// Type: L
// Lines: 490699-490845
//
var nfA = L(()=>{
    bA();
    Ui();
    cx();
    ((f_ = l(React runtime(), 1)), (d4A = l(React runtime(), 1)));
});
function ld(A) {
    return A < 1000 ? `${A}` : `${(A / 1000).toFixed(1)}k`;
}
function E67(A) {
    let { categories: Q, totalTokens: B, rawMaxTokens: G, percentage: Z, model: Y, memoryFiles: J, mcpTools: X, agents: I, slashCommands: W, skills: K, messageBreakdown: V } = A, H = `## Context Usage

`;
    ((H += `**Model:** ${Y}  
`), (H += `**Tokens:** ${ld(B)} / ${ld(G)} (${Z}%)

`));
    let D = Q.filter((F)=>F.tokens > 0 && F.name !== "Free space" && F.name !== "Autocompact buffer");
    if (D.length > 0) {
        ((H += `### Categories

`), (H += `| Category | Tokens | Percentage |
`), (H += `|----------|--------|------------|
`));
        for (let z of D){
            let $ = ((z.tokens / G) * 100).toFixed(1);
            H += `| ${z.name} | ${ld(z.tokens)} | ${$}% |
`;
        }
        let F = Q.find((z)=>z.name === "Free space");
        if (F && F.tokens > 0) {
            let z = ((F.tokens / G) * 100).toFixed(1);
            H += `| Free space | ${ld(F.tokens)} | ${z}% |
`;
        }
        let E = Q.find((z)=>z.name === "Autocompact buffer");
        if (E && E.tokens > 0) {
            let z = ((E.tokens / G) * 100).toFixed(1);
            H += `| Autocompact buffer | ${ld(E.tokens)} | ${z}% |
`;
        }
        H += `
`;
    }
    if (X.length > 0) {
        ((H += `### MCP Tools

`), (H += `| Tool | Server | Tokens |
`), (H += `|------|--------|--------|
`));
        for (let F of X)H += `| ${F.name} | ${F.serverName} | ${ld(F.tokens)} |
`;
        H += `
`;
    }
    if (I.length > 0) {
        ((H += `### Custom Agents

`), (H += `| Agent Type | Source | Tokens |
`), (H += `|------------|--------|--------|
`));
        for (let F of I){
            let E;
            switch(F.source){
                case "projectSettings":
                    E = "Project";
                    break;
                case "userSettings":
                    E = "User";
                    break;
                case "localSettings":
                    E = "Local";
                    break;
                case "flagSettings":
                    E = "Flag";
                    break;
                case "policySettings":
                    E = "Policy";
                    break;
                case "plugin":
                    E = "Plugin";
                    break;
                case "built-in":
                    E = "Built-in";
                    break;
                default:
                    E = String(F.source);
            }
            H += `| ${F.agentType} | ${E} | ${ld(F.tokens)} |
`;
        }
        H += `
`;
    }
    if (J.length > 0) {
        ((H += `### Memory Files

`), (H += `| Type | Path | Tokens |
`), (H += `|------|------|--------|
`));
        for (let F of J)H += `| ${F.type} | ${F.path} | ${ld(F.tokens)} |
`;
        H += `
`;
    }
    if (W && W.tokens > 0) ((H += `### SlashCommand Tool

`), (H += `**Commands:** ${W.includedCommands < W.totalCommands ? `${W.includedCommands} of ${W.totalCommands}` : W.totalCommands}  
`), (H += `**Total tokens:** ${ld(W.tokens)}

`));
    return (K && K.tokens > 0, H);
}
var afA, b59, h59;
