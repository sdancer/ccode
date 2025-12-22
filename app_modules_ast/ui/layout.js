// Module: ee2
// Type: L
// Lines: 466159-466915
//
var createRenderState = L(()=>{
    bA();
    K8();
    N9();
    _I();
    U4();
    b6();
    W7 = l(React runtime(), 1);
});
import * as AA9 from "path";
function VQ7({ debug: A, ideSelection: Q, toolPermissionContext: B, setToolPermissionContext: G, apiKeyStatus: Z, commands: Y, agents: J, isLoading: X, verbose: I, messages: W, onAutoUpdaterResult: K, autoUpdaterResult: V, input: H, onInputChange: D, mode: F, onModeChange: E, stashedPrompt: z, setStashedPrompt: $, submitCount: O, onShowMessageSelector: N, mcpClients: M, pastedContents: R, setPastedContents: j, vimMode: P, setVimMode: f, showBashesDialog: y, setShowBashesDialog: m, showDiffDialog: g, setShowDiffDialog: s, tasksSelected: p, setTasksSelected: v, diffSelected: d, setDiffSelected: AA, onExit: YA, getToolUseContext: jA, onSubmit: yA, isSearchingHistory: KA, setIsSearchingHistory: OA }) {
    let _A = Hs(), [e, VA] = x3.useState(!1), [WA, xA] = x3.useState({
        show: !1
    }), [MA, nA] = x3.useState(H.length), [ZA, zA] = IQ(), { historyQuery: LA, setHistoryQuery: UA, historyMatch: $A, historyFailedMatch: RA } = ne2((CA)=>{
        let TA = typeof CA === "string" ? CA : CA.display;
        t2(TA);
    }, H, D, nA, MA, E, F, KA, OA), mA = x3.useMemo(()=>{
        let CA = Object.keys(R).map(Number);
        if (CA.length === 0) return 1;
        return Math.max(...CA) + 1;
    }, [
        R
    ]), [hA, Y1] = x3.useState(!1), [C1, PA] = x3.useState(!1), [Q1, o1] = x3.useState(!1), [S1, B0] = x3.useState(!1), [YQ, GQ] = x3.useState(!1), [KQ, b1] = x3.useState(!1), [F0, A1] = x3.useState(!1), K1 = x3.useMemo(()=>{
        if (!ZA.teamContext) return [];
        let CA = Object.values(ZA.teamContext.teammates).filter((TA)=>TA.name !== "team-lead").length;
        return [
            {
                name: ZA.teamContext.teamName,
                memberCount: CA,
                runningCount: 0,
                idleCount: 0
            }
        ];
    }, [
        ZA.teamContext
    ]), { suggestion: y1, markAccepted: Z0, logOutcomeAtSubmission: _0, markShown: O0 } = re2({
        inputValue: H,
        isAssistantResponding: X
    }), DA = x3.useMemo(()=>(KA && $A ? g1A(typeof $A === "string" ? $A : $A.display) : H), [
        KA,
        $A,
        H
    ]), wA = x3.useMemo(()=>lY1(DA), [
        DA
    ]), I1 = x3.useMemo(()=>Pn2(DA), [
        DA
    ]), E1 = x3.useMemo(()=>{
        let CA = [];
        if (KA && $A && !RA) CA.push({
            start: MA,
            end: MA + LA.length,
            style: {
                type: "solid",
                color: "warning"
            },
            priority: 20
        });
        if (wA.length > 0) {
            let TA = YxA(DA);
            if (TA.level !== "none") {
                let kA = GxA[TA.level], H1 = aN2[TA.level];
                for (let L1 of wA)CA.push({
                    start: L1.start,
                    end: L1.end,
                    style: ZxA(L1.word) ? {
                        type: "rainbow",
                        useShimmer: !0
                    } : {
                        type: "shimmer",
                        baseColor: kA,
                        shimmerColor: H1
                    },
                    priority: 10
                });
            }
        }
        for (let TA of I1)CA.push({
            start: TA.start,
            end: TA.end,
            style: {
                type: "solid",
                color: "warning"
            },
            priority: 15
        });
        return CA;
    }, [
        KA,
        LA,
        $A,
        RA,
        MA,
        wA,
        I1,
        DA
    ]), { addNotification: F1, removeNotification: z1 } = z5();
    x3.useEffect(()=>{
        if (!wA.length) return;
        if (wA.length && !ZA.thinkingEnabled) F1({
            key: "thinking-toggled-via-keyword",
            jsx: s2.createElement(C, {
                color: "suggestion"
            }, "Thinking on"),
            priority: "immediate",
            timeoutMs: 3000
        });
    }, [
        F1,
        ZA.thinkingEnabled,
        zA,
        wA.length
    ]);
    let W0 = x3.useRef(H.length), e1 = x3.useRef(H.length), P0 = x3.useCallback(()=>{
        z1("stash-hint");
    }, [
        z1
    ]);
    x3.useEffect(()=>{
        let CA = W0.current, TA = e1.current, kA = H.length;
        if (((W0.current = kA), kA > TA)) {
            e1.current = kA;
            return;
        }
        if (kA === 0) {
            e1.current = 0;
            return;
        }
        let H1 = TA >= 20 && kA <= 5, L1 = CA >= 20 && kA <= 5;
        if (H1 && !L1) {
            if (!v1().hasUsedStash) F1({
                key: "stash-hint",
                jsx: s2.createElement(C, {
                    dimColor: !0
                }, "Tip: ", s2.createElement(I0, {
                    shortcut: "ctrl+s",
                    action: "stash"
                })),
                priority: "immediate",
                timeoutMs: EK1
            });
            e1.current = kA;
        }
    }, [
        H.length,
        F1
    ]);
    let { pushToBuffer: wQ, undo: TB, canUndo: XB, clearBuffer: b2 } = jn2({
        maxBufferSize: 50,
        debounceMs: 1000
    });
    Pe2({
        input: H,
        pastedContents: R,
        onInputChange: D,
        setCursorOffset: nA,
        setPastedContents: j
    });
    let $9 = fe2({
        input: H,
        submitCount: O
    }), x0 = x3.useCallback((CA)=>{
        if (CA === "?") {
            (r("tengu_help_toggled", {}), Y1((k1)=>!k1));
            return;
        }
        (Y1(!1), P0(), bN2());
        let TA = CA.length === H.length + 1, kA = MA === 0, H1 = qg(CA);
        if (TA && kA && H1 !== "prompt") {
            E(H1);
            return;
        }
        let L1 = CA.replaceAll("\t", "    ");
        if (H !== L1) wQ(H, MA, R);
        (v(!1), AA(!1), PA(!1), D(L1));
    }, [
        D,
        E,
        H,
        MA,
        wQ,
        R,
        v,
        AA,
        PA,
        P0
    ]), { resetHistory: rQ, onHistoryUp: O2, onHistoryDown: u9, dismissSearchHint: X1, historyIndex: cA } = vl2((CA, TA, kA)=>{
        (x0(CA), E(TA), j(kA));
    }, H, R, nA);
    x3.useEffect(()=>{
        if (KA) X1();
    }, [
        KA,
        X1
    ]);
    function $1(CA) {
        (v(CA === "tasks"), AA(CA === "diff"));
    }
    function r1() {
        if (i2.length > 1) return;
        if (ZA.queuedCommands.some((TA)=>N51(TA.mode))) {
            W4();
            return;
        }
        if (d) {
            if (Object.values(ZA.tasks).filter((kA)=>kA.status === "running").length > 0) $1("tasks");
            else if (K1.length > 0) (PA(!0), $1("none"));
            else $1("none");
            return;
        }
        if (C1) {
            let TA = Object.values(ZA.tasks).filter((kA)=>kA.status === "running").length;
            (PA(!1), $1(TA > 0 ? "tasks" : "none"));
            return;
        }
        if (p) $1("none");
        else O2();
    }
    function C0() {
        if (i2.length > 1) return;
        let CA = Object.values(ZA.tasks).filter((H1)=>H1.status === "running").length;
        if (p) {
            if (K1.length > 0) (PA(!0), $1("none"));
            return;
        }
        if (C1) return;
        if (d) return;
        let TA = u9(), kA = K1.length > 0;
        if (TA) {
            if (CA > 0) {
                if (($1("tasks"), PA(!1), !v1().hasSeenTasksHint)) n0((L1)=>{
                    if (L1.hasSeenTasksHint === !0) return L1;
                    return {
                        ...L1,
                        hasSeenTasksHint: !0
                    };
                });
            } else if (kA) (PA(!0), $1("none"));
        }
    }
    let [yQ, nB] = x3.useState({
        suggestions: [],
        selectedSuggestion: -1,
        commandArgumentHint: void 0
    }), t2 = x3.useCallback(async (CA, TA = !1)=>{
        if (p || C1 || d) return;
        if (CA.trim() === "" && ZA.promptSuggestion.text && ZA.promptSuggestion.shownAt > 0) (Z0(), (CA = ZA.promptSuggestion.text));
        if (CA.trim() === "") return;
        let kA = yQ.suggestions.length > 0 && yQ.suggestions.every((H1)=>H1.description === "directory");
        if (yQ.suggestions.length > 0 && !TA && !kA) return;
        if (ZA.promptSuggestion.text && ZA.promptSuggestion.shownAt > 0) _0(CA);
        (z1("stash-hint"), await yA(CA, {
            setCursorOffset: nA,
            clearBuffer: b2,
            resetHistory: rQ
        }));
    }, [
        ZA.promptSuggestion,
        p,
        C1,
        d,
        yQ.suggestions,
        yA,
        b2,
        rQ,
        _0,
        Z0,
        z1
    ]), { suggestions: i2, selectedSuggestion: t4, commandArgumentHint: U9 } = di2({
        commands: Y,
        onInputChange: D,
        onSubmit: t2,
        setCursorOffset: nA,
        input: H,
        cursorOffset: MA,
        mode: F,
        agents: J,
        setSuggestionsState: nB,
        suggestionsState: yQ,
        suppressSuggestions: KA || cA > 0,
        markAccepted: Z0
    }), U6 = F === "prompt" && i2.length === 0 && y1;
    if (U6) O0();
    if (ZA.promptSuggestion.text && !y1 && ZA.promptSuggestion.shownAt === 0) (tyA("timing", ZA.promptSuggestion.text), zA((CA)=>({
            ...CA,
            promptSuggestion: {
                text: null,
                shownAt: 0,
                acceptedAt: 0
            }
        })));
    function u6(CA, TA, kA) {
        (r("tengu_paste_image", {}), E("prompt"));
        let H1 = {
            id: mA,
            type: "image",
            content: CA,
            mediaType: TA || "image/png",
            dimensions: kA
        };
        (j((L1)=>({
                ...L1,
                [mA]: H1
            })), S9(TtA(H1.id)));
    }
    function v4(CA) {
        let TA = yX(CA).replace(/\r/g, `
`).replaceAll("\t", "    "), kA = jtA(TA), H1 = Math.min(m6 - 10, 2);
        if (TA.length > UtA || kA > H1) {
            let L1 = {
                id: mA,
                type: "text",
                content: TA
            };
            (j((k1)=>({
                    ...k1,
                    [mA]: L1
                })), S9(R7B(L1.id, kA)));
        } else S9(TA);
    }
    function S9(CA) {
        wQ(H, MA, R);
        let TA = H.slice(0, MA) + CA + H.slice(MA);
        (D(TA), nA(MA + CA.length));
    }
    let A8 = Fg(()=>{}, ()=>N()), W4 = x3.useCallback(async ()=>{
        let CA = await L51(H, MA, async ()=>new Promise((TA)=>zA((kA)=>{
                    return (TA(kA), kA);
                })), zA);
        if (!CA) return !1;
        return (D(CA.text), E("prompt"), nA(CA.cursorOffset), !0);
    }, [
        zA,
        D,
        E,
        H,
        MA
    ]);
    (Rn2(M, function(CA) {
        r("tengu_ext_at_mentioned", {});
        let TA, kA = AA9.relative(i1(), CA.filePath);
        if (CA.lineStart && CA.lineEnd) TA = CA.lineStart === CA.lineEnd ? `@${kA}#L${CA.lineStart} ` : `@${kA}#L${CA.lineStart}-${CA.lineEnd} `;
        else TA = `@${kA} `;
        let H1 = H[MA - 1] ?? " ";
        if (!/\s/.test(H1)) TA = ` ${TA}`;
        S9(TA);
    }), _1((CA, TA)=>{
        if (g) return;
        if (TA.ctrl && CA === "_") {
            if (XB) {
                b9("ctrl-underscore");
                let kA = TB();
                if (kA) (D(kA.text), nA(kA.cursorOffset), j(kA.pastedContents));
            }
            return;
        }
        if (TA.ctrl && CA.toLowerCase() === "g") {
            (r("tengu_external_editor_used", {}), b9("external-editor"), GQ(!0));
            let kA = xX1(H);
            if ((GQ(!1), kA !== null && kA !== H)) (wQ(H, MA, R), D(kA), nA(kA.length));
            return;
        }
        if (TA.ctrl && CA.toLowerCase() === "s") {
            if (H.trim() === "" && z !== void 0) (D(z.text), nA(z.cursorOffset), $(void 0));
            else if (H.trim() !== "") ($({
                text: H,
                cursorOffset: MA
            }), D(""), nA(0), b9("prompt-stash"), n0((kA)=>{
                if (kA.hasUsedStash) return kA;
                return {
                    ...kA,
                    hasUsedStash: !0
                };
            }));
            return;
        }
        if (TA.return && p) {
            (m(!0), $1("none"));
            return;
        }
        if ((TA.return, TA.return && C1)) {
            (o1(!0), PA(!1));
            return;
        }
        if (p && TA.rightArrow) {
            if (K1.length > 0) {
                (v(!1), PA(!0));
                return;
            }
        }
        if (C1 && TA.leftArrow) {
            if (Object.values(ZA.tasks).filter((H1)=>H1.status === "running").length > 0) {
                (PA(!1), v(!0));
                return;
            }
        }
        if (MA === 0 && (TA.escape || TA.backspace || TA.delete)) (E("prompt"), Y1(!1));
        if (hA && H === "" && (TA.backspace || TA.delete)) Y1(!1);
        if (OC.check(CA, TA)) {
            let kA = Yn2(B, ZA.teamContext);
            if ((r("tengu_mode_cycle", {
                to: kA
            }), B.mode === "plan" && kA !== "plan")) Ny(!0);
            if ((tc(B.mode, kA), B.mode === "delegate" && kA !== "delegate")) (tP0(!0), VgA(!0));
            if (kA === "plan") n0((L1)=>({
                    ...L1,
                    lastPlanModeUse: Date.now()
                }));
            if (kA === "acceptEdits") b9("auto-accept-mode");
            let H1 = xY(B, {
                type: "setMode",
                mode: kA,
                destination: "session"
            });
            if ((G(H1), hA)) Y1(!1);
            return;
        }
        if (StA.check(CA, TA)) {
            if ((b1((kA)=>!kA), hA)) Y1(!1);
            return;
        }
        if (ytA.check(CA, TA)) {
            if ((A1((kA)=>!kA), hA)) Y1(!1);
            return;
        }
        if (TA.escape) {
            if (p || C1 || d) {
                ($1("none"), PA(!1));
                return;
            }
            if (ZA.queuedCommands.some((H1)=>N51(H1.mode))) {
                W4();
                return;
            }
            if (W.length > 0 && !H && !X) A8();
        }
        if (TA.return && hA) Y1(!1);
    }));
    let { columns: m8, rows: m6 } = HB(), t9 = m8 - 3, K4 = le2(), B3 = (()=>{
        if (!U6 || !y1) return $9;
        let CA = oe2, TA = yX(y1).length, kA = yX(CA).length, H1 = 3, L1 = t9;
        if (TA + kA + H1 > L1) return y1;
        let k1 = L1 - TA - kA;
        return y1 + " ".repeat(k1) + V1.dim(CA);
    })(), V4 = x3.useMemo(()=>{
        let CA = H.split(`
`);
        for (let TA of CA)if (TA.length > t9) return !0;
        return CA.length > 1;
    }, [
        H,
        t9
    ]), m5 = x3.useCallback((CA)=>{
        (zA((TA)=>({
                ...TA,
                mainLoopModel: CA,
                mainLoopModelForSession: null
            })), b1(!1), r("tengu_model_picker_hotkey", {
            model: CA
        }));
    }, [
        zA
    ]), N4 = x3.useCallback(()=>{
        b1(!1);
    }, []), mZ = x3.useMemo(()=>{
        if (!KQ) return null;
        return s2.createElement(T, {
            flexDirection: "column",
            marginTop: 1
        }, s2.createElement(PDA, {
            initial: ZA.mainLoopModel,
            sessionModel: ZA.mainLoopModelForSession,
            onSelect: m5,
            onCancel: N4,
            isStandaloneCommand: !0
        }));
    }, [
        KQ,
        ZA.mainLoopModel,
        ZA.mainLoopModelForSession,
        m5,
        N4
    ]), DG = x3.useCallback((CA)=>{
        (zA((TA)=>({
                ...TA,
                thinkingEnabled: CA
            })), A1(!1), r("tengu_thinking_toggled_hotkey", {
            enabled: CA
        }), F1({
            key: "thinking-toggled-hotkey",
            jsx: s2.createElement(C, {
                color: CA ? "suggestion" : void 0,
                dimColor: !CA
            }, "Thinking ", CA ? "on" : "off"),
            priority: "immediate",
            timeoutMs: 3000
        }));
    }, [
        zA,
        F1
    ]), d8 = x3.useCallback(()=>{
        A1(!1);
    }, []), O8 = x3.useMemo(()=>{
        if (!F0) return null;
        return s2.createElement(T, {
            flexDirection: "column",
            marginTop: 1
        }, s2.createElement(te2, {
            currentValue: ZA.thinkingEnabled,
            onSelect: DG,
            onCancel: d8,
            isMidConversation: W.some((CA)=>CA.type === "assistant")
        }));
    }, [
        F0,
        ZA.thinkingEnabled,
        DG,
        d8,
        W.length
    ]);
    if (y) return s2.createElement(UV1, {
        onDone: ()=>{
            m(!1);
        },
        toolUseContext: jA(W, [], new AbortController(), [], void 0, _A)
    });
    if (Q1) return s2.createElement(Fe2, {
        initialTeams: K1,
        onDone: ()=>{
            o1(!1);
        }
    });
    if (mZ) return mZ;
    if (O8) return O8;
    let oA = {
        multiline: !0,
        onSubmit: t2,
        onChange: x0,
        value: $A ? g1A(typeof $A === "string" ? $A : $A.display) : H,
        onHistoryUp: r1,
        onHistoryDown: C0,
        onHistoryReset: rQ,
        placeholder: B3,
        onExit: YA,
        onExitMessage: (CA, TA)=>xA({
                show: CA,
                key: TA
            }),
        onImagePaste: u6,
        columns: t9,
        disableCursorMovementForUpDownKeys: i2.length > 0,
        cursorOffset: MA,
        onChangeCursorOffset: nA,
        onPaste: v4,
        onIsPastingChange: B0,
        focus: !KA,
        showCursor: !p && !C1 && !d && !KA,
        argumentHint: U9,
        onUndo: XB ? ()=>{
            let CA = TB();
            if (CA) (D(CA.text), nA(CA.cursorOffset), j(CA.pastedContents));
        } : void 0,
        highlights: E1
    }, XA = ()=>{
        let CA = {
            bash: "bashBorder",
            background: "background"
        };
        if (CA[F]) return CA[F];
        let TA = Br();
        if (TA && fP.includes(TA)) return E$[TA];
        return "promptBorder";
    };
    if (YQ) return s2.createElement(T, {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderColor: XA(),
        borderDimColor: !0,
        borderStyle: "round",
        borderLeft: !1,
        borderRight: !1,
        borderBottom: !0,
        width: "100%"
    }, s2.createElement(C, {
        dimColor: !0,
        italic: !0
    }, "Save and close editor to continue..."));
    let BA = wDA() ? s2.createElement(pU0, {
        ...oA,
        initialMode: P,
        onModeChange: f,
        isLoading: X
    }) : s2.createElement(L6, {
        ...oA
    });
    return s2.createElement(T, {
        flexDirection: "column",
        marginTop: 1
    }, s2.createElement(ge2, null), s2.createElement(me2, null), s2.createElement(ce2, {
        hasStash: z !== void 0
    }), K4 ? s2.createElement(s2.Fragment, null, s2.createElement(C, {
        color: K4.bgColor
    }, "─".repeat(Math.max(0, m8 - K4.text.length - 4)), s2.createElement(C, {
        backgroundColor: K4.bgColor,
        color: "inverseText"
    }, " ", K4.text, " "), "──"), s2.createElement(T, {
        flexDirection: "row",
        width: "100%"
    }, s2.createElement(Kq0, {
        mode: F,
        isLoading: X,
        hideAgentPrefix: !0
    }), s2.createElement(T, {
        flexGrow: 1,
        flexShrink: 1
    }, BA)), s2.createElement(C, {
        color: K4.bgColor
    }, "─".repeat(m8))) : s2.createElement(T, {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        borderColor: XA(),
        borderDimColor: !0,
        borderStyle: "round",
        borderLeft: !1,
        borderRight: !1,
        borderBottom: !0,
        width: "100%"
    }, s2.createElement(Kq0, {
        mode: F,
        isLoading: X
    }), s2.createElement(T, {
        flexGrow: 1,
        flexShrink: 1
    }, BA)), s2.createElement(On2, {
        apiKeyStatus: Z,
        debug: A,
        exitMessage: WA,
        vimMode: P,
        mode: F,
        autoUpdaterResult: V,
        isAutoUpdating: e,
        verbose: I,
        onAutoUpdaterResult: K,
        onChangeIsUpdating: VA,
        suggestions: i2,
        selectedSuggestion: t4,
        toolPermissionContext: B,
        helpOpen: hA,
        suppressHint: H.length > 0,
        tasksSelected: p,
        teamsSelected: C1,
        diffSelected: d,
        ideSelection: Q,
        mcpClients: M,
        isPasting: S1,
        isInputWrapped: V4,
        messages: W,
        isSearching: KA,
        historyQuery: LA,
        setHistoryQuery: UA,
        historyFailedMatch: RA
    }));
}
var s2, x3, QA9;
