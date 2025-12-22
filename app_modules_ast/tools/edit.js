// Module: FX9
// Type: L
// Lines: 504356-504870
//
var prepareToHydrateHostInstance = L(()=>{
    n2();
    Jf();
    i0();
    FbA = Y0(function(A) {
        return {
            PreToolUse: {
                summary: "Before tool execution",
                description: `Input to command is JSON of tool call arguments.
Exit code 0 - stdout/stderr not shown
Exit code 2 - show stderr to model and block tool call
Other exit codes - show stderr to user only but continue with tool call`,
                matcherMetadata: {
                    fieldToMatch: "tool_name",
                    values: A
                }
            },
            PostToolUse: {
                summary: "After tool execution",
                description: `Input to command is JSON with fields "inputs" (tool call arguments) and "response" (tool call response).
Exit code 0 - stdout shown in transcript mode (ctrl+o)
Exit code 2 - show stderr to model immediately
Other exit codes - show stderr to user only`,
                matcherMetadata: {
                    fieldToMatch: "tool_name",
                    values: A
                }
            },
            PostToolUseFailure: {
                summary: "After tool execution fails",
                description: `Input to command is JSON with tool_name, tool_input, tool_use_id, error, error_type, is_interrupt, and is_timeout.
Exit code 0 - stdout shown in transcript mode (ctrl+o)
Exit code 2 - show stderr to model immediately
Other exit codes - show stderr to user only`,
                matcherMetadata: {
                    fieldToMatch: "tool_name",
                    values: A
                }
            },
            Notification: {
                summary: "When notifications are sent",
                description: `Input to command is JSON with notification message and type.
Exit code 0 - stdout/stderr not shown
Other exit codes - show stderr to user only`,
                matcherMetadata: {
                    fieldToMatch: "notification_type",
                    values: [
                        "permission_prompt",
                        "idle_prompt",
                        "auth_success",
                        "elicitation_dialog"
                    ]
                }
            },
            UserPromptSubmit: {
                summary: "When the user submits a prompt",
                description: `Input to command is JSON with original user prompt text.
Exit code 0 - stdout shown to Claude
Exit code 2 - block processing, erase original prompt, and show stderr to user only
Other exit codes - show stderr to user only`
            },
            SessionStart: {
                summary: "When a new session is started",
                description: `Input to command is JSON with session start source.
Exit code 0 - stdout shown to Claude
Blocking errors are ignored
Other exit codes - show stderr to user only`,
                matcherMetadata: {
                    fieldToMatch: "source",
                    values: [
                        "startup",
                        "resume",
                        "clear",
                        "compact"
                    ]
                }
            },
            Stop: {
                summary: "Right before Claude concludes its response",
                description: `Exit code 0 - stdout/stderr not shown
Exit code 2 - show stderr to model and continue conversation
Other exit codes - show stderr to user only`
            },
            SubagentStart: {
                summary: "When a subagent (Task tool call) is started",
                description: `Input to command is JSON with agent_id and agent_type.
Exit code 0 - stdout shown to subagent
Blocking errors are ignored
Other exit codes - show stderr to user only`,
                matcherMetadata: {
                    fieldToMatch: "agent_type",
                    values: []
                }
            },
            SubagentStop: {
                summary: "Right before a subagent (Task tool call) concludes its response",
                description: `Exit code 0 - stdout/stderr not shown
Exit code 2 - show stderr to subagent and continue having it run
Other exit codes - show stderr to user only`
            },
            PreCompact: {
                summary: "Before conversation compaction",
                description: `Input to command is JSON with compaction details.
Exit code 0 - stdout appended as custom compact instructions
Exit code 2 - block compaction
Other exit codes - show stderr to user only but continue with compaction`,
                matcherMetadata: {
                    fieldToMatch: "trigger",
                    values: [
                        "manual",
                        "auto"
                    ]
                }
            },
            SessionEnd: {
                summary: "When a session is ending",
                description: `Input to command is JSON with session end reason.
Exit code 0 - command completes successfully
Other exit codes - show stderr to user only`,
                matcherMetadata: {
                    fieldToMatch: "reason",
                    values: [
                        "clear",
                        "logout",
                        "prompt_input_exit",
                        "other"
                    ]
                }
            },
            PermissionRequest: {
                summary: "When a permission dialog is displayed",
                description: `Input to command is JSON with tool_name, tool_input, and tool_use_id.
Output JSON with hookSpecificOutput containing decision to allow or deny.
Exit code 0 - use hook decision if provided
Other exit codes - show stderr to user only`,
                matcherMetadata: {
                    fieldToMatch: "tool_name",
                    values: A
                }
            }
        };
    });
});
function CX9({ toolNames: A, onExit: Q }) {
    let [B, G] = gI.useState([]), [Z, Y] = gI.useState({
        mode: "select-event"
    }), [J, X] = gI.useState(0), [I, W] = gI.useState(()=>{
        return (HQ()?.disableAllHooks === !0 && uB("policySettings")?.disableAllHooks === !0);
    }), [K, V] = gI.useState(()=>{
        return uB("policySettings")?.allowManagedHooksOnly === !0;
    });
    FYA((KA)=>{
        if (KA === "policySettings") {
            let _A = HQ()?.disableAllHooks === !0;
            (W(_A && uB("policySettings")?.disableAllHooks === !0), V(uB("policySettings")?.allowManagedHooksOnly === !0));
        }
    });
    let [H, D] = gI.useState(""), [F, E] = gI.useState(""), z = Z.mode, $ = "event" in Z ? Z.event : "PreToolUse", O = "matcher" in Z ? Z.matcher : null, [N] = IQ(), { mcp: M } = N, R = gI.useMemo(()=>[
            ...A,
            ...M.tools.map((KA)=>KA.name)
        ], [
        A,
        M.tools
    ]), j = gI.useMemo(()=>KX9(N, R), [
        R,
        J,
        N
    ]), P = gI.useMemo(()=>VX9(j, $), [
        j,
        $
    ]), f = gI.useMemo(()=>HX9(j, $, O), [
        j,
        $,
        O
    ]), y = qQ();
    _1((KA, OA)=>{
        if (z === "save-hook") return;
        if (OA.escape) {
            switch(z){
                case "select-event":
                    if (B.length > 0) Q(B.join(`
`));
                    else Q("Hooks dialog dismissed", {
                        display: "system"
                    });
                    break;
                case "select-matcher":
                    Y({
                        mode: "select-event"
                    });
                    break;
                case "add-matcher":
                    if ("event" in Z) Y({
                        mode: "select-matcher",
                        event: Z.event,
                        matcherMetadata: Z.matcherMetadata
                    });
                    E("");
                    break;
                case "delete-matcher":
                    if ("event" in Z) Y({
                        mode: "select-matcher",
                        event: Z.event,
                        matcherMetadata: Z.matcherMetadata
                    });
                    break;
                case "select-hook":
                    if ("event" in Z) {
                        let _A = ad(Z.event, R);
                        if (_A !== void 0) Y({
                            mode: "select-matcher",
                            event: Z.event,
                            matcherMetadata: _A
                        });
                        else Y({
                            mode: "select-event"
                        });
                    }
                    break;
                case "add-hook":
                    if ("event" in Z && "matcher" in Z) Y({
                        mode: "select-hook",
                        event: Z.event,
                        matcher: Z.matcher
                    });
                    D("");
                    break;
                case "delete-hook":
                    if ("event" in Z && Z.mode === "delete-hook") {
                        let { hook: _A } = Z;
                        Y({
                            mode: "select-hook",
                            event: Z.event,
                            matcher: _A.matcher || ""
                        });
                    }
                    break;
            }
            return;
        }
        switch(z){
            case "select-event":
                if (OA.return) {
                    let _A = $, e = ad(_A, R);
                    if (e !== void 0) Y({
                        mode: "select-matcher",
                        event: _A,
                        matcherMetadata: e
                    });
                    else Y({
                        mode: "select-hook",
                        event: _A,
                        matcher: ""
                    });
                }
                break;
            case "add-matcher":
                if (OA.return && F.trim() && "event" in Z) Y({
                    mode: "select-hook",
                    event: Z.event,
                    matcher: F.trim()
                });
                break;
            case "add-hook":
                if (OA.return && H.trim() && "event" in Z && "matcher" in Z) {
                    let _A = {
                        event: Z.event,
                        config: {
                            type: "command",
                            command: H.trim()
                        },
                        matcher: ad(Z.event, R) !== void 0 ? Z.matcher : ""
                    };
                    Y({
                        mode: "save-hook",
                        event: Z.event,
                        hookToSave: _A
                    });
                }
                break;
            case "delete-matcher":
            case "delete-hook":
            case "select-matcher":
            case "select-hook":
                break;
        }
    });
    let m = gI.useCallback(()=>{
        if (Z.mode === "save-hook") {
            let { hookToSave: KA } = Z;
            (G((OA)=>[
                    ...OA,
                    `Added ${KA.event} hook: ${V1.bold(c$(KA.config))}`
                ]), Y({
                mode: "select-hook",
                event: KA.event,
                matcher: KA.matcher
            }));
        }
        (D(""), X((KA)=>KA + 1));
    }, [
        Z
    ]), g = gI.useCallback(()=>{
        if (Z.mode === "save-hook") {
            let { hookToSave: KA } = Z;
            Y({
                mode: "select-hook",
                event: KA.event,
                matcher: KA.matcher
            });
        }
        D("");
    }, [
        Z
    ]), s = gI.useCallback(async ()=>{
        if (Z.mode !== "delete-hook") return;
        let { hook: KA, event: OA } = Z;
        (await UX9(KA), G((VA)=>[
                ...VA,
                `Deleted ${KA.event} hook: ${V1.bold(c$(KA.config))}`
            ]), X((VA)=>VA + 1));
        let _A = KA.matcher || "", e = j[OA]?.[_A]?.filter((VA)=>!IxA(VA.config, KA.config));
        if (!e || e.length === 0) {
            let VA = ad(OA, R);
            if (VA !== void 0) Y({
                mode: "select-matcher",
                event: OA,
                matcherMetadata: VA
            });
            else Y({
                mode: "select-event"
            });
        } else Y({
            mode: "select-hook",
            event: OA,
            matcher: _A
        });
    }, [
        Z,
        j,
        R
    ]), p = gI.useCallback(()=>{
        if (Z.mode === "delete-matcher") {
            let { matcher: KA, event: OA } = Z;
            (G((_A)=>[
                    ..._A,
                    `Deleted matcher: ${V1.bold(KA)}`
                ]), Y({
                mode: "select-matcher",
                event: OA,
                matcherMetadata: Z.matcherMetadata
            }));
        }
    }, [
        Z
    ]), v = FbA(R), d = wX9();
    gI.useEffect(()=>{
        EbA();
    }, []);
    let YA = HQ()?.disableAllHooks === !0, jA = gI.useCallback(()=>{
        Q(B.length > 0 ? B.join(`
`) : "Hooks dialog dismissed", {
            display: B.length === 0 ? "system" : void 0
        });
    }, [
        B,
        Q
    ]), yA = gI.useMemo(()=>Object.values(j).reduce((KA, OA)=>{
            return KA + Object.values(OA).reduce((_A, e)=>_A + e.length, 0);
        }, 0), [
        j
    ]);
    if (YA) return T9.createElement(T9.Fragment, null, T9.createElement(T, {
        flexDirection: "column",
        borderStyle: "round",
        paddingLeft: 1,
        paddingRight: 1,
        borderColor: "warning"
    }, T9.createElement(T, {
        flexDirection: "column",
        marginBottom: 1
    }, T9.createElement(T, null, T9.createElement(C, {
        bold: !0,
        color: "warning"
    }, "Hook Configuration - Disabled")), T9.createElement(T, {
        flexDirection: "column",
        marginTop: 1
    }, T9.createElement(C, null, "All hooks are currently ", T9.createElement(C, {
        color: "error"
    }, "disabled"), I && " by a managed settings file", ". You have", " ", T9.createElement(C, {
        bold: !0
    }, yA), " configured hook", yA !== 1 ? "s" : "", " that", " ", yA !== 1 ? "are" : "is", " not running."), T9.createElement(T, {
        marginTop: 1
    }, T9.createElement(C, null, "When hooks are disabled:")), T9.createElement(C, null, "• No hook commands will execute"), T9.createElement(C, null, "• StatusLine will not be displayed"), T9.createElement(C, null, "• Tool operations will proceed without hook validation"))), !I && T9.createElement(T, {
        flexDirection: "column"
    }, T9.createElement(C, {
        bold: !0
    }, "Options:"), T9.createElement(T0, {
        options: [
            {
                label: "Re-enable all hooks",
                value: "enable"
            },
            {
                label: "Exit",
                value: "exit"
            }
        ],
        onChange: (KA)=>{
            if (KA === "enable") (Q2("localSettings", {
                disableAllHooks: !1
            }), Q("Re-enabled all hooks"));
            else jA();
        },
        onCancel: jA
    }))), T9.createElement(T, {
        marginLeft: 3
    }, T9.createElement(C, {
        dimColor: !0
    }, I ? "Esc to cancel" : "Enter to select · Esc to cancel")));
    switch(Z.mode){
        case "save-hook":
            return T9.createElement(lJ9, {
                event: Z.hookToSave.event,
                eventSummary: v[Z.hookToSave.event].summary,
                config: Z.hookToSave.config,
                matcher: Z.hookToSave.matcher,
                onSuccess: m,
                onCancel: g
            });
        case "select-event":
            return T9.createElement(aJ9, {
                hookEventMetadata: v,
                exitStatePending: y.pending,
                exitStateKeyName: y.keyName || void 0,
                configDifference: d,
                restrictedByPolicy: K,
                onSelectEvent: (KA)=>{
                    if (KA === "disable-all") (Q2("localSettings", {
                        disableAllHooks: !0
                    }), Q("All hooks have been disabled"));
                    else {
                        let OA = ad(KA, R);
                        if (OA !== void 0) Y({
                            mode: "select-matcher",
                            event: KA,
                            matcherMetadata: OA
                        });
                        else Y({
                            mode: "select-hook",
                            event: KA,
                            matcher: ""
                        });
                    }
                }
            });
        case "select-matcher":
            return T9.createElement(rJ9, {
                selectedEvent: Z.event,
                matchersForSelectedEvent: P,
                hooksByEventAndMatcher: j,
                eventDescription: v[Z.event].description,
                onSelect: (KA)=>{
                    if (KA === null) Y({
                        mode: "add-matcher",
                        event: Z.event,
                        matcherMetadata: Z.matcherMetadata
                    });
                    else if ((j[Z.event]?.[KA] || []).length === 0) Y({
                        mode: "delete-matcher",
                        event: Z.event,
                        matcher: KA,
                        matcherMetadata: Z.matcherMetadata
                    });
                    else Y({
                        mode: "select-hook",
                        event: Z.event,
                        matcher: KA
                    });
                },
                onCancel: ()=>{
                    Y({
                        mode: "select-event"
                    });
                }
            });
        case "add-matcher":
            return T9.createElement(eJ9, {
                selectedEvent: Z.event,
                newMatcher: F,
                onChangeNewMatcher: E,
                eventDescription: v[Z.event].description,
                matcherMetadata: Z.matcherMetadata
            });
        case "delete-matcher":
            return T9.createElement(GX9, {
                selectedMatcher: Z.matcher,
                selectedEvent: Z.event,
                onDelete: p,
                onCancel: ()=>Y({
                        mode: "select-matcher",
                        event: Z.event,
                        matcherMetadata: Z.matcherMetadata
                    })
            });
        case "select-hook":
            return T9.createElement(YX9, {
                selectedEvent: Z.event,
                selectedMatcher: Z.matcher,
                hooksForSelectedMatcher: f,
                hookEventMetadata: v[Z.event],
                onSelect: (KA)=>{
                    if (KA === null) Y({
                        mode: "add-hook",
                        event: Z.event,
                        matcher: Z.matcher
                    });
                    else Y({
                        mode: "delete-hook",
                        event: Z.event,
                        hook: KA
                    });
                },
                onCancel: ()=>{
                    let KA = ad(Z.event, R);
                    if (KA !== void 0) Y({
                        mode: "select-matcher",
                        event: Z.event,
                        matcherMetadata: KA
                    });
                    else Y({
                        mode: "select-event"
                    });
                }
            });
        case "add-hook":
            return T9.createElement(QX9, {
                selectedEvent: Z.event,
                selectedMatcher: Z.matcher,
                eventDescription: DX9(Z.event, R),
                fullDescription: v[Z.event].description,
                supportsMatcher: ad(Z.event, R) !== void 0,
                command: H,
                onChangeCommand: D
            });
        case "delete-hook":
            return T9.createElement(XX9, {
                selectedHook: Z.hook,
                eventSupportsMatcher: ad(Z.event, R) !== void 0,
                onDelete: s,
                onCancel: ()=>{
                    let { event: KA, hook: OA } = Z;
                    Y({
                        mode: "select-hook",
                        event: KA,
                        matcher: OA.matcher || ""
                    });
                }
            });
    }
}
var T9, gI;
