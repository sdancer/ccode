// Module: LM0
// Type: L
// Lines: 508634-509318
//
var createRenderState = L(()=>{
    bA();
    sd = l(React runtime(), 1);
});
function OM0({ error: A, setError: Q, result: B, setResult: G, setViewState: Z, onInstallComplete: Y, targetMarketplace: J, targetPlugin: X, children: I }) {
    let [W, K] = LD.useState("marketplace-list"), [V, H] = LD.useState(null), [D, F] = LD.useState(null), [E, z] = LD.useState([]), [$, O] = LD.useState([]), [N, M] = LD.useState(!0), [R, j] = LD.useState(0), [P, f] = LD.useState(new Set()), [y, m] = LD.useState(new Set()), g = gs({
        totalItems: $.length,
        selectedIndex: R
    }), [s, p] = LD.useState(0), [v, d] = LD.useState(!1), [AA, YA] = LD.useState(null), [jA, yA] = LD.useState(null);
    (LD.useEffect(()=>{
        async function e() {
            try {
                let VA = await v5(), { marketplaces: WA, failures: xA } = await LBA(VA), MA = [];
                for (let { name: zA, config: LA, data: UA } of WA)if (UA) {
                    let $A = UA.plugins.filter((RA)=>Rw(_a(RA.name, zA))).length;
                    MA.push({
                        name: zA,
                        totalPlugins: UA.plugins.length,
                        installedCount: $A,
                        source: ijA(LA.source)
                    });
                }
                (MA.sort((zA, LA)=>{
                    if (zA.name === "claude-plugin-directory") return -1;
                    if (LA.name === "claude-plugin-directory") return 1;
                    return 0;
                }), z(MA));
                let nA = WA.filter((zA)=>zA.data !== null).length, ZA = pIA(xA, nA);
                if (ZA) if (ZA.type === "warning") yA(ZA.message + ". Showing available marketplaces.");
                else throw Error(ZA.message);
                if (MA.length === 1 && !J && !X) {
                    let zA = MA[0];
                    if (zA) (H(zA.name), K("plugin-list"));
                }
                if (X) {
                    let zA = null, LA = null;
                    for (let [UA] of Object.entries(VA)){
                        let $A = await JL(UA);
                        if ($A) {
                            let RA = $A.plugins.find((mA)=>mA.name === X);
                            if (RA) {
                                let mA = _a(RA.name, UA);
                                ((zA = {
                                    entry: RA,
                                    marketplaceName: UA,
                                    pluginId: mA,
                                    isInstalled: Rw(mA)
                                }), (LA = UA));
                                break;
                            }
                        }
                    }
                    if (zA && LA) {
                        let UA = zA.pluginId;
                        if (Rw(UA)) Q(`Plugin '${UA}' is already installed. Use '/plugin' to manage existing plugins.`);
                        else (H(LA), F(zA), K("plugin-details"));
                    } else Q(`Plugin "${X}" not found in any marketplace`);
                } else if (J) if (MA.some((LA)=>LA.name === J)) (H(J), K("plugin-list"));
                else Q(`Marketplace "${J}" not found`);
            } catch (VA) {
                Q(VA instanceof Error ? VA.message : "Failed to load marketplaces");
            } finally{
                M(!1);
            }
        }
        e();
    }, [
        Q,
        J,
        X
    ]), LD.useEffect(()=>{
        if (!V) return;
        async function e(VA) {
            M(!0);
            try {
                let WA = await JL(VA);
                if (!WA) throw Error(`Failed to load marketplace: ${VA}`);
                let xA = [];
                for (let MA of WA.plugins){
                    let nA = _a(MA.name, VA);
                    xA.push({
                        entry: MA,
                        marketplaceName: VA,
                        pluginId: nA,
                        isInstalled: Rw(nA)
                    });
                }
                (O(xA), j(0), f(new Set()));
            } catch (WA) {
                Q(WA instanceof Error ? WA.message : "Failed to load plugins");
            } finally{
                M(!1);
            }
        }
        e(V);
    }, [
        V,
        Q
    ]));
    let KA = async ()=>{
        if (P.size === 0) return;
        let e = $.filter((MA)=>P.has(MA.pluginId));
        m(new Set(e.map((MA)=>MA.pluginId)));
        let VA = 0, WA = 0, xA = [];
        for (let MA of e)try {
            if (typeof MA.entry.source !== "string") await yw(MA.pluginId, MA.entry);
            let ZA = {
                ...uB("userSettings")?.enabledPlugins,
                [MA.pluginId]: !0
            };
            (Q2("userSettings", {
                enabledPlugins: ZA
            }), VA++, r("tengu_plugin_installed", {
                plugin_id: MA.pluginId,
                marketplace_name: MA.marketplaceName
            }));
        } catch (nA) {
            WA++;
            let ZA = nA instanceof Error ? nA.message : String(nA);
            (xA.push({
                name: MA.entry.name,
                reason: ZA
            }), t(nA instanceof Error ? nA : Error(`Failed to install ${MA.entry.name}: ${nA}`)));
        }
        if ((m(new Set()), f(new Set()), IY(), WA === 0)) {
            let MA = `✓ Installed ${VA} plugin${VA !== 1 ? "s" : ""}. Restart Claude Code to load new plugins.`;
            G(MA);
        } else if (VA === 0) Q(`Failed to install: ${cIA(xA, !0)}`);
        else {
            let MA = `✓ Installed ${VA} of ${VA + WA} plugins. Failed: ${cIA(xA, !1)}. Restart Claude Code to load successfully installed plugins.`;
            G(MA);
        }
        if (VA > 0) {
            if (Y) await Y();
        }
        Z({
            type: "menu"
        });
    }, OA = async (e, VA = "user")=>{
        (d(!0), YA(null));
        let WA = await Q31({
            pluginId: e.pluginId,
            entry: e.entry,
            marketplaceName: e.marketplaceName,
            scope: VA
        });
        if (WA.success) {
            if ((G(WA.message), Y)) await Y();
            Z({
                type: "menu"
            });
        } else (d(!1), YA(WA.error));
    };
    if ((LD.useEffect(()=>{
        if (A) G(A);
    }, [
        A,
        G
    ]), _1((e, VA)=>{
        if (e === "m" && (W === "marketplace-list" || W === "plugin-list")) {
            Z({
                type: "manage-marketplaces"
            });
            return;
        }
        if (VA.escape) {
            if (W === "plugin-list") if (J) Z({
                type: "manage-marketplaces",
                targetMarketplace: J
            });
            else (K("marketplace-list"), H(null), f(new Set()));
            else if (W === "plugin-details") (K("plugin-list"), F(null));
            else Z({
                type: "menu"
            });
            return;
        }
        if (W === "marketplace-list") {
            if ((VA.upArrow || e === "k") && R > 0) j(R - 1);
            else if ((VA.downArrow || e === "j") && R < E.length - 1) j(R + 1);
            else if (VA.return) {
                let WA = E[R];
                if (WA) (H(WA.name), K("plugin-list"));
            }
        } else if (W === "plugin-list") {
            let WA = $.length;
            if (VA.tab && E.length > 1 && V) {
                let xA = E.findIndex((zA)=>zA.name === V), MA = VA.shift ? -1 : 1, nA = (xA + E.length + MA) % E.length, ZA = E[nA];
                if (ZA) (H(ZA.name), j(0), f(new Set()), g.goToPage(0));
                return;
            }
            if ((VA.upArrow || e === "k") && R > 0) g.handleSelectionChange(R - 1, j);
            else if ((VA.downArrow || e === "j") && R < WA - 1) g.handleSelectionChange(R + 1, j);
            else if (e === " ") {
                if (R < $.length) {
                    let xA = $[R];
                    if (xA && !xA.isInstalled) {
                        let MA = new Set(P);
                        if (MA.has(xA.pluginId)) MA.delete(xA.pluginId);
                        else MA.add(xA.pluginId);
                        f(MA);
                    }
                }
            } else if (VA.return) {
                if (R === $.length && P.size > 0) KA();
                else if (R < $.length) {
                    let xA = $[R];
                    if (xA) if (xA.isInstalled) Z({
                        type: "manage-plugins",
                        targetPlugin: xA.entry.name,
                        targetMarketplace: xA.marketplaceName
                    });
                    else (F(xA), K("plugin-details"), p(0), YA(null));
                }
            } else if (e === "i" && P.size > 0) KA();
        } else if (W === "plugin-details" && D) {
            let WA = D.entry.homepage, xA = zFA(D), MA = CFA(WA, xA);
            if ((VA.upArrow || e === "k") && s > 0) p(s - 1);
            else if ((VA.downArrow || e === "j") && s < MA.length - 1) p(s + 1);
            else if (VA.return) {
                let nA = MA[s]?.action;
                if (nA === "install-user") OA(D, "user");
                else if (nA === "install-project") OA(D, "project");
                else if (nA === "install-local") OA(D, "local");
                else if (nA === "homepage" && WA) H5(WA);
                else if (nA === "github" && xA) H5(`https://github.com/${xA}`);
                else if (nA === "back") (K("plugin-list"), F(null));
            }
        }
    }), N)) return G0.createElement(T, {
        flexDirection: "column"
    }, G0.createElement(T, {
        flexDirection: "column",
        paddingX: 1,
        borderStyle: "round"
    }, I, G0.createElement(C, null, "Loading…")));
    if (A) return G0.createElement(T, {
        flexDirection: "column"
    }, G0.createElement(T, {
        flexDirection: "column",
        paddingX: 1,
        borderStyle: "round"
    }, I, G0.createElement(C, {
        color: "error"
    }, A)));
    if (W === "marketplace-list") {
        if (E.length === 0) return G0.createElement(T, {
            flexDirection: "column"
        }, G0.createElement(T, {
            flexDirection: "column",
            paddingX: 1,
            borderStyle: "round"
        }, I, G0.createElement(T, {
            marginBottom: 1
        }, G0.createElement(C, {
            bold: !0
        }, "Select marketplace")), G0.createElement(C, null, "No marketplaces configured."), G0.createElement(C, {
            dimColor: !0
        }, "Add a marketplace first using ", "'Add marketplace'", ".")), G0.createElement(T, {
            marginTop: 1,
            paddingLeft: 1
        }, G0.createElement(C, {
            dimColor: !0
        }, "Esc to go back")));
        return G0.createElement(T, {
            flexDirection: "column"
        }, G0.createElement(T, {
            flexDirection: "column",
            paddingX: 1,
            borderStyle: "round"
        }, I, G0.createElement(T, {
            marginBottom: 1
        }, G0.createElement(C, {
            bold: !0
        }, "Select marketplace")), jA && G0.createElement(T, {
            marginBottom: 1,
            flexDirection: "column"
        }, G0.createElement(C, {
            color: "warning"
        }, B1.warning, " ", jA)), E.map((e, VA)=>G0.createElement(T, {
                key: e.name,
                flexDirection: "column",
                marginBottom: VA < E.length - 1 ? 1 : 0
            }, G0.createElement(T, null, G0.createElement(C, {
                color: R === VA ? "suggestion" : void 0
            }, R === VA ? B1.pointer : " ", " ", e.name)), G0.createElement(T, {
                marginLeft: 2
            }, G0.createElement(C, {
                dimColor: !0
            }, e.totalPlugins, " plugin", e.totalPlugins !== 1 ? "s" : "", " available", e.installedCount > 0 && ` · ${e.installedCount} already installed`, e.source && ` · ${e.source}`))))), G0.createElement(T, {
            paddingLeft: 1
        }, G0.createElement(C, {
            dimColor: !0,
            italic: !0
        }, "Enter to select · m: manage marketplaces · Esc to go back")));
    }
    if (W === "plugin-details" && D) {
        let e = D.entry.homepage, VA = zFA(D), WA = CFA(e, VA);
        return G0.createElement(T, {
            flexDirection: "column"
        }, G0.createElement(T, {
            flexDirection: "column",
            paddingX: 1,
            borderStyle: "round"
        }, I, G0.createElement(T, {
            marginBottom: 1
        }, G0.createElement(C, {
            bold: !0
        }, "Plugin Details")), G0.createElement(T, {
            flexDirection: "column",
            marginBottom: 1
        }, G0.createElement(C, {
            bold: !0
        }, D.entry.name), D.entry.version && G0.createElement(C, {
            dimColor: !0
        }, "Version: ", D.entry.version), D.entry.description && G0.createElement(T, {
            marginTop: 1
        }, G0.createElement(C, null, D.entry.description)), D.entry.author && G0.createElement(T, {
            marginTop: 1
        }, G0.createElement(C, {
            dimColor: !0
        }, "By:", " ", typeof D.entry.author === "string" ? D.entry.author : D.entry.author.name))), G0.createElement(T, {
            flexDirection: "column",
            marginBottom: 1
        }, G0.createElement(C, {
            bold: !0
        }, "Will install:"), D.entry.commands && G0.createElement(C, {
            dimColor: !0
        }, "• Commands:", " ", Array.isArray(D.entry.commands) ? D.entry.commands.join(", ") : Object.keys(D.entry.commands).join(", ")), D.entry.agents && G0.createElement(C, {
            dimColor: !0
        }, "• Agents:", " ", Array.isArray(D.entry.agents) ? D.entry.agents.join(", ") : Object.keys(D.entry.agents).join(", ")), D.entry.hooks && G0.createElement(C, {
            dimColor: !0
        }, "• Hooks: ", Object.keys(D.entry.hooks).join(", ")), D.entry.mcpServers && G0.createElement(C, {
            dimColor: !0
        }, "• MCP Servers:", " ", Array.isArray(D.entry.mcpServers) ? D.entry.mcpServers.join(", ") : typeof D.entry.mcpServers === "object" ? Object.keys(D.entry.mcpServers).join(", ") : "configured"), !D.entry.commands && !D.entry.agents && !D.entry.hooks && !D.entry.mcpServers && G0.createElement(G0.Fragment, null, typeof D.entry.source === "object" && "source" in D.entry.source && (D.entry.source.source === "github" || D.entry.source.source === "url" || D.entry.source.source === "npm" || D.entry.source.source === "pip") ? G0.createElement(C, {
            dimColor: !0
        }, "• Component summary not available for remote plugin") : G0.createElement(C, {
            dimColor: !0
        }, "• Components will be discovered at installation"))), G0.createElement(T, {
            marginBottom: 1
        }, G0.createElement(C, {
            color: "claude"
        }, B1.warning, " "), G0.createElement(C, {
            dimColor: !0,
            italic: !0
        }, "Make sure you trust a plugin before installing, updating, or using it. Anthropic does not control what MCP servers, files, or other software are included in plugins and cannot verify that they will work as intended or that they won't change. See each plugin's homepage for more information.")), AA && G0.createElement(T, {
            marginBottom: 1
        }, G0.createElement(C, {
            color: "error"
        }, "Error: ", AA)), G0.createElement(T, {
            flexDirection: "column"
        }, WA.map((xA, MA)=>G0.createElement(T, {
                key: xA.action
            }, s === MA && G0.createElement(C, null, "> "), s !== MA && G0.createElement(C, null, "  "), G0.createElement(C, {
                bold: s === MA
            }, v && xA.action === "install" ? "Installing…" : xA.label))))), G0.createElement(T, {
            marginTop: 1,
            paddingLeft: 1
        }, G0.createElement(C, {
            dimColor: !0
        }, G0.createElement(C, {
            bold: !0
        }, "Select:"), " Enter", " • ", G0.createElement(C, {
            bold: !0
        }, "Back:"), " Esc")));
    }
    if ($.length === 0) return G0.createElement(T, {
        flexDirection: "column"
    }, G0.createElement(T, {
        flexDirection: "column",
        paddingX: 1,
        borderStyle: "round"
    }, I, G0.createElement(T, {
        marginBottom: 1
    }, G0.createElement(C, {
        bold: !0
    }, "Install plugins")), G0.createElement(C, {
        dimColor: !0
    }, "No new plugins available to install."), G0.createElement(C, {
        dimColor: !0
    }, "All plugins from this marketplace are already installed.")), G0.createElement(T, {
        marginLeft: 3
    }, G0.createElement(C, {
        dimColor: !0,
        italic: !0
    }, "Esc to go back")));
    let _A = g.getVisibleItems($);
    return G0.createElement(T, {
        flexDirection: "column"
    }, G0.createElement(T, {
        flexDirection: "column",
        paddingX: 1,
        borderStyle: "round"
    }, I, G0.createElement(T, {
        marginBottom: 1
    }, G0.createElement(C, {
        bold: !0
    }, "Install Plugins"), g.needsPagination && G0.createElement(C, {
        dimColor: !0
    }, " ", "(", g.scrollPosition.current, "/", g.scrollPosition.total, ")")), g.scrollPosition.canScrollUp && G0.createElement(T, null, G0.createElement(C, {
        dimColor: !0
    }, " ", B1.arrowUp, " more above")), _A.map((e, VA)=>{
        let WA = g.toActualIndex(VA), xA = R === WA, MA = P.has(e.pluginId), nA = y.has(e.pluginId), ZA = VA === _A.length - 1;
        return G0.createElement(T, {
            key: e.pluginId,
            flexDirection: "column",
            marginBottom: ZA && !A ? 0 : 1
        }, G0.createElement(T, null, G0.createElement(C, {
            color: xA ? "suggestion" : void 0
        }, xA ? B1.pointer : " ", " "), G0.createElement(C, {
            color: e.isInstalled ? "success" : void 0
        }, e.isInstalled ? B1.tick : nA ? B1.ellipsis : MA ? B1.radioOn : B1.radioOff, " ", e.entry.name, e.entry.category && G0.createElement(C, {
            dimColor: !0
        }, " [", e.entry.category, "]"), e.entry.tags?.includes("community-managed") && G0.createElement(C, {
            dimColor: !0
        }, " [Community Managed]"), e.isInstalled && G0.createElement(C, {
            dimColor: !0
        }, " (installed)"))), e.entry.description && G0.createElement(T, {
            marginLeft: 4
        }, G0.createElement(C, {
            dimColor: !0
        }, e.entry.description.length > 60 ? e.entry.description.substring(0, 57) + "..." : e.entry.description), e.entry.version && G0.createElement(C, {
            dimColor: !0
        }, " · v", e.entry.version)));
    }), g.scrollPosition.canScrollDown && G0.createElement(T, null, G0.createElement(C, {
        dimColor: !0
    }, " ", B1.arrowDown, " more below")), A && G0.createElement(T, {
        marginTop: 1
    }, G0.createElement(C, {
        color: "error"
    }, B1.cross, " ", A))), G0.createElement(_D1, {
        hasSelection: P.size > 0
    }));
}
var G0, LD;
