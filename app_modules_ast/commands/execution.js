// Module: kK1
// Type: L
// Lines: 451184-451374
//
var prepareToHydrateHostInstance = L(()=>{
    eVA();
    KB();
    Ze5 = /^btw\b/gi;
});
function yn2({ shell: A, onDone: Q, onKillShell: B, onBack: G }) {
    let { columns: Z } = HB(), [Y, J] = jkA.useState(0), [X, I] = jkA.useState({
        stdout: "",
        stdoutLines: 0
    });
    _1((H, D)=>{
        if (D.escape || D.return || H === " ") Q("Shell details dismissed", {
            display: "system"
        });
        else if (D.leftArrow && G) G();
        else if (H === "k" && A.status === "running" && B) B();
    });
    let W = qQ(), K = (H)=>{
        let D = Math.floor((Date.now() - H) / 1000), F = Math.floor(D / 3600), E = Math.floor((D - F * 3600) / 60), z = D - F * 3600 - E * 60;
        return `${F > 0 ? `${F}h ` : ""}${E > 0 || F > 0 ? `${E}m ` : ""}${z}s`;
    };
    jkA.useEffect(()=>{
        let H = _XA(A.id), { totalLines: D, truncatedContent: F } = fg(H);
        if ((I({
            stdout: F,
            stdoutLines: D
        }), A.status === "running")) {
            let E = setTimeout(()=>{
                J((z)=>z + 1);
            }, 1000);
            return ()=>clearTimeout(E);
        }
    }, [
        A.id,
        A.status,
        Y
    ]);
    let V = A.command.length > 280 ? A.command.substring(0, 277) + "…" : A.command;
    return WG.default.createElement(T, {
        width: "100%",
        flexDirection: "column"
    }, WG.default.createElement(T, {
        width: "100%"
    }, WG.default.createElement(T, {
        borderStyle: "round",
        borderColor: "background",
        flexDirection: "column",
        marginTop: 1,
        paddingLeft: 1,
        paddingRight: 1,
        width: "100%"
    }, WG.default.createElement(T, null, WG.default.createElement(C, {
        color: "background",
        bold: !0
    }, "Shell details")), WG.default.createElement(T, {
        flexDirection: "column",
        marginTop: 1
    }, WG.default.createElement(C, null, WG.default.createElement(C, {
        bold: !0
    }, "Status:"), " ", A.status === "running" ? WG.default.createElement(C, {
        color: "background"
    }, A.status, A.result?.code !== void 0 && ` (exit code: ${A.result.code})`) : A.status === "completed" ? WG.default.createElement(C, {
        color: "success"
    }, A.status, A.result?.code !== void 0 && ` (exit code: ${A.result.code})`) : WG.default.createElement(C, {
        color: "error"
    }, A.status, A.result?.code !== void 0 && ` (exit code: ${A.result.code})`)), WG.default.createElement(C, null, WG.default.createElement(C, {
        bold: !0
    }, "Runtime:"), " ", K(A.startTime)), WG.default.createElement(C, {
        wrap: "wrap"
    }, WG.default.createElement(C, {
        bold: !0
    }, "Command:"), " ", V)), WG.default.createElement(T, {
        flexDirection: "column",
        marginTop: 1
    }, WG.default.createElement(C, {
        bold: !0
    }, "Output:"), X.stdout ? WG.default.createElement(WG.default.Fragment, null, WG.default.createElement(T, {
        borderStyle: "round",
        borderDimColor: !0,
        paddingX: 1,
        flexDirection: "column",
        height: 12,
        maxWidth: Z - 8
    }, X.stdout.split(`
`).slice(-10).map((H, D)=>WG.default.createElement(C, {
            key: D,
            wrap: "truncate-end"
        }, H))), WG.default.createElement(C, {
        dimColor: !0,
        italic: !0
    }, X.stdoutLines > 10 ? `Showing last 10 lines of ${X.stdoutLines} total lines` : `Showing ${X.stdoutLines} lines`)) : WG.default.createElement(C, {
        dimColor: !0
    }, "No output available")))), WG.default.createElement(T, {
        marginLeft: 2
    }, W.pending ? WG.default.createElement(C, {
        dimColor: !0
    }, "Press ", W.keyName, " again to exit") : WG.default.createElement(C, {
        dimColor: !0
    }, WG.default.createElement(YB, null, G && WG.default.createElement(I0, {
        shortcut: "←",
        action: "go back"
    }), WG.default.createElement(I0, {
        shortcut: "Esc/Enter/Space",
        action: "close"
    }), A.status === "running" && B && WG.default.createElement(I0, {
        shortcut: "k",
        action: "kill"
    })))));
}
var WG, jkA;
