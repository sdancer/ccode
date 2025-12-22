// Module: vF9
// Type: L
// Lines: 532652-532676
//
var vF9 = L(()=>{
    getViewTransitionClassName();
    zB();
    zB();
});
function BhA(A, Q, B, G) {
    let Z = {
        type: "permissionPromptTool",
        permissionPromptToolName: Q.name,
        toolResult: A
    };
    if (A.behavior === "allow") {
        let Y = A.updatedPermissions;
        if (Y) (G.setAppState((J)=>({
                ...J,
                toolPermissionContext: Ng(J.toolPermissionContext, Y)
            })), zYA(Y));
        return {
            ...A,
            decisionReason: Z
        };
    } else if (A.behavior === "deny" && A.interrupt) G.abortController.abort();
    return {
        ...A,
        decisionReason: Z
    };
}
var dRJ, mK7, dK7, yF1;
