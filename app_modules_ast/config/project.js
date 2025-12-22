// Module: _BA
// Type: L
// Lines: 279867-280291
//
var createRenderState = L(()=>{
    xlB = {
        policySettings: "managed",
        userSettings: "user",
        projectSettings: "project",
        localSettings: "local",
        flagSettings: "flag"
    };
    Jw3 = {
        user: "userSettings",
        project: "projectSettings",
        local: "localSettings"
    };
});
import { dirname as M2Z, join as Ta } from "path";
function ojA() {
    return Ta(gQ(), "plugins", "installed_plugins.json");
}
function Xw3() {
    return Ta(gQ(), "plugins", "installed_plugins_v2.json");
}
function Iw3() {
    if (m80) return;
    let A = vA(), Q = ojA(), B = Xw3();
    try {
        let G = A.existsSync(B), Z = A.existsSync(Q);
        if (G) {
            (A.renameSync(B, Q), k("Renamed installed_plugins_v2.json to installed_plugins.json"));
            let Y = yR();
            klB(Y);
        } else if (Z) {
            let Y = A.readFileSync(Q, {
                encoding: "utf-8"
            }), J = JSON.parse(Y);
            if ((typeof J?.version === "number" ? J.version : 1) === 1) {
                let I = cjA.parse(J), W = p80(I);
                (A.writeFileSync(Q, JSON.stringify(W, null, 2), {
                    encoding: "utf-8",
                    flush: !0
                }), k(`Converted installed_plugins.json from V1 to V2 format (${Object.keys(I.plugins).length} plugins)`), klB(W));
            }
        }
        m80 = !0;
    } catch (G) {
        let Z = G instanceof Error ? G.message : String(G);
        (k(`Failed to migrate plugin files: ${Z}`, {
            level: "error"
        }), t(G instanceof Error ? G : Error(`Failed to migrate plugin files: ${Z}`)), (m80 = !0));
    }
}
function klB(A) {
    let Q = vA(), B = Sa();
    if (!Q.existsSync(B)) return;
    try {
        let G = new Set();
        for (let Y of Object.values(A.plugins))for (let J of Y)G.add(J.installPath);
        let Z = Q.readdirSync(B);
        for (let Y of Z){
            if (!Y.isDirectory()) continue;
            let J = Y.name, X = Ta(B, J);
            if (Q.readdirSync(X).some((K)=>{
                if (!K.isDirectory()) return !1;
                let V = Ta(X, K.name);
                return Q.readdirSync(V).some((D)=>D.isDirectory());
            })) continue;
            if (!G.has(X)) (Q.rmSync(X, {
                recursive: !0,
                force: !0
            }), k(`Cleaned up legacy cache directory: ${J}`));
        }
    } catch (G) {
        let Z = G instanceof Error ? G.message : String(G);
        k(`Failed to clean up legacy cache: ${Z}`, {
            level: "warn"
        });
    }
}
function c80() {
    let A = vA(), Q = ojA();
    if (!A.existsSync(Q)) return null;
    let B = A.readFileSync(Q, {
        encoding: "utf-8"
    }), G = JSON.parse(B);
    return {
        version: typeof G?.version === "number" ? G.version : 1,
        data: G
    };
}
function p80(A) {
    let Q = {};
    for (let [B, G] of Object.entries(A.plugins)){
        let Z = Qk(B, G.version);
        Q[B] = [
            {
                scope: "user",
                installPath: Z,
                version: G.version,
                installedAt: G.installedAt,
                lastUpdated: G.lastUpdated,
                gitCommitSha: G.gitCommitSha,
                isLocal: G.isLocal
            }
        ];
    }
    return {
        version: 2,
        plugins: Q
    };
}
function yR() {
    if (Ak !== null) return Ak;
    let A = ojA();
    try {
        let Q = c80();
        if (Q) {
            if (Q.version === 2) {
                let Z = pjA.parse(Q.data);
                return ((Ak = Z), k(`Loaded ${Object.keys(Z.plugins).length} installed plugins from ${A}`), Z);
            }
            let B = cjA.parse(Q.data), G = p80(B);
            return ((Ak = G), k(`Loaded and converted ${Object.keys(B.plugins).length} plugins from V1 format`), G);
        }
        return (k("installed_plugins.json doesn't exist, returning empty V2 object"), (Ak = {
            version: 2,
            plugins: {}
        }), Ak);
    } catch (Q) {
        let B = Q instanceof Error ? Q.message : String(Q);
        return (k(`Failed to load installed_plugins.json: ${B}. Starting with empty state.`, {
            level: "error"
        }), t(Q instanceof Error ? Q : Error(`Failed to load installed_plugins.json: ${B}`)), (Ak = {
            version: 2,
            plugins: {}
        }), Ak);
    }
}
function l80(A) {
    let Q = vA(), B = ojA();
    try {
        let G = Ta(gQ(), "plugins");
        if (!Q.existsSync(G)) Q.mkdirSync(G);
        let Z = JSON.stringify(A, null, 2);
        (Q.writeFileSync(B, Z, {
            encoding: "utf-8",
            flush: !0
        }), (Ak = A), k(`Saved ${Object.keys(A.plugins).length} installed plugins to ${B}`));
    } catch (G) {
        let Z = G instanceof Error ? G.message : String(G);
        throw (t(G instanceof Error ? G : Error(`Failed to save installed_plugins.json: ${Z}`)), G);
    }
}
function blB(A, Q, B) {
    let G = yR(), Z = G.plugins[A];
    if (!Z) return;
    if (((G.plugins[A] = Z.filter((Y)=>!(Y.scope === Q && Y.projectPath === B))), G.plugins[A].length === 0)) delete G.plugins[A];
    (l80(G), k(`Removed installation for ${A} at scope ${Q}`));
}
function i80() {
    if (d80 === null) d80 = yR();
    return d80;
}
function Pa() {
    try {
        let A = c80();
        if (A) {
            if (A.version === 2) return pjA.parse(A.data);
            let Q = cjA.parse(A.data);
            return p80(Q);
        }
        return {
            version: 2,
            plugins: {}
        };
    } catch (A) {
        let Q = A instanceof Error ? A.message : String(A);
        return (k(`Failed to load installed plugins from disk: ${Q}`, {
            level: "error"
        }), {
            version: 2,
            plugins: {}
        });
    }
}
function hlB(A, Q, B, G, Z) {
    let Y = Pa(), J = Y.plugins[A];
    if (!J) {
        k(`Cannot update ${A} on disk: plugin not found in installed plugins`);
        return;
    }
    let X = J.find((I)=>I.scope === Q && I.projectPath === B);
    if (X) {
        ((X.installPath = G), (X.version = Z), (X.lastUpdated = new Date().toISOString()));
        let I = vA(), W = ojA();
        (I.writeFileSync(W, JSON.stringify(Y, null, 2), {
            encoding: "utf-8",
            flush: !0
        }), (Ak = null), k(`Updated ${A} on disk to version ${Z} at ${G}`));
    } else k(`Cannot update ${A} on disk: no installation for scope ${Q}`);
}
async function glB() {
    Iw3();
    try {
        await a80();
    } catch (Q) {
        t(Q instanceof Error ? Q : Error(String(Q)));
    }
    let A = i80();
    k(`Initialized versioned plugins system with ${Object.keys(A.plugins).length} plugins`);
}
function Ww3(A) {
    let B = yR().plugins[A];
    if (!B || B.length === 0) return;
    let G = B[0];
    if (!G) return;
    return {
        version: G.version || "unknown",
        installedAt: G.installedAt || new Date().toISOString(),
        lastUpdated: G.lastUpdated,
        installPath: G.installPath,
        gitCommitSha: G.gitCommitSha,
        isLocal: G.isLocal
    };
}
function Rw(A) {
    return Ww3(A) !== void 0;
}
function n80(A, Q, B = "user", G) {
    let Z = yR(), Y = {
        scope: B,
        installPath: Q.installPath,
        version: Q.version,
        installedAt: Q.installedAt,
        lastUpdated: Q.lastUpdated,
        gitCommitSha: Q.gitCommitSha,
        isLocal: Q.isLocal,
        ...(G && {
            projectPath: G
        })
    }, J = Z.plugins[A] || [], X = J.findIndex((W)=>W.scope === B && W.projectPath === G), I = X >= 0;
    if (I) J[X] = Y;
    else J.push(Y);
    ((Z.plugins[A] = J), l80(Z), k(`${I ? "Updated" : "Added"} installed plugin: ${A} (scope: ${B})`));
}
async function p61(A) {
    try {
        let Q = await QQ("git", [
            "-C",
            A,
            "rev-parse",
            "HEAD"
        ]);
        if (Q.code === 0 && Q.stdout) return Q.stdout.trim();
        return;
    } catch (Q) {
        k(`Failed to get git commit SHA from ${A}: ${Q}`);
        return;
    }
}
function flB(A, Q) {
    let B = vA(), G = Ta(A, ".claude-plugin", "plugin.json");
    if (!B.existsSync(G)) return "unknown";
    try {
        let Z = B.readFileSync(G, {
            encoding: "utf-8"
        });
        return JSON.parse(Z).version || "unknown";
    } catch  {
        return (k(`Could not read version from manifest for ${Q}`), "unknown");
    }
}
async function a80() {
    let Q = HQ().enabledPlugins || {};
    if (Object.keys(Q).length === 0) return;
    let B = c80(), G = B !== null;
    if (G && B?.version === 2 && B) {
        let D = pjA.safeParse(B.data);
        if (D?.success) {
            let F = D.data.plugins;
            if (Object.keys(Q).filter((z)=>z.includes("@")).every((z)=>{
                let $ = F[z];
                return $ && $.length > 0;
            })) {
                k("All plugins already exist, skipping migration");
                return;
            }
        }
    }
    k(G ? "Syncing installed_plugins.json with enabledPlugins from all settings.json files" : "Creating installed_plugins.json from settings.json files");
    let Y = vA(), J = new Date().toISOString(), X = i1(), I = new Map(), W = [
        "userSettings",
        "projectSettings",
        "localSettings"
    ];
    for (let D of W){
        let E = uB(D)?.enabledPlugins || {};
        for (let z of Object.keys(E)){
            if (!z.includes("@")) continue;
            let $ = vlB(D);
            I.set(z, {
                scope: $,
                projectPath: $ === "user" ? void 0 : X
            });
        }
    }
    let K = {};
    if (G) K = {
        ...yR().plugins
    };
    let V = 0, H = 0;
    for (let [D, F] of I){
        let E = K[D];
        if (E && E.length > 0) {
            let z = E[0];
            if (z && (z.scope !== F.scope || z.projectPath !== F.projectPath)) {
                if (((z.scope = F.scope), F.projectPath)) z.projectPath = F.projectPath;
                else delete z.projectPath;
                ((z.lastUpdated = J), V++, k(`Updated ${D} scope to ${F.scope} (settings.json is source of truth)`));
            }
        } else {
            let z = D.split("@"), $ = z[0];
            if (!$ || z.length !== 2) continue;
            try {
                let O = await TF(D);
                if (!O) {
                    k(`Plugin ${D} not found in any marketplace, skipping`);
                    continue;
                }
                let { entry: N, marketplaceInstallLocation: M } = O, R, j = "unknown", P = void 0, f = !1;
                if (typeof N.source === "string") ((f = !0), (R = Ta(M, N.source)), (j = flB(R, D)), (P = await p61(R)));
                else {
                    let y = Sa(), m = $.replace(/[^a-zA-Z0-9-_]/g, "-"), g = Ta(y, m);
                    if (!Y.existsSync(g)) {
                        k(`External plugin ${D} not in cache, skipping`);
                        continue;
                    }
                    ((R = g), (j = flB(g, D)), (P = await p61(g)));
                }
                if (j === "unknown" && N.version) j = N.version;
                if (j === "unknown" && P) j = P.substring(0, 12);
                ((K[D] = [
                    {
                        scope: F.scope,
                        installPath: Qk(D, j),
                        version: j,
                        installedAt: J,
                        lastUpdated: J,
                        gitCommitSha: P,
                        isLocal: f,
                        ...(F.projectPath && {
                            projectPath: F.projectPath
                        })
                    }
                ]), H++, k(`Added ${D} with scope ${F.scope}`));
            } catch (O) {
                k(`Failed to add plugin ${D}: ${O}`);
            }
        }
    }
    if (!G || V > 0 || H > 0) (l80({
        version: 2,
        plugins: K
    }), k(`Sync completed: ${H} added, ${V} updated in installed_plugins.json`));
}
var m80 = !1, Ak = null, d80 = null;
