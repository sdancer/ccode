// Module: UE9
// Type: L
// Lines: 535532-537905
//
var renderElement = L(()=>{
    cV1();
    TFA();
    zF1();
    s1();
});
var OE9 = {};
M5(OE9, {
    showSetupScreens: ()=>LE9,
    setup: ()=>kF1,
    main: ()=>yV7,
    completeOnboarding: ()=>NE9
});
import { ReadStream as CV7 } from "tty";
import { openSync as $V7, existsSync as vF1, readFileSync as wE9, writeFileSync as UV7 } from "fs";
import { cwd as O_0 } from "process";
import { resolve as M_0 } from "path";
function wV7() {
    try {
        let A = uB("policySettings");
        if (A) {
            let Q = fV9(A);
            r("tengu_managed_settings_loaded", {
                keyCount: Q.length,
                keys: Q.join(",")
            });
        }
    } catch  {}
}
function qV7() {
    if (process.env.ENABLE_TOOL_SEARCH !== void 0) return "external_tool_search_env_var";
    if (process.env.ENABLE_EXPERIMENTAL_MCP_CLI !== void 0) return "external_mcp_cli_env_var";
    return "external_default";
}
function NV7() {
    try {
        let A = lY(), Q = qV7(), B = !1;
        r("tengu_mcp_cli_status", {
            enabled: A,
            source: Q,
            legacy_env_var_set: !1
        });
    } catch  {}
}
function LV7() {
    let A = Ye(), Q = process.execArgv.some((G)=>{
        if (A) return /--inspect(-brk)?/.test(G);
        else return /--inspect(-brk)?|--debug(-brk)?/.test(G);
    }), B = process.env.NODE_OPTIONS && /--inspect(-brk)?|--debug(-brk)?/.test(process.env.NODE_OPTIONS);
    try {
        return !!global.require("inspector").url() || Q || B;
    } catch  {
        return Q || B;
    }
}
function NE9() {
    n0((A)=>({
            ...A,
            hasCompletedOnboarding: !0,
            lastOnboardingVersion: {
                ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
                PACKAGE_URL: "@anthropic-ai/claude-code",
                README_URL: "https://code.claude.com/docs/en/overview",
                VERSION: "2.0.72",
                FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
                BUILD_TIME: "2025-12-17T21:20:34Z"
            }.VERSION
        }));
}
async function LE9(A, Q, B, G) {
    if (V0(!1) || process.env.IS_DEMO) return !1;
    let Z = v1(), Y = !1;
    if (!Z.theme || !Z.hasCompletedOnboarding) ((Y = !0), await wI(), await new Promise(async (J)=>{
        let { unmount: X } = await p3(u5.default.createElement(E5, {
            onChangeAppState: Wc
        }, u5.default.createElement(CD9, {
            onDone: async ()=>{
                (NE9(), X(), await wI(), J());
            }
        })), {
            exitOnCtrlC: !1
        });
    }));
    if (A !== "bypassPermissions" && process.env.CLAUBBIT !== "true") {
        let J = sZ(!1);
        (await new Promise(async (I)=>{
            let { unmount: W } = await p3(u5.default.createElement(E5, null, u5.default.createElement(xD9, {
                commands: B,
                onDone: async ()=>{
                    if ((W(), !J)) await wI();
                    I();
                }
            })), {
                exitOnCtrlC: !1
            });
        }), BrA(), XZA(), KD());
        let { errors: X } = WS();
        if (X.length === 0) await JF9();
        if (await KB2()) await new Promise(async (I)=>{
            let { unmount: W } = await p3(u5.default.createElement(E5, null, u5.default.createElement(dH1, {
                onDone: ()=>{
                    (W(), I());
                },
                isStandaloneDialog: !0
            })), {
                exitOnCtrlC: !1
            });
        });
    }
    if ((K6A(), B_0(), await FKA())) await new Promise(async (J)=>{
        let { unmount: X } = await p3(u5.default.createElement(E5, null, u5.default.createElement($D1, {
            showIfAlreadyViewed: !1,
            location: Y ? "onboarding" : "policy_update_modal",
            onDone: async (I)=>{
                if (I === "escape") {
                    (r("tengu_grove_policy_exited", {}), r6(0));
                    return;
                }
                if ((X(), I !== "skip_rendering")) await wI();
                J();
            }
        })), {
            exitOnCtrlC: !1
        });
    });
    if (process.env.ANTHROPIC_API_KEY) {
        let J = MN(process.env.ANTHROPIC_API_KEY);
        if (eD1(J) === "new") await new Promise(async (I)=>{
            let { unmount: W } = await p3(u5.default.createElement(E5, {
                onChangeAppState: Wc
            }, u5.default.createElement(OF1, {
                customApiKeyTruncated: J,
                onDone: async ()=>{
                    (W(), await wI(), I());
                }
            })), {
                exitOnCtrlC: !1
            });
        });
    }
    if ((A === "bypassPermissions" || Q) && !v1().bypassPermissionsModeAccepted) await new Promise(async (J)=>{
        let { unmount: X } = await p3(u5.default.createElement(E5, null, u5.default.createElement($F9, {
            onAccept: ()=>{
                (X(), J());
            }
        })));
    });
    if (G && !v1().hasCompletedClaudeInChromeOnboarding) await new Promise(async (J)=>{
        let { unmount: X } = await p3(u5.default.createElement(E5, null, u5.default.createElement(wF9, {
            onDone: ()=>{
                (X(), J());
            }
        })));
    });
    return Y;
}
async function qE9(A, Q) {
    try {
        let B = await Im(A, Q);
        if (B.type === "connected") return "✓ Connected";
        else if (B.type === "needs-auth") return "⚠ Needs authentication";
        else return "✗ Failed to connect";
    } catch (B) {
        return "✗ Connection error";
    }
}
function OV7() {
    (n0((A)=>({
            ...A,
            numStartups: (A.numStartups ?? 0) + 1
        })), MV7(), TP0()?.add(1));
}
async function MV7() {
    let [A, Q] = await Promise.all([
        pN(),
        BLA()
    ]);
    r("tengu_startup_telemetry", {
        is_git: A,
        worktree_count: Q,
        sandbox_enabled: MB.isSandboxingEnabled(),
        are_unsandboxed_commands_allowed: MB.areUnsandboxedCommandsAllowed(),
        is_auto_bash_allowed_if_sandbox_enabled: MB.isAutoAllowBashIfSandboxedEnabled(),
        auto_updater_disabled: dL()
    });
}
function RV7() {
    (LF9(), MF9(), TF9(), SF9(), _F9(), xF9());
}
function _V7() {
    if (m9()) {
        KD();
        return;
    }
    if (sZ(!0)) KD();
}
async function kF1(A, Q, B, G, Z) {
    let Y = process.version.match(/^v(\d+)\./)?.[1];
    if (!Y || parseInt(Y) < 18) (console.error(V1.bold.red("Error: Claude Code requires Node.js version 18 or higher.")), process.exit(1));
    if (Z) nq(ZL(Z));
    DR0();
    let J = z7B();
    if (J.status === "restored") console.log(V1.yellow("Detected an interrupted iTerm2 setup. Your original settings have been restored. You may need to restart iTerm2 for the changes to take effect."));
    else if (J.status === "failed") console.error(V1.red(`Failed to restore iTerm2 settings. Please manually restore your original settings with: defaults import com.googlecode.iterm2 ${J.backupPath}.`));
    try {
        let K = await LtA();
        if (K.status === "restored") console.log(V1.yellow("Detected an interrupted Terminal.app setup. Your original settings have been restored. You may need to restart Terminal.app for the changes to take effect."));
        else if (K.status === "failed") console.error(V1.red(`Failed to restore Terminal.app settings. Please manually restore your original settings with: defaults import com.apple.Terminal ${K.backupPath}.`));
    } catch (K) {
        t(K instanceof Error ? K : Error(String(K)));
    }
    if ((rL(A), pH9(), aH9(), sH9(), SN2(), mN2(), rD9(), sW9(), Hz0(), Dz0(), F49(), icB(bK(uQ())), k9("setup_before_prefetch"), uH9(), zV9(), P$(i1()), rV1(), Qo(), CsB(), bV(), _V7(), EF9(), Zc(), $V9(), FF9(), BbQ(m9()), V0(process.env.CLAUDE_CODE_USE_BEDROCK) && !V0(process.env.CLAUDE_CODE_SKIP_BEDROCK_AUTH))) GbQ();
    (LkA().catch((K)=>t(K)), JKA([], m0()), nYB(), k9("setup_after_prefetch"));
    let { hasReleaseNotes: X } = nkA(v1().lastReleaseNotesSeen);
    if (X) await Lt2();
    let I = Q4();
    if ((setTimeout(()=>I.abort(), 3000), xuA(i1(), I.signal, []), Q === "bypassPermissions" || B)) {
        if (process.platform !== "win32" && typeof process.getuid === "function" && process.getuid() === 0 && !process.env.IS_SANDBOX) (console.error("--dangerously-skip-permissions cannot be used with root/sudo privileges for security reasons"), process.exit(1));
    }
    let W = sG();
    if (W.lastCost !== void 0 && W.lastDuration !== void 0) r("tengu_exit", {
        last_session_cost: W.lastCost,
        last_session_api_duration: W.lastAPIDuration,
        last_session_tool_duration: W.lastToolDuration,
        last_session_duration: W.lastDuration,
        last_session_lines_added: W.lastLinesAdded,
        last_session_lines_removed: W.lastLinesRemoved,
        last_session_total_input_tokens: W.lastTotalInputTokens,
        last_session_total_output_tokens: W.lastTotalOutputTokens,
        last_session_total_cache_creation_input_tokens: W.lastTotalCacheCreationInputTokens,
        last_session_total_cache_read_input_tokens: W.lastTotalCacheReadInputTokens,
        last_session_id: W.lastSessionId
    });
}
function jV7(A) {
    try {
        let Q = A.trim(), B = Q.startsWith("{") && Q.endsWith("}"), G;
        if (B) {
            if (!_5(Q)) (process.stderr.write(V1.red(`Error: Invalid JSON provided to --settings
`)), process.exit(1));
            ((G = yX1("claude-settings", ".json")), UV7(G, Q, "utf8"));
        } else {
            let { resolvedPath: Z } = tI(vA(), A);
            if (!vF1(Z)) (process.stderr.write(V1.red(`Error: Settings file not found: ${Z}
`)), process.exit(1));
            G = Z;
        }
        (fP0(G), HT());
    } catch (Q) {
        if (Q instanceof Error) t(Q);
        (process.stderr.write(V1.red(`Error processing settings: ${Q instanceof Error ? Q.message : String(Q)}
`)), process.exit(1));
    }
}
function TV7(A) {
    try {
        let Q = XGB(A);
        (lP0(Q), HT());
    } catch (Q) {
        if (Q instanceof Error) t(Q);
        (process.stderr.write(V1.red(`Error processing --setting-sources: ${Q instanceof Error ? Q.message : String(Q)}
`)), process.exit(1));
    }
}
function PV7() {
    k9("eagerLoadSettings_start");
    let A = L_0("--settings");
    if (A) jV7(A);
    let Q = L_0("--setting-sources");
    if (Q !== void 0) TV7(Q);
    k9("eagerLoadSettings_end");
}
function SV7(A) {
    if (process.env.CLAUDE_CODE_ENTRYPOINT) return;
    let Q = process.argv.slice(2), B = Q.indexOf("mcp");
    if (B !== -1 && Q[B + 1] === "serve") {
        process.env.CLAUDE_CODE_ENTRYPOINT = "mcp";
        return;
    }
    if (V0(process.env.CLAUDE_CODE_ACTION)) {
        process.env.CLAUDE_CODE_ENTRYPOINT = "claude-code-github-action";
        return;
    }
    process.env.CLAUDE_CODE_ENTRYPOINT = A ? "sdk-cli" : "cli";
}
async function yV7() {
    (k9("main_function_start"), (process.env.NoDefaultCurrentDirectoryInExePath = "1"), MH9(), process.on("exit", ()=>{
        bV7();
    }), process.on("SIGINT", ()=>{
        process.exit(0);
    }), k9("main_warning_handler_initialized"));
    let A = process.argv.slice(2), Q = A.includes("-p") || A.includes("--print"), B = A.some((J)=>J.startsWith("--sdk-url")), G = Q || B || !process.stdout.isTTY;
    (vP0(!G), SV7(G));
    let Y = (()=>{
        if (process.env.GITHUB_ACTIONS === "true") return "github-action";
        if (process.env.CLAUDE_CODE_ENTRYPOINT === "sdk-ts") return "sdk-typescript";
        if (process.env.CLAUDE_CODE_ENTRYPOINT === "sdk-py") return "sdk-python";
        if (process.env.CLAUDE_CODE_ENTRYPOINT === "sdk-cli") return "sdk-cli";
        if (process.env.CLAUDE_CODE_ENTRYPOINT === "claude-vscode") return "claude-vscode";
        if (process.env.CLAUDE_CODE_SESSION_ACCESS_TOKEN || process.env.CLAUDE_CODE_WEBSOCKET_AUTH_FILE_DESCRIPTOR) return "remote";
        return "cli";
    })();
    (kP0(Y), k9("main_client_type_determined"), PV7(), k9("main_before_run"), (process.title = "claude"), await kV7(), k9("main_after_run"));
}
function xV7(A) {
    let Q = 0, B = {
        exitOnCtrlC: A,
        onFlicker: (G, Z, Y, J)=>{
            if (J === "resize") return;
            let X = Date.now();
            if (X - Q < 1000) r("tengu_flicker", {
                desiredHeight: G,
                actualHeight: Z,
                ink2Enabled: Y,
                reason: J
            });
            Q = X;
        }
    };
    if (!process.stdin.isTTY && !V0(!1) && !process.argv.includes("mcp")) {
        if ((r("tengu_stdin_interactive", {}), process.platform !== "win32")) try {
            let G = $V7("/dev/tty", "r");
            B = {
                ...B,
                stdin: new CV7(G)
            };
        } catch (G) {
            t(G);
        }
    }
    return B;
}
async function vV7(A, Q) {
    if (!process.stdin.isTTY && !process.argv.includes("mcp")) {
        if (Q === "stream-json") return process.stdin;
        process.stdin.setEncoding("utf8");
        let B = "";
        return (process.stdin.on("data", (G)=>{
            B += G;
        }), await new Promise((G)=>{
            process.stdin.on("end", G);
        }), [
            A,
            B
        ].filter(Boolean).join(`
`));
    }
    return A;
}
async function kV7() {
    k9("run_function_start");
    let A = new KF1();
    (k9("run_commander_initialized"), A.hook("preAction", async ()=>{
        k9("preAction_start");
        let J = hH9();
        if (J instanceof Promise) await J;
        (k9("preAction_after_init"), TPB(), RV7(), k9("preAction_after_migrations"), fD2(), k9("preAction_after_remote_settings"));
    }), A.name("claude").description("Claude Code - starts an interactive session by default, use -p/--print for non-interactive output").argument("[prompt]", "Your prompt", String).helpOption("-h, --help", "Display help for command").option("-d, --debug [filter]", 'Enable debug mode with optional category filtering (e.g., "api,hooks" or "!statsig,!file")', (J)=>{
        return !0;
    }).addOption(new ZV("-d2e, --debug-to-stderr", "Enable debug mode (to stderr)").argParser(Boolean).hideHelp()).option("--verbose", "Override verbose mode setting from config", ()=>!0).option("-p, --print", "Print response and exit (useful for pipes). Note: The workspace trust dialog is skipped when Claude is run with the -p mode. Only use this flag in directories you trust.", ()=>!0).addOption(new ZV("--output-format <format>", 'Output format (only works with --print): "text" (default), "json" (single result), or "stream-json" (realtime streaming)').choices([
        "text",
        "json",
        "stream-json"
    ])).addOption(new ZV("--json-schema <schema>", 'JSON Schema for structured output validation. Example: {"type":"object","properties":{"name":{"type":"string"}},"required":["name"]}').argParser(String)).option("--include-partial-messages", "Include partial message chunks as they arrive (only works with --print and --output-format=stream-json)", ()=>!0).addOption(new ZV("--input-format <format>", 'Input format (only works with --print): "text" (default), or "stream-json" (realtime streaming input)').choices([
        "text",
        "stream-json"
    ])).option("--mcp-debug", "[DEPRECATED. Use --debug instead] Enable MCP debug mode (shows MCP server errors)", ()=>!0).option("--dangerously-skip-permissions", "Bypass all permission checks. Recommended only for sandboxes with no internet access.", ()=>!0).option("--allow-dangerously-skip-permissions", "Enable bypassing all permission checks as an option, without it being enabled by default. Recommended only for sandboxes with no internet access.", ()=>!0).addOption(new ZV("--max-thinking-tokens <tokens>", "Maximum number of thinking tokens.  (only works with --print)").argParser(Number).hideHelp()).addOption(new ZV("--max-turns <turns>", "Maximum number of agentic turns in non-interactive mode. This will early exit the conversation after the specified number of turns. (only works with --print)").argParser(Number).hideHelp()).addOption(new ZV("--max-budget-usd <amount>", "Maximum dollar amount to spend on API calls (only works with --print)").argParser((J)=>{
        let X = Number(J);
        if (isNaN(X) || X <= 0) throw Error("--max-budget-usd must be a positive number greater than 0");
        return X;
    })).option("--replay-user-messages", "Re-emit user messages from stdin back on stdout for acknowledgment (only works with --input-format=stream-json and --output-format=stream-json)", ()=>!0).addOption(new ZV("--enable-auth-status", "Enable auth status messages in SDK mode").default(!1).hideHelp()).option("--allowedTools, --allowed-tools <tools...>", 'Comma or space-separated list of tool names to allow (e.g. "Bash(git:*) Edit")').option("--tools <tools...>", 'Specify the list of available tools from the built-in set. Use "" to disable all tools, "default" to use all tools, or specify tool names (e.g. "Bash,Edit,Read"). Only works with --print mode.').option("--disallowedTools, --disallowed-tools <tools...>", 'Comma or space-separated list of tool names to deny (e.g. "Bash(git:*) Edit")').option("--mcp-config <configs...>", "Load MCP servers from JSON files or strings (space-separated)").addOption(new ZV("--permission-prompt-tool <tool>", "MCP tool to use for permission prompts (only works with --print)").argParser(String).hideHelp()).addOption(new ZV("--system-prompt <prompt>", "System prompt to use for the session").argParser(String)).addOption(new ZV("--system-prompt-file <file>", "Read system prompt from a file").argParser(String).hideHelp()).addOption(new ZV("--append-system-prompt <prompt>", "Append a system prompt to the default system prompt").argParser(String)).addOption(new ZV("--append-system-prompt-file <file>", "Read system prompt from a file and append to the default system prompt").argParser(String).hideHelp()).addOption(new ZV("--permission-mode <mode>", "Permission mode to use for the session").argParser(String).choices(NT)).option("-c, --continue", "Continue the most recent conversation", ()=>!0).option("-r, --resume [value]", "Resume a conversation by session ID, or open interactive picker with optional search term", (J)=>J || !0).option("--fork-session", "When resuming, create a new session ID instead of reusing the original (use with --resume or --continue)", ()=>!0).option("--no-session-persistence", "Disable session persistence - sessions will not be saved to disk and cannot be resumed (only works with --print)").addOption(new ZV("--resume-session-at <message id>", "When resuming, only messages up to and including the assistant message with <message.id> (use with --resume in print mode)").argParser(String).hideHelp()).addOption(new ZV("--rewind-files <user-message-id>", "Restore files to state at the specified user message and exit (requires --resume)").hideHelp()).option("--model <model>", "Model for the current session. Provide an alias for the latest model (e.g. 'sonnet' or 'opus') or a model's full name (e.g. 'claude-sonnet-4-5-20250929').").option("--agent <agent>", "Agent for the current session. Overrides the 'agent' setting.").option("--betas <betas...>", "Beta headers to include in API requests (API key users only)").option("--fallback-model <model>", "Enable automatic fallback to specified model when default model is overloaded (only works with --print)").option("--settings <file-or-json>", "Path to a settings JSON file or a JSON string to load additional settings from").option("--add-dir <directories...>", "Additional directories to allow tool access to").option("--ide", "Automatically connect to IDE on startup if exactly one valid IDE is available", ()=>!0).option("--strict-mcp-config", "Only use MCP servers from --mcp-config, ignoring all other MCP configurations", ()=>!0).option("--session-id <uuid>", "Use a specific session ID for the conversation (must be a valid UUID)").option("--agents <json>", `JSON object defining custom agents (e.g. '{"reviewer": {"description": "Reviews code", "prompt": "You are a code reviewer"}}')`).option("--setting-sources <sources>", "Comma-separated list of setting sources to load (user, project, local).").option("--plugin-dir <paths...>", "Load plugins from directories for this session only (repeatable)").option("--disable-slash-commands", "Disable all slash commands", ()=>!0).option("--chrome", "Enable Claude in Chrome integration").option("--no-chrome", "Disable Claude in Chrome integration").action(async (J, X)=>{
        if ((k9("action_handler_start"), J === "code")) (r("tengu_code_prompt_ignored", {}), console.warn(V1.yellow("Tip: You can launch Claude Code with just `claude`")), (J = void 0));
        if (J && typeof J === "string" && !/\s/.test(J) && J.length > 0) r("tengu_single_word_prompt", {
            length: J.length
        });
        let { debug: I = !1, debugToStderr: W = !1, dangerouslySkipPermissions: K, allowDangerouslySkipPermissions: V = !1, tools: H = [], allowedTools: D = [], disallowedTools: F = [], mcpConfig: E = [], permissionMode: z, addDir: $ = [], fallbackModel: O, betas: N = [], ide: M = !1, sessionId: R, includePartialMessages: j, pluginDir: P = [] } = X, f = X.agents, y = X.agent;
        if (P.length > 0) (nP0(P), Bo());
        let { outputFormat: m, inputFormat: g } = X, s = X.verbose ?? v1().verbose, p = X.print, v = X.disableSlashCommands || !1, d = !1, AA = X, YA = void 0, jA = void 0, yA = X.sdkUrl ?? void 0;
        if (yA) {
            if (!g) g = "stream-json";
            if (!m) m = "stream-json";
            if (X.verbose === void 0) s = !0;
            if (!X.print) p = !0;
        }
        let KA = X.teleport ?? null, OA = X.remote ?? null;
        if (R) {
            if (X.continue || X.resume) (process.stderr.write(V1.red(`Error: --session-id cannot be used with --continue or --resume.
`)), process.exit(1));
            let x0 = Q$(R);
            if (!x0) (process.stderr.write(V1.red(`Error: Invalid session ID. Must be a valid UUID.
`)), process.exit(1));
            if (PcB(x0)) (process.stderr.write(V1.red(`Error: Session ID ${x0} is already in use.
`)), process.exit(1));
        }
        let _A = m9();
        if (O && X.model && O === X.model) (process.stderr.write(V1.red(`Error: Fallback model cannot be the same as the main model. Please specify a different model for --fallback-model.
`)), process.exit(1));
        let e = X.systemPrompt;
        if (X.systemPromptFile) {
            if (X.systemPrompt) (process.stderr.write(V1.red(`Error: Cannot use both --system-prompt and --system-prompt-file. Please use only one.
`)), process.exit(1));
            try {
                let x0 = M_0(X.systemPromptFile);
                if (!vF1(x0)) (process.stderr.write(V1.red(`Error: System prompt file not found: ${x0}
`)), process.exit(1));
                e = wE9(x0, "utf8");
            } catch (x0) {
                (process.stderr.write(V1.red(`Error reading system prompt file: ${x0 instanceof Error ? x0.message : String(x0)}
`)), process.exit(1));
            }
        }
        let VA = X.appendSystemPrompt;
        if (X.appendSystemPromptFile) {
            if (X.appendSystemPrompt) (process.stderr.write(V1.red(`Error: Cannot use both --append-system-prompt and --append-system-prompt-file. Please use only one.
`)), process.exit(1));
            try {
                let x0 = M_0(X.appendSystemPromptFile);
                if (!vF1(x0)) (process.stderr.write(V1.red(`Error: Append system prompt file not found: ${x0}
`)), process.exit(1));
                VA = wE9(x0, "utf8");
            } catch (x0) {
                (process.stderr.write(V1.red(`Error reading append system prompt file: ${x0 instanceof Error ? x0.message : String(x0)}
`)), process.exit(1));
            }
        }
        let { mode: WA, notification: xA } = e89({
            permissionModeCli: z,
            dangerouslySkipPermissions: K
        });
        aP0(WA === "bypassPermissions");
        let MA = {};
        if (E && E.length > 0) {
            let x0 = E.map((u9)=>u9.trim()).filter((u9)=>u9.length > 0), rQ = {}, O2 = [];
            for (let u9 of x0){
                let X1 = null, cA = [], $1 = _5(u9);
                if ($1) {
                    let r1 = vTA({
                        configObject: $1,
                        filePath: "command line",
                        expandVars: !0,
                        scope: "dynamic"
                    });
                    if (r1.config) X1 = r1.config.mcpServers;
                    else cA = r1.errors;
                } else {
                    let r1 = M_0(u9), C0 = LWA({
                        filePath: r1,
                        expandVars: !0,
                        scope: "dynamic"
                    });
                    if (C0.config) X1 = C0.config.mcpServers;
                    else cA = C0.errors;
                }
                if (cA.length > 0) O2.push(...cA);
                else if (X1) rQ = {
                    ...rQ,
                    ...X1
                };
            }
            if (O2.length > 0) {
                let u9 = O2.map((X1)=>`${X1.path ? X1.path + ": " : ""}${X1.message}`).join(`
`);
                throw Error(`Invalid MCP configuration:
${u9}`);
            }
            if (Object.keys(rQ).length > 0) {
                if (Object.keys(rQ).some(NWA)) throw Error(`Invalid MCP configuration: "${Ek}" is a reserved MCP name.`);
                let u9 = W1A(rQ, (X1)=>({
                        ...X1,
                        scope: "dynamic"
                    }));
                MA = {
                    ...MA,
                    ...u9
                };
            }
        }
        let ZA = lV1(X.chrome) && VB();
        if (ZA) {
            let x0 = xQ();
            try {
                r("tengu_claude_in_chrome_setup", {
                    platform: x0
                });
                let { mcpConfig: rQ, allowedTools: O2, systemPrompt: u9 } = dq0();
                if (((MA = {
                    ...MA,
                    ...rQ
                }), D.push(...O2), u9)) VA = VA ? `${u9}

${VA}` : u9;
            } catch (rQ) {
                (r("tengu_claude_in_chrome_setup_failed", {
                    platform: x0
                }), k(`[Claude in Chrome] Error: ${rQ}`), t(rQ instanceof Error ? rQ : Error(String(rQ))), console.error("Error: Failed to run with Claude in Chrome."), process.exit(1));
            }
        }
        let zA = X.strictMcpConfig || !1;
        if (A70()) {
            if (zA) (process.stderr.write(V1.red("You cannot use --strict-mcp-config when an enterprise MCP config is present")), process.exit(1));
            if (MA && !psB(MA)) (process.stderr.write(V1.red("You cannot dynamically configure MCP servers when an enterprise MCP config is present")), process.exit(1));
        }
        let LA, UA, { toolPermissionContext: $A, warnings: RA } = A39({
            allowedToolsCli: D,
            disallowedToolsCli: F,
            baseToolsCli: H,
            permissionMode: WA,
            allowDangerouslySkipPermissions: V,
            addDirs: $
        });
        (RA.forEach((x0)=>{
            console.error(x0);
        }), XV9());
        let { servers: mA } = zA ? {
            servers: {}
        } : await OP(), hA = {
            ...mA,
            ...MA
        }, Y1 = {}, C1 = {};
        for (let [x0, rQ] of Object.entries(hA)){
            let O2 = rQ;
            if (O2.type === "sdk") Y1[x0] = O2;
            else C1[x0] = O2;
        }
        if ((k9("action_mcp_configs_loaded"), g && g !== "text" && g !== "stream-json")) (console.error(`Error: Invalid input format "${g}".`), process.exit(1));
        if (g === "stream-json" && m !== "stream-json") (console.error("Error: --input-format=stream-json requires output-format=stream-json."), process.exit(1));
        if (yA) {
            if (g !== "stream-json" || m !== "stream-json") (console.error("Error: --sdk-url requires both --input-format=stream-json and --output-format=stream-json."), process.exit(1));
        }
        if (X.replayUserMessages) {
            if (g !== "stream-json" || m !== "stream-json") (console.error("Error: --replay-user-messages requires both --input-format=stream-json and --output-format=stream-json."), process.exit(1));
        }
        if (j) {
            if (!_A || m !== "stream-json") (mb("Error: --include-partial-messages requires --print and --output-format=stream-json."), process.exit(1));
        }
        if (H.length > 0 && !_A) (mb("Error: --tools can only be used with --print mode."), process.exit(1));
        if (X.sessionPersistence === !1 && !_A) (mb("Error: --no-session-persistence can only be used with --print mode."), process.exit(1));
        let PA = await vV7(J || "", g ?? "text");
        k9("action_after_input_prompt");
        let Q1 = Cz($A);
        k9("action_tools_loaded");
        let o1;
        if (US2({
            isNonInteractiveSession: _A
        }) && X.jsonSchema) o1 = JSON.parse(X.jsonSchema);
        if (o1) {
            let x0 = PX1(o1);
            if (x0) ((Q1 = [
                ...Q1,
                x0
            ]), r("tengu_structured_output_enabled", {
                schema_property_count: Object.keys(o1.properties || {}).length,
                has_required_fields: Boolean(o1.required)
            }));
            else r("tengu_structured_output_failure", {
                error: "Invalid JSON schema"
            });
        }
        (k9("action_before_setup"), await kF1(O_0(), WA, V, d, R ? Q$(R) : void 0), k9("action_after_setup"));
        let S1 = X.model === "default" ? Qg() : X.model, B0 = O === "default" ? Qg() : O, YQ = i1(), [GQ, KQ] = await Promise.all([
            P$(YQ),
            WN2(YQ)
        ]);
        k9("action_commands_loaded");
        let b1 = [];
        if (f) try {
            let x0 = _5(f);
            if (x0) b1 = PY1(x0, "flagSettings");
        } catch (x0) {
            t(x0 instanceof Error ? x0 : Error(String(x0)));
        }
        let F0 = [
            ...KQ.allAgents,
            ...b1
        ], A1 = {
            ...KQ,
            allAgents: F0,
            activeAgents: Zf(F0)
        }, K1 = y ?? Y7().agent, y1;
        if (K1) {
            if (((y1 = A1.activeAgents.find((x0)=>x0.agentType === K1)), !y1)) k(`Warning: agent "${K1}" not found. Available agents: ${A1.activeAgents.map((x0)=>x0.agentType).join(", ")}. Using default behavior.`);
        }
        if (!_A) {
            if ((await LE9(WA, V, GQ, ZA)) && J?.trim().toLowerCase() === "/login") J = "";
        }
        if (process.exitCode !== void 0) {
            k("Graceful shutdown initiated, skipping further initialization");
            return;
        }
        if (!_A) {
            let { errors: x0 } = WS(), rQ = x0.filter((O2)=>!O2.mcpErrorMetadata);
            if (rQ.length > 0) await kD9(rQ);
        }
        (_Q2().catch((x0)=>t(x0)), rAB(), mt2(), CE9(), AF9(m9()), ve2());
        let Z0 = K31(C1), _0 = UA === void 0 && (PA || _A) ? await Z0 : {
            clients: [],
            tools: [],
            commands: []
        }, O0 = LA ? LA : _0.clients, DA = UA ? UA : _0.tools, wA = UA ? [] : _0.commands, I1;
        if (UA !== void 0) I1 = new abA(O0, DA);
        else if (ss()) ((I1 = new abA(O0, DA)), I1.start().then(({ url: x0 })=>{
            let rQ = I1.getSecret();
            (X6A({
                url: x0,
                key: rQ
            }), k(`[MCP CLI Endpoint] Started at ${x0}`));
        }).catch((x0)=>{
            t(x0 instanceof Error ? x0 : Error(String(x0)));
        }), X3(async ()=>{
            await I1?.stop();
        }));
        (E3("info", "started"), X3(async ()=>{
            E3("info", "exited");
        }), fV7({
            hasInitialPrompt: Boolean(J),
            hasStdin: Boolean(PA),
            verbose: s,
            debug: I,
            debugToStderr: W,
            print: p ?? !1,
            outputFormat: m ?? "text",
            inputFormat: g ?? "text",
            numAllowedTools: D.length,
            numDisallowedTools: F.length,
            mcpClientCount: Object.keys(hA).length,
            worktree: d,
            skipWebFetchPreflight: Y7().skipWebFetchPreflight,
            githubActionInputs: process.env.GITHUB_ACTION_INPUTS,
            dangerouslySkipPermissionsPassed: K ?? !1,
            modeIsBypass: WA === "bypassPermissions",
            allowDangerouslySkipPermissionsPassed: V,
            systemPromptFlag: e ? X.systemPromptFile ? "file" : "flag" : void 0,
            appendSystemPromptFlag: VA ? X.appendSystemPromptFile ? "file" : "flag" : void 0
        }), CN2(C1, $A), V51(null, "initialization"), wV7(), NV7(), await glB(), k9("action_after_plugins_init"), NsB());
        let E1 = S1;
        if (!E1 && y1?.model && y1.model !== "inherit") E1 = JW(y1.model);
        if ((lt(E1), _A)) {
            if (m === "stream-json" || m === "json") JS0(!0);
            (K6A(), B_0());
            let x0 = v ? [] : GQ.filter((O2)=>(O2.type === "prompt" && !O2.disableNonInteractive) || (O2.type === "local" && O2.supportsNonInteractive)), rQ = ps();
            if (((rQ = {
                ...rQ,
                mcp: {
                    ...rQ.mcp,
                    clients: O0,
                    commands: wA,
                    tools: DA
                },
                toolPermissionContext: $A
            }), $A.mode === "bypassPermissions" || V)) Q39($A);
            if (X.sessionPersistence === !1) oP0(!0);
            oF9(PA, async ()=>rQ, (O2)=>{
                let u9 = rQ;
                ((rQ = O2(rQ)), Wc({
                    newState: rQ,
                    oldState: u9
                }));
            }, x0, Q1, Y1, A1.activeAgents, {
                continue: X.continue,
                resume: X.resume,
                verbose: s,
                outputFormat: m,
                jsonSchema: o1,
                permissionPromptToolName: X.permissionPromptTool,
                allowedTools: D,
                maxThinkingTokens: X.maxThinkingTokens,
                maxTurns: X.maxTurns,
                maxBudgetUsd: X.maxBudgetUsd,
                systemPrompt: e,
                appendSystemPrompt: VA,
                userSpecifiedModel: S1,
                fallbackModel: B0,
                sdkBetas: N.length > 0 ? N : void 0,
                teleport: KA,
                sdkUrl: yA,
                replayUserMessages: X.replayUserMessages,
                includePartialMessages: j,
                forkSession: X.forkSession || !1,
                resumeSessionAt: X.resumeSessionAt || void 0,
                rewindFiles: X.rewindFiles,
                enableAuthStatus: X.enableAuthStatus
            });
            return;
        }
        let F1 = xV7(!1);
        (kA2(), r("tengu_startup_manual_model_config", {
            cli_flag: X.model,
            env_var: process.env.ANTHROPIC_MODEL,
            settings_file: (Y7() || {}).model,
            subscriptionType: S6(),
            agent: K1
        }));
        let z1 = X.model || process.env.ANTHROPIC_MODEL || Y7().model;
        if (VB() && !_M() && z1 !== void 0 && ZrA(z1)) console.error(V1.yellow("Your plan doesn't include Opus in Claude Code. You can turn on /extra-usage or /upgrade to Max to access it. The current model is now Sonnet."));
        _P0(YrA() || null);
        let W0 = BgA(), e1 = JW(W0 ?? Qg()), P0 = WH1(e1), wQ = [];
        if (xA) wQ.push({
            key: "permission-mode-notification",
            text: xA,
            priority: "high"
        });
        if (P0) wQ.push({
            key: "model-deprecation-warning",
            text: P0,
            color: "warning",
            priority: "high"
        });
        let TB = m0(), XB = {
            ...$A,
            mode: nk() ? "plan" : $A.mode
        }, b2 = {
            settings: Y7(),
            tasks: {},
            verbose: s ?? v1().verbose ?? !1,
            mainLoopModel: W0,
            mainLoopModelForSession: null,
            showExpandedTodos: v1().showExpandedTodos ?? !1,
            toolPermissionContext: XB,
            agent: y1?.agentType,
            agentDefinitions: A1,
            mcp: {
                clients: [],
                tools: [],
                commands: [],
                resources: {}
            },
            plugins: {
                enabled: [],
                disabled: [],
                commands: [],
                agents: [],
                errors: [],
                installationStatus: {
                    marketplaces: [],
                    plugins: []
                }
            },
            statusLineText: void 0,
            notifications: {
                current: null,
                queue: wQ
            },
            elicitation: {
                queue: []
            },
            todos: {
                [TB]: Um(TB)
            },
            fileHistory: {
                snapshots: [],
                trackedFiles: new Set()
            },
            thinkingEnabled: iY1(),
            promptSuggestionEnabled: dY1(),
            feedbackSurvey: {
                timeLastShown: null,
                submitCountAtLastAppearance: null
            },
            sessionHooks: {},
            inbox: {
                messages: []
            },
            promptSuggestion: {
                text: null,
                shownAt: 0,
                acceptedAt: 0
            },
            promptCoaching: {
                tip: null,
                shownAt: 0
            },
            queuedCommands: [],
            workerPermissions: {
                queue: [],
                selectedIndex: 0
            },
            workerSandboxPermissions: {
                queue: [],
                selectedIndex: 0
            },
            pendingWorkerRequest: null,
            pendingSandboxRequest: null,
            gitDiff: {
                stats: null,
                perFileStats: new Map(),
                hunks: new Map(),
                lastUpdated: 0
            }
        }, $9 = UA ? [] : DA;
        if ((OV7(), X.continue)) try {
            r("tengu_continue", {});
            let x0 = await No(void 0, void 0);
            if (!x0) (console.error("No conversation found to continue"), process.exit(1));
            if (!X.forkSession) {
                if (x0.sessionId) (nq(ZL(x0.sessionId)), await TR(), nwA(x0.sessionId));
            }
            await p3(u5.default.createElement(E5, {
                initialState: b2,
                onChangeAppState: Wc
            }, u5.default.createElement(pDA, {
                debug: I || W,
                initialPrompt: PA,
                commands: [
                    ...GQ,
                    ...wA
                ],
                initialTools: $9,
                initialMessages: x0.messages,
                initialFileHistorySnapshots: x0.fileHistorySnapshots,
                mcpClients: O0,
                dynamicMcpConfig: MA,
                mcpCliEndpoint: I1,
                autoConnectIdeFlag: M,
                strictMcpConfig: zA,
                systemPrompt: e,
                appendSystemPrompt: VA,
                mainThreadAgentDefinition: y1,
                disableSlashCommands: v
            })), F1);
        } catch (x0) {
            (t(x0 instanceof Error ? x0 : Error(String(x0))), process.exit(1));
        }
        else if (X.resume || KA || OA) {
            let x0 = null, rQ = void 0, O2 = Q$(X.resume), u9 = void 0;
            if (X.resume && typeof X.resume === "string" && !O2) {
                let X1 = X.resume.trim();
                if (X1) {
                    let cA = await fIA(X1, {
                        exact: !0
                    });
                    if (cA.length === 1) O2 = dX(cA[0]) ?? null;
                    else u9 = X1;
                }
            }
            if (OA) {
                r("tengu_remote_create_session", {
                    description_length: String(OA.length)
                });
                let X1 = await yz2(OA, new AbortController().signal);
                if (!X1) (r("tengu_remote_create_session_error", {
                    error: "unable_to_create_session"
                }), process.stderr.write(V1.red(`Error: Unable to create remote session
`)), await x8(1), process.exit(1));
                (r("tengu_remote_create_session_success", {
                    session_id: X1.id
                }), process.stdout.write(`Created remote session: ${X1.title}
`), process.stdout.write(`View: https://claude.ai/code/${X1.id}?m=0
`), process.stdout.write(`Resume with: claude --teleport ${X1.id}
`), await x8(0), process.exit(0));
            } else if (KA) {
                if (KA === !0 || KA === "") {
                    r("tengu_teleport_interactive_mode", {});
                    let X1 = await FE9();
                    if (!X1) (await x8(0), process.exit(0));
                    let { branchError: cA } = await PVA(X1.branch);
                    x0 = TVA(X1.log, cA);
                } else if (typeof KA === "string") {
                    r("tengu_teleport_resume_session", {
                        mode: "direct"
                    });
                    try {
                        let X1 = await SjA(KA), cA = await XK0(X1);
                        if (cA.status === "mismatch" || cA.status === "not_in_repo") {
                            let r1 = cA.sessionRepo;
                            if (r1) {
                                let C0 = yH9(r1), yQ = xH9(C0);
                                if (yQ.length > 0) {
                                    let nB = await new Promise(async (t2)=>{
                                        let { unmount: i2 } = await p3(u5.default.createElement(E5, null, u5.default.createElement(ZE9, {
                                            targetRepo: r1,
                                            initialPaths: yQ,
                                            onSelectPath: (t4)=>{
                                                (i2(), t2(t4));
                                            },
                                            onCancel: ()=>{
                                                (i2(), t2(null));
                                            }
                                        })), {
                                            exitOnCtrlC: !1
                                        });
                                    });
                                    if (nB) (process.chdir(nB), rL(nB), CP0(nB));
                                    else await x8(0);
                                } else throw new CV(`You must run claude --teleport ${KA} from a checkout of ${r1}.`, V1.red(`You must run claude --teleport ${KA} from a checkout of ${V1.bold(r1)}.
`));
                            }
                        } else if (cA.status === "error") throw new CV(cA.errorMessage || "Failed to validate session", V1.red(`Error: ${cA.errorMessage || "Failed to validate session"}
`));
                        await vZ1();
                        let $1 = await XE9(KA);
                        (FgA({
                            sessionId: KA
                        }), (x0 = $1.messages));
                    } catch (X1) {
                        if (X1 instanceof CV) process.stderr.write(X1.formattedMessage + `
`);
                        else (t(X1 instanceof Error ? X1 : Error(String(X1))), process.stderr.write(V1.red(`Error: ${X1 instanceof Error ? X1.message : String(X1)}
`)));
                        await x8(1);
                    }
                }
            }
            if (O2) {
                let X1 = O2;
                try {
                    let cA = await No(X1, void 0);
                    if (!cA) (console.error(`No conversation found with session ID: ${X1}`), process.exit(1));
                    if (((x0 = cA.messages), (rQ = cA.fileHistorySnapshots), r("tengu_session_resumed", {
                        entrypoint: "cli_flag"
                    }), !X.forkSession)) (nq(ZL(X1)), await TR(), nwA(X1));
                } catch (cA) {
                    (t(cA instanceof Error ? cA : Error(String(cA))), console.error(`Failed to resume session ${X1}`), process.exit(1));
                }
            }
            if (Array.isArray(x0)) await p3(u5.default.createElement(E5, {
                initialState: b2,
                onChangeAppState: Wc
            }, u5.default.createElement(pDA, {
                debug: I || W,
                initialPrompt: PA,
                commands: [
                    ...GQ,
                    ...wA
                ],
                initialTools: $9,
                initialMessages: x0,
                initialFileHistorySnapshots: rQ,
                mcpClients: O0,
                dynamicMcpConfig: MA,
                mcpCliEndpoint: I1,
                autoConnectIdeFlag: M,
                strictMcpConfig: zA,
                systemPrompt: e,
                appendSystemPrompt: VA,
                mainThreadAgentDefinition: y1,
                disableSlashCommands: v
            })), F1);
            else {
                let X1 = await pi(uQ());
                await p3(u5.default.createElement(hD9, {
                    commands: [
                        ...GQ,
                        ...wA
                    ],
                    debug: I || W,
                    worktreePaths: X1,
                    initialTools: $9,
                    mcpClients: O0,
                    dynamicMcpConfig: MA,
                    mcpCliEndpoint: I1,
                    appState: b2,
                    onChangeAppState: Wc,
                    strictMcpConfig: zA,
                    systemPrompt: e,
                    appendSystemPrompt: VA,
                    initialSearchQuery: u9,
                    disableSlashCommands: v
                }), F1);
            }
        } else {
            let x0 = await $L("startup");
            (k9("action_after_hooks"), await p3(u5.default.createElement(E5, {
                initialState: b2,
                onChangeAppState: Wc
            }, u5.default.createElement(pDA, {
                debug: I || W,
                commands: [
                    ...GQ,
                    ...wA
                ],
                initialPrompt: PA,
                initialTools: $9,
                initialMessages: x0,
                mcpClients: O0,
                dynamicMcpConfig: MA,
                autoConnectIdeFlag: M,
                strictMcpConfig: zA,
                systemPrompt: e,
                appendSystemPrompt: VA,
                mcpCliEndpoint: I1,
                mainThreadAgentDefinition: y1,
                disableSlashCommands: v
            })), F1));
        }
    }).version(`${{
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://code.claude.com/docs/en/overview",
        VERSION: "2.0.72",
        FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
        BUILD_TIME: "2025-12-17T21:20:34Z"
    }.VERSION} (Claude Code)`, "-v, --version", "Output the version number"), A.addOption(new ZV("--sdk-url <url>", "Use remote WebSocket endpoint for SDK I/O streaming (only with -p and stream-json format)").hideHelp()), A.addOption(new ZV("--teleport [session]", "Resume a teleport session, optionally specify session ID").hideHelp()), A.addOption(new ZV("--remote <description>", "Create a remote session with the given description").hideHelp()));
    let Q = A.command("mcp").description("Configure and manage MCP servers").helpOption("-h, --help", "Display help for command");
    (Q.command("serve").description("Start the Claude Code MCP server").helpOption("-h, --help", "Display help for command").option("-d, --debug", "Enable debug mode", ()=>!0).option("--verbose", "Override verbose mode setting from config", ()=>!0).action(async ({ debug: J, verbose: X })=>{
        let I = O_0();
        if ((r("tengu_mcp_start", {}), !vF1(I))) (console.error(`Error: Directory ${I} does not exist`), process.exit(1));
        try {
            (await kF1(I, "default", !1, !1, void 0), await mD9(I, J ?? !1, X ?? !1));
        } catch (W) {
            (console.error("Error: Failed to start MCP server:", W), process.exit(1));
        }
    }), Q.command("add <name> <commandOrUrl> [args...]").description(`Add an MCP server to Claude Code.

Examples:
  # Add HTTP server:
  claude mcp add --transport http sentry https://mcp.sentry.dev/mcp

  # Add SSE server:
  claude mcp add --transport sse asana https://mcp.asana.com/sse

  # Add stdio server:
  claude mcp add --transport stdio airtable --env AIRTABLE_API_KEY=YOUR_KEY -- npx -y airtable-mcp-server`).option("-s, --scope <scope>", "Configuration scope (local, user, or project)", "local").option("-t, --transport <transport>", "Transport type (stdio, sse, http). Defaults to stdio if not specified.").option("-e, --env <env...>", "Set environment variables (e.g. -e KEY=value)").option("-H, --header <header...>", 'Set WebSocket headers (e.g. -H "X-Api-Key: abc123" -H "X-Custom: value")').helpOption("-h, --help", "Display help for command").action(async (J, X, I, W)=>{
        if (!J) (console.error("Error: Server name is required."), console.error("Usage: claude mcp add <name> <command> [args...]"), process.exit(1));
        else if (!X) (console.error("Error: Command is required when server name is provided."), console.error("Usage: claude mcp add <name> <command> [args...]"), process.exit(1));
        try {
            let K = dbA(W.scope), V = bV9(W.transport), H = W.transport !== void 0, D = X.startsWith("http://") || X.startsWith("https://") || X.startsWith("localhost") || X.endsWith("/sse") || X.endsWith("/mcp");
            if ((r("tengu_mcp_add", {
                type: V,
                scope: K,
                source: "command",
                transport: V,
                transportExplicit: H,
                looksLikeUrl: D
            }), V === "sse")) {
                if (!X) (console.error("Error: URL is required for SSE transport."), process.exit(1));
                let F = W.header ? SR0(W.header) : void 0;
                if ((iBA(J, {
                    type: "sse",
                    url: X,
                    headers: F
                }, K), process.stdout.write(`Added SSE MCP server ${J} with URL: ${X} to ${K} config
`), F)) process.stdout.write(`Headers: ${JSON.stringify(F, null, 2)}
`);
            } else if (V === "http") {
                if (!X) (console.error("Error: URL is required for HTTP transport."), process.exit(1));
                let F = W.header ? SR0(W.header) : void 0;
                if ((iBA(J, {
                    type: "http",
                    url: X,
                    headers: F
                }, K), process.stdout.write(`Added HTTP MCP server ${J} with URL: ${X} to ${K} config
`), F)) process.stdout.write(`Headers: ${JSON.stringify(F, null, 2)}
`);
            } else {
                if (!H && D) (process.stderr.write(`
Warning: The command "${X}" looks like a URL, but is being interpreted as a stdio server as --transport was not specified.
`), process.stderr.write(`If this is an HTTP server, use: claude mcp add --transport http ${J} ${X}
`), process.stderr.write(`If this is an SSE server, use: claude mcp add --transport sse ${J} ${X}
`));
                let F = xj0(W.env);
                (iBA(J, {
                    type: "stdio",
                    command: X,
                    args: I || [],
                    env: F
                }, K), process.stdout.write(`Added stdio MCP server ${J} with command: ${X} ${(I || []).join(" ")} to ${K} config
`));
            }
            (process.stdout.write(`File modified: ${JO(K)}
`), process.exit(0));
        } catch (K) {
            (console.error(K.message), process.exit(1));
        }
    }), Q.command("remove <name>").description("Remove an MCP server").option("-s, --scope <scope>", "Configuration scope (local, user, or project) - if not specified, removes from whichever scope it exists in").helpOption("-h, --help", "Display help for command").action(async (J, X)=>{
        try {
            if (X.scope) {
                let D = dbA(X.scope);
                (r("tengu_mcp_delete", {
                    name: J,
                    scope: D
                }), e50(J, D), process.stdout.write(`Removed MCP server ${J} from ${D} config
`), process.stdout.write(`File modified: ${JO(D)}
`), process.exit(0));
            }
            let I = sG(), W = v1(), { servers: K } = qW("project"), V = !!K[J], H = [];
            if (I.mcpServers?.[J]) H.push("local");
            if (V) H.push("project");
            if (W.mcpServers?.[J]) H.push("user");
            if (H.length === 0) (process.stderr.write(`No MCP server found with name: "${J}"
`), process.exit(1));
            else if (H.length === 1) {
                let D = H[0];
                (r("tengu_mcp_delete", {
                    name: J,
                    scope: D
                }), e50(J, D), process.stdout.write(`Removed MCP server "${J}" from ${D} config
`), process.stdout.write(`File modified: ${JO(D)}
`), process.exit(0));
            } else (process.stderr.write(`MCP server "${J}" exists in multiple scopes:
`), H.forEach((D)=>{
                process.stderr.write(`  - ${c4A(D)} (${JO(D)})
`);
            }), process.stderr.write(`
To remove from a specific scope, use:
`), H.forEach((D)=>{
                process.stderr.write(`  claude mcp remove "${J}" -s ${D}
`);
            }), process.exit(1));
        } catch (I) {
            (process.stderr.write(`${I.message}
`), process.exit(1));
        }
    }), Q.command("list").description("List configured MCP servers").helpOption("-h, --help", "Display help for command").action(async ()=>{
        r("tengu_mcp_list", {});
        let { servers: J } = await OP();
        if (Object.keys(J).length === 0) console.log("No MCP servers configured. Use `claude mcp add` to add a server.");
        else {
            console.log(`Checking MCP server health...
`);
            for (let [X, I] of Object.entries(J)){
                let W = await qE9(X, I);
                if (I.type === "sse") console.log(`${X}: ${I.url} (SSE) - ${W}`);
                else if (I.type === "http") console.log(`${X}: ${I.url} (HTTP) - ${W}`);
                else if (!I.type || I.type === "stdio") {
                    let K = Array.isArray(I.args) ? I.args : [];
                    console.log(`${X}: ${I.command} ${K.join(" ")} - ${W}`);
                }
            }
        }
        process.exit(0);
    }), Q.command("get <name>").description("Get details about an MCP server").helpOption("-h, --help", "Display help for command").action(async (J)=>{
        r("tengu_mcp_get", {
            name: J
        });
        let X = OWA(J);
        if (!X) (console.error(`No MCP server found with name: ${J}`), process.exit(1));
        (console.log(`${J}:`), console.log(`  Scope: ${c4A(X.scope)}`));
        let I = await qE9(J, X);
        if ((console.log(`  Status: ${I}`), X.type === "sse")) {
            if ((console.log("  Type: sse"), console.log(`  URL: ${X.url}`), X.headers)) {
                console.log("  Headers:");
                for (let [W, K] of Object.entries(X.headers))console.log(`    ${W}: ${K}`);
            }
        } else if (X.type === "http") {
            if ((console.log("  Type: http"), console.log(`  URL: ${X.url}`), X.headers)) {
                console.log("  Headers:");
                for (let [W, K] of Object.entries(X.headers))console.log(`    ${W}: ${K}`);
            }
        } else if (X.type === "stdio") {
            (console.log("  Type: stdio"), console.log(`  Command: ${X.command}`));
            let W = Array.isArray(X.args) ? X.args : [];
            if ((console.log(`  Args: ${W.join(" ")}`), X.env)) {
                console.log("  Environment:");
                for (let [K, V] of Object.entries(X.env))console.log(`    ${K}=${V}`);
            }
        }
        (console.log(`
To remove this server, run: claude mcp remove "${J}" -s ${X.scope}`), process.exit(0));
    }), Q.command("add-json <name> <json>").description("Add an MCP server (stdio or SSE) with a JSON string").option("-s, --scope <scope>", "Configuration scope (local, user, or project)", "local").helpOption("-h, --help", "Display help for command").action(async (J, X, I)=>{
        try {
            let W = dbA(I.scope), K = _5(X);
            iBA(J, K, W);
            let V = K && typeof K === "object" && "type" in K ? String(K.type || "stdio") : "stdio";
            (r("tengu_mcp_add", {
                scope: W,
                source: "json",
                type: V
            }), console.log(`Added ${V} MCP server ${J} to ${W} config`), process.exit(0));
        } catch (W) {
            (console.error(W.message), process.exit(1));
        }
    }), Q.command("add-from-claude-desktop").description("Import MCP servers from Claude Desktop (Mac and WSL only)").option("-s, --scope <scope>", "Configuration scope (local, user, or project)", "local").helpOption("-h, --help", "Display help for command").action(async (J)=>{
        try {
            let X = dbA(J.scope), I = xQ();
            r("tengu_mcp_add", {
                scope: X,
                platform: I,
                source: "desktop"
            });
            let W = VD9();
            if (Object.keys(W).length === 0) (console.log("No MCP servers found in Claude Desktop configuration or configuration file does not exist."), process.exit(0));
            let { unmount: K } = await p3(u5.default.createElement(E5, null, u5.default.createElement(ID9, {
                servers: W,
                scope: X,
                onDone: ()=>{
                    K();
                }
            })), {
                exitOnCtrlC: !0
            });
        } catch (X) {
            (console.error(X.message), process.exit(1));
        }
    }), Q.command("reset-project-choices").description("Reset all approved and rejected project-scoped (.mcp.json) servers within this project").helpOption("-h, --help", "Display help for command").action(async ()=>{
        (r("tengu_mcp_reset_mcpjson_choices", {}), tZ((J)=>({
                ...J,
                enabledMcpjsonServers: [],
                disabledMcpjsonServers: [],
                enableAllProjectMcpServers: !1
            })), console.log("All project-scoped (.mcp.json) server approvals and rejections have been reset."), console.log("You will be prompted for approval next time you start Claude Code."), process.exit(0));
    }));
    function B(J, X) {
        (t(J instanceof Error ? J : Error(String(J))), console.error(`${B1.cross} Failed to ${X}: ${J instanceof Error ? J.message : String(J)}`), process.exit(1));
    }
    let G = A.command("plugin").description("Manage Claude Code plugins").helpOption("-h, --help", "Display help for command");
    G.command("validate <path>").description("Validate a plugin or marketplace manifest").helpOption("-h, --help", "Display help for command").action((J)=>{
        try {
            let X = jD1(J);
            if ((console.log(`Validating ${X.fileType} manifest: ${X.filePath}
`), X.errors.length > 0)) (console.log(`${B1.cross} Found ${X.errors.length} error${X.errors.length === 1 ? "" : "s"}:
`), X.errors.forEach((I)=>{
                console.log(`  ${B1.pointer} ${I.path}: ${I.message}`);
            }), console.log(""));
            if (X.warnings.length > 0) (console.log(`${B1.warning} Found ${X.warnings.length} warning${X.warnings.length === 1 ? "" : "s"}:
`), X.warnings.forEach((I)=>{
                console.log(`  ${B1.pointer} ${I.path}: ${I.message}`);
            }), console.log(""));
            if (X.success) {
                if (X.warnings.length > 0) console.log(`${B1.tick} Validation passed with warnings`);
                else console.log(`${B1.tick} Validation passed`);
                process.exit(0);
            } else (console.log(`${B1.cross} Validation failed`), process.exit(1));
        } catch (X) {
            (t(X instanceof Error ? X : Error(String(X))), console.error(`${B1.cross} Unexpected error during validation: ${X instanceof Error ? X.message : String(X)}`), process.exit(2));
        }
    });
    let Z = G.command("marketplace").description("Manage Claude Code marketplaces").helpOption("-h, --help", "Display help for command");
    (Z.command("add <source>").description("Add a marketplace from a URL, path, or GitHub repo").helpOption("-h, --help", "Display help for command").action(async (J)=>{
        try {
            let X = RD1(J);
            if (!X) (console.error(`${B1.cross} Invalid marketplace source format. Try: owner/repo, https://..., or ./path`), process.exit(1));
            if ("error" in X) (console.error(`${B1.cross} ${X.error}`), process.exit(1));
            let I = X;
            console.log("Adding marketplace...");
            let { name: W } = await zP(I, (V)=>{
                console.log(V);
            });
            IY();
            let K = I.source;
            if (I.source === "github") K = I.repo;
            (r("tengu_marketplace_added", {
                source_type: K
            }), console.log(`${B1.tick} Successfully added marketplace: ${W}`), process.exit(0));
        } catch (X) {
            B(X, "add marketplace");
        }
    }), Z.command("list").description("List all configured marketplaces").helpOption("-h, --help", "Display help for command").action(async ()=>{
        try {
            let J = await v5(), X = Object.keys(J);
            if (X.length === 0) (console.log("No marketplaces configured"), process.exit(0));
            (console.log(`Configured marketplaces:
`), X.forEach((I)=>{
                let W = J[I];
                if ((console.log(`  ${B1.pointer} ${I}`), W?.source)) {
                    let K = W.source;
                    if (K.source === "github") console.log(`    Source: GitHub (${K.repo})`);
                    else if (K.source === "git") console.log(`    Source: Git (${K.url})`);
                    else if (K.source === "url") console.log(`    Source: URL (${K.url})`);
                    else if (K.source === "directory") console.log(`    Source: Directory (${K.path})`);
                    else if (K.source === "file") console.log(`    Source: File (${K.path})`);
                }
                console.log("");
            }), process.exit(0));
        } catch (J) {
            B(J, "list marketplaces");
        }
    }), Z.command("remove <name>").alias("rm").description("Remove a configured marketplace").helpOption("-h, --help", "Display help for command").action(async (J)=>{
        try {
            (await c61(J), IY(), r("tengu_marketplace_removed", {
                marketplace_name: J
            }), console.log(`${B1.tick} Successfully removed marketplace: ${J}`), process.exit(0));
        } catch (X) {
            B(X, "remove marketplace");
        }
    }), Z.command("update [name]").description("Update marketplace(s) from their source - updates all if no name specified").helpOption("-h, --help", "Display help for command").action(async (J)=>{
        try {
            if (J) (console.log(`Updating marketplace: ${J}...`), await ja(J, (X)=>{
                console.log(X);
            }), IY(), r("tengu_marketplace_updated", {
                marketplace_name: J
            }), console.log(`${B1.tick} Successfully updated marketplace: ${J}`), process.exit(0));
            else {
                let X = await v5(), I = Object.keys(X);
                if (I.length === 0) (console.log("No marketplaces configured"), process.exit(0));
                (console.log(`Updating ${I.length} marketplace(s)...`), await SlB(), IY(), r("tengu_marketplace_updated_all", {
                    count: I.length
                }), console.log(`${B1.tick} Successfully updated ${I.length} marketplace(s)`), process.exit(0));
            }
        } catch (X) {
            B(X, "update marketplace(s)");
        }
    }), G.command("install <plugin>").alias("i").description("Install a plugin from available marketplaces (use plugin@marketplace for specific marketplace)").option("-s, --scope <scope>", "Installation scope: user, project, or local", "user").helpOption("-h, --help", "Display help for command").action(async (J, X)=>{
        let I = X.scope || "user";
        if (!f$.includes(I)) (console.error(`Invalid scope: ${I}. Must be one of: ${f$.join(", ")}.`), process.exit(1));
        (r("tengu_plugin_install_command", {
            plugin: J,
            scope: I
        }), await cD9(J, I));
    }), G.command("uninstall <plugin>").alias("remove").alias("rm").description("Uninstall an installed plugin").option("-s, --scope <scope>", "Uninstall from scope: user, project, or local", "user").helpOption("-h, --help", "Display help for command").action(async (J, X)=>{
        let I = X.scope || "user";
        if (!f$.includes(I)) (console.error(`Invalid scope: ${I}. Must be one of: ${f$.join(", ")}.`), process.exit(1));
        (r("tengu_plugin_uninstall_command", {
            plugin: J,
            scope: I
        }), await pD9(J, I));
    }), G.command("enable <plugin>").description("Enable a disabled plugin").option("-s, --scope <scope>", `Installation scope: ${f$.join(", ")} (default: user)`).helpOption("-h, --help", "Display help for command").action(async (J, X)=>{
        let I = "user";
        if (X.scope) {
            if (!f$.includes(X.scope)) (process.stderr.write(`Invalid scope "${X.scope}". Valid scopes: ${f$.join(", ")}
`), process.exit(1));
            I = X.scope;
        }
        (r("tengu_plugin_enable_command", {
            plugin: J,
            scope: I
        }), await lD9(J, I));
    }), G.command("disable <plugin>").description("Disable an enabled plugin").option("-s, --scope <scope>", `Installation scope: ${f$.join(", ")} (default: user)`).helpOption("-h, --help", "Display help for command").action(async (J, X)=>{
        let I = "user";
        if (X.scope) {
            if (!f$.includes(X.scope)) (process.stderr.write(`Invalid scope "${X.scope}". Valid scopes: ${f$.join(", ")}
`), process.exit(1));
            I = X.scope;
        }
        (r("tengu_plugin_disable_command", {
            plugin: J,
            scope: I
        }), await iD9(J, I));
    }), G.command("update <plugin>").description("Update a plugin to the latest version (restart required to apply)").option("-s, --scope <scope>", `Installation scope: ${OfA.join(", ")} (default: user)`).helpOption("-h, --help", "Display help for command").action(async (J, X)=>{
        r("tengu_plugin_update_command", {});
        let I = "user";
        if (X.scope) {
            if (!OfA.includes(X.scope)) (process.stderr.write(`Invalid scope "${X.scope}". Valid scopes: ${OfA.join(", ")}
`), process.exit(1));
            I = X.scope;
        }
        await nD9(J, I);
    }), A.command("setup-token").description("Set up a long-lived authentication token (requires Claude subscription)").helpOption("-h, --help", "Display help for command").action(async ()=>{
        if ((r("tengu_setup_token_command", {}), await wI(), !hU())) (process.stderr.write(V1.yellow(`Warning: You already have authentication configured via environment variable or API key helper.
`)), process.stderr.write(V1.yellow(`The setup-token command will create a new OAuth token which you can use instead.
`)));
        (await new Promise(async (J)=>{
            let { unmount: X } = await p3(u5.default.createElement(E5, {
                onChangeAppState: Wc
            }, u5.default.createElement(T, {
                flexDirection: "column",
                gap: 1
            }, u5.default.createElement(qi, {
                items: [
                    u5.default.createElement(_F1, {
                        key: "welcome"
                    })
                ]
            }, (I)=>I), u5.default.createElement(Jr, {
                onDone: ()=>{
                    (X(), J());
                },
                mode: "setup-token",
                startingMessage: "This will guide you through long-lived (1-year) auth token setup for your Claude account. Claude subscription required."
            }))));
        }), process.exit(0));
    }));
    function Y({ onDone: J }) {
        return (bV1(), u5.default.createElement(rH1, {
            onDone: J
        }));
    }
    return (A.command("doctor").description("Check the health of your Claude Code auto-updater").helpOption("-h, --help", "Display help for command").action(async ()=>{
        (r("tengu_doctor_command", {}), await new Promise(async (J)=>{
            let { unmount: X } = await p3(u5.default.createElement(E5, null, u5.default.createElement(_K1, {
                dynamicMcpConfig: void 0,
                isStrictMcpConfig: !1
            }, u5.default.createElement(Y, {
                onDone: ()=>{
                    (X(), J());
                }
            }))), {
                exitOnCtrlC: !1
            });
        }), process.exit(0));
    }), A.command("update").description("Check for updates and install if available").helpOption("-h, --help", "Display help for command").action(eF9), A.command("install [target]").description("Install Claude Code native build. Use [target] to specify version (stable, latest, or specific version)").option("--force", "Force installation even if already installed").helpOption("-h, --help", "Display help for command").action(async (J, X)=>{
        (await kF1(O_0(), "default", !1, !1, void 0), await new Promise((I)=>{
            let W = [];
            if (J) W.push(J);
            if (X.force) W.push("--force");
            BE9.call((K)=>{
                (I(), process.exit(K.includes("failed") ? 1 : 0));
            }, {}, W);
        }));
    }), k9("run_before_parse"), await A.parseAsync(process.argv), k9("run_after_parse"), k9("main_after_run"), DS0(), A);
}
async function fV7({ hasInitialPrompt: A, hasStdin: Q, verbose: B, debug: G, debugToStderr: Z, print: Y, outputFormat: J, inputFormat: X, numAllowedTools: I, numDisallowedTools: W, mcpClientCount: K, worktree: V, skipWebFetchPreflight: H, githubActionInputs: D, dangerouslySkipPermissionsPassed: F, modeIsBypass: E, allowDangerouslySkipPermissionsPassed: z, systemPromptFlag: $, appendSystemPromptFlag: O }) {
    try {
        let N = await UYB();
        r("tengu_init", {
            entrypoint: "claude",
            hasInitialPrompt: A,
            hasStdin: Q,
            verbose: B,
            debug: G,
            debugToStderr: Z,
            print: Y,
            outputFormat: J,
            inputFormat: X,
            numAllowedTools: I,
            numDisallowedTools: W,
            mcpClientCount: K,
            worktree: V,
            skipWebFetchPreflight: H,
            ...(D && {
                githubActionInputs: D
            }),
            dangerouslySkipPermissionsPassed: F,
            modeIsBypass: E,
            allowDangerouslySkipPermissionsPassed: z,
            ...($ && {
                systemPromptFlag: $
            }),
            ...(O && {
                appendSystemPromptFlag: O
            }),
            ...(N && {
                rh: N
            })
        });
    } catch (N) {
        t(N instanceof Error ? N : Error(String(N)));
    }
}
function bV7() {
    (process.stderr.isTTY ? process.stderr : process.stdout.isTTY ? process.stdout : void 0)?.write(T1A);
}
var u5;
