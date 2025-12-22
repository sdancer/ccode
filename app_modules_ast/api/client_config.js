// Module: eA9
// Type: L
// Lines: 468808-469496
//
var createRenderState = L(()=>{
    v2();
    mX();
    g1();
    ((DfA = l(React runtime(), 1)), (OQ7 = u.object({
        method: u.literal("selection_changed"),
        params: u.object({
            selection: u.object({
                start: u.object({
                    line: u.number(),
                    character: u.number()
                }),
                end: u.object({
                    line: u.number(),
                    character: u.number()
                })
            }).nullable().optional(),
            text: u.string().optional(),
            filePath: u.string().optional()
        })
    })));
});
import { randomUUID as Us } from "node:crypto";
async function* RQ7(A, Q, B, G) {
    let Z = !it(), { permissionResult: Y, assistantMessage: J } = A, { toolUseID: X } = Y;
    if (!X) return;
    let I = J.message.content, W;
    if (Array.isArray(I)) {
        for (let z of I)if (z.type === "tool_use" && z.id === X) {
            W = z;
            break;
        }
    }
    if (!W) return;
    let { name: K, input: V } = W;
    if (!Q.find((z)=>z.name === K)) return;
    let D = {
        ...W,
        input: Y.behavior === "allow" ? Y.updatedInput : V
    }, F = async ()=>({
            ...Y,
            decisionReason: {
                type: "mode",
                mode: "default"
            }
        });
    if ((B.push(J), Z)) await EBA(B);
    yield {
        ...J,
        session_id: m0(),
        parent_tool_use_id: null
    };
    for await (let z of hH0([
        D
    ], [
        J
    ], F, G))if (z.message) {
        if ((B.push(z.message), Z)) await EBA(B);
        yield {
            ...z.message,
            session_id: m0(),
            parent_tool_use_id: null
        };
    }
}
function _Q7(A) {
    if (!A) return !1;
    if (A.type === "assistant") {
        let Q = wC(A.message.content);
        return (Q?.type === "text" || Q?.type === "thinking" || Q?.type === "redacted_thinking");
    }
    if (A.type === "user") {
        let Q = A.message.content;
        if (!Array.isArray(Q) || Q.length === 0) return !1;
        return Q.every((B)=>"type" in B && B.type === "tool_result");
    }
    return !1;
}
async function* A19({ commands: A, prompt: Q, promptUuid: B, cwd: G, tools: Z, mcpClients: Y, verbose: J = !1, maxThinkingTokens: X, maxTurns: I, maxBudgetUsd: W, canUseTool: K, mutableMessages: V = [], customSystemPrompt: H, appendSystemPrompt: D, userSpecifiedModel: F, fallbackModel: E, sdkBetas: z, jsonSchema: $, getAppState: O, setAppState: N, abortController: M, replayUserMessages: R = !1, includePartialMessages: j = !1, agents: P = [], setSDKStatus: f, orphanedPermission: y }) {
    rL(G);
    let m = !it(), g = Date.now(), s = [], p = async (b1, F0, A1, K1, y1, Z0)=>{
        let _0 = await K(b1, F0, A1, K1, y1, Z0);
        if (_0.behavior !== "allow") {
            let O0 = {
                tool_name: b1.name,
                tool_use_id: y1,
                tool_input: F0
            };
            s.push(O0);
        }
        return _0;
    }, v = await O(), d = F ? JW(F) : j5(), [AA, YA, jA] = await Promise.all([
        sm(Z, d, Array.from(v.toolPermissionContext.additionalWorkingDirectories.keys()), Y, v.toolPermissionContext),
        bV(),
        typeof H === "string" ? Promise.resolve({}) : KD()
    ]), yA = [
        ...(typeof H === "string" ? [
            H
        ] : AA),
        ...(D ? [
            D
        ] : [])
    ], KA = Z.some((b1)=>b1.name === Mz);
    if ($ && KA) BvA(N, m0());
    let OA = {
        messages: V,
        setMessages: ()=>{},
        onChangeAPIKey: ()=>{},
        options: {
            commands: A,
            debug: !1,
            tools: Z,
            verbose: J,
            mainLoopModel: d,
            maxThinkingTokens: X ?? 0,
            mcpClients: Y,
            mcpResources: {},
            ideInstallationStatus: null,
            isNonInteractiveSession: !0,
            customSystemPrompt: H,
            appendSystemPrompt: D,
            agentDefinitions: {
                activeAgents: P,
                allAgents: []
            },
            theme: v1().theme,
            maxBudgetUsd: W,
            sdkBetas: z
        },
        getAppState: O,
        setAppState: N,
        abortController: M ?? Q4(),
        readFileState: hV1(V, G),
        setInProgressToolUseIDs: ()=>{},
        setResponseLength: ()=>{},
        updateFileHistoryState: (b1)=>{
            N((F0)=>({
                    ...F0,
                    fileHistory: b1(F0.fileHistory)
                }));
        },
        setSDKStatus: f
    };
    if (y) for await (let b1 of RQ7(y, Z, V, OA))yield b1;
    let { messages: _A, shouldQuery: e, allowedTools: VA, maxThinkingTokens: WA, model: xA } = await mf({
        input: Q,
        mode: "prompt",
        setIsLoading: ()=>{},
        setToolJSX: ()=>{},
        context: {
            ...OA,
            messages: V
        },
        messages: V,
        uuid: B,
        querySource: "sdk"
    });
    V.push(..._A);
    let MA = X ?? WA ?? 0, nA = [
        ...V
    ], ZA = _A.filter((b1)=>(b1.type === "user" && !b1.isMeta && !b1.toolUseResult) || (b1.type === "system" && b1.subtype === "compact_boundary")), zA = R ? ZA : [];
    N((b1)=>({
            ...b1,
            toolPermissionContext: {
                ...b1.toolPermissionContext,
                alwaysAllowRules: {
                    ...b1.toolPermissionContext.alwaysAllowRules,
                    command: VA
                }
            }
        }));
    let LA = xA ?? d, UA = hV1(nA, G), $A = K51(UA, OA.readFileState);
    OA = {
        messages: nA,
        setMessages: ()=>{},
        onChangeAPIKey: ()=>{},
        options: {
            commands: A,
            debug: !1,
            tools: Z,
            verbose: J,
            mainLoopModel: LA,
            maxThinkingTokens: MA,
            mcpClients: Y,
            mcpResources: {},
            ideInstallationStatus: null,
            isNonInteractiveSession: !0,
            customSystemPrompt: H,
            appendSystemPrompt: D,
            theme: v1().theme,
            agentDefinitions: {
                activeAgents: P,
                allAgents: []
            },
            maxBudgetUsd: W,
            sdkBetas: z
        },
        getAppState: O,
        setAppState: N,
        abortController: M || Q4(),
        readFileState: $A,
        setInProgressToolUseIDs: ()=>{},
        setResponseLength: ()=>{},
        updateFileHistoryState: OA.updateFileHistoryState,
        setSDKStatus: f
    };
    let mA = HQ()?.outputStyle ?? UD, [hA, { enabled: Y1 }] = await Promise.all([
        SY1(i1()),
        m7()
    ]);
    if ((yield {
        type: "system",
        subtype: "init",
        cwd: G,
        session_id: m0(),
        tools: Z.map((b1)=>b1.name),
        mcp_servers: Y.map((b1)=>({
                name: b1.name,
                status: b1.type
            })),
        model: LA,
        permissionMode: v.toolPermissionContext.mode,
        slash_commands: A.map((b1)=>b1.name),
        apiKeySource: dE().source,
        betas: z,
        claude_code_version: {
            ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
            PACKAGE_URL: "@anthropic-ai/claude-code",
            README_URL: "https://code.claude.com/docs/en/overview",
            VERSION: "2.0.72",
            FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
            BUILD_TIME: "2025-12-17T21:20:34Z"
        }.VERSION,
        output_style: mA,
        agents: P.map((b1)=>b1.agentType),
        skills: hA.map((b1)=>b1.name),
        plugins: Y1.map((b1)=>({
                name: b1.name,
                path: b1.path
            })),
        uuid: Us()
    }, W9A("system_message_yielded"), !e)) {
        for (let b1 of ZA){
            if (b1.type === "user" && typeof b1.message.content === "string" && (b1.message.content.includes("<local-command-stdout>") || b1.message.content.includes("<local-command-stderr>") || b1.isCompactSummary)) (nA.push(b1), yield {
                type: "user",
                message: {
                    ...b1.message,
                    content: yX(b1.message.content)
                },
                session_id: m0(),
                parent_tool_use_id: null,
                uuid: b1.uuid,
                isReplay: !b1.isCompactSummary
            });
            if (b1.type === "system" && b1.subtype === "compact_boundary") (nA.push(b1), yield {
                type: "system",
                subtype: "compact_boundary",
                session_id: m0(),
                uuid: b1.uuid,
                compact_metadata: {
                    trigger: b1.compactMetadata.trigger,
                    pre_tokens: b1.compactMetadata.preTokens
                }
            });
        }
        if (m) await EBA(nA);
        yield {
            type: "result",
            subtype: "success",
            is_error: !1,
            duration_ms: Date.now() - g,
            duration_api_ms: fO(),
            num_turns: nA.length - 1,
            result: "",
            session_id: m0(),
            total_cost_usd: uD(),
            usage: D_,
            modelUsage: {},
            permission_denials: s,
            uuid: Us()
        };
        return;
    }
    if (QZ() && m) _A.filter(_r).forEach((b1)=>{
        bWA((F0)=>{
            N((A1)=>({
                    ...A1,
                    fileHistory: F0(A1.fileHistory)
                }));
        }, b1.uuid);
    });
    let C1 = D_, PA = D_, Q1 = 1, o1 = !1, S1, B0 = $ ? Tq0(V, Mz) : 0;
    for await (let b1 of rw({
        messages: nA,
        systemPrompt: yA,
        userContext: YA,
        systemContext: jA,
        canUseTool: p,
        toolUseContext: OA,
        fallbackModel: E,
        querySource: "sdk"
    })){
        if (b1.type === "assistant" || b1.type === "user" || (b1.type === "system" && b1.subtype === "compact_boundary")) {
            if ((nA.push(b1), m)) await EBA(nA);
            if (!o1 && zA.length > 0) {
                o1 = !0;
                for (let F0 of zA)if (F0.type === "user") yield {
                    type: "user",
                    message: F0.message,
                    session_id: m0(),
                    parent_tool_use_id: null,
                    uuid: F0.uuid,
                    isReplay: !0
                };
            }
        }
        if (b1.type === "user") Q1++;
        switch(b1.type){
            case "tombstone":
                break;
            case "assistant":
            case "progress":
            case "user":
                (V.push(b1), yield* PQ7(b1));
                break;
            case "stream_event":
                if (b1.event.type === "message_start") ((PA = D_), (PA = EfA(PA, b1.event.message.usage)));
                if (b1.event.type === "message_delta") PA = EfA(PA, b1.event.usage);
                if (b1.event.type === "message_stop") C1 = mY1(C1, PA);
                if (j) yield {
                    type: "stream_event",
                    event: b1.event,
                    session_id: m0(),
                    parent_tool_use_id: null,
                    uuid: Us()
                };
                break;
            case "attachment":
                if ((V.push(b1), HC2(b1.attachment))) yield {
                    type: "system",
                    subtype: "hook_response",
                    session_id: m0(),
                    uuid: b1.uuid,
                    hook_name: b1.attachment.hookName,
                    hook_event: b1.attachment.hookEvent,
                    stdout: b1.attachment.stdout,
                    stderr: b1.attachment.stderr,
                    exit_code: b1.attachment.exitCode
                };
                else if (mZ1(b1.attachment)) yield {
                    type: "system",
                    subtype: "hook_response",
                    session_id: m0(),
                    uuid: b1.uuid,
                    hook_name: b1.attachment.hookName,
                    hook_event: b1.attachment.hookEvent,
                    stdout: b1.attachment.stdout || "",
                    stderr: b1.attachment.stderr || "",
                    exit_code: b1.attachment.exitCode
                };
                else if (R && uZ1(b1)) {
                    let F0 = b1.attachment;
                    if (F0.type === "queued_command") yield {
                        type: "user",
                        message: {
                            role: "user",
                            content: typeof F0.prompt === "string" ? F0.prompt : F0.prompt
                        },
                        session_id: m0(),
                        parent_tool_use_id: null,
                        uuid: F0.source_uuid || b1.uuid,
                        isReplay: !0
                    };
                } else if (b1.attachment.type === "structured_output") S1 = b1.attachment.data;
                break;
            case "stream_request_start":
                break;
            case "system":
                if ((V.push(b1), b1.subtype === "compact_boundary" && b1.compactMetadata)) yield {
                    type: "system",
                    subtype: "compact_boundary",
                    session_id: m0(),
                    uuid: b1.uuid,
                    compact_metadata: {
                        trigger: b1.compactMetadata.trigger,
                        pre_tokens: b1.compactMetadata.preTokens
                    }
                };
                break;
        }
        if (b1.type === "user" && I && Q1 >= I) {
            yield {
                type: "result",
                subtype: "error_max_turns",
                duration_ms: Date.now() - g,
                duration_api_ms: fO(),
                is_error: !1,
                num_turns: Q1,
                session_id: m0(),
                total_cost_usd: uD(),
                usage: C1,
                modelUsage: pb(),
                permission_denials: s,
                uuid: Us(),
                errors: []
            };
            return;
        }
        if (W !== void 0 && uD() >= W) {
            yield {
                type: "result",
                subtype: "error_max_budget_usd",
                duration_ms: Date.now() - g,
                duration_api_ms: fO(),
                is_error: !1,
                num_turns: Q1,
                session_id: m0(),
                total_cost_usd: uD(),
                usage: C1,
                modelUsage: pb(),
                permission_denials: s,
                uuid: Us(),
                errors: []
            };
            return;
        }
        if (b1.type === "user" && $) {
            let A1 = Tq0(V, Mz) - B0, K1 = parseInt(process.env.MAX_STRUCTURED_OUTPUT_RETRIES || "5", 10);
            if (A1 >= K1) {
                yield {
                    type: "result",
                    subtype: "error_max_structured_output_retries",
                    duration_ms: Date.now() - g,
                    duration_api_ms: fO(),
                    is_error: !1,
                    num_turns: Q1,
                    session_id: m0(),
                    total_cost_usd: uD(),
                    usage: C1,
                    modelUsage: pb(),
                    permission_denials: s,
                    uuid: Us(),
                    errors: [
                        `Failed to provide valid structured output after ${K1} attempts`
                    ]
                };
                return;
            }
        }
    }
    let YQ = wC(nA);
    if (!_Q7(YQ)) {
        yield {
            type: "result",
            subtype: "error_during_execution",
            duration_ms: Date.now() - g,
            duration_api_ms: fO(),
            is_error: !1,
            num_turns: Q1,
            session_id: m0(),
            total_cost_usd: uD(),
            usage: C1,
            modelUsage: pb(),
            permission_denials: s,
            uuid: Us(),
            errors: S8A().map((b1)=>b1.error)
        };
        return;
    }
    let GQ = "", KQ = !1;
    if (YQ.type === "assistant") {
        let b1 = wC(YQ.message.content);
        if (b1?.type === "text") GQ = b1.text;
        KQ = Boolean(YQ.isApiErrorMessage);
    }
    yield {
        type: "result",
        subtype: "success",
        is_error: KQ,
        duration_ms: Date.now() - g,
        duration_api_ms: fO(),
        num_turns: Q1,
        result: GQ,
        session_id: m0(),
        total_cost_usd: uD(),
        usage: C1,
        modelUsage: pb(),
        permission_denials: s,
        structured_output: S1,
        uuid: Us()
    };
}
function* PQ7(A) {
    switch(A.type){
        case "assistant":
            for (let Q of DX([
                A
            ]))yield {
                type: "assistant",
                message: Q.message,
                parent_tool_use_id: null,
                session_id: m0(),
                uuid: Q.uuid,
                error: Q.error
            };
            return;
        case "progress":
            if (A.data.type === "agent_progress") for (let Q of DX([
                A.data.message
            ]))switch(Q.type){
                case "assistant":
                    yield {
                        type: "assistant",
                        message: Q.message,
                        parent_tool_use_id: A.parentToolUseID,
                        session_id: m0(),
                        uuid: Q.uuid,
                        error: Q.error
                    };
                    break;
                case "user":
                    yield {
                        type: "user",
                        message: Q.message,
                        parent_tool_use_id: A.parentToolUseID,
                        session_id: m0(),
                        uuid: Q.uuid,
                        isSynthetic: Q.isMeta || Q.isVisibleInTranscriptOnly,
                        tool_use_result: Q.toolUseResult
                    };
                    break;
            }
            else if (A.data.type === "bash_progress") {
                if (!process.env.CLAUDE_CODE_REMOTE && !process.env.CLAUDE_CODE_CONTAINER_ID) break;
                let Q = A.parentToolUseID, B = Date.now(), G = FfA.get(Q) || 0;
                if (B - G >= TQ7) {
                    if (FfA.size >= jQ7) {
                        let Y = FfA.keys().next().value;
                        if (Y !== void 0) FfA.delete(Y);
                    }
                    (FfA.set(Q, B), yield {
                        type: "tool_progress",
                        tool_use_id: A.toolUseID,
                        tool_name: "Bash",
                        parent_tool_use_id: A.parentToolUseID,
                        elapsed_time_seconds: A.data.elapsedTimeSeconds,
                        session_id: m0(),
                        uuid: A.uuid
                    });
                }
            }
            break;
        case "user":
            for (let Q of DX([
                A
            ]))yield {
                type: "user",
                message: Q.message,
                parent_tool_use_id: null,
                session_id: m0(),
                uuid: Q.uuid,
                isSynthetic: Q.isMeta || Q.isVisibleInTranscriptOnly,
                tool_use_result: Q.toolUseResult
            };
            return;
        default:
    }
}
function hV1(A, Q, B = MQ7) {
    let G = $m(B), Z = new Map(), Y = new Map();
    for (let J of A)if (J.type === "assistant" && Array.isArray(J.message.content)) {
        for (let X of J.message.content)if (X.type === "tool_use" && X.name === y8) {
            let I = X.input;
            if (I?.file_path && I?.offset === void 0 && I?.limit === void 0) {
                let W = R4(I.file_path, Q);
                Z.set(X.id, W);
            }
        } else if (X.type === "tool_use" && X.name === zI) {
            let I = X.input;
            if (I?.file_path && I?.content) {
                let W = R4(I.file_path, Q);
                Y.set(X.id, {
                    filePath: W,
                    content: I.content
                });
            }
        }
    }
    for (let J of A)if (J.type === "user" && Array.isArray(J.message.content)) {
        for (let X of J.message.content)if (X.type === "tool_result" && X.tool_use_id) {
            let I = Z.get(X.tool_use_id);
            if (I && typeof X.content === "string") {
                let H = X.content.replace(/<system-reminder>[\s\S]*?<\/system-reminder>/g, "").split(`
`).map((D)=>{
                    let F = D.match(/^\s*\d+→(.*)$/);
                    return F ? F[1] : D;
                }).join(`
`).trim();
                if (J.timestamp) {
                    let D = new Date(J.timestamp).getTime();
                    G.set(I, {
                        content: H,
                        timestamp: D,
                        offset: void 0,
                        limit: void 0
                    });
                }
            }
            let W = Y.get(X.tool_use_id);
            if (W && J.timestamp) {
                let K = new Date(J.timestamp).getTime();
                G.set(W.filePath, {
                    content: W.content,
                    timestamp: K,
                    offset: void 0,
                    limit: void 0
                });
            }
        }
    }
    return G;
}
var MQ7 = 10, jQ7 = 100, TQ7 = 30000, FfA;
