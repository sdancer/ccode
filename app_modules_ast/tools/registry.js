// Module: AV9
// Type: L
// Lines: 521774-523022
//
var renderElement = L(()=>{
    s1();
    pushViewTransitionAttributes();
    NZ();
    createRenderState();
    Q9();
    A_();
    pushStartInstance();
    dr();
    _Y();
    createRenderState();
    GvA();
    b8();
    KB();
    pushStartInstance();
    Rr();
});
var YV9 = {};
M5(YV9, {
    getUserPromptSubmitHookBlockingMessage: ()=>Lq0,
    getStopHookMessage: ()=>dH0,
    getPreToolHookBlockingMessage: ()=>mH0,
    getMatchingHooks: ()=>zR0,
    executeUserPromptSubmitHooks: ()=>Oq0,
    executeSubagentStartHooks: ()=>NN0,
    executeStopHooks: ()=>iH0,
    executeStatusLineCommand: ()=>oU0,
    executeSessionStartHooks: ()=>JZ0,
    executeSessionEndHooks: ()=>XL0,
    executePreToolHooks: ()=>cH0,
    executePreCompactHooks: ()=>jK0,
    executePostToolUseFailureHooks: ()=>lH0,
    executePostToolHooks: ()=>pH0,
    executePermissionRequestHooks: ()=>Fq0,
    executeNotificationHooks: ()=>QK0,
    executeFileSuggestionCommand: ()=>TU0,
    createBaseHookInput: ()=>oF
});
import { spawn as sJ7 } from "node:child_process";
import { randomUUID as MFA } from "crypto";
function BV9() {
    if (!!m9()) return !1;
    return !sZ(!1);
}
function oF(A, Q) {
    let B = Q ?? m0();
    return {
        session_id: B,
        transcript_path: vjA(B),
        cwd: i1(),
        permission_mode: A
    };
}
function GV9(A) {
    let Q = A.trim();
    if (!Q.startsWith("{")) return (k("Hook output does not start with {, treating as plain text"), {
        plainText: A
    });
    try {
        let B = JSON.parse(Q), G = nD1.safeParse(B);
        if (G.success) return (k("Successfully parsed and validated hook JSON output"), {
            json: G.data
        });
        else {
            let Y = `Hook JSON output validation failed:
${G.error.errors.map((J)=>`  - ${J.path.join(".")}: ${J.message}`).join(`
`)}

Expected schema:
${JSON.stringify({
                continue: "boolean (optional)",
                suppressOutput: "boolean (optional)",
                stopReason: "string (optional)",
                decision: '"approve" | "block" (optional)',
                reason: "string (optional)",
                systemMessage: "string (optional)",
                permissionDecision: '"allow" | "deny" | "ask" (optional)',
                hookSpecificOutput: {
                    "for PreToolUse": {
                        hookEventName: '"PreToolUse"',
                        permissionDecision: '"allow" | "deny" | "ask" (optional)',
                        permissionDecisionReason: "string (optional)",
                        updatedInput: "object (optional) - Modified tool input to use"
                    },
                    "for UserPromptSubmit": {
                        hookEventName: '"UserPromptSubmit"',
                        additionalContext: "string (required)"
                    },
                    "for PostToolUse": {
                        hookEventName: '"PostToolUse"',
                        additionalContext: "string (optional)"
                    }
                }
            }, null, 2)}. The hook's stdout was: ${JSON.stringify(B, null, 2)}`;
            return (k(Y), {
                plainText: A,
                validationError: Y
            });
        }
    } catch (B) {
        return (k(`Failed to parse hook output as JSON: ${B}`), {
            plainText: A
        });
    }
}
function ZV9({ json: A, command: Q, hookName: B, toolUseID: G, hookEvent: Z, expectedHookEvent: Y, stdout: J, stderr: X, exitCode: I }) {
    let W = {}, K = A;
    if (K.continue === !1) {
        if (((W.preventContinuation = !0), K.stopReason)) W.stopReason = K.stopReason;
    }
    if (A.decision) switch(A.decision){
        case "approve":
            W.permissionBehavior = "allow";
            break;
        case "block":
            ((W.permissionBehavior = "deny"), (W.blockingError = {
                blockingError: A.reason || "Blocked by hook",
                command: Q
            }));
            break;
        default:
            throw Error(`Unknown hook decision type: ${A.decision}. Valid types are: approve, block`);
    }
    if (A.systemMessage) W.systemMessage = A.systemMessage;
    if (A.hookSpecificOutput?.hookEventName === "PreToolUse" && A.hookSpecificOutput.permissionDecision) switch(A.hookSpecificOutput.permissionDecision){
        case "allow":
            W.permissionBehavior = "allow";
            break;
        case "deny":
            ((W.permissionBehavior = "deny"), (W.blockingError = {
                blockingError: A.reason || "Blocked by hook",
                command: Q
            }));
            break;
        case "ask":
            W.permissionBehavior = "ask";
            break;
        default:
            throw Error(`Unknown hook permissionDecision type: ${A.hookSpecificOutput.permissionDecision}. Valid types are: allow, deny, ask`);
    }
    if (W.permissionBehavior !== void 0 && A.reason !== void 0) W.hookPermissionDecisionReason = A.reason;
    if (A.hookSpecificOutput) {
        if (Y && A.hookSpecificOutput.hookEventName !== Y) throw Error(`Hook returned incorrect event name: expected '${Y}' but got '${A.hookSpecificOutput.hookEventName}'. Full stdout: ${JSON.stringify(A, null, 2)}`);
        switch(A.hookSpecificOutput.hookEventName){
            case "PreToolUse":
                if (A.hookSpecificOutput.permissionDecision) switch(A.hookSpecificOutput.permissionDecision){
                    case "allow":
                        W.permissionBehavior = "allow";
                        break;
                    case "deny":
                        ((W.permissionBehavior = "deny"), (W.blockingError = {
                            blockingError: A.hookSpecificOutput.permissionDecisionReason || A.reason || "Blocked by hook",
                            command: Q
                        }));
                        break;
                    case "ask":
                        W.permissionBehavior = "ask";
                        break;
                }
                if (((W.hookPermissionDecisionReason = A.hookSpecificOutput.permissionDecisionReason), A.hookSpecificOutput.updatedInput)) W.updatedInput = A.hookSpecificOutput.updatedInput;
                break;
            case "UserPromptSubmit":
                W.additionalContext = A.hookSpecificOutput.additionalContext;
                break;
            case "SessionStart":
                W.additionalContext = A.hookSpecificOutput.additionalContext;
                break;
            case "SubagentStart":
                W.additionalContext = A.hookSpecificOutput.additionalContext;
                break;
            case "PostToolUse":
                if (((W.additionalContext = A.hookSpecificOutput.additionalContext), A.hookSpecificOutput.updatedMCPToolOutput)) W.updatedMCPToolOutput = A.hookSpecificOutput.updatedMCPToolOutput;
                break;
            case "PostToolUseFailure":
                W.additionalContext = A.hookSpecificOutput.additionalContext;
                break;
            case "PermissionRequest":
                if (A.hookSpecificOutput.decision) {
                    if (((W.permissionRequestResult = A.hookSpecificOutput.decision), (W.permissionBehavior = A.hookSpecificOutput.decision.behavior === "allow" ? "allow" : "deny"), A.hookSpecificOutput.decision.behavior === "allow" && A.hookSpecificOutput.decision.updatedInput)) W.updatedInput = A.hookSpecificOutput.decision.updatedInput;
                }
                break;
        }
    }
    return {
        ...W,
        message: W.blockingError ? J4({
            type: "hook_blocking_error",
            hookName: B,
            toolUseID: G,
            hookEvent: Z,
            blockingError: W.blockingError
        }) : J4({
            type: "hook_success",
            hookName: B,
            toolUseID: G,
            hookEvent: Z,
            content: "Success",
            stdout: J,
            stderr: X,
            exitCode: I
        })
    };
}
async function oD1(A, Q, B, G, Z, Y) {
    let J = uQ(), X = process.env.CLAUDE_CODE_SHELL_PREFIX ? $rA(process.env.CLAUDE_CODE_SHELL_PREFIX, A.command) : A.command, I = A.timeout ? A.timeout * 1000 : 60000, W = {
        ...process.env,
        CLAUDE_PROJECT_DIR: J
    };
    if (Q === "SessionStart" && Y !== void 0) W.CLAUDE_ENV_FILE = UrA(Y);
    let K = sJ7(X, [], {
        env: W,
        cwd: i1(),
        shell: !0
    }), V = CrA(K, Z, I), H = "", D = "";
    (K.stdout.setEncoding("utf8"), K.stderr.setEncoding("utf8"));
    let F = !1, E = null, z = new Promise((M)=>{
        E = M;
    });
    (K.stdout.on("data", (M)=>{
        if (((H += M), !F && H.trim().includes("}"))) {
            ((F = !0), k(`Hooks: Checking initial response for async: ${H.trim()}`));
            try {
                let R = JSON.parse(H.trim());
                if ((k(`Hooks: Parsed initial response: ${JSON.stringify(R)}`), OFA(R))) {
                    let j = `async_hook_${K.pid}`;
                    k(`Hooks: Detected async hook, backgrounding process ${j}`);
                    let P = V.background(j);
                    if (P) (az2({
                        processId: j,
                        asyncResponse: R,
                        hookEvent: Q,
                        hookName: B,
                        command: A.command,
                        shellCommand: V
                    }), P.stdoutStream.on("data", (f)=>{
                        oz2(j, f.toString());
                    }), P.stderrStream.on("data", (f)=>{
                        rz2(j, f.toString());
                    }), E?.({
                        stdout: H,
                        stderr: D,
                        status: 0
                    }));
                } else k("Hooks: Initial response is not async, continuing normal processing");
            } catch (R) {
                k(`Hooks: Failed to parse initial response as JSON: ${R}`);
            }
        }
    }), K.stderr.on("data", (M)=>{
        D += M;
    }));
    let $ = new Promise((M, R)=>{
        (K.stdin.on("error", R), K.stdin.write(G, "utf8"), K.stdin.end(), M());
    }), O = new Promise((M, R)=>{
        K.on("error", R);
    }), N = new Promise((M)=>{
        K.on("close", (R)=>{
            M({
                stdout: H,
                stderr: D,
                status: R ?? 1,
                aborted: Z.aborted
            });
        });
    });
    try {
        return (await Promise.race([
            $,
            O
        ]), await Promise.race([
            z,
            N,
            O
        ]));
    } catch (M) {
        let R = M;
        if (R.code === "EPIPE") return (k("EPIPE error while writing to hook stdin (hook command likely closed early)"), {
            stdout: "",
            stderr: "Hook command closed stdin before hook input was fully written (EPIPE)",
            status: 1
        });
        else if (R.code === "ABORT_ERR") return {
            stdout: "",
            stderr: "Hook cancelled",
            status: 1,
            aborted: !0
        };
        else return {
            stdout: "",
            stderr: `Error occurred while executing hook command: ${M instanceof Error ? M.message : String(M)}`,
            status: 1
        };
    }
}
function tJ7(A, Q) {
    if (!Q || Q === "*") return !0;
    if (/^[a-zA-Z0-9_|]+$/.test(Q)) {
        if (Q.includes("|")) return Q.split("|").map((G)=>G.trim()).includes(A);
        return A === Q;
    }
    try {
        return new RegExp(Q).test(A);
    } catch  {
        return (k(`Invalid regex pattern in hook matcher: ${Q}`), !1);
    }
}
function eJ7(A) {
    let Q = {}, B = nK9();
    if (B) for (let [G, Z] of Object.entries(B))Q[G] = Z.map((Y)=>({
            matcher: Y.matcher,
            hooks: Y.hooks
        }));
    if (!qo()) {
        let G = DgA();
        if (G) for (let [Z, Y] of Object.entries(G)){
            if (!Q[Z]) Q[Z] = [];
            for (let J of Y)Q[Z].push({
                matcher: J.matcher,
                hooks: J.hooks
            });
        }
    }
    if (A) {
        let G = m0(), Z = aY1(A, G);
        for (let [J, X] of Z.entries()){
            if (!Q[J]) Q[J] = [];
            for (let I of X)Q[J].push({
                matcher: I.matcher,
                hooks: I.hooks
            });
        }
        let Y = BL2(A, G);
        for (let [J, X] of Y.entries()){
            if (!Q[J]) Q[J] = [];
            for (let I of X)Q[J].push({
                matcher: I.matcher,
                hooks: I.hooks
            });
        }
    }
    return Q;
}
function zR0(A, Q, B) {
    try {
        let Z = eJ7(A)?.[Q] ?? [], Y = void 0;
        switch(B.hook_event_name){
            case "PreToolUse":
            case "PostToolUse":
            case "PostToolUseFailure":
            case "PermissionRequest":
                Y = B.tool_name;
                break;
            case "SessionStart":
                Y = B.source;
                break;
            case "PreCompact":
                Y = B.trigger;
                break;
            case "Notification":
                Y = B.notification_type;
                break;
            case "SessionEnd":
                Y = B.reason;
                break;
            case "SubagentStart":
                Y = B.agent_type;
                break;
            default:
                break;
        }
        (k(`Getting matching hook commands for ${Q} with query: ${Y}`), k(`Found ${Z.length} hook matchers in settings`));
        let J;
        if (!Y) J = Z.flatMap((D)=>D.hooks);
        else J = Z.filter((D)=>!D.matcher || tJ7(Y, D.matcher)).flatMap((D)=>D.hooks);
        let X = Array.from(new Map(J.filter((D)=>D.type === "command").map((D)=>[
                D.command,
                D
            ])).values()), I = Array.from(new Map(J.filter((D)=>D.type === "prompt").map((D)=>[
                D.prompt,
                D
            ])).values()), W = Array.from(new Map(J.filter((D)=>D.type === "agent").map((D)=>[
                D.prompt([]),
                D
            ])).values()), K = J.filter((D)=>D.type === "callback"), V = J.filter((D)=>D.type === "function"), H = [
            ...X,
            ...I,
            ...W,
            ...K,
            ...V
        ];
        return (k(`Matched ${H.length} unique hooks for query "${Y || "no match query"}" (${J.length} before deduplication)`), H);
    } catch  {
        return [];
    }
}
function mH0(A, Q) {
    return `${A} hook error: ${Q.blockingError}`;
}
function dH0(A) {
    return `Stop hook feedback:
${A.blockingError}`;
}
function Lq0(A) {
    return `UserPromptSubmit operation blocked by hook:
${A.blockingError}`;
}
async function* is({ hookInput: A, toolUseID: Q, matchQuery: B, signal: G, timeoutMs: Z = VO, toolUseContext: Y, messages: J }) {
    if (HQ().disableAllHooks) return;
    let X = A.hook_event_name, I = B ? `${X}:${B}` : X;
    if (BV9()) {
        k(`Skipping ${I} hook execution - workspace trust not accepted`);
        return;
    }
    let W = Y ? await Y.getAppState() : void 0, K = zR0(W, X, A);
    if (K.length === 0) return;
    if (G?.aborted) return;
    r("tengu_run_hook", {
        hookName: I,
        numCommands: K.length
    });
    let V = XD() ? QV9(K) : [];
    if (XD()) JD("hook_execution_start", {
        hook_event: X,
        hook_name: I,
        num_hooks: String(K.length),
        managed_only: String(qo()),
        hook_definitions: JSON.stringify(V),
        hook_source: qo() ? "policySettings" : "merged"
    });
    let H = ID2(X, I, K.length, JSON.stringify(V));
    for (let z of K)yield {
        message: {
            type: "progress",
            data: {
                type: "hook_progress",
                hookEvent: X,
                hookName: I,
                command: c$(z),
                promptText: z.type === "prompt" ? z.prompt : void 0,
                statusMessage: "statusMessage" in z ? z.statusMessage : void 0
            },
            parentToolUseID: Q,
            toolUseID: Q,
            timestamp: new Date().toISOString(),
            uuid: MFA()
        }
    };
    let D = K.map(async function*(z, $) {
        if (z.type === "callback") {
            let R = z.timeout ? z.timeout * 1000 : Z, { signal: j, cleanup: P } = Ab(AbortSignal.timeout(R), G);
            yield QX7({
                toolUseID: Q,
                hook: z,
                hookEvent: X,
                hookInput: A,
                signal: j,
                hookIndex: $
            }).finally(P);
            return;
        }
        if (z.type === "function") {
            if (!J) {
                yield {
                    message: J4({
                        type: "hook_error_during_execution",
                        hookName: I,
                        toolUseID: Q,
                        hookEvent: X,
                        content: "Messages not provided for function hook"
                    }),
                    outcome: "non_blocking_error",
                    hook: z
                };
                return;
            }
            yield AX7({
                hook: z,
                messages: J,
                hookName: I,
                toolUseID: Q,
                hookEvent: X,
                timeoutMs: Z,
                signal: G
            });
            return;
        }
        let O = z.timeout ? z.timeout * 1000 : Z, { signal: N, cleanup: M } = Ab(AbortSignal.timeout(O), G);
        try {
            let R;
            try {
                R = JSON.stringify(A);
            } catch (m) {
                (t(Error(`Failed to stringify hook ${I} input`, {
                    cause: m
                })), yield {
                    message: J4({
                        type: "hook_error_during_execution",
                        hookName: I,
                        toolUseID: Q,
                        hookEvent: X,
                        content: `Failed to prepare hook input: ${m instanceof Error ? m.message : String(m)}`
                    }),
                    outcome: "non_blocking_error",
                    hook: z
                });
                return;
            }
            if (z.type === "prompt") {
                if (!Y) throw Error("ToolUseContext is required for prompt hooks. This is a bug.");
                (yield await rK9(z, I, X, R, N, Y, J, Q), M?.());
                return;
            }
            if (z.type === "agent") {
                if (!Y) throw Error("ToolUseContext is required for agent hooks. This is a bug.");
                if (!J) throw Error("Messages are required for agent hooks. This is a bug.");
                (yield await eK9(z, I, X, R, N, Y, Q, J), M?.());
                return;
            }
            let j = await oD1(z, X, I, R, N, $);
            if ((M?.(), j.aborted)) {
                yield {
                    message: J4({
                        type: "hook_cancelled",
                        hookName: I,
                        toolUseID: Q,
                        hookEvent: X
                    }),
                    outcome: "cancelled",
                    hook: z
                };
                return;
            }
            let { json: P, plainText: f, validationError: y } = GV9(j.stdout);
            if (y) {
                yield {
                    message: J4({
                        type: "hook_non_blocking_error",
                        hookName: I,
                        toolUseID: Q,
                        hookEvent: X,
                        stderr: `JSON validation failed: ${y}`,
                        stdout: j.stdout,
                        exitCode: 1
                    }),
                    outcome: "non_blocking_error",
                    hook: z
                };
                return;
            }
            if (P) {
                if (OFA(P)) {
                    yield {
                        outcome: "success",
                        hook: z
                    };
                    return;
                }
                let m = ZV9({
                    json: P,
                    command: z.type === "command" ? z.command : "prompt",
                    hookName: I,
                    toolUseID: Q,
                    hookEvent: X,
                    expectedHookEvent: X,
                    stdout: j.stdout,
                    stderr: j.stderr,
                    exitCode: j.status
                });
                if (oK9(P) && !P.suppressOutput && f && j.status === 0) {
                    let g = `${V1.bold(I)} completed`;
                    yield {
                        ...m,
                        message: m.message || J4({
                            type: "hook_success",
                            hookName: I,
                            toolUseID: Q,
                            hookEvent: X,
                            content: g,
                            stdout: j.stdout,
                            stderr: j.stderr,
                            exitCode: j.status
                        }),
                        outcome: "success",
                        hook: z
                    };
                    return;
                }
                yield {
                    ...m,
                    outcome: "success",
                    hook: z
                };
                return;
            }
            if (j.status === 0) {
                yield {
                    message: J4({
                        type: "hook_success",
                        hookName: I,
                        toolUseID: Q,
                        hookEvent: X,
                        content: j.stdout.trim(),
                        stdout: j.stdout,
                        stderr: j.stderr,
                        exitCode: j.status
                    }),
                    outcome: "success",
                    hook: z
                };
                return;
            }
            if (j.status === 2) {
                yield {
                    blockingError: {
                        blockingError: `[${z.command}]: ${j.stderr || "No stderr output"}`,
                        command: z.command
                    },
                    outcome: "blocking",
                    hook: z
                };
                return;
            }
            yield {
                message: J4({
                    type: "hook_non_blocking_error",
                    hookName: I,
                    toolUseID: Q,
                    hookEvent: X,
                    stderr: `Failed with non-blocking status code: ${j.stderr.trim() || "No stderr output"}`,
                    stdout: j.stdout,
                    exitCode: j.status
                }),
                outcome: "non_blocking_error",
                hook: z
            };
            return;
        } catch (R) {
            M?.();
            let j = R instanceof Error ? R.message : String(R);
            yield {
                message: J4({
                    type: "hook_non_blocking_error",
                    hookName: I,
                    toolUseID: Q,
                    hookEvent: X,
                    stderr: `Failed to run: ${j}`,
                    stdout: "",
                    exitCode: 1
                }),
                outcome: "non_blocking_error",
                hook: z
            };
            return;
        }
    }), F = {
        success: 0,
        blocking: 0,
        non_blocking_error: 0,
        cancelled: 0
    }, E;
    for await (let z of tVA(D)){
        if ((F[z.outcome]++, z.preventContinuation)) yield {
            preventContinuation: !0,
            stopReason: z.stopReason
        };
        if (z.blockingError) yield {
            blockingError: z.blockingError
        };
        if (z.message) yield {
            message: z.message
        };
        if (z.systemMessage) yield {
            message: J4({
                type: "hook_system_message",
                content: z.systemMessage,
                hookName: I,
                toolUseID: Q,
                hookEvent: X
            })
        };
        if (z.additionalContext) yield {
            additionalContexts: [
                z.additionalContext
            ]
        };
        if (z.updatedMCPToolOutput) yield {
            updatedMCPToolOutput: z.updatedMCPToolOutput
        };
        if (z.permissionBehavior) switch(z.permissionBehavior){
            case "deny":
                E = "deny";
                break;
            case "ask":
                if (E !== "deny") E = "ask";
                break;
            case "allow":
                if (!E) E = "allow";
                break;
            case "passthrough":
                break;
        }
        if (E !== void 0) yield {
            permissionBehavior: E,
            hookPermissionDecisionReason: z.hookPermissionDecisionReason,
            updatedInput: z.updatedInput && z.permissionBehavior === "allow" ? z.updatedInput : void 0
        };
        if (z.permissionRequestResult) yield {
            permissionRequestResult: z.permissionRequestResult
        };
        if (W && z.hook.type !== "callback") {
            let $ = m0(), N = GL2(W, $, X, B ?? "", z.hook);
            if (N?.onHookSuccess && z.outcome === "success") try {
                N.onHookSuccess(z.hook, z);
            } catch (M) {
                t(Error("Session hook success callback failed", {
                    cause: M
                }));
            }
        }
    }
    if ((r("tengu_repl_hook_finished", {
        hookName: I,
        numCommands: K.length,
        numSuccess: F.success,
        numBlocking: F.blocking,
        numNonBlockingError: F.non_blocking_error,
        numCancelled: F.cancelled
    }), XD())) {
        let z = QV9(K);
        JD("hook_execution_complete", {
            hook_event: X,
            hook_name: I,
            num_hooks: String(K.length),
            num_success: String(F.success),
            num_blocking: String(F.blocking),
            num_non_blocking_error: String(F.non_blocking_error),
            num_cancelled: String(F.cancelled),
            managed_only: String(qo()),
            hook_definitions: JSON.stringify(z),
            hook_source: qo() ? "policySettings" : "merged"
        });
    }
    WD2(H, {
        numSuccess: F.success,
        numBlocking: F.blocking,
        numNonBlockingError: F.non_blocking_error,
        numCancelled: F.cancelled
    });
}
async function CR0({ getAppState: A, hookInput: Q, matchQuery: B, signal: G, timeoutMs: Z = VO }) {
    let Y = Q.hook_event_name, J = B ? `${Y}:${B}` : Y;
    if (HQ().disableAllHooks) return (k(`Skipping hooks for ${J} due to 'disableAllHooks' setting`), []);
    if (BV9()) return (k(`Skipping ${J} hook execution - workspace trust not accepted`), []);
    let X = A ? await A() : void 0, I = zR0(X, Y, Q);
    if (I.length === 0) return [];
    if (G?.aborted) return [];
    r("tengu_run_hook", {
        hookName: J,
        numCommands: I.length
    });
    let W;
    try {
        W = JSON.stringify(Q);
    } catch (V) {
        return (t(V instanceof Error ? V : Error(String(V))), []);
    }
    let K = I.map(async (V, H)=>{
        if (V.type === "callback") {
            let z = V.timeout ? V.timeout * 1000 : Z, { signal: $, cleanup: O } = Ab(AbortSignal.timeout(z), G);
            try {
                let N = MFA(), M = await V.callback(Q, N, $, H);
                if ((O?.(), OFA(M))) return (k(`${J} [callback] returned async response, returning empty output`), {
                    command: "callback",
                    succeeded: !0,
                    output: ""
                });
                let R = M.systemMessage || "";
                return (k(`${J} [callback] completed successfully`), {
                    command: "callback",
                    succeeded: !0,
                    output: R
                });
            } catch (N) {
                O?.();
                let M = N instanceof Error ? N.message : String(N);
                return (k(`${J} [callback] failed to run: ${M}`, {
                    level: "error"
                }), {
                    command: "callback",
                    succeeded: !1,
                    output: M
                });
            }
        }
        if (V.type === "prompt") return {
            command: V.prompt,
            succeeded: !1,
            output: "Prompt stop hooks are not yet supported outside REPL"
        };
        if (V.type === "agent") return {
            command: V.prompt([]),
            succeeded: !1,
            output: "Agent stop hooks are not yet supported outside REPL"
        };
        if (V.type === "function") return (t(Error(`Function hook reached executeHooksOutsideREPL for ${Y}. Function hooks should only be used in REPL context (Stop hooks).`)), {
            command: "function",
            succeeded: !1,
            output: "Internal error: function hook executed outside REPL context"
        });
        let D = V.timeout ? V.timeout * 1000 : Z, { signal: F, cleanup: E } = Ab(AbortSignal.timeout(D), G);
        try {
            let z = await oD1(V, Y, J, W, F, H);
            if ((E?.(), z.aborted)) return (k(`${J} [${V.command}] cancelled`), {
                command: V.command,
                succeeded: !1,
                output: "Hook cancelled"
            });
            k(`${J} [${V.command}] completed with status ${z.status}`);
            let { json: $, validationError: O } = GV9(z.stdout);
            if (O) throw Error(O);
            if ($ && !OFA($)) k(`Parsed JSON output from hook: ${JSON.stringify($)}`);
            let N = z.status === 0 ? z.stdout || "" : z.stderr || "";
            return {
                command: V.command,
                succeeded: z.status === 0,
                output: N
            };
        } catch (z) {
            E?.();
            let $ = z instanceof Error ? z.message : String(z);
            return (k(`${J} [${V.command}] failed to run: ${$}`, {
                level: "error"
            }), {
                command: V.command,
                succeeded: !1,
                output: $
            });
        }
    });
    return await Promise.all(K);
}
async function* cH0(A, Q, B, G, Z, Y, J = VO) {
    k(`executePreToolHooks called for tool: ${A}`);
    let X = {
        ...oF(Z),
        hook_event_name: "PreToolUse",
        tool_name: A,
        tool_input: B,
        tool_use_id: Q
    };
    yield* is({
        hookInput: X,
        toolUseID: Q,
        matchQuery: A,
        signal: Y,
        timeoutMs: J,
        toolUseContext: G
    });
}
async function* pH0(A, Q, B, G, Z, Y, J, X = VO) {
    let I = {
        ...oF(Y),
        hook_event_name: "PostToolUse",
        tool_name: A,
        tool_input: B,
        tool_response: G,
        tool_use_id: Q
    };
    yield* is({
        hookInput: I,
        toolUseID: Q,
        matchQuery: A,
        signal: J,
        timeoutMs: X,
        toolUseContext: Z
    });
}
async function* lH0(A, Q, B, G, Z, Y, J, X, I = VO) {
    let W = {
        ...oF(J),
        hook_event_name: "PostToolUseFailure",
        tool_name: A,
        tool_input: B,
        tool_use_id: Q,
        error: G,
        is_interrupt: Y
    };
    yield* is({
        hookInput: W,
        toolUseID: Q,
        matchQuery: A,
        signal: X,
        timeoutMs: I,
        toolUseContext: Z
    });
}
async function QK0(A, Q = VO) {
    let { message: B, title: G, notificationType: Z } = A, Y = {
        ...oF(void 0),
        hook_event_name: "Notification",
        message: B,
        title: G,
        notification_type: Z
    };
    await CR0({
        hookInput: Y,
        timeoutMs: Q,
        matchQuery: Z
    });
}
async function* iH0(A, Q, B = VO, G = !1, Z, Y, J) {
    let X = Z ? {
        ...oF(A),
        hook_event_name: "SubagentStop",
        stop_hook_active: G,
        agent_id: Z,
        agent_transcript_path: kIA(Z)
    } : {
        ...oF(A),
        hook_event_name: "Stop",
        stop_hook_active: G
    };
    yield* is({
        hookInput: X,
        toolUseID: MFA(),
        signal: Q,
        timeoutMs: B,
        toolUseContext: Y,
        messages: J
    });
}
async function* Oq0(A, Q, B) {
    let G = {
        ...oF(Q),
        hook_event_name: "UserPromptSubmit",
        prompt: A
    };
    yield* is({
        hookInput: G,
        toolUseID: MFA(),
        signal: B.abortController.signal,
        timeoutMs: VO,
        toolUseContext: B
    });
}
async function* JZ0(A, Q, B, G = VO) {
    let Z = {
        ...oF(void 0, Q),
        hook_event_name: "SessionStart",
        source: A
    };
    yield* is({
        hookInput: Z,
        toolUseID: MFA(),
        matchQuery: A,
        signal: B,
        timeoutMs: G
    });
}
async function* NN0(A, Q, B, G = VO) {
    let Z = {
        ...oF(void 0),
        hook_event_name: "SubagentStart",
        agent_id: A,
        agent_type: Q
    };
    yield* is({
        hookInput: Z,
        toolUseID: MFA(),
        matchQuery: Q,
        signal: B,
        timeoutMs: G
    });
}
async function jK0(A, Q, B = VO) {
    let G = {
        ...oF(void 0),
        hook_event_name: "PreCompact",
        trigger: A.trigger,
        custom_instructions: A.customInstructions
    }, Z = await CR0({
        hookInput: G,
        matchQuery: A.trigger,
        signal: Q,
        timeoutMs: B
    });
    if (Z.length === 0) return {};
    let Y = Z.filter((X)=>X.succeeded && X.output.trim().length > 0).map((X)=>X.output.trim()), J = [];
    for (let X of Z)if (X.succeeded) if (X.output.trim()) J.push(`PreCompact [${X.command}] completed successfully: ${X.output.trim()}`);
    else J.push(`PreCompact [${X.command}] completed successfully`);
    else if (X.output.trim()) J.push(`PreCompact [${X.command}] failed: ${X.output.trim()}`);
    else J.push(`PreCompact [${X.command}] failed`);
    return {
        newCustomInstructions: Y.length > 0 ? Y.join(`

`) : void 0,
        userDisplayMessage: J.length > 0 ? J.join(`
`) : void 0
    };
}
async function XL0(A, Q) {
    let { getAppState: B, setAppState: G, signal: Z, timeoutMs: Y = VO } = Q || {}, J = {
        ...oF(void 0),
        hook_event_name: "SessionEnd",
        reason: A
    }, X = await CR0({
        getAppState: B,
        hookInput: J,
        matchQuery: A,
        signal: Z,
        timeoutMs: Y
    });
    for (let I of X)if (!I.succeeded && I.output) process.stderr.write(`SessionEnd hook [${I.command}] failed: ${I.output}
`);
    if (G) {
        let I = m0();
        XxA(G, I);
    }
}
async function* Fq0(A, Q, B, G, Z, Y, J, X = VO) {
    k(`executePermissionRequestHooks called for tool: ${A}`);
    let I = {
        ...oF(Z),
        hook_event_name: "PermissionRequest",
        tool_name: A,
        tool_input: B,
        permission_suggestions: Y
    };
    yield* is({
        hookInput: I,
        toolUseID: Q,
        matchQuery: A,
        signal: J,
        timeoutMs: X,
        toolUseContext: G
    });
}
async function oU0(A, Q, B = 5000) {
    let G = HQ(), Z = G?.statusLine;
    if (G?.disableAllHooks === !0) return;
    if (!Z || Z.type !== "command") return;
    let Y = Q || AbortSignal.timeout(B);
    try {
        let J = JSON.stringify(A), X = await oD1(Z, "StatusLine", "statusLine", J, Y);
        if (X.aborted) return;
        if (X.status === 0) {
            let I = X.stdout.trim().split(`
`).flatMap((W)=>W.trim() || []).join(`
`);
            if (I) return I;
        }
        return;
    } catch (J) {
        k(`Status hook failed: ${J}`, {
            level: "error"
        });
        return;
    }
}
async function TU0(A, Q, B = 5000) {
    let G = HQ();
    if (G?.disableAllHooks === !0) return [];
    let Z = G?.fileSuggestion;
    if (!Z || Z.type !== "command") return [];
    let Y = Q || AbortSignal.timeout(B);
    try {
        let J = JSON.stringify(A), X = {
            type: "command",
            command: Z.command
        }, I = await oD1(X, "FileSuggestion", "FileSuggestion", J, Y);
        if (I.aborted || I.status !== 0) return [];
        return I.stdout.split(`
`).map((W)=>W.trim()).filter(Boolean);
    } catch (J) {
        return (k(`File suggestion helper failed: ${J}`, {
            level: "error"
        }), []);
    }
}
async function AX7({ hook: A, messages: Q, hookName: B, toolUseID: G, hookEvent: Z, timeoutMs: Y, signal: J }) {
    let X = A.timeout ?? Y, { signal: I, cleanup: W } = Ab(AbortSignal.timeout(X), J);
    try {
        if (I.aborted) return (W(), {
            outcome: "cancelled",
            hook: A
        });
        let K = await new Promise((V, H)=>{
            let D = ()=>H(Error("Function hook cancelled"));
            (I.addEventListener("abort", D), Promise.resolve(A.callback(Q, I)).then((F)=>{
                (I.removeEventListener("abort", D), V(F));
            }).catch((F)=>{
                (I.removeEventListener("abort", D), H(F));
            }));
        });
        if ((W(), K)) return {
            outcome: "success",
            hook: A
        };
        return {
            blockingError: {
                blockingError: A.errorMessage,
                command: "function"
            },
            outcome: "blocking",
            hook: A
        };
    } catch (K) {
        if ((W(), K instanceof Error && (K.message === "Function hook cancelled" || K.name === "AbortError"))) return {
            outcome: "cancelled",
            hook: A
        };
        return (t(K instanceof Error ? K : Error(String(K))), {
            message: J4({
                type: "hook_error_during_execution",
                hookName: B,
                toolUseID: G,
                hookEvent: Z,
                content: K instanceof Error ? K.message : "Function hook execution error"
            }),
            outcome: "non_blocking_error",
            hook: A
        });
    }
}
async function QX7({ toolUseID: A, hook: Q, hookEvent: B, hookInput: G, signal: Z, hookIndex: Y }) {
    let J = await Q.callback(G, A, Z, Y);
    if (OFA(J)) return {
        outcome: "success",
        hook: Q
    };
    return {
        ...ZV9({
            json: J,
            command: "callback",
            hookName: `${B}:Callback`,
            toolUseID: A,
            hookEvent: B,
            expectedHookEvent: B,
            stdout: void 0,
            stderr: void 0,
            exitCode: void 0
        }),
        outcome: "success",
        hook: Q
    };
}
function QV9(A) {
    return A.map((Q)=>{
        if (Q.type === "command") return {
            type: "command",
            command: Q.command
        };
        else if (Q.type === "prompt") return {
            type: "prompt",
            prompt: Q.prompt
        };
        else if (Q.type === "function") return {
            type: "function",
            name: "function"
        };
        else if (Q.type === "callback") return {
            type: "callback",
            name: "callback"
        };
        return {
            type: "unknown"
        };
    });
}
var VO = 60000;
