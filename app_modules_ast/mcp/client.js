// Module: RI9
// Type: L
// Lines: 510021-511134
//
var createRenderState = L(()=>{
    bA();
    N9();
    $2();
    fG = l(React runtime(), 1);
});
import * as e4A from "fs/promises";
import * as us from "path";
async function _I9(A) {
    try {
        return (await e4A.readdir(A, {
            withFileTypes: !0
        })).filter((B)=>B.isFile() && B.name.endsWith(".md")).map((B)=>{
            return us.basename(B.name, ".md");
        });
    } catch (Q) {
        let B = Q instanceof Error ? Q.message : String(Q);
        return (k(`Failed to read plugin components from ${A}: ${B}`, {
            level: "error"
        }), t(Q instanceof Error ? Q : Error(`Failed to read plugin components: ${B}`)), []);
    }
}
async function IZ7(A) {
    try {
        let Q = await e4A.readdir(A, {
            withFileTypes: !0
        }), B = [];
        for (let G of Q)if (G.isDirectory() || G.isSymbolicLink()) {
            let Z = us.join(A, G.name, "SKILL.md");
            try {
                (await e4A.access(Z), B.push(G.name));
            } catch  {}
        }
        return B;
    } catch (Q) {
        let B = Q instanceof Error ? Q.message : String(Q);
        return (k(`Failed to read skill directories from ${A}: ${B}`, {
            level: "error"
        }), t(Q instanceof Error ? Q : Error(`Failed to read skill directories: ${B}`)), []);
    }
}
function WZ7({ plugin: A, marketplace: Q }) {
    let [B, G] = lW.useState(null), [Z, Y] = lW.useState(!0), [J, X] = lW.useState(null);
    if ((lW.useEffect(()=>{
        async function W() {
            try {
                let V = (await JL(Q)).plugins.find((H)=>H.name === A.name);
                if (V) {
                    let H = [];
                    if (A.commandsPath) H.push(A.commandsPath);
                    if (A.commandsPaths) H.push(...A.commandsPaths);
                    let D = [];
                    for (let M of H)if (typeof M === "string") {
                        let R = await _I9(M);
                        D.push(...R);
                    }
                    let F = [];
                    if (A.agentsPath) F.push(A.agentsPath);
                    if (A.agentsPaths) F.push(...A.agentsPaths);
                    let E = [];
                    for (let M of F)if (typeof M === "string") {
                        let R = await _I9(M);
                        E.push(...R);
                    }
                    let z = [];
                    if (A.skillsPath) z.push(A.skillsPath);
                    if (A.skillsPaths) z.push(...A.skillsPaths);
                    let $ = [];
                    for (let M of z)if (typeof M === "string") {
                        let R = await IZ7(M);
                        $.push(...R);
                    }
                    let O = [];
                    if (A.hooksConfig) O.push(Object.keys(A.hooksConfig));
                    if (V.hooks) O.push(V.hooks);
                    let N = [];
                    if (A.mcpServers) N.push(Object.keys(A.mcpServers));
                    if (V.mcpServers) N.push(V.mcpServers);
                    G({
                        commands: D.length > 0 ? D : null,
                        agents: E.length > 0 ? E : null,
                        skills: $.length > 0 ? $ : null,
                        hooks: O.length > 0 ? O : null,
                        mcpServers: N.length > 0 ? N : null
                    });
                } else X(`Plugin ${A.name} not found in marketplace`);
            } catch (K) {
                X(K instanceof Error ? K.message : "Failed to load components");
            } finally{
                Y(!1);
            }
        }
        W();
    }, [
        A.name,
        A.commandsPath,
        A.commandsPaths,
        A.agentsPath,
        A.agentsPaths,
        A.skillsPath,
        A.skillsPaths,
        A.hooksConfig,
        A.mcpServers,
        Q
    ]), Z)) return null;
    if (J) return w0.createElement(T, {
        flexDirection: "column",
        marginBottom: 1
    }, w0.createElement(C, {
        bold: !0
    }, "Components:"), w0.createElement(C, {
        dimColor: !0
    }, "Error: ", J));
    if (!B) return null;
    if (!(B.commands || B.agents || B.skills || B.hooks || B.mcpServers)) return null;
    return w0.createElement(T, {
        flexDirection: "column",
        marginBottom: 1
    }, w0.createElement(C, {
        bold: !0
    }, "Installed components:"), B.commands ? w0.createElement(C, {
        dimColor: !0
    }, "• Commands:", " ", typeof B.commands === "string" ? B.commands : Array.isArray(B.commands) ? B.commands.join(", ") : Object.keys(B.commands).join(", ")) : null, B.agents ? w0.createElement(C, {
        dimColor: !0
    }, "• Agents:", " ", typeof B.agents === "string" ? B.agents : Array.isArray(B.agents) ? B.agents.join(", ") : Object.keys(B.agents).join(", ")) : null, B.skills ? w0.createElement(C, {
        dimColor: !0
    }, "• Skills:", " ", typeof B.skills === "string" ? B.skills : Array.isArray(B.skills) ? B.skills.join(", ") : Object.keys(B.skills).join(", ")) : null, B.hooks ? w0.createElement(C, {
        dimColor: !0
    }, "• Hooks:", " ", typeof B.hooks === "string" ? B.hooks : Array.isArray(B.hooks) ? B.hooks.map(String).join(", ") : typeof B.hooks === "object" && B.hooks !== null ? Object.keys(B.hooks).join(", ") : String(B.hooks)) : null, B.mcpServers ? w0.createElement(C, {
        dimColor: !0
    }, "• MCP Servers:", " ", typeof B.mcpServers === "string" ? B.mcpServers : Array.isArray(B.mcpServers) ? B.mcpServers.map(String).join(", ") : typeof B.mcpServers === "object" && B.mcpServers !== null ? Object.keys(B.mcpServers).join(", ") : String(B.mcpServers)) : null);
}
async function MM0(A, Q) {
    let G = (await JL(Q))?.plugins.find((Z)=>Z.name === A);
    if (G && typeof G.source === "string") return `Local plugins cannot be updated remotely. To update, modify the source at: ${G.source}`;
    return null;
}
function jI9({ setViewState: A, setResult: Q, onManageComplete: B, targetPlugin: G, targetMarketplace: Z, action: Y, children: J }) {
    let [X, I] = lW.useState("plugin-list"), [W, K] = lW.useState(null), [V, H] = lW.useState([]), [D, F] = lW.useState([]), [E, z] = lW.useState(!0), [$, O] = lW.useState(0), N = D.some((MA)=>MA.pendingEnable !== void 0 || MA.pendingUpdate), M = gs({
        totalItems: D.length + (N ? 1 : 0),
        selectedIndex: $
    }), [R, j] = lW.useState(0), [P, f] = lW.useState(!1), [y, m] = lW.useState(null), [g, s] = lW.useState(null), [p, v] = lW.useState(!1), [d, AA] = lW.useState(!1);
    (lW.useEffect(()=>{
        if (!W) {
            AA(!1);
            return;
        }
        async function MA() {
            let nA = W.plugin.manifest.mcpServers, ZA = !1;
            if (nA) ZA = (typeof nA === "string" && cR(nA)) || (Array.isArray(nA) && nA.some((zA)=>typeof zA === "string" && cR(zA)));
            if (!ZA) try {
                let zA = us.join(W.plugin.path, ".."), LA = us.join(zA, ".claude-plugin", "marketplace.json"), UA = await e4A.readFile(LA, "utf-8"), RA = JSON.parse(UA).plugins?.find((mA)=>mA.name === W.plugin.name);
                if (RA?.mcpServers) {
                    let mA = RA.mcpServers;
                    ZA = (typeof mA === "string" && cR(mA)) || (Array.isArray(mA) && mA.some((hA)=>typeof hA === "string" && cR(hA)));
                }
            } catch (zA) {
                k(`Failed to read raw marketplace.json: ${zA}`);
            }
            AA(ZA);
        }
        MA();
    }, [
        W
    ]), lW.useEffect(()=>{
        async function MA() {
            z(!0);
            try {
                let { enabled: nA, disabled: ZA } = await m7(), zA = [
                    ...nA,
                    ...ZA
                ], LA = HQ(), UA = {};
                for (let mA of zA){
                    let hA = mA.source.split("@")[1] || "local";
                    if (!UA[hA]) UA[hA] = [];
                    UA[hA].push(mA);
                }
                let $A = [];
                for (let [mA, hA] of Object.entries(UA)){
                    let Y1 = hA.filter((PA)=>{
                        let Q1 = `${PA.name}@${mA}`;
                        return LA?.enabledPlugins?.[Q1] !== !1;
                    }).length, C1 = hA.length - Y1;
                    $A.push({
                        name: mA,
                        installedPlugins: hA,
                        enabledCount: Y1,
                        disabledCount: C1
                    });
                }
                ($A.sort((mA, hA)=>{
                    if (mA.name === "claude-plugin-directory") return -1;
                    if (hA.name === "claude-plugin-directory") return 1;
                    return mA.name.localeCompare(hA.name);
                }), H($A));
                let RA = [];
                for (let mA of $A)for (let hA of mA.installedPlugins){
                    let Y1 = `${hA.name}@${mA.name}`, { scope: C1 } = dd(Y1);
                    RA.push({
                        plugin: hA,
                        marketplace: mA.name,
                        scope: C1,
                        pendingEnable: void 0,
                        pendingUpdate: !1
                    });
                }
                (F(RA), O(0));
            } finally{
                z(!1);
            }
        }
        MA();
    }, []), lW.useEffect(()=>{
        if (G && V.length > 0 && !E) {
            let MA = Z ? V.filter((nA)=>nA.name === Z) : V;
            for (let nA of MA){
                let ZA = nA.installedPlugins.find((zA)=>zA.name === G);
                if (ZA) {
                    let zA = `${ZA.name}@${nA.name}`, { scope: LA } = dd(zA), UA = {
                        plugin: ZA,
                        marketplace: nA.name,
                        scope: LA,
                        pendingEnable: void 0,
                        pendingUpdate: !1
                    };
                    (K(UA), I("plugin-details"));
                    break;
                }
            }
        }
    }, [
        G,
        Z,
        V,
        E
    ]));
    let YA = ()=>{
        return D.some((MA)=>MA.pendingEnable !== void 0 || MA.pendingUpdate);
    }, jA = ()=>{
        let MA = D.filter((zA)=>zA.pendingUpdate).length, nA = D.filter((zA)=>zA.pendingEnable === !0).length, ZA = D.filter((zA)=>zA.pendingEnable === !1).length;
        return {
            updateCount: MA,
            enableCount: nA,
            disableCount: ZA
        };
    }, yA = async ()=>{
        (f(!0), m(null));
        try {
            let MA = 0, nA = 0, ZA = 0;
            for (let UA of D){
                let $A = `${UA.plugin.name}@${UA.marketplace}`, RA = UA.scope || "user";
                if (UA.pendingUpdate) {
                    let mA = await x4A($A, RA);
                    if (mA.success && !mA.alreadyUpToDate) MA++;
                }
                if (UA.pendingEnable !== void 0 && Ls(RA)) {
                    if (UA.pendingEnable) {
                        if (!Rw($A)) {
                            let hA = await TF($A);
                            if (hA) {
                                let { entry: Y1, marketplaceInstallLocation: C1 } = hA, PA = EP(Y1.source) ? us.join(C1, Y1.source) : void 0, Q1 = cd(RA);
                                await yw($A, Y1, RA, Q1, PA);
                            }
                        }
                        if ((await y4A($A, RA)).success) nA++;
                    } else if ((await RfA($A, RA)).success) ZA++;
                }
            }
            IY();
            let zA = [];
            if (MA > 0) zA.push(`Updated ${MA} plugin${MA !== 1 ? "s" : ""}`);
            if (nA > 0) zA.push(`Enabled ${nA} plugin${nA !== 1 ? "s" : ""}`);
            if (ZA > 0) zA.push(`Disabled ${ZA} plugin${ZA !== 1 ? "s" : ""}`);
            let LA = `✓ ${zA.join(", ")}. Restart Claude Code to apply changes.`;
            if ((Q(LA), B)) await B();
            A({
                type: "menu"
            });
        } catch (MA) {
            f(!1);
            let nA = MA instanceof Error ? MA.message : String(MA);
            (m(`Failed to apply changes: ${nA}`), t(MA instanceof Error ? MA : Error(`Failed to apply plugin changes: ${String(MA)}`)));
        }
    }, KA = async (MA)=>{
        if (!W) return;
        let nA = W.scope || "user";
        if (!Ls(nA) && MA !== "update") {
            m("Managed plugins can only be updated, not enabled, disabled, or uninstalled.");
            return;
        }
        (f(!0), m(null));
        try {
            let ZA = `${W.plugin.name}@${W.marketplace}`, zA = cd(nA);
            switch(MA){
                case "enable":
                    {
                        if (!Ls(nA)) break;
                        if (!Rw(ZA)) {
                            let RA = await TF(ZA);
                            if (RA) {
                                let { entry: mA, marketplaceInstallLocation: hA } = RA, Y1 = EP(mA.source) ? us.join(hA, mA.source) : void 0;
                                await yw(ZA, mA, nA, zA, Y1);
                            }
                        }
                        let $A = await y4A(ZA, nA);
                        if (!$A.success) throw Error($A.message);
                        break;
                    }
                case "disable":
                    {
                        if (!Ls(nA)) break;
                        let $A = await RfA(ZA, nA);
                        if (!$A.success) throw Error($A.message);
                        break;
                    }
                case "uninstall":
                    {
                        if (!Ls(nA)) break;
                        let $A = await MfA(ZA, nA);
                        if (!$A.success) throw Error($A.message);
                        break;
                    }
                case "update":
                    {
                        let $A = await x4A(ZA, nA);
                        if (!$A.success) throw Error($A.message);
                        if ($A.alreadyUpToDate) {
                            if ((Q(`${W.plugin.name} is already at the latest version (${$A.newVersion}).`), B)) await B();
                            A({
                                type: "menu"
                            });
                            return;
                        }
                        break;
                    }
            }
            IY();
            let UA = `✓ ${MA === "enable" ? "Enabled" : MA === "disable" ? "Disabled" : MA === "update" ? "Updated" : "Uninstalled"} ${W.plugin.name}. Restart Claude Code to apply changes.`;
            if ((Q(UA), B)) await B();
            A({
                type: "menu"
            });
        } catch (ZA) {
            f(!1);
            let zA = ZA instanceof Error ? ZA.message : String(ZA);
            (m(`Failed to ${MA}: ${zA}`), t(ZA instanceof Error ? ZA : Error(`Failed to ${MA} plugin: ${String(ZA)}`)));
        }
    }, OA = async (MA)=>{
        let nA = MA.scope || "user";
        if (!Ls(nA)) {
            m("Managed plugins cannot be uninstalled. They can only be updated.");
            return;
        }
        (f(!0), m(null));
        try {
            let ZA = `${MA.plugin.name}@${MA.marketplace}`, zA = await MfA(ZA, nA);
            if (!zA.success) throw Error(zA.message);
            let { enabled: LA, disabled: UA } = await m7(), $A = [
                ...LA,
                ...UA
            ], RA = HQ(), mA = {};
            for (let C1 of $A){
                let PA = C1.source.split("@")[1] || "local";
                if (!mA[PA]) mA[PA] = [];
                mA[PA].push(C1);
            }
            let hA = [];
            for (let [C1, PA] of Object.entries(mA)){
                let Q1 = PA.filter((S1)=>{
                    let B0 = `${S1.name}@${C1}`;
                    return RA?.enabledPlugins?.[B0] !== !1;
                }).length, o1 = PA.length - Q1;
                hA.push({
                    name: C1,
                    installedPlugins: PA,
                    enabledCount: Q1,
                    disabledCount: o1
                });
            }
            (hA.sort((C1, PA)=>{
                if (C1.name === "claude-plugin-directory") return -1;
                if (PA.name === "claude-plugin-directory") return 1;
                return C1.name.localeCompare(PA.name);
            }), H(hA));
            let Y1 = [];
            for (let C1 of hA)for (let PA of C1.installedPlugins){
                let Q1 = `${PA.name}@${C1.name}`, { scope: o1 } = dd(Q1);
                Y1.push({
                    plugin: PA,
                    marketplace: C1.name,
                    scope: o1,
                    pendingEnable: void 0,
                    pendingUpdate: !1
                });
            }
            if ((F(Y1), $ >= Y1.length)) O(Math.max(0, Y1.length - 1));
            Q(`✓ Uninstalled ${MA.plugin.name}. Restart Claude Code to apply changes.`);
        } catch (ZA) {
            let zA = ZA instanceof Error ? ZA.message : String(ZA);
            (m(`Failed to uninstall: ${zA}`), t(ZA instanceof Error ? ZA : Error(`Failed to uninstall plugin: ${String(ZA)}`)));
        } finally{
            f(!1);
        }
    };
    if ((_1((MA, nA)=>{
        if (nA.escape) {
            if (X === "plugin-details") (I("plugin-list"), K(null), m(null));
            else if (X === "configuring") (I("plugin-details"), s(null));
            else A({
                type: "menu"
            });
            return;
        }
        if (X === "plugin-list") {
            let ZA = YA(), zA = D.length + (ZA ? 1 : 0);
            if ((nA.upArrow || MA === "k") && $ > 0) M.handleSelectionChange($ - 1, O);
            else if ((nA.downArrow || MA === "j") && $ < zA - 1) M.handleSelectionChange($ + 1, O);
            else if (MA === " " && $ < D.length) {
                let LA = [
                    ...D
                ], UA = LA[$];
                if (UA) {
                    let $A = HQ(), RA = `${UA.plugin.name}@${UA.marketplace}`, mA = $A?.enabledPlugins?.[RA] !== !1;
                    if (UA.pendingEnable === void 0) UA.pendingEnable = !mA;
                    else UA.pendingEnable = void 0;
                    F(LA);
                }
            } else if (MA === "u" && $ < D.length) {
                let LA = [
                    ...D
                ], UA = LA[$];
                if (UA) (async ()=>{
                    try {
                        let RA = await MM0(UA.plugin.name, UA.marketplace);
                        if (RA) {
                            m(RA);
                            return;
                        }
                        ((UA.pendingUpdate = !UA.pendingUpdate), F(LA));
                    } catch (RA) {
                        m(RA instanceof Error ? RA.message : "Failed to check plugin update availability");
                    }
                })();
            } else if (nA.delete || nA.backspace) {
                if ($ < D.length && !P) {
                    let LA = D[$];
                    if (LA) OA(LA);
                }
            } else if (nA.return) {
                if ($ === D.length && ZA) yA();
                else if ($ < D.length) {
                    let LA = D[$];
                    if (LA) (K(LA), I("plugin-details"), j(0), m(null));
                }
            }
        } else if (X === "plugin-details" && W) {
            let ZA = HQ(), zA = `${W.plugin.name}@${W.marketplace}`, LA = ZA?.enabledPlugins?.[zA] !== !1, UA = [];
            if ((UA.push({
                label: LA ? "Disable plugin" : "Enable plugin",
                action: ()=>void KA(LA ? "disable" : "enable")
            }), UA.push({
                label: W.pendingUpdate ? "Unmark for update" : "Mark for update",
                action: async ()=>{
                    try {
                        let $A = await MM0(W.plugin.name, W.marketplace);
                        if ($A) {
                            m($A);
                            return;
                        }
                        let RA = [
                            ...D
                        ], mA = RA.findIndex((hA)=>hA.plugin.name === W.plugin.name && hA.marketplace === W.marketplace);
                        if (mA !== -1) ((RA[mA].pendingUpdate = !W.pendingUpdate), F(RA), K({
                            ...W,
                            pendingUpdate: !W.pendingUpdate
                        }));
                    } catch ($A) {
                        m($A instanceof Error ? $A.message : "Failed to check plugin update availability");
                    }
                }
            }), d)) UA.push({
                label: "Configure",
                action: async ()=>{
                    v(!0);
                    try {
                        let $A = W.plugin.manifest.mcpServers, RA = null;
                        if (typeof $A === "string" && cR($A)) RA = $A;
                        else if (Array.isArray($A)) {
                            for (let Y1 of $A)if (typeof Y1 === "string" && cR(Y1)) {
                                RA = Y1;
                                break;
                            }
                        }
                        if (!RA) {
                            (m("No MCPB file found in plugin"), v(!1));
                            return;
                        }
                        let mA = `${W.plugin.name}@${W.marketplace}`, hA = await RTA(RA, W.plugin.path, mA, void 0, void 0, !0);
                        if ("status" in hA && hA.status === "needs-config") (s(hA), I("configuring"));
                        else m("Failed to load MCPB for configuration");
                    } catch ($A) {
                        let RA = $A instanceof Error ? $A.message : String($A);
                        m(`Failed to load configuration: ${RA}`);
                    } finally{
                        v(!1);
                    }
                }
            });
            if ((UA.push({
                label: "Update now",
                action: ()=>void KA("update")
            }), UA.push({
                label: "Uninstall",
                action: ()=>void KA("uninstall")
            }), W.plugin.manifest.homepage)) UA.push({
                label: "Open homepage",
                action: ()=>void H5(W.plugin.manifest.homepage)
            });
            if (W.plugin.manifest.repository) UA.push({
                label: "View on GitHub",
                action: ()=>void H5(W.plugin.manifest.repository)
            });
            if ((UA.push({
                label: "Back to plugin list",
                action: ()=>{
                    (I("plugin-list"), K(null), m(null));
                }
            }), (nA.upArrow || MA === "k") && R > 0)) j(R - 1);
            else if ((nA.downArrow || MA === "j") && R < UA.length - 1) j(R + 1);
            else if (nA.return && UA[R]) UA[R].action();
        }
    }), E)) return w0.createElement(T, {
        flexDirection: "column"
    }, w0.createElement(T, {
        flexDirection: "column",
        paddingX: 1,
        borderStyle: "round"
    }, J, w0.createElement(C, null, "Loading installed plugins…")));
    if (V.length === 0) return w0.createElement(T, {
        flexDirection: "column"
    }, w0.createElement(T, {
        flexDirection: "column",
        paddingX: 1,
        borderStyle: "round"
    }, J, w0.createElement(T, {
        marginBottom: 1
    }, w0.createElement(C, {
        bold: !0
    }, "Manage plugins")), w0.createElement(C, null, "No plugins installed.")), w0.createElement(T, {
        marginTop: 1,
        paddingLeft: 1
    }, w0.createElement(C, {
        dimColor: !0
    }, "Esc to go back")));
    if (X === "configuring" && g && W) {
        let ZA = function() {
            (s(null), I("plugin-details"));
        }, MA = `${W.plugin.name}@${W.marketplace}`;
        async function nA(zA) {
            if (!g || !W) return;
            try {
                let LA = W.plugin.manifest.mcpServers, UA = null;
                if (typeof LA === "string" && cR(LA)) UA = LA;
                else if (Array.isArray(LA)) {
                    for (let $A of LA)if (typeof $A === "string" && cR($A)) {
                        UA = $A;
                        break;
                    }
                }
                if (!UA) {
                    (m("No MCPB file found"), I("plugin-details"));
                    return;
                }
                (await RTA(UA, W.plugin.path, MA, void 0, zA), m(null), s(null), I("plugin-details"), Q("Configuration saved. Restart Claude Code for changes to take effect."));
            } catch (LA) {
                let UA = LA instanceof Error ? LA.message : String(LA);
                (m(`Failed to save configuration: ${UA}`), I("plugin-details"));
            }
        }
        return w0.createElement(MI9, {
            pluginName: W.plugin.name,
            serverName: g.manifest.name,
            configSchema: g.configSchema,
            onSave: nA,
            onCancel: ZA
        });
    }
    if (X === "plugin-details" && W) {
        let MA = HQ(), nA = `${W.plugin.name}@${W.marketplace}`, ZA = MA?.enabledPlugins?.[nA] !== !1, zA = [];
        if ((zA.push({
            label: ZA ? "Disable plugin" : "Enable plugin",
            action: ()=>void KA(ZA ? "disable" : "enable")
        }), zA.push({
            label: W.pendingUpdate ? "Unmark for update" : "Mark for update",
            action: async ()=>{
                try {
                    let LA = await MM0(W.plugin.name, W.marketplace);
                    if (LA) {
                        m(LA);
                        return;
                    }
                    let UA = [
                        ...D
                    ], $A = UA.findIndex((RA)=>RA.plugin.name === W.plugin.name && RA.marketplace === W.marketplace);
                    if ($A !== -1) ((UA[$A].pendingUpdate = !W.pendingUpdate), F(UA), K({
                        ...W,
                        pendingUpdate: !W.pendingUpdate
                    }));
                } catch (LA) {
                    m(LA instanceof Error ? LA.message : "Failed to check plugin update availability");
                }
            }
        }), d)) zA.push({
            label: "Configure",
            action: ()=>{}
        });
        if ((zA.push({
            label: "Update now",
            action: ()=>void KA("update")
        }), zA.push({
            label: "Uninstall",
            action: ()=>void KA("uninstall")
        }), W.plugin.manifest.homepage)) zA.push({
            label: "Open homepage",
            action: ()=>void H5(W.plugin.manifest.homepage)
        });
        if (W.plugin.manifest.repository) zA.push({
            label: "View on GitHub",
            action: ()=>void H5(W.plugin.manifest.repository)
        });
        return (zA.push({
            label: "Back to plugin list",
            action: ()=>{
                (I("plugin-list"), K(null), m(null));
            }
        }), w0.createElement(T, {
            flexDirection: "column"
        }, w0.createElement(T, {
            flexDirection: "column",
            paddingX: 1,
            borderStyle: "round"
        }, J, w0.createElement(T, {
            marginBottom: 1
        }, w0.createElement(C, {
            bold: !0
        }, W.plugin.name, " @ ", W.marketplace)), w0.createElement(T, {
            marginBottom: 1
        }, w0.createElement(C, {
            dimColor: !0
        }, "Scope: "), w0.createElement(C, null, W.scope || "user")), W.plugin.manifest.version && w0.createElement(T, {
            marginBottom: 1
        }, w0.createElement(C, {
            dimColor: !0
        }, "Version: "), w0.createElement(C, null, W.plugin.manifest.version)), W.plugin.manifest.description && w0.createElement(T, {
            marginBottom: 1
        }, w0.createElement(C, null, W.plugin.manifest.description)), W.plugin.manifest.author && w0.createElement(T, {
            marginBottom: 1
        }, w0.createElement(C, {
            dimColor: !0
        }, "Author: "), w0.createElement(C, null, W.plugin.manifest.author.name)), w0.createElement(T, {
            marginBottom: 1
        }, w0.createElement(C, {
            dimColor: !0
        }, "Status: "), w0.createElement(C, {
            color: ZA ? "success" : "warning"
        }, ZA ? "Enabled" : "Disabled"), W.pendingUpdate && w0.createElement(C, {
            color: "suggestion"
        }, " · Marked for update")), w0.createElement(WZ7, {
            plugin: W.plugin,
            marketplace: W.marketplace
        }), w0.createElement(T, {
            marginTop: 1,
            flexDirection: "column"
        }, zA.map((LA, UA)=>{
            let $A = UA === R;
            return w0.createElement(T, {
                key: UA
            }, $A && w0.createElement(C, null, B1.pointer, " "), !$A && w0.createElement(C, null, "  "), w0.createElement(C, {
                bold: $A,
                color: LA.label.includes("Uninstall") ? "error" : LA.label.includes("Update") ? "suggestion" : void 0
            }, LA.label));
        })), P && w0.createElement(T, {
            marginTop: 1
        }, w0.createElement(C, null, "Processing…")), y && w0.createElement(T, {
            marginTop: 1
        }, w0.createElement(C, {
            color: "error"
        }, y))), w0.createElement(T, {
            marginTop: 1,
            paddingLeft: 1
        }, w0.createElement(C, {
            dimColor: !0
        }, w0.createElement(C, {
            bold: !0
        }, "Navigate:"), " ", B1.arrowUp, B1.arrowDown, " • ", w0.createElement(C, {
            bold: !0
        }, "Select:"), " Enter", " • ", w0.createElement(C, {
            bold: !0
        }, "Back:"), " Esc"))));
    }
    let _A = YA(), { updateCount: e, enableCount: VA, disableCount: WA } = jA(), xA = M.getVisibleItems(D);
    return w0.createElement(T, {
        flexDirection: "column"
    }, w0.createElement(T, {
        flexDirection: "column",
        paddingX: 1,
        borderStyle: "round"
    }, J, w0.createElement(T, {
        marginBottom: 1
    }, w0.createElement(C, {
        bold: !0
    }, "Installed Plugins"), M.needsPagination && w0.createElement(C, {
        dimColor: !0
    }, " ", "(", M.scrollPosition.current, "/", M.scrollPosition.total, ")")), M.scrollPosition.canScrollUp && w0.createElement(T, null, w0.createElement(C, {
        dimColor: !0
    }, " ", B1.arrowUp, " more above")), xA.map((MA, nA)=>{
        let ZA = M.toActualIndex(nA), zA = HQ(), LA = `${MA.plugin.name}@${MA.marketplace}`, UA = zA?.enabledPlugins?.[LA] !== !1, $A = MA.pendingEnable !== void 0 ? MA.pendingEnable : UA, RA = ZA === $, mA = MA.pendingEnable !== void 0 || MA.pendingUpdate, hA = nA > 0 ? xA[nA - 1] : null, Y1 = !hA || hA.marketplace !== MA.marketplace;
        return w0.createElement(T, {
            key: LA,
            flexDirection: "column"
        }, Y1 && w0.createElement(T, {
            marginTop: nA > 0 ? 1 : 0,
            marginBottom: 0
        }, w0.createElement(C, {
            dimColor: !0,
            bold: !0
        }, MA.marketplace)), w0.createElement(T, null, w0.createElement(C, {
            color: RA ? "suggestion" : void 0
        }, RA ? B1.pointer : " ", " "), w0.createElement(C, {
            color: MA.pendingEnable !== void 0 ? "warning" : $A ? "success" : void 0
        }, $A ? B1.radioOn : B1.radioOff, " "), w0.createElement(C, {
            bold: RA,
            color: MA.pendingUpdate ? "suggestion" : mA ? "warning" : void 0
        }, MA.plugin.name), MA.scope && w0.createElement(C, {
            dimColor: !0
        }, " ", MA.scope), MA.plugin.manifest.version && w0.createElement(C, {
            dimColor: !0
        }, ", v", MA.plugin.manifest.version), MA.pendingUpdate && w0.createElement(C, {
            color: "suggestion"
        }, " · update")));
    }), M.scrollPosition.canScrollDown && w0.createElement(T, null, w0.createElement(C, {
        dimColor: !0
    }, " ", B1.arrowDown, " more below")), _A && w0.createElement(T, {
        marginTop: 1
    }, $ === D.length && w0.createElement(C, null, B1.pointer, " "), $ !== D.length && w0.createElement(C, null, "  "), w0.createElement(C, {
        bold: $ === D.length,
        color: "success"
    }, "Apply changes"), w0.createElement(C, {
        dimColor: !0
    }, " ", e > 0 && `(update ${e})`, VA > 0 && ` (enable ${VA})`, WA > 0 && ` (disable ${WA})`))), _A && w0.createElement(T, {
        marginTop: 1,
        paddingLeft: 1
    }, w0.createElement(C, {
        color: "warning"
    }, "Restart to apply changes")), w0.createElement(T, {
        paddingLeft: 3
    }, w0.createElement(C, {
        dimColor: !0,
        italic: !0
    }, "Space: toggle · Enter: details · Delete: uninstall · Esc: back")));
}
var w0, lW;
