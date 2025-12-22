// Module: UI9
// Type: L
// Lines: 507775-508490
//
var prepareToHydrateHostInstance = L(()=>{
    bA();
    createRenderState();
    wW();
    createRenderState();
    pushStartInstance();
    NM0();
    ZZ();
    g1();
    ((g6 = l(React runtime(), 1)), (t4A = l(React runtime(), 1)));
});
function wI9({ setViewState: A, error: Q, setError: B, setResult: G, exitState: Z, onManageComplete: Y, targetMarketplace: J, action: X, children: I }) {
    let [W, K] = l$.useState([]), [V, H] = l$.useState(!0), [D, F] = l$.useState(0), [E, z] = l$.useState(!1), [$, O] = l$.useState(null), [N, M] = l$.useState(null), [R, j] = l$.useState(null), [P, f] = l$.useState("list"), [y, m] = l$.useState(null), [g, s] = l$.useState(0), p = l$.useRef(!1);
    l$.useEffect(()=>{
        async function _A() {
            try {
                let e = await v5(), { enabled: VA, disabled: WA } = await m7(), xA = [
                    ...VA,
                    ...WA
                ], { marketplaces: MA, failures: nA } = await LBA(e), ZA = [];
                for (let { name: UA, config: $A, data: RA } of MA){
                    let mA = xA.filter((hA)=>hA.source.endsWith(`@${UA}`));
                    ZA.push({
                        name: UA,
                        source: ijA($A.source),
                        lastUpdated: $A.lastUpdated,
                        pluginCount: RA?.plugins.length,
                        installedPlugins: mA,
                        pendingUpdate: !1,
                        pendingRemove: !1,
                        autoUpdate: mjA(UA, $A)
                    });
                }
                (ZA.sort((UA, $A)=>{
                    if (UA.name === "claude-plugin-directory") return -1;
                    if ($A.name === "claude-plugin-directory") return 1;
                    return UA.name.localeCompare($A.name);
                }), K(ZA));
                let zA = MA.filter((UA)=>UA.data !== null).length, LA = pIA(nA, zA);
                if (LA) if (LA.type === "warning") O(LA.message);
                else throw Error(LA.message);
                if (J && !p.current && !Q) {
                    p.current = !0;
                    let UA = ZA.findIndex(($A)=>$A.name === J);
                    if (UA >= 0) {
                        let $A = ZA[UA];
                        if (X) {
                            F(UA + 1);
                            let RA = [
                                ...ZA
                            ];
                            if (X === "update") RA[UA].pendingUpdate = !0;
                            else if (X === "remove") RA[UA].pendingRemove = !0;
                            (K(RA), setTimeout(()=>{
                                AA(RA);
                            }, 100));
                        } else if ($A) (F(UA + 1), m($A), f("details"));
                    } else if (B) B(`Marketplace not found: ${J}`);
                }
            } catch (e) {
                if (B) B(e instanceof Error ? e.message : "Failed to load marketplaces");
                O(e instanceof Error ? e.message : "Failed to load marketplaces");
            } finally{
                H(!1);
            }
        }
        _A();
    }, [
        J,
        X,
        Q
    ]);
    let v = ()=>{
        return W.some((_A)=>_A.pendingUpdate || _A.pendingRemove);
    }, d = ()=>{
        let _A = W.filter((VA)=>VA.pendingUpdate).length, e = W.filter((VA)=>VA.pendingRemove).length;
        return {
            updateCount: _A,
            removeCount: e
        };
    }, AA = async (_A)=>{
        let e = _A || W, VA = P === "details";
        (z(!0), O(null), M(null), j(null));
        try {
            let WA = uB("userSettings"), xA = 0, MA = 0;
            for (let mA of e){
                if (mA.pendingRemove) {
                    if (mA.installedPlugins && mA.installedPlugins.length > 0) {
                        let hA = {
                            ...WA?.enabledPlugins
                        };
                        for (let Y1 of mA.installedPlugins){
                            let C1 = _a(Y1.name, mA.name);
                            hA[C1] = !1;
                        }
                        Q2("userSettings", {
                            enabledPlugins: hA
                        });
                    }
                    (await c61(mA.name), MA++, r("tengu_marketplace_removed", {
                        marketplace_name: mA.name,
                        plugins_uninstalled: mA.installedPlugins?.length || 0
                    }));
                    continue;
                }
                if (mA.pendingUpdate) (await ja(mA.name, (hA)=>{
                    j(hA);
                }), xA++, r("tengu_marketplace_updated", {
                    marketplace_name: mA.name
                }));
            }
            if ((IY(), Y)) await Y();
            let nA = await v5(), { enabled: ZA, disabled: zA } = await m7(), LA = [
                ...ZA,
                ...zA
            ], { marketplaces: UA } = await LBA(nA), $A = [];
            for (let { name: mA, config: hA, data: Y1 } of UA){
                let C1 = LA.filter((PA)=>PA.source.endsWith(`@${mA}`));
                $A.push({
                    name: mA,
                    source: ijA(hA.source),
                    lastUpdated: hA.lastUpdated,
                    pluginCount: Y1?.plugins.length,
                    installedPlugins: C1,
                    pendingUpdate: !1,
                    pendingRemove: !1,
                    autoUpdate: mjA(mA, hA)
                });
            }
            if (($A.sort((mA, hA)=>{
                if (mA.name === "claude-plugin-directory") return -1;
                if (hA.name === "claude-plugin-directory") return 1;
                return mA.name.localeCompare(hA.name);
            }), K($A), VA && y)) {
                let mA = $A.find((hA)=>hA.name === y.name);
                if (mA) m(mA);
            }
            let RA = [];
            if (xA > 0) RA.push(`Updated ${xA} marketplace${xA > 1 ? "s" : ""}`);
            if (MA > 0) RA.push(`Removed ${MA} marketplace${MA > 1 ? "s" : ""}`);
            if (RA.length > 0) {
                let mA = `${B1.tick} ${RA.join(", ")}`;
                if (VA) M(mA);
                else (G(mA), setTimeout(()=>{
                    A({
                        type: "menu"
                    });
                }, 2000));
            } else if (!VA) A({
                type: "menu"
            });
        } catch (WA) {
            let xA = WA instanceof Error ? WA.message : String(WA);
            if ((O(xA), B)) B(xA);
        } finally{
            (z(!1), j(null));
        }
    }, YA = async ()=>{
        if (!y) return;
        let _A = W.map((e)=>e.name === y.name ? {
                ...e,
                pendingRemove: !0
            } : e);
        (K(_A), await AA(_A));
    }, jA = (_A)=>{
        if (!_A) return [];
        let e = [
            {
                label: `Browse plugins (${_A.pluginCount ?? 0})`,
                value: "browse"
            },
            {
                label: "Update marketplace",
                secondaryLabel: _A.lastUpdated ? `(last updated ${new Date(_A.lastUpdated).toLocaleDateString()})` : void 0,
                value: "update"
            }
        ];
        if (!dL()) e.push({
            label: _A.autoUpdate ? "Disable auto-update" : "Enable auto-update",
            value: "toggle-auto-update"
        });
        return (e.push({
            label: "Remove marketplace",
            value: "remove"
        }), e);
    }, yA = async (_A)=>{
        let e = !_A.autoUpdate;
        try {
            (await ylB(_A.name, e), K((VA)=>VA.map((WA)=>WA.name === _A.name ? {
                        ...WA,
                        autoUpdate: e
                    } : WA)), m((VA)=>(VA ? {
                    ...VA,
                    autoUpdate: e
                } : VA)));
        } catch (VA) {
            O(VA instanceof Error ? VA.message : "Failed to update setting");
        }
    };
    if ((_1((_A, e)=>{
        if (E) return;
        if (e.escape) {
            if (P === "details" || P === "confirm-remove") {
                (f("list"), s(0));
                return;
            }
            if (v()) (K((VA)=>VA.map((WA)=>({
                        ...WA,
                        pendingUpdate: !1,
                        pendingRemove: !1
                    }))), F(0));
            else A({
                type: "menu"
            });
            return;
        }
        if (P === "list") {
            let VA = W.length + 1, WA = D - 1;
            if (e.upArrow || _A === "k") F((xA)=>Math.max(0, xA - 1));
            else if (e.downArrow || _A === "j") F((xA)=>Math.min(VA - 1, xA + 1));
            else if (_A === "u" || _A === "U") {
                if (WA >= 0) K((xA)=>xA.map((MA, nA)=>nA === WA ? {
                            ...MA,
                            pendingUpdate: !MA.pendingUpdate,
                            pendingRemove: MA.pendingUpdate ? MA.pendingRemove : !1
                        } : MA));
            } else if (_A === "r" || _A === "R") {
                if (WA >= 0) {
                    let xA = W[WA];
                    if (xA) (m(xA), f("confirm-remove"));
                }
            } else if (e.return) if (D === 0) A({
                type: "add-marketplace"
            });
            else if (v()) AA();
            else {
                let xA = W[WA];
                if (xA) (m(xA), f("details"), s(0));
            }
        } else if (P === "details") {
            let VA = jA(y), WA = VA.length - 1;
            if (e.upArrow || _A === "k") s((xA)=>Math.max(0, xA - 1));
            else if (e.downArrow || _A === "j") s((xA)=>Math.min(WA, xA + 1));
            else if (e.return && y) {
                let xA = VA[g];
                if (xA?.value === "browse") A({
                    type: "browse-marketplace",
                    targetMarketplace: y.name
                });
                else if (xA?.value === "update") {
                    let MA = W.map((nA)=>nA.name === y.name ? {
                            ...nA,
                            pendingUpdate: !0
                        } : nA);
                    (K(MA), AA(MA));
                } else if (xA?.value === "toggle-auto-update") yA(y);
                else if (xA?.value === "remove") f("confirm-remove");
            }
        } else if (P === "confirm-remove") {
            if (_A === "y" || _A === "Y") YA();
            else if (_A === "n" || _A === "N") (f("list"), m(null));
        }
    }), V)) return d1.createElement(T, {
        flexDirection: "column"
    }, d1.createElement(T, {
        flexDirection: "column",
        paddingX: 1,
        borderStyle: "round"
    }, I, d1.createElement(C, null, "Loading marketplaces…")));
    if (W.length === 0) return d1.createElement(T, {
        flexDirection: "column"
    }, d1.createElement(T, {
        flexDirection: "column",
        paddingX: 1,
        borderStyle: "round"
    }, I, d1.createElement(T, {
        marginBottom: 1
    }, d1.createElement(C, {
        bold: !0
    }, "Manage marketplaces")), d1.createElement(T, {
        flexDirection: "row",
        gap: 1
    }, d1.createElement(C, {
        color: "claude"
    }, B1.pointer, " +"), d1.createElement(C, {
        bold: !0,
        color: "claude"
    }, "Add Marketplace"))), d1.createElement(T, {
        marginLeft: 3
    }, d1.createElement(C, {
        dimColor: !0,
        italic: !0
    }, Z.pending ? d1.createElement(d1.Fragment, null, "Press ", Z.keyName, " again to go back") : d1.createElement(d1.Fragment, null, "Enter to select · Esc to go back"))));
    if (P === "confirm-remove" && y) {
        let _A = y.installedPlugins?.length || 0;
        return d1.createElement(T, {
            flexDirection: "column"
        }, d1.createElement(T, {
            flexDirection: "column",
            paddingX: 1,
            borderStyle: "round"
        }, I, d1.createElement(C, {
            bold: !0,
            color: "warning"
        }, "Remove marketplace ", d1.createElement(C, {
            italic: !0
        }, y.name), "?"), d1.createElement(T, {
            flexDirection: "column"
        }, _A > 0 && d1.createElement(T, {
            marginTop: 1
        }, d1.createElement(C, {
            color: "warning"
        }, "This will also uninstall ", _A, " plugin", _A !== 1 ? "s" : "", " from this marketplace:")), y.installedPlugins && y.installedPlugins.length > 0 && d1.createElement(T, {
            flexDirection: "column",
            marginTop: 1,
            marginLeft: 2
        }, y.installedPlugins.map((e)=>d1.createElement(C, {
                key: e.name,
                dimColor: !0
            }, "• ", e.name))), d1.createElement(T, {
            marginTop: 1
        }, d1.createElement(C, null, "Press ", d1.createElement(C, {
            bold: !0
        }, "y"), " to confirm or ", d1.createElement(C, {
            bold: !0
        }, "n"), " to cancel")))));
    }
    if (P === "details" && y) {
        let _A = y.pendingUpdate || E, e = jA(y);
        return d1.createElement(T, {
            flexDirection: "column"
        }, d1.createElement(T, {
            flexDirection: "column",
            paddingX: 1,
            borderStyle: "round"
        }, I, d1.createElement(C, {
            bold: !0
        }, y.name), d1.createElement(C, {
            dimColor: !0
        }, y.source), d1.createElement(T, {
            marginTop: 1
        }, d1.createElement(C, null, y.pluginCount || 0, " available plugin", y.pluginCount !== 1 ? "s" : "")), y.installedPlugins && y.installedPlugins.length > 0 && d1.createElement(T, {
            flexDirection: "column",
            marginTop: 1
        }, d1.createElement(C, {
            bold: !0
        }, "Installed plugins (", y.installedPlugins.length, "):"), d1.createElement(T, {
            flexDirection: "column",
            marginLeft: 1
        }, y.installedPlugins.map((VA)=>d1.createElement(T, {
                key: VA.name,
                flexDirection: "row",
                gap: 1
            }, d1.createElement(C, null, B1.bullet), d1.createElement(T, {
                flexDirection: "column"
            }, d1.createElement(C, null, VA.name), d1.createElement(C, {
                dimColor: !0
            }, VA.manifest.description)))))), _A && d1.createElement(T, {
            marginTop: 1,
            flexDirection: "column"
        }, d1.createElement(C, {
            color: "claude"
        }, "Updating marketplace…"), R && d1.createElement(C, {
            dimColor: !0
        }, R)), !_A && N && d1.createElement(T, {
            marginTop: 1
        }, d1.createElement(C, {
            color: "claude"
        }, N)), !_A && $ && d1.createElement(T, {
            marginTop: 1
        }, d1.createElement(C, {
            color: "error"
        }, $)), !_A && d1.createElement(T, {
            flexDirection: "column",
            marginTop: 1
        }, e.map((VA, WA)=>{
            if (!VA) return null;
            let xA = WA === g;
            return d1.createElement(T, {
                key: VA.value
            }, d1.createElement(C, {
                color: xA ? "claude" : void 0
            }, xA ? B1.pointer : " ", " ", VA.label), VA.secondaryLabel && d1.createElement(C, {
                dimColor: !0
            }, " ", VA.secondaryLabel));
        })), !_A && !dL() && y.autoUpdate && d1.createElement(T, {
            marginTop: 1
        }, d1.createElement(C, {
            dimColor: !0
        }, "Auto-update enabled. Claude Code will automatically update this marketplace and its installed plugins."))), d1.createElement(T, {
            marginLeft: 3
        }, d1.createElement(C, {
            dimColor: !0,
            italic: !0
        }, _A ? d1.createElement(d1.Fragment, null, "Please wait…") : d1.createElement(d1.Fragment, null, B1.arrowUp, B1.arrowDown, " · enter to select · Esc to go back"))));
    }
    let { updateCount: KA, removeCount: OA } = d();
    return d1.createElement(T, {
        flexDirection: "column"
    }, d1.createElement(T, {
        flexDirection: "column",
        paddingX: 1,
        borderStyle: "round"
    }, I, d1.createElement(T, {
        marginBottom: 1
    }, d1.createElement(C, {
        bold: !0
    }, "Manage marketplaces")), d1.createElement(T, {
        flexDirection: "row",
        gap: 1,
        marginBottom: 1
    }, d1.createElement(C, {
        color: D === 0 ? "claude" : void 0
    }, D === 0 ? B1.pointer : " ", " +"), d1.createElement(C, {
        bold: !0,
        color: D === 0 ? "claude" : void 0
    }, "Add Marketplace")), d1.createElement(T, {
        flexDirection: "column"
    }, W.map((_A, e)=>{
        let VA = e + 1 === D, WA = [];
        if (_A.pendingUpdate) WA.push("UPDATE");
        if (_A.pendingRemove) WA.push("REMOVE");
        return d1.createElement(T, {
            key: _A.name,
            flexDirection: "row",
            gap: 1,
            marginBottom: 1
        }, d1.createElement(C, {
            color: VA ? "claude" : void 0
        }, VA ? B1.pointer : " ", " ", _A.pendingRemove ? B1.cross : B1.bullet), d1.createElement(T, {
            flexDirection: "column",
            flexGrow: 1
        }, d1.createElement(T, {
            flexDirection: "row",
            gap: 1
        }, d1.createElement(C, {
            bold: !0,
            strikethrough: _A.pendingRemove,
            dimColor: _A.pendingRemove
        }, _A.name === "claude-plugins-official" && d1.createElement(C, {
            color: "claude"
        }, "✻ "), _A.name, _A.name === "claude-plugins-official" && d1.createElement(C, {
            color: "claude"
        }, " ✻")), WA.length > 0 && d1.createElement(C, {
            color: "warning"
        }, "[", WA.join(", "), "]")), d1.createElement(C, {
            dimColor: !0
        }, _A.source), d1.createElement(C, {
            dimColor: !0
        }, _A.pluginCount !== void 0 && d1.createElement(d1.Fragment, null, _A.pluginCount, " available"), _A.installedPlugins && _A.installedPlugins.length > 0 && d1.createElement(d1.Fragment, null, " • ", _A.installedPlugins.length, " installed"), _A.lastUpdated && d1.createElement(d1.Fragment, null, " ", "• Updated", " ", new Date(_A.lastUpdated).toLocaleDateString()))));
    })), v() && d1.createElement(T, {
        marginTop: 1,
        flexDirection: "column"
    }, d1.createElement(C, null, d1.createElement(C, {
        bold: !0
    }, "Pending changes:"), " ", d1.createElement(C, {
        dimColor: !0
    }, "Enter to apply")), KA > 0 && d1.createElement(C, null, "• Update ", KA, " marketplace", KA > 1 ? "s" : ""), OA > 0 && d1.createElement(C, {
        color: "warning"
    }, "• Remove ", OA, " marketplace", OA > 1 ? "s" : "")), E && d1.createElement(T, {
        marginTop: 1
    }, d1.createElement(C, {
        color: "claude"
    }, "Processing changes…")), $ && d1.createElement(T, {
        marginTop: 1
    }, d1.createElement(C, {
        color: "error"
    }, $))), d1.createElement(ZZ7, {
        exitState: Z,
        hasPendingActions: v()
    }));
}
function ZZ7({ exitState: A, hasPendingActions: Q }) {
    let B = [];
    if (A.pending) B.push(`Press ${A.keyName} again to go back`);
    else {
        if ((B.push(`${B1.arrowUp}${B1.arrowDown}`), Q)) B.push("Enter to apply changes");
        else (B.push("Enter to select"), B.push("u update"), B.push("r remove"));
        B.push(Q ? "Esc to cancel" : "Esc to go back");
    }
    return d1.createElement(T, {
        marginLeft: 3
    }, d1.createElement(C, {
        dimColor: !0,
        italic: !0
    }, d1.createElement(YB, null, B)));
}
var d1, l$;
