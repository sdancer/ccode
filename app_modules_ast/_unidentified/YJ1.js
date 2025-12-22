// Module: YJ1
// Type: L
// Lines: 390264-390349
//
var trackUsedThenable = L(()=>{
    v2();
    g1();
    s1();
    samplingCallback();
    ((eY5 = l(renderElement(), 1)), (pgZ = u.object({
        id: u.string(),
        workerId: u.string(),
        workerName: u.string(),
        workerColor: u.string().optional(),
        teamName: u.string(),
        toolName: u.string(),
        toolUseId: u.string(),
        description: u.string(),
        input: u.unknown(),
        permissionSuggestions: u.array(u.unknown()),
        status: u.enum([
            "pending",
            "approved",
            "rejected"
        ]),
        resolvedBy: u.enum([
            "worker",
            "leader"
        ]).optional(),
        resolvedAt: u.number().optional(),
        feedback: u.string().optional(),
        updatedInput: u.unknown().optional(),
        permissionUpdates: u.array(u.unknown()).optional(),
        createdAt: u.number()
    })));
});
function hL2(A) {
    (JJ1.set(A.requestId, A), k(`[SwarmPermissionPoller] Registered callback for request ${A.requestId}`));
}
function gL2(A) {
    return JJ1.has(A);
}
function uL2(A) {
    let Q = JJ1.get(A.requestId);
    if (!Q) return (k(`[SwarmPermissionPoller] No callback registered for mailbox response ${A.requestId}`), !1);
    if ((k(`[SwarmPermissionPoller] Processing mailbox response for request ${A.requestId}: ${A.decision}`), JJ1.delete(A.requestId), A.decision === "approved")) {
        let B = A.permissionUpdates || [], G = A.updatedInput || {};
        Q.onAllow(G, B);
    } else Q.onReject(A.feedback);
    return !0;
}
function mL2(A) {
    (XJ1.set(A.requestId, A), k(`[SwarmPermissionPoller] Registered sandbox callback for request ${A.requestId}`));
}
function dL2(A) {
    return XJ1.has(A);
}
function cL2(A) {
    let Q = XJ1.get(A.requestId);
    if (!Q) return (k(`[SwarmPermissionPoller] No sandbox callback registered for request ${A.requestId}`), !1);
    return (k(`[SwarmPermissionPoller] Processing sandbox response for request ${A.requestId}: allow=${A.allow}`), XJ1.delete(A.requestId), Q.resolve(A.allow), !0);
}
var ID0, JJ1, XJ1;
