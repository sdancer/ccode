// Module: kfA
// Type: L
// Lines: 478847-478954
//
var kfA = L(()=>{
    LT();
    zB();
    pushStartInstance();
    OT();
    trackUsedThenable();
    s1();
    thA();
    i0();
    EI();
    sH();
    Q9();
});
function CH1({ onBackground: A }) {
    _1((B, G)=>{
        if (B === "b" && G.ctrl) A();
    });
    let Q = JQ.terminal === "tmux" ? "ctrl+b ctrl+b" : "ctrl+b";
    return KZ.createElement(T, {
        paddingLeft: 5
    }, KZ.createElement(C, {
        dimColor: !0
    }, KZ.createElement(I0, {
        shortcut: Q,
        action: "run in background"
    })));
}
function G69(A, { verbose: Q, theme: B }) {
    let { command: G } = A;
    if (!G) return null;
    let Z = G;
    if (G.includes(`"$(cat <<'EOF'`)) {
        let Y = G.match(/^(.*?)"?\$\(cat <<'EOF'\n([\s\S]*?)\n\s*EOF\n\s*\)"(.*)$/);
        if (Y && Y[1] && Y[2]) {
            let J = Y[1], X = Y[2], I = Y[3] || "";
            Z = `${J.trim()} "${X.trim()}"${I.trim()}`;
        }
    }
    if (!Q) {
        let Y = Z.split(`
`), J = Y.length > B69, X = Z.length > TN0;
        if (J || X) {
            let I = Z;
            if (J) I = Y.slice(0, B69).join(`
`);
            if (I.length > TN0) I = I.slice(0, TN0);
            return KZ.createElement(C, null, I.trim(), "…");
        }
    }
    return Z;
}
function Z69(A) {
    let { timeout: Q } = A;
    if (!Q) return null;
    let B = lDA();
    if (Q === B) return null;
    return KZ.createElement(T, {
        flexWrap: "nowrap",
        marginLeft: 1
    }, KZ.createElement(C, {
        dimColor: !0
    }, "timeout: ", jH(Q)));
}
function Y69() {
    return KZ.createElement(o3, null);
}
function J69(A, { verbose: Q, tools: B, terminalSize: G, inProgressToolCallCount: Z }) {
    let Y = A.at(-1);
    if (!Y || !Y.data || !Y.data.output) return KZ.createElement(b0, {
        height: 1
    }, KZ.createElement(C, {
        dimColor: !0
    }, "Running…"));
    let J = Y.data;
    return KZ.createElement(jV1, {
        fullOutput: J.fullOutput,
        output: J.output,
        elapsedTimeSeconds: J.elapsedTimeSeconds,
        totalLines: J.totalLines,
        verbose: Q
    });
}
function X69() {
    return KZ.createElement(b0, {
        height: 1
    }, KZ.createElement(C, {
        dimColor: !0
    }, "Waiting…"));
}
function I69(A, Q, { verbose: B, theme: G, tools: Z, style: Y }) {
    return KZ.createElement(z4A, {
        content: A,
        verbose: B
    });
}
function W69(A, { verbose: Q, progressMessagesForMessage: B, tools: G }) {
    return KZ.createElement(n8, {
        result: A,
        verbose: Q
    });
}
var KZ, B69 = 2, TN0 = 160;
