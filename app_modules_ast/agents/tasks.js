// Module: DI9
// Type: L
// Lines: 507259-507538
//
var DI9 = L(()=>{
    bA();
    N9();
    CbA = l(React runtime(), 1);
});
function FI9({ tools: A, onExit: Q }) {
    let [B, G] = hs.useState({
        mode: "list-agents",
        source: "all"
    }), [Z, Y] = IQ(), { allAgents: J, activeAgents: X } = Z.agentDefinitions, [I, W] = hs.useState([]), K = kV1(A, Z.mcp.tools, Z.toolPermissionContext);
    qQ();
    let V = hs.useMemo(()=>({
            "built-in": J.filter((F)=>F.source === "built-in"),
            userSettings: J.filter((F)=>F.source === "userSettings"),
            projectSettings: J.filter((F)=>F.source === "projectSettings"),
            policySettings: J.filter((F)=>F.source === "policySettings"),
            localSettings: J.filter((F)=>F.source === "localSettings"),
            flagSettings: J.filter((F)=>F.source === "flagSettings"),
            plugin: J.filter((F)=>F.source === "plugin"),
            all: J
        }), [
        J
    ]);
    _1((F, E)=>{
        if (!E.escape) return;
        let z = I.length > 0 ? `Agent changes:
${I.join(`
`)}` : void 0;
        switch(B.mode){
            case "list-agents":
                Q(z ?? "Agents dialog dismissed", {
                    display: I.length === 0 ? "system" : void 0
                });
                break;
            case "create-agent":
                return;
            case "view-agent":
                return;
            default:
                if ("previousMode" in B) G(B.previousMode);
        }
    });
    let H = hs.useCallback((F)=>{
        (W((E)=>[
                ...E,
                F
            ]), G({
            mode: "list-agents",
            source: "all"
        }));
    }, []), D = hs.useCallback(async (F)=>{
        try {
            (await SX9(F), Y((E)=>{
                let z = E.agentDefinitions.allAgents.filter(($)=>!($.agentType === F.agentType && $.source === F.source));
                return {
                    ...E,
                    agentDefinitions: {
                        ...E.agentDefinitions,
                        allAgents: z,
                        activeAgents: Zf(z)
                    }
                };
            }), W((E)=>[
                    ...E,
                    `Deleted agent: ${V1.bold(F.agentType)}`
                ]), G({
                mode: "list-agents",
                source: "all"
            }));
        } catch (E) {
            t(E instanceof Error ? E : Error("Failed to delete agent"));
        }
    }, []);
    switch(B.mode){
        case "list-agents":
            {
                let F = B.source === "all" ? [
                    ...V["built-in"],
                    ...V.userSettings,
                    ...V.projectSettings,
                    ...V.policySettings,
                    ...V.flagSettings,
                    ...V.plugin
                ] : V[B.source], E = new Map();
                X.forEach(($)=>E.set($.agentType, $));
                let z = F.map(($)=>{
                    let O = E.get($.agentType), N = O && O.source !== $.source ? O.source : void 0;
                    return {
                        ...$,
                        overriddenBy: N
                    };
                });
                return y2.createElement(y2.Fragment, null, y2.createElement(yX9, {
                    source: B.source,
                    agents: z,
                    onBack: ()=>{
                        let $ = I.length > 0 ? `Agent changes:
${I.join(`
`)}` : void 0;
                        Q($ ?? "Agents dialog dismissed", {
                            display: I.length === 0 ? "system" : void 0
                        });
                    },
                    onSelect: ($)=>G({
                            mode: "agent-menu",
                            agent: $,
                            previousMode: B
                        }),
                    onCreateNew: ()=>G({
                            mode: "create-agent"
                        }),
                    changes: I
                }), y2.createElement(EFA, null));
            }
        case "create-agent":
            return y2.createElement(XI9, {
                tools: K,
                existingAgents: X,
                onComplete: H,
                onCancel: ()=>G({
                        mode: "list-agents",
                        source: "all"
                    })
            });
        case "agent-menu":
            {
                let E = J.find((N)=>N.agentType === B.agent.agentType && N.source === B.agent.source) || B.agent, z = E.source === "built-in", $ = [
                    {
                        label: "View agent",
                        value: "view"
                    },
                    ...(!z ? [
                        {
                            label: "Edit agent",
                            value: "edit"
                        },
                        {
                            label: "Delete agent",
                            value: "delete"
                        }
                    ] : []),
                    {
                        label: "Back",
                        value: "back"
                    }
                ], O = (N)=>{
                    switch(N){
                        case "view":
                            G({
                                mode: "view-agent",
                                agent: E,
                                previousMode: B.previousMode
                            });
                            break;
                        case "edit":
                            G({
                                mode: "edit-agent",
                                agent: E,
                                previousMode: B
                            });
                            break;
                        case "delete":
                            G({
                                mode: "delete-confirm",
                                agent: E,
                                previousMode: B
                            });
                            break;
                        case "back":
                            G(B.previousMode);
                            break;
                    }
                };
                return y2.createElement(y2.Fragment, null, y2.createElement(xs, {
                    title: B.agent.agentType
                }, y2.createElement(T, {
                    flexDirection: "column",
                    marginTop: 1
                }, y2.createElement(T0, {
                    options: $,
                    onChange: O,
                    onCancel: ()=>G(B.previousMode)
                }), I.length > 0 && y2.createElement(T, {
                    marginTop: 1
                }, y2.createElement(C, {
                    dimColor: !0
                }, I[I.length - 1])))), y2.createElement(EFA, null));
            }
        case "view-agent":
            {
                let E = J.find((z)=>z.agentType === B.agent.agentType && z.source === B.agent.source) || B.agent;
                return y2.createElement(y2.Fragment, null, y2.createElement(xs, {
                    title: E.agentType
                }, y2.createElement(VI9, {
                    agent: E,
                    tools: K,
                    allAgents: J,
                    onBack: ()=>G({
                            mode: "agent-menu",
                            agent: E,
                            previousMode: B.previousMode
                        })
                })), y2.createElement(EFA, {
                    instructions: "Press Enter or Esc to go back"
                }));
            }
        case "delete-confirm":
            {
                let F = [
                    {
                        label: "Yes, delete",
                        value: "yes"
                    },
                    {
                        label: "No, cancel",
                        value: "no"
                    }
                ];
                return y2.createElement(y2.Fragment, null, y2.createElement(xs, {
                    title: "Delete agent",
                    titleColor: "error",
                    borderColor: "error"
                }, y2.createElement(C, null, "Are you sure you want to delete the agent", " ", y2.createElement(C, {
                    bold: !0
                }, B.agent.agentType), "?"), y2.createElement(T, {
                    marginTop: 1
                }, y2.createElement(C, {
                    dimColor: !0
                }, "Source: ", B.agent.source)), y2.createElement(T, {
                    marginTop: 1
                }, y2.createElement(T0, {
                    options: F,
                    onChange: (E)=>{
                        if (E === "yes") D(B.agent);
                        else if ("previousMode" in B) G(B.previousMode);
                    },
                    onCancel: ()=>{
                        if ("previousMode" in B) G(B.previousMode);
                    }
                }))), y2.createElement(EFA, {
                    instructions: "Press ↑↓ to navigate, Enter to select, Esc to cancel"
                }));
            }
        case "edit-agent":
            {
                let E = J.find((z)=>z.agentType === B.agent.agentType && z.source === B.agent.source) || B.agent;
                return y2.createElement(y2.Fragment, null, y2.createElement(xs, {
                    title: `Edit agent: ${E.agentType}`
                }, y2.createElement(WI9, {
                    agent: E,
                    tools: K,
                    onSaved: (z)=>{
                        (H(z), G(B.previousMode));
                    },
                    onBack: ()=>G(B.previousMode)
                })), y2.createElement(EFA, null));
            }
        default:
            return null;
    }
}
var y2, hs;
