// Module: Iq0
// Type: L
// Lines: 464994-465035
//
var Iq0 = L(()=>{
    bA();
    $2();
    N9();
    rpcCall();
    os2();
    ss2();
    Je2();
    X2();
    MPA();
    RPA();
    trackUsedThenable();
    pushStartInstance();
    U4();
    b6();
    ((t8 = l(React runtime(), 1)), (L4A = l(React runtime(), 1)));
});
function Ve2(A) {
    let Q = kL(A);
    if (!Q) return [];
    let B = [];
    for (let G of Q.members){
        if (G.name === "team-lead") continue;
        let Y = G.isActive !== !1 ? "running" : "idle";
        B.push({
            name: G.name,
            agentId: G.agentId,
            agentType: G.agentType,
            model: G.model,
            prompt: G.prompt,
            status: Y,
            color: G.color,
            tmuxPaneId: G.tmuxPaneId,
            cwd: G.cwd,
            worktreePath: G.worktreePath,
            isHidden: LL2(A, G.tmuxPaneId),
            backendType: G.backendType
        });
    }
    return B;
}
