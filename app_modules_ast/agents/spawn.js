// Module: Ke2
// Type: L
// Lines: 464644-464994
//
var trackUsedThenable = L(()=>{
    Ie2();
    eU0();
    bA();
    AO = l(React runtime(), 1);
});
function UV1({ onDone: A, toolUseContext: Q }) {
    let [{ tasks: B }, G] = IQ(), [Z, Y] = L4A.useState({
        mode: "list"
    }), [J, X] = L4A.useState(0), I = B, W = Object.values(I ?? {}).map(p07), K = W.sort((y, m)=>{
        if (y.status === "running" && m.status !== "running") return -1;
        if (y.status !== "running" && m.status === "running") return 1;
        return m.task.startTime - y.task.startTime;
    }), V = K.filter((y)=>y.type === "local_bash"), H = K.filter((y)=>y.type === "remote_agent"), D = K.filter((y)=>y.type === "local_agent"), F = L4A.useMemo(()=>{
        return [
            ...V,
            ...H,
            ...D
        ];
    }, [
        V,
        H,
        D
    ]), E = F[J] || null;
    _1((y, m)=>{
        if (Z.mode !== "list") return;
        if (m.escape) {
            A("Background tasks dialog dismissed", {
                display: "system"
            });
            return;
        }
        if (m.upArrow) {
            X((g)=>Math.max(0, g - 1));
            return;
        }
        if (m.downArrow) {
            X((g)=>Math.min(F.length - 1, g + 1));
            return;
        }
        if (!E) return;
        if (m.return) {
            Y({
                mode: "detail",
                itemId: E.id
            });
            return;
        }
        if (y === "k") {
            if (E.type === "local_bash" && E.status === "running") $(E.id);
            else if (E.type === "local_agent" && E.status === "running") O(E.id);
        }
    });
    let z = qQ();
    async function $(y) {
        await Uo.kill(y, {
            abortController: Q.abortController,
            getAppState: Q.getAppState,
            setAppState: G
        });
    }
    async function O(y) {
        await M51.kill(y, {
            abortController: Q.abortController,
            getAppState: Q.getAppState,
            setAppState: G
        });
    }
    L4A.useEffect(()=>{
        if (Z.mode !== "list" && !Object.keys(I ?? {}).includes(Z.itemId)) Y({
            mode: "list"
        });
        let y = F.length;
        if (J >= y && y > 0) X(y - 1);
    }, [
        Z,
        I,
        J,
        F
    ]);
    let N = ()=>{
        Y({
            mode: "list"
        });
    };
    if (Z.mode !== "list" && I) {
        let y = I[Z.itemId];
        if (!y) return null;
        switch(y.type){
            case "local_bash":
                return t8.default.createElement(yn2, {
                    shell: y,
                    onDone: A,
                    onKillShell: ()=>void $(y.id),
                    onBack: N,
                    key: `shell-${y.id}`
                });
            case "local_agent":
                return t8.default.createElement(rs2, {
                    agent: y,
                    onDone: A,
                    onKillAgent: ()=>void O(y.id),
                    onBack: N,
                    key: `agent-${y.id}`
                });
            case "remote_agent":
                return t8.default.createElement(as2, {
                    session: y,
                    onDone: A,
                    toolUseContext: Q,
                    onBack: N,
                    key: `session-${y.id}`
                });
        }
    }
    let M = V.filter((y)=>y.status === "running").length, R = H.filter((y)=>y.status === "running" || y.status === "pending").length, j = D.filter((y)=>y.status === "running").length, P = HL([
        ...(M > 0 ? [
            t8.default.createElement(C, {
                key: "shells"
            }, M, " ", M !== 1 ? "active shells" : "active shell")
        ] : []),
        ...(R > 0 ? [
            t8.default.createElement(C, {
                key: "sessions"
            }, R, " ", R !== 1 ? "active sessions" : "active session")
        ] : []),
        ...(j > 0 ? [
            t8.default.createElement(C, {
                key: "agents"
            }, j, " ", j !== 1 ? "active agents" : "active agent")
        ] : [])
    ], (y)=>t8.default.createElement(C, {
            key: `separator-${y}`
        }, " · ")), f = [
        t8.default.createElement(I0, {
            key: "upDown",
            shortcut: "↑/↓",
            action: "select"
        }),
        t8.default.createElement(I0, {
            key: "enter",
            shortcut: "Enter",
            action: "view"
        }),
        ...[],
        ...((E?.type === "local_bash" || E?.type === "local_agent") && E.status === "running" ? [
            t8.default.createElement(I0, {
                key: "kill",
                shortcut: "k",
                action: "kill"
            })
        ] : []),
        t8.default.createElement(I0, {
            key: "esc",
            shortcut: "Esc",
            action: "close"
        })
    ];
    return t8.default.createElement(T, {
        width: "100%",
        flexDirection: "column"
    }, t8.default.createElement(T, {
        borderStyle: "round",
        borderColor: "background",
        flexDirection: "column",
        marginTop: 1,
        paddingLeft: 1,
        paddingRight: 1,
        width: "100%"
    }, t8.default.createElement(C, {
        color: "background",
        bold: !0
    }, "Background tasks"), t8.default.createElement(C, {
        dimColor: !0
    }, P), W.length === 0 ? t8.default.createElement(C, {
        dimColor: !0
    }, "No tasks currently running") : t8.default.createElement(T, {
        flexDirection: "column",
        marginTop: 1
    }, V.length > 0 && t8.default.createElement(T, {
        flexDirection: "column"
    }, (H.length > 0 || D.length > 0) && t8.default.createElement(C, {
        dimColor: !0
    }, t8.default.createElement(C, {
        bold: !0
    }, "  ", "Bashes"), " (", V.length, ")"), t8.default.createElement(T, {
        flexDirection: "column"
    }, V.map((y, m)=>t8.default.createElement(Xq0, {
            key: y.id,
            item: y,
            isSelected: m === J
        })))), H.length > 0 && t8.default.createElement(T, {
        flexDirection: "column",
        marginTop: V.length > 0 ? 1 : 0
    }, t8.default.createElement(C, {
        dimColor: !0
    }, t8.default.createElement(C, {
        bold: !0
    }, "  ", "Remote sessions"), " (", H.length, ")"), t8.default.createElement(T, {
        flexDirection: "column"
    }, H.map((y, m)=>t8.default.createElement(Xq0, {
            key: y.id,
            item: y,
            isSelected: V.length + m === J
        })))), D.length > 0 && t8.default.createElement(T, {
        flexDirection: "column",
        marginTop: V.length > 0 || H.length > 0 ? 1 : 0
    }, t8.default.createElement(C, {
        dimColor: !0
    }, t8.default.createElement(C, {
        bold: !0
    }, "  ", "Async agents"), " (", D.length, ")"), t8.default.createElement(T, {
        flexDirection: "column"
    }, D.map((y, m)=>t8.default.createElement(Xq0, {
            key: y.id,
            item: y,
            isSelected: V.length + H.length + m === J
        })))))), t8.default.createElement(T, {
        marginLeft: 2
    }, z.pending ? t8.default.createElement(C, {
        dimColor: !0
    }, "Press ", z.keyName, " again to exit") : t8.default.createElement(C, {
        dimColor: !0
    }, t8.default.createElement(YB, null, f))));
}
function p07(A) {
    switch(A.type){
        case "local_bash":
            return {
                id: A.id,
                type: "local_bash",
                label: A.command,
                status: A.status,
                task: A
            };
        case "remote_agent":
            return {
                id: A.id,
                type: "remote_agent",
                label: A.title,
                status: A.status,
                task: A
            };
        case "local_agent":
            return {
                id: A.id,
                type: "local_agent",
                label: A.description,
                status: A.status,
                task: A
            };
    }
}
function Xq0({ item: A, isSelected: Q }) {
    return t8.default.createElement(T, {
        flexDirection: "row",
        gap: 1
    }, t8.default.createElement(C, {
        color: Q ? "suggestion" : void 0
    }, Q ? B1.pointer + " " : "  ", t8.default.createElement(We2, {
        task: A.task
    })));
}
var t8, L4A;
