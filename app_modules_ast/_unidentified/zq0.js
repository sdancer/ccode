// Module: zq0
// Type: L
// Lines: 467881-467911
//
var samplingCallback = L(()=>{
    bA();
    cx();
    i4();
    gf = l(React runtime(), 1);
});
function Cq0({ input: A, progress: Q, verbose: B }) {
    return TV1.default.createElement(T, {
        flexDirection: "column",
        marginTop: 1
    }, TV1.default.createElement(oK1, {
        addMargin: !1,
        param: {
            text: `<bash-input>${A}</bash-input>`,
            type: "text"
        }
    }), Q ? TV1.default.createElement(jV1, {
        fullOutput: Q.fullOutput,
        output: Q.output,
        elapsedTimeSeconds: Q.elapsedTimeSeconds,
        totalLines: Q.totalLines,
        verbose: B
    }) : M9.renderToolUseProgressMessage([], {
        verbose: B,
        tools: [],
        terminalSize: void 0
    }));
}
var TV1;
