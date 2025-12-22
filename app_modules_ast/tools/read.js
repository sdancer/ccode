// Module: lH
// Type: L
// Lines: 486192-486641
//
var flushCompletedQueues = L(()=>{
    v2();
    createRenderState();
    Aq();
    g1();
    _Y();
    pushStartInstance();
    aB();
    aQ();
    describeNativeComponentFrame();
    MPA();
    createRenderState();
    kfA();
    EI();
    zL();
    W0A();
    Q80();
    su();
    MJ1();
    createRenderState();
    z4();
    updateProperties();
    pushStartInstance();
    i0();
    wZ();
    main();
    J61();
    zB();
    uJ();
    x39();
    kfA();
    PN0();
    createRenderState();
    sH();
    ((eN0 = l(React runtime(), 1)), (j47 = new Set([
        "find",
        "grep",
        "rg",
        "ag",
        "ack",
        "locate",
        "which",
        "whereis"
    ])), (T47 = new Set([
        "cat",
        "head",
        "tail",
        "less",
        "more",
        "wc",
        "stat",
        "file",
        "ls",
        "tree",
        "du"
    ])));
    ((S47 = [
        "sleep"
    ]), (k39 = u.strictObject({
        command: u.string().describe("The command to execute"),
        timeout: u.number().optional().describe(`Optional timeout in milliseconds (max ${zH1()})`),
        description: u.string().optional().describe(`Clear, concise description of what this command does in 5-10 words, in active voice. Examples:
Input: ls
Output: List files in current directory

Input: git status
Output: Show working tree status

Input: npm install
Output: Install package dependencies

Input: mkdir foo
Output: Create directory 'foo'`),
        run_in_background: u.boolean().optional().describe("Set to true to run this command in the background. Use TaskOutput to read the output later."),
        dangerouslyDisableSandbox: u.boolean().optional().describe("Set this to true to dangerously override sandbox mode and run commands without sandboxing.")
    })), (y47 = [
        "npm",
        "yarn",
        "pnpm",
        "node",
        "python",
        "python3",
        "go",
        "cargo",
        "make",
        "docker",
        "terraform",
        "webpack",
        "vite",
        "jest",
        "pytest",
        "curl",
        "wget",
        "build",
        "test",
        "serve",
        "watch",
        "dev"
    ]));
    x47 = u.object({
        stdout: u.string().describe("The standard output of the command"),
        stderr: u.string().describe("The standard error output of the command"),
        summary: u.string().optional().describe("Summarized output when available"),
        rawOutputPath: u.string().optional().describe("Path to raw output file when summarized"),
        interrupted: u.boolean().describe("Whether the command was interrupted"),
        isImage: u.boolean().optional().describe("Flag to indicate if stdout contains image data"),
        backgroundTaskId: u.string().optional().describe("ID of the background task if command is running in background"),
        dangerouslyDisableSandbox: u.boolean().optional().describe("Flag to indicate if sandbox mode was overridden"),
        returnCodeInterpretation: u.string().optional().describe("Semantic interpretation for non-error exit codes with special meaning"),
        structuredContent: u.array(u.any()).optional().describe("Structured content blocks from mcp-cli commands")
    });
    M9 = {
        name: T4,
        strict: !0,
        async description ({ description: A }) {
            return A || "Run shell command";
        },
        async prompt () {
            return Q69();
        },
        isConcurrencySafe (A) {
            return this.isReadOnly(A);
        },
        isReadOnly (A) {
            return S39(A).behavior === "allow";
        },
        isSearchOrReadCommand (A) {
            let Q = k39.safeParse(A);
            if (!Q.success) return {
                isSearch: !1,
                isRead: !1
            };
            return P47(Q.data.command);
        },
        inputSchema: k39,
        outputSchema: x47,
        userFacingName (A) {
            if (!A) return "Bash";
            return VHA(A) && V0(process.env.CLAUDE_CODE_BASH_SANDBOX_SHOW_INDICATOR) ? "SandboxedBash" : "Bash";
        },
        getToolUseSummary (A) {
            if (!A?.command) return null;
            let { command: Q, description: B } = A;
            if (B) return B;
            return s5(Q, ov);
        },
        isEnabled () {
            return !0;
        },
        async checkPermissions (A, Q) {
            return await mD0(A, Q);
        },
        renderToolUseMessage: G69,
        renderToolUseTag: Z69,
        renderToolUseRejectedMessage: Y69,
        renderToolUseProgressMessage: J69,
        renderToolUseQueuedMessage: X69,
        renderToolResultMessage: I69,
        mapToolResultToToolResultBlockParam ({ interrupted: A, stdout: Q, stderr: B, summary: G, isImage: Z, backgroundTaskId: Y, structuredContent: J }, X) {
            if (J && J.length > 0) return {
                tool_use_id: X,
                type: "tool_result",
                content: J
            };
            if (Z) {
                let V = Q.trim().match(/^data:([^;]+);base64,(.+)$/);
                if (V) {
                    let H = V[1], D = V[2];
                    return {
                        tool_use_id: X,
                        type: "tool_result",
                        content: [
                            {
                                type: "image",
                                source: {
                                    type: "base64",
                                    media_type: H || "image/jpeg",
                                    data: D || ""
                                }
                            }
                        ]
                    };
                }
            }
            if (G) return {
                tool_use_id: X,
                type: "tool_result",
                content: G,
                is_error: A
            };
            let I = Q;
            if (Q) ((I = Q.replace(/^(\s*\n)+/, "")), (I = I.trimEnd()));
            let W = B.trim();
            if (A) {
                if (B) W += mfA;
                W += "<error>Command was aborted before completion</error>";
            }
            let K = Y ? `Command running in background with ID: ${Y}. Output is being written to: ${Ww(Y)}` : "";
            return {
                tool_use_id: X,
                type: "tool_result",
                content: [
                    I,
                    W,
                    K
                ].filter(Boolean).join(`
`),
                is_error: A
            };
        },
        async call (A, Q, B, G, Z) {
            let { abortController: Y, readFileState: J, getAppState: X, setAppState: I, setToolJSX: W, messages: K } = Q, V = new zZA(), H = new zZA(), D, F = 0, E = !1, z, O = !!Q.agentId;
            try {
                let jA = h47({
                    input: A,
                    abortController: Y,
                    setAppState: I,
                    setToolJSX: W,
                    preventCwdChanges: O
                }), yA;
                do if (((yA = await jA.next()), !yA.done && Z)) {
                    let OA = yA.value;
                    Z({
                        toolUseID: `bash-progress-${F++}`,
                        data: {
                            type: "bash_progress",
                            output: OA.output,
                            fullOutput: OA.fullOutput,
                            elapsedTimeSeconds: OA.elapsedTimeSeconds,
                            totalLines: OA.totalLines
                        }
                    });
                }
                while (!yA.done)
                if (((z = yA.value), v47(A.command, z.code), V.append((z.stdout || "").trimEnd() + mfA), (D = y39(A.command, z.code, z.stdout || "", z.stderr || "")), z.stderr && z.stderr.includes(".git/index.lock': File exists"))) r("tengu_git_index_lock_error", {});
                if (D.isError) {
                    if ((H.append(z.stderr.trimEnd() + mfA), z.code !== 0)) H.append(`Exit code ${z.code}`);
                } else if (z9A(A.command) !== null) H.append(z.stderr.trimEnd() + mfA);
                else V.append(z.stderr.trimEnd() + mfA);
                if (!O) {
                    let OA = await X();
                    if (SV1(OA.toolPermissionContext)) {
                        let _A = H.toString();
                        (H.clear(), H.append(PV1(_A)));
                    }
                }
                let KA = MB.annotateStderrWithSandboxFailures(A.command, z.stderr || "");
                if (D.isError) throw new my(z.stdout, KA, z.code, z.interrupted);
                E = z.interrupted;
            } finally{
                if (W) W(null);
            }
            let N = V.toString(), M = H.toString();
            {
                let jA = Q4();
                $39(A.command, N, jA.signal, Q.options.isNonInteractiveSession).then(async (yA)=>{
                    for (let KA of yA){
                        let OA = M47(KA) ? KA : R47(i1(), KA);
                        try {
                            if (!(await D3.validateInput({
                                file_path: OA
                            }, Q)).result) {
                                J.delete(OA);
                                continue;
                            }
                            await D3.call({
                                file_path: OA
                            }, Q);
                        } catch (_A) {
                            (J.delete(OA), t(_A));
                        }
                    }
                    r("tengu_bash_tool_haiku_file_paths_read", {
                        filePathsExtracted: yA.length,
                        readFileStateSize: J.size,
                        readFileStateValuesCharLength: qk(J).reduce((KA, OA)=>{
                            let _A = J.get(OA);
                            return KA + (_A?.content.length || 0);
                        }, 0)
                    });
                }).catch((yA)=>{
                    if (yA instanceof Error && yA.message.includes("Request was aborted")) return;
                    t(yA);
                });
            }
            let R = await b47(N, M, A.command, Y, K || []), j = R?.shouldSummarize === !0, P = R?.modelReason, f = A.command.split(" ")[0];
            r("tengu_bash_tool_command_executed", {
                command_type: f,
                stdout_length: N.length,
                stderr_length: M.length,
                exit_code: z.code,
                interrupted: E,
                summarization_attempted: R !== null,
                summarization_succeeded: j,
                summarization_duration_ms: R?.queryDurationMs,
                summarization_reason: !j && R ? R.reason : void 0,
                model_summarization_reason: P,
                summary_length: R?.shouldSummarize && R.summary ? R.summary.length : void 0
            });
            let { truncatedContent: y, isImage: m } = fg(ufA(N)), { truncatedContent: g } = fg(ufA(M)), s = void 0, p = y, v = void 0, d = z9A(A.command);
            if (d !== null) {
                let jA = await g47(N, A.command, d);
                if (jA !== null) ((p = jA.stdout), (v = jA.structuredContent), (s = jA.rawOutputPath));
            }
            let AA = p;
            if (m) {
                let jA = p.trim().match(/^data:([^;]+);base64,(.+)$/);
                if (jA && jA[1] && jA[2]) {
                    let yA = jA[1], KA = jA[2], OA = Buffer.from(KA, "base64"), _A = await k1A(OA, void 0, yA);
                    AA = `data:${_A.mediaType};base64,${_A.base64}`;
                }
            }
            return {
                data: {
                    stdout: AA,
                    stderr: g,
                    summary: j ? R?.summary : void 0,
                    rawOutputPath: j ? R?.rawOutputPath : s,
                    interrupted: E,
                    isImage: m,
                    returnCodeInterpretation: D?.message,
                    backgroundTaskId: z.backgroundTaskId,
                    structuredContent: v,
                    dangerouslyDisableSandbox: "dangerouslyDisableSandbox" in A ? A.dangerouslyDisableSandbox : void 0
                }
            };
        },
        renderToolUseErrorMessage: W69
    };
});
function kH1({ ruleValue: A }) {
    switch(A.toolName){
        case M9.name:
            if (A.ruleContent) if (A.ruleContent.endsWith(":*")) return h$.createElement(C, {
                dimColor: !0
            }, "Any Bash command starting with", " ", h$.createElement(C, {
                bold: !0
            }, A.ruleContent.slice(0, -2)));
            else return h$.createElement(C, {
                dimColor: !0
            }, "The Bash command ", h$.createElement(C, {
                bold: !0
            }, A.ruleContent));
            else return h$.createElement(C, {
                dimColor: !0
            }, "Any Bash command");
        default:
            if (!A.ruleContent) return h$.createElement(C, {
                dimColor: !0
            }, "Any use of the ", h$.createElement(C, {
                bold: !0
            }, A.toolName), " tool");
            else return null;
    }
}
var h$;
