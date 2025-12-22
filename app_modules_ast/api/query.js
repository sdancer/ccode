// Module: qr
// Type: L
// Lines: 517795-518642
//
var createRenderState = L(()=>{
    I5();
    VW();
    aB();
    gl1();
    OT();
    pushStartInstance();
    trackUsedThenable();
    K6();
    xGA();
    B$();
    sH();
    NZ();
    ff();
    LT();
    oVA();
    z4();
    read_string_buffer();
    b8();
    i0();
    IJ7 = {
        low: 45,
        medium: 75,
        high: 99
    };
});
import { randomUUID as TK9 } from "crypto";
function LB1(A) {
    let Q = {}, B = process.env.CLAUDE_CODE_EXTRA_BODY, G = {};
    if (B) try {
        let Y = _5(B);
        if (Y && typeof Y === "object" && !Array.isArray(Y)) G = Y;
        else k(`CLAUDE_CODE_EXTRA_BODY env var must be a JSON object, but was given ${B}`, {
            level: "error"
        });
    } catch (Y) {
        k(`Error parsing CLAUDE_CODE_EXTRA_BODY: ${Y instanceof Error ? Y.message : String(Y)}`, {
            level: "error"
        });
    }
    let Z = {
        ...Q,
        ...G
    };
    if (A && A.length > 0) if (Z.anthropic_beta && Array.isArray(Z.anthropic_beta)) {
        let Y = Z.anthropic_beta, J = A.filter((X)=>!Y.includes(X));
        Z.anthropic_beta = [
            ...Y,
            ...J
        ];
    } else Z.anthropic_beta = A;
    return Z;
}
function cD1(A) {
    if (V0(process.env.DISABLE_PROMPT_CACHING)) return !1;
    if (V0(process.env.DISABLE_PROMPT_CACHING_HAIKU)) {
        let Q = TH();
        if (A === Q) return !1;
    }
    if (V0(process.env.DISABLE_PROMPT_CACHING_SONNET)) {
        let Q = fM();
        if (A === Q) return !1;
    }
    if (V0(process.env.DISABLE_PROMPT_CACHING_OPUS)) {
        let Q = F1A();
        if (A === Q) return !1;
    }
    return !0;
}
function SbA() {
    return aZ("prompt_cache_1h_experiment", "use_1h_cache", !1) ? {
        type: "ephemeral",
        ttl: "1h"
    } : {
        type: "ephemeral"
    };
}
function CJ7(A, Q, B) {
    return;
}
function rn() {
    let A = Zg(), Q = W3()?.accountUuid ?? "", B = m0();
    return {
        user_id: `user_${A}_account_${Q}_session_${B}`
    };
}
async function VA9(A, Q) {
    if (Q) return !0;
    try {
        let B = TH(), G = GN(B);
        return await LN2(J51(()=>eN({
                apiKey: A,
                maxRetries: 3,
                model: B
            }), async (Z)=>{
            let Y = [
                {
                    role: "user",
                    content: "test"
                }
            ];
            return (await Z.beta.messages.create({
                model: B,
                max_tokens: 1,
                messages: Y,
                temperature: 1,
                ...(G.length > 0 ? {
                    betas: G
                } : {}),
                metadata: rn(),
                ...LB1()
            }), !0);
        }, {
            maxRetries: 2,
            model: B
        }));
    } catch (B) {
        let G = B;
        if (B instanceof Eo) G = B.originalError;
        if ((t(G), G instanceof Error && G.message.includes('{"type":"error","error":{"type":"authentication_error","message":"invalid x-api-key"}}'))) return !1;
        throw G;
    }
}
function $J7(A, Q = !1, B) {
    if (Q) if (typeof A.message.content === "string") return {
        role: "user",
        content: [
            {
                type: "text",
                text: A.message.content,
                ...(B ? {
                    cache_control: SbA()
                } : {})
            }
        ]
    };
    else return {
        role: "user",
        content: A.message.content.map((G, Z)=>({
                ...G,
                ...(Z === A.message.content.length - 1 ? B ? {
                    cache_control: SbA()
                } : {} : {})
            }))
    };
    return {
        role: "user",
        content: A.message.content
    };
}
function UJ7(A, Q = !1, B) {
    if (Q) if (typeof A.message.content === "string") return {
        role: "assistant",
        content: [
            {
                type: "text",
                text: A.message.content,
                ...(B ? {
                    cache_control: SbA()
                } : {})
            }
        ]
    };
    else return {
        role: "assistant",
        content: A.message.content.map((G, Z)=>({
                ...G,
                ...(Z === A.message.content.length - 1 && G.type !== "thinking" && G.type !== "redacted_thinking" ? B ? {
                    cache_control: SbA()
                } : {} : {})
            }))
    };
    return {
        role: "assistant",
        content: A.message.content
    };
}
async function tm({ messages: A, systemPrompt: Q, maxThinkingTokens: B, tools: G, signal: Z, options: Y }) {
    let J;
    for await (let X of kA0(A, async function*() {
        yield* PK9(A, Q, B, G, Z, Y);
    }))if (X.type === "assistant") J = X;
    if (!J) throw Error("No assistant message found");
    return J;
}
async function* fVA({ messages: A, systemPrompt: Q, maxThinkingTokens: B, tools: G, signal: Z, options: Y }) {
    return yield* kA0(A, async function*() {
        yield* PK9(A, Q, B, G, Z, Y);
    });
}
async function* PK9(A, Q, B, G, Z, Y) {
    if (!VB() && (await Yf("tengu-off-switch", {
        activated: !1
    })).activated && KZA(Y.model)) {
        (r("tengu_off_switch_query", {}), yield yG0(Error(I2A), Y.model));
        return;
    }
    let J = l4() === "bedrock" && Y.model.includes("application-inference-profile") ? ((await MaA(Y.model)) ?? Y.model) : Y.model;
    xG("query_tool_schema_build_start");
    let X = O4Q(Y.model, Y.sdkBetas), I = fv(), W = I ? L4Q() : null;
    if (W && l4() !== "bedrock") {
        if (!X.includes(W)) X.push(W);
    }
    let K = await Promise.all(G.map((yA)=>vY1(yA, {
            getToolPermissionContext: Y.getToolPermissionContext,
            tools: G,
            agents: Y.agents,
            model: Y.model,
            betas: X,
            deferLoading: I && yA.isMcp === !0
        })));
    if (I) {
        let yA = G.filter((KA)=>KA.isMcp).length;
        k(`Tool search enabled: ${yA} MCP tools will be deferred`);
    }
    (xG("query_tool_schema_build_end"), r("tengu_api_before_normalize", {
        preNormalizedMessageCount: A.length
    }), xG("query_message_normalization_start"));
    let V = EJ(A, G);
    (xG("query_message_normalization_end"), r("tengu_api_after_normalize", {
        postNormalizedMessageCount: V.length
    }));
    let H = zYB(V);
    ((Q = [
        EYB(H),
        TeA({
            isNonInteractive: Y.isNonInteractiveSession,
            hasAppendSystemPrompt: Y.hasAppendSystemPrompt
        }),
        ...Q,
        _K9(Y.mcpTools)
    ].filter(Boolean)), EN2(Q));
    let D = Y.enablePromptCaching ?? cD1(Y.model), F = qJ7(Q, D), E = X.length > 0, z = [
        ...K,
        ...(Y.extraToolSchemas ?? [])
    ], $ = XD() ? {
        systemPrompt: Q.join(`

`),
        querySource: Y.querySource,
        tools: JSON.stringify(z)
    } : void 0, O = GD2(Y.model, $, V);
    Y.getToolPermissionContext().then((yA)=>{
        vN2({
            model: Y.model,
            messagesLength: JSON.stringify([
                ...F,
                ...V,
                ...K,
                ...(Y.extraToolSchemas ?? [])
            ]).length,
            temperature: Y.temperatureOverride ?? 1,
            betas: E ? X : [],
            permissionMode: yA.mode,
            querySource: Y.querySource,
            queryTracking: Y.queryTracking
        });
    });
    let N = Date.now(), M = Date.now(), R = 0, j = void 0, P = (yA)=>{
        let KA = yA.maxTokensOverride ? Math.min(B, yA.maxTokensOverride - 1) : B, OA = l4() === "bedrock" ? [
            ...aN1(yA.model),
            ...(W ? [
                W
            ] : [])
        ] : [], _A = LB1(OA);
        CJ7(Y.taskIntensityOverride, _A, X);
        let e = B > 0 ? {
            budget_tokens: KA,
            type: "enabled"
        } : void 0, VA = B > 0, WA = KYB({
            hasThinking: VA
        }), xA = yA?.maxTokensOverride || Y.maxOutputTokensOverride || Math.max(B + 1, fK0(Y.model)), MA = Y.enablePromptCaching ?? cD1(yA.model);
        return {
            model: Bg(Y.model),
            messages: wJ7(V, MA),
            system: F,
            tools: [
                ...K,
                ...(Y.extraToolSchemas ?? [])
            ],
            tool_choice: Y.toolChoice,
            ...(E ? {
                betas: X
            } : {}),
            metadata: rn(),
            max_tokens: xA,
            thinking: e,
            ...(WA && E && X.includes(kdA) ? {
                context_management: WA
            } : {}),
            ..._A
        };
    }, f = [], y = 0, m = void 0, g = [], s = D_, p = 0, v = null, d = !1, AA = 0, YA = void 0, jA = void 0;
    try {
        xG("query_client_creation_start");
        let yA = J51(()=>eN({
                maxRetries: 0,
                model: Y.model,
                fetchOverride: Y.fetchOverride
            }), async (OA, _A, e)=>{
            ((R = _A), (M = Date.now()));
            let VA = P(e);
            return (Qz1(VA, Y.querySource), (AA = VA.max_tokens), OA.beta.messages.stream(VA, {
                signal: Z
            }));
        }, {
            model: Y.model,
            fallbackModel: Y.fallbackModel,
            maxThinkingTokens: B,
            signal: Z
        }), KA;
        do if (((KA = await yA.next()), !(KA.value instanceof B0A))) yield KA.value;
        while (!KA.done)
        if (((j = KA.value), xG("query_client_creation_end"), (f.length = 0), (y = 0), (m = void 0), (g.length = 0), (s = D_), xG("query_api_request_sent"), !Y.agentId)) W9A("api_request_sent");
        try {
            let OA = !0, _A = null, e = 30000, VA = 0, WA = 0;
            for await (let MA of j){
                let nA = Date.now();
                if (_A !== null) {
                    let ZA = nA - _A;
                    if (ZA > e) (WA++, (VA += ZA), k(`Streaming stall detected: ${(ZA / 1000).toFixed(1)}s gap between events (stall #${WA})`, {
                        level: "warn"
                    }), r("tengu_streaming_stall", {
                        stall_duration_ms: ZA,
                        stall_count: WA,
                        total_stall_time_ms: VA,
                        event_type: MA.type,
                        model: Y.model,
                        request_id: j.request_id ?? "unknown"
                    }));
                }
                if (((_A = nA), OA)) {
                    if ((k("Stream started - received first chunk"), xG("query_first_chunk_received"), !Y.agentId)) W9A("first_chunk");
                    (vA9(), (OA = !1));
                }
                switch(MA.type){
                    case "message_start":
                        {
                            ((m = MA.message), (y = Date.now() - M), (s = EfA(s, MA.message.usage)));
                            break;
                        }
                    case "content_block_start":
                        switch(MA.content_block.type){
                            case "tool_use":
                                g[MA.index] = {
                                    ...MA.content_block,
                                    input: ""
                                };
                                break;
                            case "server_tool_use":
                                g[MA.index] = {
                                    ...MA.content_block,
                                    input: ""
                                };
                                break;
                            case "text":
                                g[MA.index] = {
                                    ...MA.content_block,
                                    text: ""
                                };
                                break;
                            case "thinking":
                                g[MA.index] = {
                                    ...MA.content_block,
                                    thinking: ""
                                };
                                break;
                            default:
                                g[MA.index] = {
                                    ...MA.content_block
                                };
                                break;
                        }
                        break;
                    case "content_block_delta":
                        {
                            let ZA = g[MA.index];
                            if (!ZA) throw (r("tengu_streaming_error", {
                                error_type: "content_block_not_found_delta",
                                part_type: MA.type,
                                part_index: MA.index
                            }), RangeError("Content block not found"));
                            switch(MA.delta.type){
                                case "citations_delta":
                                    break;
                                case "input_json_delta":
                                    if (ZA.type !== "tool_use" && ZA.type !== "server_tool_use") throw (r("tengu_streaming_error", {
                                        error_type: "content_block_type_mismatch_input_json",
                                        expected_type: "tool_use",
                                        actual_type: ZA.type
                                    }), Error("Content block is not a input_json block"));
                                    if (typeof ZA.input !== "string") throw (r("tengu_streaming_error", {
                                        error_type: "content_block_input_not_string",
                                        input_type: typeof ZA.input
                                    }), Error("Content block input is not a string"));
                                    ZA.input += MA.delta.partial_json;
                                    break;
                                case "text_delta":
                                    if (ZA.type !== "text") throw (r("tengu_streaming_error", {
                                        error_type: "content_block_type_mismatch_text",
                                        expected_type: "text",
                                        actual_type: ZA.type
                                    }), Error("Content block is not a text block"));
                                    ZA.text += MA.delta.text;
                                    break;
                                case "signature_delta":
                                    if (ZA.type !== "thinking") throw (r("tengu_streaming_error", {
                                        error_type: "content_block_type_mismatch_thinking_signature",
                                        expected_type: "thinking",
                                        actual_type: ZA.type
                                    }), Error("Content block is not a thinking block"));
                                    ZA.signature = MA.delta.signature;
                                    break;
                                case "thinking_delta":
                                    if (ZA.type !== "thinking") throw (r("tengu_streaming_error", {
                                        error_type: "content_block_type_mismatch_thinking_delta",
                                        expected_type: "thinking",
                                        actual_type: ZA.type
                                    }), Error("Content block is not a thinking block"));
                                    ZA.thinking += MA.delta.thinking;
                                    break;
                            }
                            break;
                        }
                    case "content_block_stop":
                        {
                            let ZA = g[MA.index];
                            if (!ZA) throw (r("tengu_streaming_error", {
                                error_type: "content_block_not_found_stop",
                                part_type: MA.type,
                                part_index: MA.index
                            }), RangeError("Content block not found"));
                            if (!m) throw (r("tengu_streaming_error", {
                                error_type: "partial_message_not_found",
                                part_type: MA.type
                            }), Error("Message not found"));
                            let zA = {
                                message: {
                                    ...m,
                                    content: nN0([
                                        ZA
                                    ], G, Y.agentId)
                                },
                                requestId: j.request_id ?? void 0,
                                type: "assistant",
                                uuid: TK9(),
                                timestamp: new Date().toISOString(),
                                ...{}
                            };
                            (f.push(zA), yield zA);
                            break;
                        }
                    case "message_delta":
                        {
                            ((s = EfA(s, MA.usage)), (v = MA.delta.stop_reason));
                            let ZA = OoA(J, s);
                            (woA(ZA, s, Y.model), (p += ZA));
                            let zA = SQ2(MA.delta.stop_reason, Y.model);
                            if (zA) yield zA;
                            if (v === "max_tokens") (r("tengu_max_tokens_reached", {
                                max_tokens: AA
                            }), yield IX({
                                content: `${xV}: Claude's response exceeded the ${AA} output token maximum. To configure this behavior, set the CLAUDE_CODE_MAX_OUTPUT_TOKENS environment variable.`
                            }));
                            if (v === "model_context_window_exceeded") (r("tengu_context_window_exceeded", {
                                max_tokens: AA,
                                output_tokens: s.output_tokens
                            }), yield IX({
                                content: `${xV}: The model has reached its context window limit.`
                            }));
                            break;
                        }
                    case "message_stop":
                        break;
                }
                yield {
                    type: "stream_event",
                    event: MA
                };
            }
            if (WA > 0) (k(`Streaming completed with ${WA} stall(s), total stall time: ${(VA / 1000).toFixed(1)}s`, {
                level: "warn"
            }), r("tengu_streaming_stall_summary", {
                stall_count: WA,
                total_stall_time_ms: VA,
                model: Y.model,
                request_id: j.request_id ?? "unknown"
            }));
            let xA = (await j.withResponse()).response;
            (TG0(xA.headers), (YA = xA.headers));
        } catch (OA) {
            if (OA instanceof vX) if (Z.aborted) throw (k(`Streaming aborted by user: ${OA instanceof Error ? OA.message : String(OA)}`), OA);
            else throw (k(`Streaming timeout (SDK abort): ${OA.message}`, {
                level: "error"
            }), new Kv({
                message: "Request timed out"
            }));
            if ((k(`Error streaming, falling back to non-streaming mode: ${OA instanceof Error ? OA.message : String(OA)}`, {
                level: "error"
            }), (d = !0), Y.onStreamingFallback)) Y.onStreamingFallback();
            r("tengu_streaming_fallback_to_non_streaming", {
                model: Y.model,
                error: OA instanceof Error ? OA.name : String(OA),
                attemptNumber: R,
                maxOutputTokens: AA,
                maxThinkingTokens: B
            });
            let _A = J51(()=>eN({
                    maxRetries: 0,
                    model: Y.model
                }), async (WA, xA, MA)=>{
                R = xA;
                let nA = P(MA);
                (Qz1(nA, Y.querySource), (AA = nA.max_tokens));
                let ZA = LJ7(nA, NJ7);
                return await WA.beta.messages.create({
                    ...ZA,
                    model: Bg(ZA.model),
                    temperature: Y.temperatureOverride ?? 1
                });
            }, {
                model: Y.model,
                maxThinkingTokens: B,
                signal: Z
            }), e;
            do if (((e = await _A.next()), e.value.type === "system")) yield e.value;
            while (!e.done)
            let VA = {
                message: {
                    ...e.value,
                    content: nN0(e.value.content, G, Y.agentId)
                },
                requestId: j.request_id ?? void 0,
                type: "assistant",
                uuid: TK9(),
                timestamp: new Date().toISOString(),
                ...{}
            };
            (f.push(VA), yield VA);
        }
    } catch (yA) {
        k(`Error in non-streaming fallback: ${yA instanceof Error ? yA.message : String(yA)}`, {
            level: "error"
        });
        let KA = yA, OA = Y.model;
        if (yA instanceof Eo) ((KA = yA.originalError), (OA = yA.retryContext.model));
        if (KA instanceof W9) PG0(KA);
        let _A = j?.request_id || (KA instanceof W9 ? KA.requestID : void 0) || (KA instanceof W9 ? KA.error?.request_id : void 0);
        if ((kN2({
            error: KA,
            model: OA,
            messageCount: V.length,
            messageTokens: dK(V),
            durationMs: Date.now() - M,
            durationMsIncludingRetries: Date.now() - N,
            attempt: R,
            requestId: _A,
            didFallBackToNonStreaming: d,
            queryTracking: Y.queryTracking,
            querySource: Y.querySource,
            llmSpan: O
        }), KA instanceof vX)) {
            BR0(j);
            return;
        }
        (yield yG0(KA, OA, {
            messages: A,
            messagesForAPI: V
        }), BR0(j));
        return;
    }
    (Y.getToolPermissionContext().then((yA)=>{
        fN2({
            model: f[0]?.message.model ?? m?.model ?? Y.model,
            preNormalizedModel: Y.model,
            usage: s,
            start: M,
            startIncludingRetries: N,
            attempt: R,
            messageCount: V.length,
            messageTokens: dK(V),
            requestId: j?.request_id ?? null,
            stopReason: v,
            ttftMs: y,
            didFallBackToNonStreaming: d,
            querySource: Y.querySource,
            headers: YA,
            costUSD: p,
            queryTracking: Y.queryTracking,
            permissionMode: yA.mode,
            newMessages: f,
            llmSpan: O
        });
    }), BR0(j));
}
function BR0(A) {
    if (!A) return;
    try {
        if (!A.ended && !A.aborted) A.abort();
    } catch  {}
}
function EfA(A, Q) {
    return {
        input_tokens: Q.input_tokens !== null && Q.input_tokens > 0 ? Q.input_tokens : A.input_tokens,
        cache_creation_input_tokens: Q.cache_creation_input_tokens !== null && Q.cache_creation_input_tokens > 0 ? Q.cache_creation_input_tokens : A.cache_creation_input_tokens,
        cache_read_input_tokens: Q.cache_read_input_tokens !== null && Q.cache_read_input_tokens > 0 ? Q.cache_read_input_tokens : A.cache_read_input_tokens,
        output_tokens: Q.output_tokens ?? A.output_tokens,
        server_tool_use: {
            web_search_requests: Q.server_tool_use?.web_search_requests ?? A.server_tool_use.web_search_requests,
            web_fetch_requests: Q.server_tool_use?.web_fetch_requests ?? A.server_tool_use.web_fetch_requests
        },
        service_tier: A.service_tier,
        cache_creation: {
            ephemeral_1h_input_tokens: Q.cache_creation?.ephemeral_1h_input_tokens ?? A.cache_creation.ephemeral_1h_input_tokens,
            ephemeral_5m_input_tokens: Q.cache_creation?.ephemeral_5m_input_tokens ?? A.cache_creation.ephemeral_5m_input_tokens
        }
    };
}
function mY1(A, Q) {
    return {
        input_tokens: A.input_tokens + Q.input_tokens,
        cache_creation_input_tokens: A.cache_creation_input_tokens + Q.cache_creation_input_tokens,
        cache_read_input_tokens: A.cache_read_input_tokens + Q.cache_read_input_tokens,
        output_tokens: A.output_tokens + Q.output_tokens,
        server_tool_use: {
            web_search_requests: A.server_tool_use.web_search_requests + Q.server_tool_use.web_search_requests,
            web_fetch_requests: A.server_tool_use.web_fetch_requests + Q.server_tool_use.web_fetch_requests
        },
        service_tier: Q.service_tier,
        cache_creation: {
            ephemeral_1h_input_tokens: A.cache_creation.ephemeral_1h_input_tokens + Q.cache_creation.ephemeral_1h_input_tokens,
            ephemeral_5m_input_tokens: A.cache_creation.ephemeral_5m_input_tokens + Q.cache_creation.ephemeral_5m_input_tokens
        }
    };
}
function wJ7(A, Q) {
    return (r("tengu_api_cache_breakpoints", {
        totalMessageCount: A.length,
        cachingEnabled: Q
    }), A.map((B, G)=>{
        return B.type === "user" ? $J7(B, G > A.length - 3, Q) : UJ7(B, G > A.length - 3, Q);
    }));
}
function qJ7(A, Q) {
    return LH0(A).map((B)=>{
        let G = B.startsWith("x-anthropic-billing-header");
        return {
            type: "text",
            text: B,
            ...(Q && !G ? {
                cache_control: SbA()
            } : {})
        };
    });
}
async function yK({ systemPrompt: A = [], userPrompt: Q, assistantPrompt: B, signal: G, options: Z }) {
    return (await vA0([
        h0({
            content: A.map((J)=>({
                    type: "text",
                    text: J
                }))
        }),
        h0({
            content: Q
        })
    ], async ()=>{
        let J = [
            h0({
                content: Q
            }),
            ...(B ? [
                PF({
                    content: B
                })
            ] : [])
        ];
        return [
            await tm({
                messages: J,
                systemPrompt: A,
                maxThinkingTokens: 0,
                tools: [],
                signal: G,
                options: {
                    ...Z,
                    model: TH(),
                    enablePromptCaching: Z.enablePromptCaching ?? !1,
                    async getToolPermissionContext () {
                        return vN();
                    }
                }
            })
        ];
    }))[0];
}
function LJ7(A, Q) {
    let B = Math.min(A.max_tokens, Q), G = {
        ...A
    };
    if (G.thinking?.budget_tokens) G.thinking = {
        ...G.thinking,
        budget_tokens: Math.min(G.thinking.budget_tokens, B - 1)
    };
    return {
        ...G,
        max_tokens: B
    };
}
function fK0(A) {
    let Q = A.toLowerCase(), B;
    if (Q.includes("3-5")) B = 8192;
    else if (Q.includes("claude-3-opus")) B = 4096;
    else if (Q.includes("claude-3-sonnet")) B = 8192;
    else if (Q.includes("claude-3-haiku")) B = 4096;
    else if (Q.includes("opus-4-5")) B = 64000;
    else if (Q.includes("opus-4")) B = 32000;
    else if (Q.includes("sonnet-4") || Q.includes("haiku-4")) B = 64000;
    else B = 32000;
    let G = shA.validate(process.env.CLAUDE_CODE_MAX_OUTPUT_TOKENS);
    if (G.status === "capped") k(`CLAUDE_CODE_MAX_OUTPUT_TOKENS ${G.message}`);
    else if (G.status === "invalid") k(`CLAUDE_CODE_MAX_OUTPUT_TOKENS ${G.message}`);
    return Math.min(G.effective, B);
}
var NJ7 = 21333;
