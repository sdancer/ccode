// Module: GJ9
// Type: L
// Lines: 500883-501488
//
var createRenderState = L(()=>{
    bA();
    ((i4A = l(React runtime(), 1)), (QG7 = sY9.length + QJ9 + 1), (BG7 = tY9.length + QJ9 + eY9.length), (GG7 = AJ9.length));
});
function JJ9(A, Q) {
    let B = A.replace(/\s+/g, " ").trim();
    if (B.length <= Q) return B;
    return B.slice(0, Q).trim() + "…";
}
function pO0({ before: A, match: Q, after: B }) {
    return V1.dim(A) + V1.yellow(Q) + V1.dim(B);
}
function HG7(A, Q, B) {
    let G = A.toLowerCase().indexOf(Q.toLowerCase());
    if (G === -1) return null;
    let Z = G + Q.length, Y = Math.max(0, G - B), J = Math.min(A.length, Z + B), X = A.slice(Y, G), I = A.slice(G, Z), W = A.slice(Z, J);
    return {
        before: (Y > 0 ? "…" : "") + X.replace(/\s+/g, " "),
        match: I,
        after: W.replace(/\s+/g, " ") + (J < A.length ? "…" : "")
    };
}
function lO0(A, Q, B) {
    let { isGroupHeader: G = !1, isChild: Z = !1, forkCount: Y = 0 } = B || {}, J = G && Y > 0 ? JG7 : Z ? XG7 : 0, X = G && Y > 0 ? ` (+${Y} other ${Y === 1 ? "session" : "sessions"})` : "", I = A.isSidechain ? " (sidechain)" : "", W = Q - J - I.length - X.length;
    return `${JJ9(xEA(A), W)}${I}${X}`;
}
function iO0(A, Q) {
    let { isChild: B = !1, showProjectPath: G = !1 } = Q || {}, Z = B ? "    " : "", Y = iwA(A), J = G && A.projectPath ? ` · ${A.projectPath}` : "";
    return Z + Y + J;
}
function WbA({ logs: A, maxHeight: Q = 1 / 0, forceWidth: B, onCancel: G, onSelect: Z, onLogsChanged: Y, initialSearchQuery: J, showAllProjects: X = !1, onToggleAllProjects: I }) {
    let W = HB(), K = B === void 0 ? W.columns : B, V = qQ(G), { isFocused: H, filterFocusSequences: D } = ii(), F = au(), E = !1, [z, $] = c2.default.useState(null), [O, N] = c2.default.useState(!1), [M, R] = c2.default.useState(J || ""), [j, P] = c2.default.useState(""), [f, y] = c2.default.useState(""), [m, g] = c2.default.useState(0), [s, p] = c2.default.useState(new Set()), [v, d] = c2.default.useState(null), [AA, YA] = c2.default.useState(J ? "search" : "list"), [jA, yA] = c2.default.useState(null), KA = c2.default.useRef(null), [OA, _A] = c2.default.useState(0), e = c2.default.useDeferredValue(j);
    c2.default.useEffect(()=>{
        yg().then((F0)=>$(F0));
    }, []);
    let VA = c2.default.useMemo(()=>new Map(A.map((F0)=>[
                F0,
                FG7(F0)
            ])), [
        A
    ]), WA = c2.default.useMemo(()=>zG7(A), [
        A
    ]), xA = WA.length > 0, MA = c2.default.useMemo(()=>(xA ? [
            "All",
            ...WA
        ] : []), [
        xA,
        WA
    ]);
    c2.default.useEffect(()=>{
        if (MA.length > 0 && OA >= MA.length) _A(0);
    }, [
        MA.length,
        OA
    ]);
    let nA = MA[OA], ZA = nA === "All" ? void 0 : nA, zA = xA ? 1 : 0, { filteredLogs: LA, snippets: UA } = c2.default.useMemo(()=>{
        let F0 = A;
        if (F) F0 = A.filter((K1)=>{
            let y1 = m0(), Z0 = dX(K1);
            if (y1 && Z0 === y1) return !0;
            if (W80(K1.messages)) return !0;
            if (K1.messages.length === 0 && K1.firstPrompt !== "No prompt") return !0;
            return !1;
        });
        if (ZA !== void 0) F0 = F0.filter((K1)=>K1.tag === ZA);
        if (O && z) F0 = F0.filter((K1)=>K1.gitBranch === z);
        if (M) {
            let K1 = M.toLowerCase();
            F0 = F0.filter((y1)=>{
                let Z0 = xEA(y1).toLowerCase(), _0 = (y1.gitBranch || "").toLowerCase(), O0 = (y1.tag || "").toLowerCase();
                return Z0.includes(K1) || _0.includes(K1) || O0.includes(K1);
            });
        }
        let A1 = new Map();
        if (e) {
            let K1 = F0.map((_0)=>({
                    log: _0,
                    searchableText: VA.get(_0) ?? ""
                })).filter((_0)=>_0.searchableText), Z0 = new zq(K1, {
                keys: [
                    "searchableText"
                ],
                threshold: WG7,
                ignoreLocation: !0,
                includeScore: !0
            }).search(e);
            Z0.sort((_0, O0)=>{
                let DA = new Date(_0.item.log.modified).getTime(), I1 = new Date(O0.item.log.modified).getTime() - DA;
                if (Math.abs(I1) > KG7) return I1;
                return (_0.score ?? 1) - (O0.score ?? 1);
            });
            for (let _0 of Z0)if (_0.item.searchableText) {
                let O0 = HG7(_0.item.searchableText, e, VG7);
                if (O0) A1.set(_0.item.log, O0);
            }
            F0 = Z0.map((_0)=>_0.item.log);
        }
        return {
            filteredLogs: F0,
            snippets: A1
        };
    }, [
        A,
        F,
        ZA,
        O,
        z,
        M,
        e,
        VA
    ]), $A = Math.max(30, K - 4), RA = c2.default.useMemo(()=>{
        if (!F) return [];
        let F0 = EG7(LA);
        return Array.from(F0.entries()).map(([A1, K1])=>{
            let y1 = K1[0], Z0 = LA.indexOf(y1), _0 = UA.get(y1), O0 = _0 ? pO0(_0) : null;
            if (K1.length === 1) {
                let E1 = iO0(y1, {
                    showProjectPath: X
                });
                return {
                    id: `log:${A1}:0`,
                    value: {
                        log: y1,
                        indexInFiltered: Z0
                    },
                    label: lO0(y1, $A),
                    description: O0 ? `${E1}
  ${O0}` : E1,
                    dimDescription: !0
                };
            }
            let DA = K1.length - 1, wA = K1.slice(1).map((E1, F1)=>{
                let z1 = LA.indexOf(E1), W0 = UA.get(E1), e1 = W0 ? pO0(W0) : null, P0 = iO0(E1, {
                    isChild: !0,
                    showProjectPath: X
                });
                return {
                    id: `log:${A1}:${F1 + 1}`,
                    value: {
                        log: E1,
                        indexInFiltered: z1
                    },
                    label: lO0(E1, $A, {
                        isChild: !0
                    }),
                    description: e1 ? `${P0}
      ${e1}` : P0,
                    dimDescription: !0
                };
            }), I1 = iO0(y1, {
                showProjectPath: X
            });
            return {
                id: `group:${A1}`,
                value: {
                    log: y1,
                    indexInFiltered: Z0
                },
                label: lO0(y1, $A, {
                    isGroupHeader: !0,
                    forkCount: DA
                }),
                description: O0 ? `${I1}
  ${O0}` : I1,
                dimDescription: !0,
                children: wA
            };
        });
    }, [
        F,
        LA,
        $A,
        X,
        UA
    ]), mA = c2.default.useMemo(()=>{
        if (F) return [];
        return LA.map((F0, A1)=>{
            let y1 = xEA(F0) + (F0.isSidechain ? " (sidechain)" : ""), Z0 = JJ9(y1, $A), _0 = iwA(F0), O0 = X && F0.projectPath ? ` · ${F0.projectPath}` : "", DA = UA.get(F0), wA = DA ? pO0(DA) : null;
            return {
                label: Z0,
                description: wA ? `${_0}${O0}
  ${wA}` : _0 + O0,
                dimDescription: !0,
                value: A1.toString()
            };
        });
    }, [
        F,
        LA,
        $A,
        X,
        UA
    ]), hA = v?.value.log ?? null, Y1 = ()=>{
        if (!F || !hA) return "";
        let F0 = dX(hA);
        if (!F0) return "";
        let A1 = LA.filter((_0)=>dX(_0) === F0);
        if (!(A1.length > 1)) return "";
        let y1 = s.has(F0);
        if (A1.indexOf(hA) > 0) return " · ← to collapse";
        return y1 ? " · ← to collapse" : " · → to expand";
    }, C1 = c2.default.useCallback(async ()=>{
        let F0 = hA?.messages[0];
        if (!hA || !F0) {
            (YA("list"), y(""));
            return;
        }
        if (f.trim()) {
            let A1 = F0.sessionId;
            if ((await E61(A1, f.trim()), F && Y)) Y();
        }
        (YA("list"), y(""));
    }, [
        hA,
        f,
        Y,
        F
    ]), PA = c2.default.useCallback(()=>{
        (YA("list"), r("tengu_session_search_toggled", {
            enabled: !1
        }));
    }, []), Q1 = c2.default.useCallback(()=>{
        (YA("list"), r("tengu_session_deep_search_toggled", {
            enabled: !1
        }));
    }, []), o1 = c2.default.useCallback((F0)=>{
        let A1 = parseInt(F0, 10), K1 = LA[A1];
        if (!K1 || KA.current === A1.toString()) return;
        ((KA.current = A1.toString()), d({
            id: A1.toString(),
            value: {
                log: K1,
                indexInFiltered: A1
            },
            label: ""
        }));
    }, [
        LA
    ]), S1 = c2.default.useCallback((F0)=>{
        d(F0);
    }, []);
    if ((_1((F0, A1)=>{
        if (AA === "preview") return;
        if (AA === "rename") {
            if (A1.escape) (YA("list"), y(""));
        } else if (AA === "search") if (A1.escape || A1.return) PA();
        else if (A1.backspace || A1.delete) if (M.length === 0) PA();
        else R((K1)=>K1.slice(0, -1));
        else {
            let K1 = D(F0, A1);
            if (K1 && !A1.ctrl && !A1.meta) R((y1)=>y1 + K1);
        }
        else if (AA === "deep-search") if (A1.escape || A1.return) Q1();
        else if (A1.backspace || A1.delete) if (j.length === 0) Q1();
        else P((K1)=>K1.slice(0, -1));
        else {
            let K1 = D(F0, A1);
            if (K1 && !A1.ctrl && !A1.meta) P((y1)=>y1 + K1);
        }
        else {
            if (xA && A1.tab) {
                let Z0 = A1.shift ? -1 : 1;
                _A((_0)=>{
                    let O0 = (_0 + MA.length + Z0) % MA.length, DA = MA[O0];
                    return (r("tengu_session_tag_filter_changed", {
                        is_all: DA === "All",
                        tag_count: WA.length
                    }), O0);
                });
                return;
            }
            let K1 = !A1.ctrl && !A1.meta, y1 = F0.toLowerCase();
            if (y1 === "a" && K1 && I) (I(), r("tengu_session_all_projects_toggled", {
                enabled: !X
            }));
            else if (y1 === "b" && K1) {
                let Z0 = !O;
                (N(Z0), r("tengu_session_branch_filter_toggled", {
                    enabled: Z0
                }));
            } else if (y1 === "/" && K1) (YA("search"), r("tengu_session_search_toggled", {
                enabled: !0
            }));
            else if (y1 === "r" && K1 && hA && F) (YA("rename"), y(""), r("tengu_session_rename_started", {}));
            else if (y1 === "p" && K1 && hA && F) (yA(hA), YA("preview"), r("tengu_session_preview_opened", {
                messageCount: hA.messageCount
            }));
        }
    }, {
        isActive: !0
    }), A.length === 0)) return null;
    if (AA === "preview" && jA && F) return c2.default.createElement(oY9, {
        log: jA,
        onExit: ()=>{
            (YA("list"), yA(null));
        },
        onSelect: Z
    });
    let B0 = [];
    if (O && z) B0.push(z);
    if (M && AA !== "search") B0.push(`/${M}`);
    if (j && AA !== "deep-search") B0.push(`:${j}`);
    let YQ = B0.length > 0 || AA === "search" || AA === "deep-search", GQ = 5 + (YQ ? 1 : 0) + zA, KQ = 2, b1 = Math.max(1, Math.floor((Q - GQ - KQ) / 3));
    return c2.default.createElement(T, {
        flexDirection: "column",
        height: Q - 1
    }, c2.default.createElement(T, {
        flexShrink: 0
    }, c2.default.createElement(C, {
        color: "suggestion"
    }, "─".repeat(K))), c2.default.createElement(T, {
        flexShrink: 0
    }, c2.default.createElement(C, null, " ")), xA ? c2.default.createElement(BJ9, {
        tabs: MA,
        selectedIndex: OA,
        availableWidth: K,
        showAllProjects: X
    }) : c2.default.createElement(T, {
        flexShrink: 0
    }, c2.default.createElement(C, {
        bold: !0,
        color: "suggestion"
    }, "Resume", X ? " (All Projects)" : "")), YQ && c2.default.createElement(T, {
        flexShrink: 0,
        paddingLeft: 2,
        paddingTop: xA ? 1 : 0
    }, AA === "search" ? c2.default.createElement(C, null, B0.length > 0 && c2.default.createElement(C, {
        dimColor: !0
    }, c2.default.createElement(YB, null, B0), " ·", " "), "/", c2.default.createElement(C, {
        bold: !0
    }, M), H && c2.default.createElement(C, {
        dimColor: !0
    }, "█")) : AA === "deep-search" ? c2.default.createElement(C, null, B0.length > 0 && c2.default.createElement(C, {
        dimColor: !0
    }, B0.join(" · "), " · "), ":", c2.default.createElement(C, {
        bold: !0
    }, j), H && c2.default.createElement(C, {
        dimColor: !0
    }, "█")) : c2.default.createElement(C, {
        dimColor: !0
    }, c2.default.createElement(YB, null, B0))), c2.default.createElement(T, {
        flexShrink: 0
    }, c2.default.createElement(C, null, " ")), AA === "rename" && hA ? c2.default.createElement(T, {
        paddingLeft: 2,
        flexDirection: "column"
    }, c2.default.createElement(C, {
        bold: !0
    }, "Rename session:"), c2.default.createElement(T, {
        paddingTop: 1
    }, c2.default.createElement(L6, {
        value: f,
        onChange: y,
        onSubmit: C1,
        placeholder: xEA(hA, "Enter new session name"),
        columns: K,
        cursorOffset: m,
        onChangeCursorOffset: g,
        showCursor: !0
    }))) : F ? c2.default.createElement(nY9, {
        nodes: RA,
        onSelect: (F0)=>{
            Z(F0.value.log);
        },
        onFocus: S1,
        onCancel: G,
        focusNodeId: v?.id,
        visibleOptionCount: b1,
        layout: "expanded",
        isDisabled: AA === "search" || AA === "deep-search",
        hideIndexes: !1,
        isNodeExpanded: (F0)=>{
            if (AA === "search" || AA === "deep-search" || O) return !0;
            let A1 = typeof F0 === "string" && F0.startsWith("group:") ? F0.substring(6) : null;
            return A1 ? s.has(A1) : !1;
        },
        onExpand: (F0)=>{
            let A1 = typeof F0 === "string" && F0.startsWith("group:") ? F0.substring(6) : null;
            if (A1) (p((K1)=>new Set([
                    ...K1,
                    A1
                ])), r("tengu_session_group_expanded", {}));
        },
        onCollapse: (F0)=>{
            let A1 = typeof F0 === "string" && F0.startsWith("group:") ? F0.substring(6) : null;
            if (A1) p((K1)=>{
                let y1 = new Set(K1);
                return (y1.delete(A1), y1);
            });
        }
    }) : c2.default.createElement(T0, {
        options: mA,
        onChange: (F0)=>{
            let A1 = parseInt(F0, 10), K1 = LA[A1];
            if (K1) Z(K1);
        },
        visibleOptionCount: b1,
        onCancel: G,
        onFocus: o1,
        defaultFocusValue: v?.id.toString(),
        layout: "expanded",
        isDisabled: AA === "search" || AA === "deep-search"
    }), c2.default.createElement(T, {
        paddingLeft: 2
    }, V.pending ? c2.default.createElement(C, {
        dimColor: !0
    }, "Press ", V.keyName, " again to exit") : AA === "rename" ? c2.default.createElement(C, {
        dimColor: !0
    }, c2.default.createElement(YB, null, c2.default.createElement(I0, {
        shortcut: "Enter",
        action: "save"
    }), c2.default.createElement(I0, {
        shortcut: "Esc",
        action: "cancel"
    }))) : AA === "search" ? c2.default.createElement(C, {
        dimColor: !0
    }, "Enter or Esc to finish · type to filter") : AA === "deep-search" ? c2.default.createElement(C, {
        dimColor: !0
    }, "Enter or Esc to finish · type to search messages") : c2.default.createElement(C, {
        dimColor: !0
    }, (I ? `A to show ${X ? "current dir" : "all projects"} · ` : "") + (z ? "B to toggle branch · " : "") + (F ? "P to preview · R to rename · " : "") + "/ to search" + " · Esc to cancel" + Y1())));
}
function DG7(A) {
    if (A.type !== "user" && A.type !== "assistant") return "";
    let Q = "message" in A ? A.message?.content : void 0;
    if (!Q) return "";
    if (typeof Q === "string") return Q;
    if (Array.isArray(Q)) return Q.map((B)=>{
        if (typeof B === "string") return B;
        if ("text" in B && typeof B.text === "string") return B.text;
        return "";
    }).filter(Boolean).join(" ");
    return "";
}
function FG7(A) {
    let B = (A.messages.length <= IG7 ? A.messages : [
        ...A.messages.slice(0, ZJ9),
        ...A.messages.slice(-ZJ9)
    ]).map(DG7).filter(Boolean).join(" "), Z = `${[
        A.customTitle,
        A.summary,
        A.firstPrompt,
        A.gitBranch,
        A.tag
    ].filter(Boolean).join(" ")} ${B}`.trim();
    return Z.length > YJ9 ? Z.slice(0, YJ9) : Z;
}
function EG7(A) {
    let Q = A.reduce((B, G)=>{
        let Z = dX(G);
        if (Z) {
            let Y = B.get(Z) || [];
            B.set(Z, [
                ...Y,
                G
            ]);
        }
        return B;
    }, new Map());
    return (Q.forEach((B)=>B.sort((G, Z)=>new Date(Z.modified).getTime() - new Date(G.modified).getTime())), Q);
}
function zG7(A) {
    let Q = new Set();
    for (let B of A)if (B.tag) Q.add(B.tag);
    return Array.from(Q).sort((B, G)=>B.localeCompare(G));
}
var c2, JG7 = 2, XG7 = 4, IG7 = 2000, ZJ9 = 1000, YJ9 = 50000, WG7 = 0.3, KG7 = 60000, VG7 = 50;
