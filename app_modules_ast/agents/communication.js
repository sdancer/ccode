// Module: He2
// Type: L
// Lines: 465035-465334
//
var trackUsedThenable = L(()=>{
    i0();
    aQ();
    F9A();
    s1();
});
import { randomUUID as l07 } from "crypto";
function Fe2({ initialTeams: A, onDone: Q }) {
    let [, B] = IQ(), G = A?.[0]?.name ?? "", [Z, Y] = gd.useState({
        type: "teammateList",
        teamName: G
    }), [J, X] = gd.useState(0), [I, W] = gd.useState(0), K = gd.useMemo(()=>{
        return Ve2(Z.teamName);
    }, [
        Z.teamName,
        I
    ]), V = gd.useMemo(()=>{
        if (Z.type !== "teammateDetail") return null;
        return K.find((F)=>F.name === Z.memberName) ?? null;
    }, [
        Z,
        K
    ]), H = ()=>{
        (Y({
            type: "teammateList",
            teamName: Z.teamName
        }), X(0));
    };
    _1((F, E)=>{
        if (E.leftArrow) {
            if (Z.type === "teammateDetail") H();
            return;
        }
        if (E.upArrow || E.downArrow) {
            let z = D();
            if (E.upArrow) X(($)=>Math.max(0, $ - 1));
            else X(($)=>Math.min(z, $ + 1));
            return;
        }
        if (E.return) {
            if (Z.type === "teammateList" && K[J]) Y({
                type: "teammateDetail",
                teamName: Z.teamName,
                memberName: K[J].name
            });
            else if (Z.type === "teammateDetail" && V) (o07(V.tmuxPaneId), Q());
            return;
        }
        if (F === "k") {
            if (Z.type === "teammateList" && K[J]) De2(K[J].tmuxPaneId, Z.teamName, K[J].agentId, K[J].name, B).then(()=>{
                (W((z)=>z + 1), X((z)=>Math.max(0, Math.min(z, K.length - 2))));
            });
            else if (Z.type === "teammateDetail" && V) (De2(V.tmuxPaneId, Z.teamName, V.agentId, V.name, B), H());
            return;
        }
        if (F === "s") {
            if (Z.type === "teammateList" && K[J]) {
                let z = K[J];
                XD0(z.name, Z.teamName, "Graceful shutdown requested by team lead");
            } else if (Z.type === "teammateDetail" && V) (XD0(V.name, Z.teamName, "Graceful shutdown requested by team lead"), H());
            return;
        }
        if (F === "h") {
            let z = HxA(), $ = Z.type === "teammateList" ? K[J] : Z.type === "teammateDetail" ? V : null;
            if ($ && z?.supportsHideShow) {
                if ((r07($, Z.teamName).then(()=>{
                    W((O)=>O + 1);
                }), Z.type === "teammateDetail")) H();
            }
            return;
        }
        if (F === "H" && Z.type === "teammateList") {
            if (HxA()?.supportsHideShow && K.length > 0) {
                let $ = K.some((O)=>!O.isHidden);
                Promise.all(K.map((O)=>($ ? ze2(O, Z.teamName) : Ce2(O, Z.teamName)))).then(()=>{
                    W((O)=>O + 1);
                });
            }
            return;
        }
    });
    function D() {
        if (Z.type === "teammateList") return Math.max(0, K.length - 1);
        return 0;
    }
    if (Z.type === "teammateList") return l9.createElement(i07, {
        teamName: Z.teamName,
        teammates: K,
        selectedIndex: J,
        onCancel: Q
    });
    if (Z.type === "teammateDetail" && V) return l9.createElement(a07, {
        teammate: V,
        teamName: Z.teamName,
        onCancel: H
    });
    return null;
}
function i07({ teamName: A, teammates: Q, selectedIndex: B, onCancel: G }) {
    let Z = `${Q.length} ${Q.length === 1 ? "teammate" : "teammates"}`, Y = HxA()?.supportsHideShow ?? !1;
    return l9.createElement(l9.Fragment, null, l9.createElement(vZ, {
        title: `Team ${A}`,
        subtitle: Z,
        onCancel: G,
        color: "background",
        hideInputGuide: !0
    }, Q.length === 0 ? l9.createElement(C, {
        dimColor: !0
    }, "No teammates") : l9.createElement(T, {
        flexDirection: "column"
    }, Q.map((J, X)=>l9.createElement(n07, {
            key: J.agentId,
            teammate: J,
            isSelected: X === B
        })))), l9.createElement(T, {
        marginLeft: 1
    }, l9.createElement(C, {
        dimColor: !0
    }, B1.arrowUp, "/", B1.arrowDown, " select · Enter view · k kill · s shutdown", Y && " · h hide/show · H hide/show all", " · ", "Esc close")));
}
function n07({ teammate: A, isSelected: Q }) {
    let B = A.status === "idle";
    return l9.createElement(C, {
        color: Q ? "suggestion" : void 0,
        dimColor: B && !Q
    }, Q ? B1.pointer + " " : "  ", A.isHidden && l9.createElement(C, {
        dimColor: !0
    }, "[hidden] "), B && l9.createElement(C, {
        dimColor: !0
    }, "[idle] "), A.name, A.model && l9.createElement(C, {
        dimColor: !0
    }, " (", A.model, ")"));
}
function a07({ teammate: A, teamName: Q, onCancel: B }) {
    let [G, Z] = gd.useState(!1), Y = A.color ? E$[A.color] : void 0, J = gd.useMemo(()=>{
        return J0A(Q).filter((H)=>H.owner === A.agentId || H.owner === A.name);
    }, [
        Q,
        A.agentId,
        A.name
    ]);
    _1((V)=>{
        if (V === "p") Z((H)=>!H);
    });
    let X = A.worktreePath || A.cwd, I = [];
    if (A.model) I.push(A.model);
    if (X) I.push(A.worktreePath ? `worktree: ${X}` : X);
    let W = I.join(" · ") || void 0, K = Y ? l9.createElement(C, {
        color: Y
    }, A.name) : A.name;
    return l9.createElement(l9.Fragment, null, l9.createElement(vZ, {
        title: K,
        subtitle: W,
        onCancel: B,
        color: "background",
        hideInputGuide: !0
    }, J.length > 0 && l9.createElement(T, {
        flexDirection: "column"
    }, l9.createElement(C, {
        bold: !0
    }, "Tasks"), J.map((V)=>l9.createElement(C, {
            key: V.id,
            color: V.status === "resolved" ? "success" : void 0
        }, V.status === "resolved" ? B1.tick : "◼", " ", V.subject))), A.prompt && l9.createElement(T, {
        flexDirection: "column"
    }, l9.createElement(C, {
        bold: !0
    }, "Prompt"), l9.createElement(C, null, G ? A.prompt : A.prompt.length > 80 ? A.prompt.slice(0, 80) + "…" : A.prompt, A.prompt.length > 80 && !G && l9.createElement(C, {
        dimColor: !0
    }, " (p to expand)")))), l9.createElement(T, {
        marginLeft: 1
    }, l9.createElement(C, {
        dimColor: !0
    }, B1.arrowLeft, " back · Esc close · k kill · s shutdown", HxA()?.supportsHideShow && " · h hide/show")));
}
function Ee2(A) {
    return !A.startsWith("%");
}
async function De2(A, Q, B, G, Z) {
    if (Ee2(A)) await QQ("it2", [
        "session",
        "close",
        A
    ]);
    else await QQ("tmux", [
        "kill-pane",
        "-t",
        A
    ]);
    OL2(Q, A);
    let X = J0A(Q).filter((W)=>W.owner === B || W.owner === G).filter((W)=>W.status === "open");
    for (let W of X)li(Q, W.id, {
        owner: void 0
    });
    let I = `${G} was terminated.`;
    if (X.length > 0) {
        let W = X.map((K)=>`#${K.id} "${K.subject}"`).join(", ");
        I += ` ${X.length} open task(s) were unassigned: ${W}. Use TaskList to check availability and assignTask to reassign them to idle teammates.`;
    }
    (Z((W)=>{
        if (!W.teamContext?.teammates) return W;
        if (!(B in W.teamContext.teammates)) return W;
        let { [B]: K, ...V } = W.teamContext.teammates;
        return {
            ...W,
            teamContext: {
                ...W.teamContext,
                teammates: V
            },
            inbox: {
                messages: [
                    ...W.inbox.messages,
                    {
                        id: l07(),
                        from: "system",
                        text: JSON.stringify({
                            type: "teammate_terminated",
                            message: I
                        }),
                        timestamp: new Date().toISOString(),
                        status: "pending"
                    }
                ]
            }
        };
    }), k(`[TeamsDialog] Removed ${B} from teamContext`));
}
async function o07(A) {
    if (Ee2(A)) await QQ("it2", [
        "session",
        "focus",
        A
    ]);
    else await QQ("tmux", [
        "select-pane",
        "-t",
        A
    ]);
}
async function r07(A, Q) {
    if (A.isHidden) await Ce2(A, Q);
    else await ze2(A, Q);
}
async function ze2(A, Q) {}
async function Ce2(A, Q) {}
var l9, gd;
