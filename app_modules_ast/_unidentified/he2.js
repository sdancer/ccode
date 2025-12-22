// Module: he2
// Type: L
// Lines: 465627-465660
//
var he2 = L(()=>{
    bA();
    z$();
    jS = l(React runtime(), 1);
});
function ge2() {
    let [{ queuedCommands: A }] = IQ();
    if (A.length === 0) return null;
    let Q = DX(A.map((B)=>h0({
            content: B.value
        })));
    return JfA.createElement(T, {
        marginTop: 1,
        paddingLeft: 2,
        flexDirection: "column"
    }, Q.map((B, G)=>JfA.createElement(RS, {
            key: G,
            message: B,
            messages: [],
            addMargin: !1,
            tools: [],
            verbose: !1,
            erroredToolUseIDs: Vq0,
            inProgressToolUseIDs: Vq0,
            resolvedToolUseIDs: Vq0,
            progressMessagesForMessage: [],
            shouldAnimate: !1,
            shouldShowDot: !1,
            isTranscriptMode: !1,
            isStatic: !0
        })));
}
var JfA, Vq0;
