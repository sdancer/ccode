// Module: tU0
// Type: L
// Lines: 450965-451054
//
var tU0 = L(()=>{
    bA();
    createRenderState();
    L3();
    MkA();
    d2 = l(React runtime(), 1);
});
function Qe5({ apiKeyStatus: A, debug: Q, exitMessage: B, vimMode: G, mode: Z, autoUpdaterResult: Y, isAutoUpdating: J, verbose: X, onAutoUpdaterResult: I, onChangeIsUpdating: W, suggestions: K, selectedSuggestion: V, toolPermissionContext: H, helpOpen: D, suppressHint: F, tasksSelected: E, teamsSelected: z, diffSelected: $, ideSelection: O, mcpClients: N, isPasting: M = !1, isInputWrapped: R = !1, messages: j, isSearching: P, historyQuery: f, setHistoryQuery: y, historyFailedMatch: m }) {
    let g = Sd(), s = F || aU0(g) || P;
    if (K.length) return rF.createElement(T, {
        paddingX: 2,
        paddingY: 0
    }, rF.createElement(sU0, {
        suggestions: K,
        selectedSuggestion: V
    }));
    if (D) return rF.createElement(yK1, {
        dimColor: !0,
        fixedWidth: !0,
        paddingX: 2
    });
    return rF.createElement(T, {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingX: 2
    }, rF.createElement(T, {
        flexDirection: "column"
    }, Z === "prompt" && !B.show && !M && aU0(g) && rF.createElement(wn2, {
        messages: j
    }), rF.createElement($n2, {
        exitMessage: B,
        vimMode: G,
        mode: Z,
        toolPermissionContext: H,
        suppressHint: s,
        tasksSelected: E,
        teamsSelected: z,
        diffSelected: $,
        isPasting: M,
        isSearching: P,
        historyQuery: f,
        setHistoryQuery: y,
        historyFailedMatch: m
    })), rF.createElement(yl2, {
        apiKeyStatus: A,
        autoUpdaterResult: Y,
        debug: Q,
        isAutoUpdating: J,
        verbose: X,
        messages: j,
        onAutoUpdaterResult: I,
        onChangeIsUpdating: W,
        ideSelection: O,
        mcpClients: N,
        isInputWrapped: R
    }));
}
var rF, Ln2, On2;
