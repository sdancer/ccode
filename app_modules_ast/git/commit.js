// Module: LA9
// Type: L
// Lines: 467592-467801
//
var LA9 = L(()=>{
    bA();
    P3();
    ZZ();
    hW = l(React runtime(), 1);
});
async function OA9(A, Q, B, G, Z, Y) {
    (r("tengu_input_background", {}), Y(!0));
    let J = {
        text: `<background-task-input>${A}</background-task-input>`,
        type: "text"
    }, X = h0({
        content: w_({
            inputString: J.text,
            precedingInputBlocks: Q
        })
    });
    Z({
        jsx: WZ.createElement(T, {
            flexDirection: "column"
        }, WZ.createElement(C4A, {
            addMargin: !0,
            param: J
        }), WZ.createElement(b0, null, WZ.createElement(C, {
            dimColor: !0
        }, "Initializing session…"))),
        shouldHidePromptInput: !1
    });
    try {
        let I = await fz2();
        if (!I.eligible) {
            let y = I.errors.map(bz2).join(`

`);
            return {
                messages: [
                    aF(),
                    X,
                    ...B,
                    h0({
                        content: `<bash-stderr>Cannot launch remote Claude Code session.

${y}</bash-stderr>`
                    })
                ],
                shouldQuery: !1
            };
        }
        let W = await NYB(), K = await yg(), V = await kl1(), H = W.commitsAheadOfDefaultBranch === 0;
        if ((W.hasUncommitted || W.hasUnpushed) && !H) {
            let y = await new Promise((m)=>{
                Z({
                    jsx: WZ.createElement(T, {
                        flexDirection: "column"
                    }, WZ.createElement(C4A, {
                        addMargin: !0,
                        param: J
                    }), WZ.createElement(Eq0, {
                        issue: W,
                        branchName: K,
                        onDone: m,
                        color: "background"
                    })),
                    shouldHidePromptInput: !0
                });
            });
            if (y === "cancel") return {
                messages: [
                    aF(),
                    X,
                    ...B,
                    h0({
                        content: "<bash-stderr>Background task cancelled.</bash-stderr>"
                    })
                ],
                shouldQuery: !1
            };
            if (y === "commit-push") {
                let m = (p)=>{
                    Z({
                        jsx: WZ.createElement(T, {
                            flexDirection: "column"
                        }, WZ.createElement(C4A, {
                            addMargin: !0,
                            param: J
                        }), WZ.createElement(Eq0, {
                            issue: W,
                            branchName: K,
                            onDone: ()=>{},
                            color: "background",
                            loadingState: p
                        })),
                        shouldHidePromptInput: !0
                    });
                };
                if (W.hasUncommitted) m("committing");
                else m("pushing");
                let g = `Background task: ${A.slice(0, 60)}${A.length > 60 ? "..." : ""}`, s = await LYB(g, (p)=>{
                    m(p);
                });
                if (!s.success) return {
                    messages: [
                        aF(),
                        X,
                        ...B,
                        h0({
                            content: `<bash-stderr>Failed to commit and push changes:
${s.error}</bash-stderr>`
                        })
                    ],
                    shouldQuery: !1
                };
            }
        }
        let D = vIA(), F = [];
        try {
            F = await bp(D);
        } catch (y) {
            k(`Could not read transcript file: ${y instanceof Error ? y.message : String(y)}`);
        }
        let E = F.filter(xjA);
        Z({
            jsx: WZ.createElement(T, {
                flexDirection: "column"
            }, WZ.createElement(C4A, {
                addMargin: !0,
                param: J
            }), WZ.createElement(b0, null, WZ.createElement(C, {
                dimColor: !0
            }, "Creating background task…"))),
            shouldHidePromptInput: !1
        });
        let z = W.commitsAheadOfDefaultBranch === 0 ? V : K, $ = await CyA({
            initialMessage: null,
            branchName: z,
            description: A,
            signal: G.abortController.signal
        });
        if (!$) throw Error("Failed to create remote session");
        if (E.length > 0) for(let y = 0; y < E.length; y++){
            let m = E[y];
            if (!m) continue;
            if (!(await LcB($.id, m))) throw Error(`Failed to upload session history (message ${y + 1}/${E.length})`);
        }
        if (!(await $cB($.id, A))) throw Error("Failed to send user task message to remote session");
        let N = $.id, M = `r${N.substring(0, 6)}`;
        Mu(M);
        let j = {
            ...Nm(M, "remote_agent", $.title),
            type: "remote_agent",
            status: "running",
            sessionId: N,
            command: A,
            title: $.title,
            todoList: [],
            log: [],
            deltaSummarySinceLastFlushToAttachment: null
        };
        Om(j, G.setAppState);
        let P = gz2($.id), f = uz2($.id);
        return {
            messages: [
                aF(),
                X,
                ...B,
                h0({
                    content: `<background-task-output>This task is now running in the background.
Monitor it with /tasks or at ${P}

Or, resume it later with: ${f}</background-task-output>`
                })
            ],
            shouldQuery: !1
        };
    } catch (I) {
        let W = I instanceof Error ? I.message : String(I);
        return {
            messages: [
                aF(),
                X,
                ...B,
                h0({
                    content: `<bash-stderr>Failed to create background session: ${W}. Try running /login and signing in with a claude.ai account (not Console).</bash-stderr>`
                })
            ],
            shouldQuery: !1
        };
    } finally{
        Z(null);
    }
}
var WZ;
