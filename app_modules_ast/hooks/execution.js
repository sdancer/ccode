// Module: aD1
// Type: L
// Lines: 521336-521528
//
var createRenderState = L(()=>{
    _Y();
});
import { randomUUID as rJ7 } from "crypto";
async function rK9(A, Q, B, G, Z, Y, J, X) {
    let I = X || `hook-${rJ7()}`;
    try {
        let W = SX1(A.prompt, G);
        k(`Hooks: Processing prompt hook with prompt: ${W}`);
        let K = {
            ...Y,
            onChangeAPIKey: ()=>{},
            onChangeDynamicMcpConfig: void 0,
            onInstallIDEExtension: void 0,
            resume: void 0,
            options: {
                ...Y.options,
                dynamicMcpConfig: void 0,
                ideInstallationStatus: null,
                theme: "dark"
            }
        }, V = await mf({
            input: W,
            mode: "prompt",
            setIsLoading: ()=>{},
            setToolJSX: ()=>{},
            context: K
        });
        if (!V.shouldQuery) {
            let N = V.messages.map((M)=>{
                if (M.type === "user" && M.message?.content) {
                    if (typeof M.message.content === "string") return M.message.content;
                    return M.message.content.filter((R)=>R.type === "text").map((R)=>R.text).join("");
                }
                return "";
            }).join(`
`);
            return {
                hook: A,
                outcome: "success",
                message: J4({
                    type: "hook_success",
                    hookName: Q,
                    toolUseID: I,
                    hookEvent: B,
                    content: N
                })
            };
        }
        let H = J && J.length > 0 ? [
            ...J,
            ...V.messages
        ] : V.messages;
        k(`Hooks: Querying model with ${H.length} messages`);
        let D = A.timeout ? A.timeout * 1000 : 30000, F = Q4(), E = setTimeout(()=>{
            F.abort();
        }, D), { signal: z, cleanup: $ } = Ab(Z, F.signal), O = [
            ...H,
            PF({
                content: "{"
            })
        ];
        try {
            let N = await tm({
                messages: O,
                systemPrompt: [
                    `You are evaluating a hook in Claude Code.

CRITICAL: You MUST return ONLY valid JSON with no other text, explanation, or commentary before or after the JSON. Do not include any markdown code blocks, thinking, or additional text.

Your response must be a single JSON object matching one of the following schemas:
1. If the condition is met, return: {"ok": true}
2. If the condition is not met, return: {"ok": false, "reason": "Reason for why it is not met"}

Return the JSON object directly with no preamble or explanation.`
                ],
                maxThinkingTokens: 0,
                tools: Y.options.tools,
                signal: z,
                options: {
                    async getToolPermissionContext () {
                        return (await Y.getAppState()).toolPermissionContext;
                    },
                    model: A.model ?? TH(),
                    toolChoice: void 0,
                    isNonInteractiveSession: !0,
                    hasAppendSystemPrompt: !1,
                    agents: [],
                    querySource: "hook_prompt",
                    mcpTools: [],
                    agentId: Y.agentId
                }
            });
            (clearTimeout(E), $());
            let M = N.message.content.filter((f)=>f.type === "text").map((f)=>f.text).join("");
            Y.setResponseLength((f)=>f + M.length);
            let R = ("{" + M).trim();
            k(`Hooks: Model response: ${R}`);
            let j = _5(R);
            if (!j) return (k(`Hooks: error parsing response as JSON: ${R}`), {
                hook: A,
                outcome: "non_blocking_error",
                message: J4({
                    type: "hook_non_blocking_error",
                    hookName: Q,
                    toolUseID: I,
                    hookEvent: B,
                    stderr: "JSON validation failed",
                    stdout: R,
                    exitCode: 1
                })
            });
            let P = jHA.safeParse(j);
            if (!P.success) return (k(`Hooks: model response does not conform to expected schema: ${P.error.message}`), {
                hook: A,
                outcome: "non_blocking_error",
                message: J4({
                    type: "hook_non_blocking_error",
                    hookName: Q,
                    toolUseID: I,
                    hookEvent: B,
                    stderr: `Schema validation failed: ${P.error.message}`,
                    stdout: R,
                    exitCode: 1
                })
            });
            if (!P.data.ok) return (k(`Hooks: Prompt hook condition was not met: ${P.data.reason}`), {
                hook: A,
                outcome: "blocking",
                blockingError: {
                    blockingError: `Prompt hook condition was not met: ${P.data.reason}`,
                    command: A.prompt
                },
                preventContinuation: !0,
                stopReason: P.data.reason
            });
            return (k("Hooks: Prompt hook condition was met"), {
                hook: A,
                outcome: "success",
                message: J4({
                    type: "hook_success",
                    hookName: Q,
                    toolUseID: I,
                    hookEvent: B,
                    content: "Condition met"
                })
            });
        } catch (N) {
            if ((clearTimeout(E), $(), z.aborted)) return {
                hook: A,
                outcome: "cancelled"
            };
            throw N;
        }
    } catch (W) {
        let K = W instanceof Error ? W.message : String(W);
        return (k(`Hooks: Prompt hook error: ${K}`), {
            hook: A,
            outcome: "non_blocking_error",
            message: J4({
                type: "hook_non_blocking_error",
                hookName: Q,
                toolUseID: I,
                hookEvent: B,
                stderr: `Error executing prompt hook: ${K}`,
                stdout: "",
                exitCode: 1
            })
        });
    }
}
