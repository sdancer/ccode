// Module: aY9
// Type: L
// Lines: 500678-500781
//
var aY9 = L(()=>{
    P3();
    bA();
    bz = l(React runtime(), 1);
});
function oY9({ log: A, onExit: Q, onSelect: B }) {
    let [G, Z] = aV.default.useState(null), [Y, J] = aV.default.useState(!1);
    aV.default.useEffect(()=>{
        if (V80(A)) (J(!0), hcB(A).then((K)=>{
            (Z(K), J(!1));
        }));
        else Z(A);
    }, [
        A
    ]);
    let X = G ?? A, I = dX(X) || "", W = TH1();
    if ((_1((K, V)=>{
        if (V.escape || (V.ctrl && K === "c")) Q();
        else if (V.return) B(G ?? A);
    }, {
        isActive: !0
    }), Y)) return aV.default.createElement(T, {
        flexDirection: "column",
        padding: 1
    }, aV.default.createElement(T, null, aV.default.createElement(R9, null), aV.default.createElement(C, null, " Loading session…")), aV.default.createElement(C, {
        dimColor: !0
    }, aV.default.createElement(YB, null, aV.default.createElement(I0, {
        shortcut: "Esc",
        action: "cancel"
    }))));
    return aV.default.createElement(T, {
        flexDirection: "column"
    }, aV.default.createElement($s, {
        messages: X.messages,
        normalizedMessageHistory: [],
        tools: W,
        verbose: !0,
        toolJSX: null,
        toolUseConfirmQueue: [],
        inProgressToolUseIDs: new Set(),
        isMessageSelectorVisible: !1,
        conversationId: I,
        screen: "transcript",
        screenToggleId: 1,
        streamingToolUses: [],
        showAllInTranscript: !0,
        isLoading: !1
    }), aV.default.createElement(T, {
        flexShrink: 0,
        flexDirection: "column",
        borderTopDimColor: !0,
        borderBottom: !1,
        borderLeft: !1,
        borderRight: !1,
        borderStyle: "single",
        paddingLeft: 2
    }, aV.default.createElement(C, null, J1A(X.modified), " ·", " ", X.messageCount, " messages", X.gitBranch ? ` · ${X.gitBranch}` : ""), aV.default.createElement(C, {
        dimColor: !0
    }, aV.default.createElement(YB, null, aV.default.createElement(I0, {
        shortcut: "Enter",
        action: "resume"
    }), aV.default.createElement(I0, {
        shortcut: "Esc",
        action: "cancel"
    })))));
}
var aV;
