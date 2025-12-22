// Module: nz2
// Type: L
// Lines: 376052-376188
//
var nz2 = L(()=>{
    aQ();
    i0();
    rpcCall();
    restoreViewTransitionName();
    g1();
    z4();
    WK0 = lz2(gQ(), "session-memory");
});
function az2({ processId: A, asyncResponse: Q, hookName: B, hookEvent: G, command: Z, shellCommand: Y, toolName: J }) {
    let X = Q.asyncTimeout || 15000;
    (k(`Hooks: Registering async hook ${A} (${B}) with timeout ${X}ms`), im.set(A, {
        processId: A,
        hookName: B,
        hookEvent: G,
        toolName: J,
        command: Z,
        startTime: Date.now(),
        timeout: X,
        stdout: "",
        stderr: "",
        responseAttachmentSent: !1,
        shellCommand: Y
    }));
}
function oz2(A, Q) {
    let B = im.get(A);
    if (B) (k(`Hooks: Adding stdout to ${A}: ${Q.substring(0, 50)}...`), (B.stdout += Q));
    else k(`Hooks: Attempted to add output to unknown process ${A}`);
}
function rz2(A, Q) {
    let B = im.get(A);
    if (B) (k(`Hooks: Adding stderr to ${A}: ${Q.substring(0, 50)}...`), (B.stderr += Q));
    else k(`Hooks: Attempted to add stderr to unknown process ${A}`);
}
async function sz2() {
    let A = [], Q = im.size;
    k(`Hooks: Found ${Q} total hooks in registry`);
    let B = [];
    for (let G of im.values()){
        if ((k(`Hooks: Checking hook ${G.processId} (${G.hookName}) - attachmentSent: ${G.responseAttachmentSent}, stdout length: ${G.stdout.length}`), !G.shellCommand)) {
            (k(`Hooks: Hook ${G.processId} has no shell command, removing from registry`), B.push(G.processId));
            continue;
        }
        if ((k(`Hooks: Hook shell status ${G.shellCommand.status}`), G.shellCommand.status === "killed")) {
            (k(`Hooks: Hook ${G.processId} is ${G.shellCommand.status}, removing from registry`), B.push(G.processId));
            continue;
        }
        if (G.shellCommand.status !== "completed") continue;
        if (G.responseAttachmentSent || !G.stdout.trim()) {
            (k(`Hooks: Skipping hook ${G.processId} - already delivered/sent or no stdout`), B.push(G.processId));
            continue;
        }
        let Z = G.stdout.split(`
`);
        k(`Hooks: Processing ${Z.length} lines of stdout for ${G.processId}`);
        let J = (await G.shellCommand.result).code, X = {};
        for (let I of Z)if (I.trim().startsWith("{")) {
            k(`Hooks: Found JSON line: ${I.trim().substring(0, 100)}...`);
            try {
                let W = JSON.parse(I.trim());
                if (!("async" in W)) {
                    (k(`Hooks: Found sync response from ${G.processId}: ${JSON.stringify(W)}`), (X = W));
                    break;
                }
            } catch  {
                k(`Hooks: Failed to parse JSON from ${G.processId}: ${I.trim()}`);
            }
        }
        if ((A.push({
            processId: G.processId,
            response: X,
            hookName: G.hookName,
            hookEvent: G.hookEvent,
            toolName: G.toolName,
            stdout: G.stdout,
            stderr: G.stderr,
            exitCode: J
        }), (G.responseAttachmentSent = !0), im.delete(G.processId), G.hookEvent === "SessionStart")) (k(`Invalidating session env cache after SessionStart hook ${G.processId} completed`), KBB());
    }
    for (let G of B)im.delete(G);
    return (k(`Hooks: checkForNewResponses returning ${A.length} responses`), A);
}
function tz2(A) {
    for (let Q of A){
        let B = im.get(Q);
        if (B && B.responseAttachmentSent) (k(`Hooks: Removing delivered hook ${Q}`), im.delete(Q));
    }
}
var im;
