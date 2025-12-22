// Module: Go
// Type: L
// Lines: 300255-301307
//
var Go = L(()=>{
    Y$();
    XL();
    hK();
    wW();
    createRenderState();
    zB();
    aB();
    createRenderState();
    pushStartInstance();
    g1();
});
import { join as z3, resolve as Cj3, basename as $j3, relative as jsB, dirname as ysB, sep as TsB } from "path";
function Sa() {
    return z3(gQ(), "plugins", "cache");
}
function Qk(A, Q) {
    let B = Sa(), [G, Z] = A.split("@"), Y = (Z || "unknown").replace(/[^a-zA-Z0-9\-_]/g, "-"), J = (G || A).replace(/[^a-zA-Z0-9\-_]/g, "-"), X = Q.replace(/[^a-zA-Z0-9\-_.]/g, "-");
    return z3(B, Y, J, X);
}
function STA(A, Q) {
    let B = vA();
    if (!B.existsSync(Q)) B.mkdirSync(Q);
    let G = B.readdirSync(A);
    for (let Z of G){
        let Y = z3(A, Z.name), J = z3(Q, Z.name);
        if (Z.isDirectory()) STA(Y, J);
        else if (Z.isFile()) B.copyFileSync(Y, J);
        else if (Z.isSymbolicLink()) {
            let X = B.readlinkSync(Y), I;
            try {
                I = B.realpathSync(Y);
            } catch  {
                B.symlinkSync(X, J);
                continue;
            }
            let W;
            try {
                W = B.realpathSync(A);
            } catch  {
                W = A;
            }
            let K = W.endsWith(TsB) ? W : W + TsB;
            if (I.startsWith(K) || I === W) {
                let V = jsB(W, I), H = z3(Q, V), D = jsB(ysB(J), H);
                B.symlinkSync(D, J);
            } else B.symlinkSync(I, J);
        }
    }
}
async function B31(A, Q, B, G, Z) {
    let Y = vA(), J = Qk(Q, B);
    if (Y.existsSync(J) && !Y.isDirEmptySync(J)) return (k(`Plugin ${Q} version ${B} already cached at ${J}`), J);
    if (Y.existsSync(J) && Y.isDirEmptySync(J)) (k(`Removing empty cache directory for ${Q} at ${J}`), Y.rmdirSync(J));
    if ((Y.mkdirSync(ysB(J)), G && typeof G.source === "string" && Z)) {
        let I = r50(Z, G.source);
        if (Y.existsSync(I)) (k(`Copying source directory ${G.source} for plugin ${Q}`), STA(I, J));
        else throw Error(`Plugin source directory not found: ${I} (from entry.source: ${G.source})`);
    } else (k(`Copying plugin ${Q} to versioned cache (fallback to full copy)`), STA(A, J));
    let X = z3(J, ".git");
    if (Y.existsSync(X)) Y.rmSync(X, {
        recursive: !0,
        force: !0
    });
    if (Y.isDirEmptySync(J)) throw Error(`Failed to copy plugin ${Q} to versioned cache: destination is empty after copy`);
    return (k(`Successfully cached plugin ${Q} at ${J}`), J);
}
function Uj3(A) {
    try {
        let Q = new URL(A);
        if (![
            "https:",
            "http:",
            "file:"
        ].includes(Q.protocol)) {
            if (!/^git@[a-zA-Z0-9.-]+:/.test(A)) throw Error(`Invalid git URL protocol: ${Q.protocol}. Only HTTPS, HTTP, file:// and SSH (git@) URLs are supported.`);
        }
        return A;
    } catch  {
        if (/^git@[a-zA-Z0-9.-]+:/.test(A)) return A;
        throw Error(`Invalid git URL: ${A}`);
    }
}
async function wj3(A, Q) {
    let B = vA(), G = z3(gQ(), "plugins", "npm-cache");
    B.mkdirSync(G);
    let Z = z3(G, "node_modules", A);
    if (!B.existsSync(Z)) {
        k(`Installing npm package ${A} to cache`);
        let J = await QQ("npm", [
            "install",
            A,
            "--prefix",
            G
        ], {
            useCwd: !1
        });
        if (J.code !== 0) throw Error(`Failed to install npm package: ${J.stderr}`);
    }
    (STA(Z, Q), k(`Copied npm package ${A} from cache to ${Q}`));
}
async function qj3(A, Q, B) {
    let G = [
        "clone",
        "--depth",
        "1"
    ];
    if (B) G.push("--branch", B);
    G.push(A, Q);
    let Z = await QQ("git", G);
    if (Z.code !== 0) throw Error(`Failed to clone repository: ${Z.stderr}`);
}
async function xsB(A, Q, B) {
    let G = Uj3(A);
    await qj3(G, Q, B);
    let Z = B ? ` (ref: ${B})` : "";
    k(`Cloned repository from ${G}${Z} to ${Q}`);
}
async function Nj3(A, Q, B) {
    if (!/^[a-zA-Z0-9-_.]+\/[a-zA-Z0-9-_.]+$/.test(A)) throw Error(`Invalid GitHub repository format: ${A}. Expected format: owner/repo`);
    let G = `git@github.com:${A}.git`;
    return xsB(G, Q, B);
}
async function Lj3(A, Q) {
    let B = vA();
    if (!B.existsSync(A)) throw Error(`Source path does not exist: ${A}`);
    STA(A, Q);
    let G = z3(Q, ".git");
    if (B.existsSync(G)) B.rmSync(G, {
        recursive: !0,
        force: !0
    });
}
function Oj3(A) {
    let Q = Date.now(), B = Math.random().toString(36).substring(2, 8), G;
    if (typeof A === "string") G = "local";
    else switch(A.source){
        case "npm":
            G = "npm";
            break;
        case "pip":
            G = "pip";
            break;
        case "github":
            G = "github";
            break;
        case "url":
            G = "git";
            break;
        default:
            G = "unknown";
    }
    return `temp_${G}_${Q}_${B}`;
}
async function lBA(A, Q) {
    let B = vA(), G = Sa();
    B.mkdirSync(G);
    let Z = Oj3(A), Y = z3(G, Z), J = !1;
    try {
        if ((k(`Caching plugin from source: ${JSON.stringify(A)} to temporary path ${Y}`), (J = !0), typeof A === "string")) await Lj3(A, Y);
        else switch(A.source){
            case "npm":
                await wj3(A.package, Y);
                break;
            case "github":
                await Nj3(A.repo, Y, A.ref);
                break;
            case "url":
                await xsB(A.url, Y, A.ref);
                break;
            case "pip":
                throw Error("Python package plugins are not yet supported");
            default:
                throw Error("Unsupported plugin source type");
        }
    } catch (H) {
        if (J && B.existsSync(Y)) {
            k(`Cleaning up failed installation at ${Y}`);
            try {
                B.rmSync(Y, {
                    recursive: !0,
                    force: !0
                });
            } catch (D) {
                k(`Failed to clean up installation: ${D}`, {
                    level: "error"
                });
            }
        }
        throw H;
    }
    let X = z3(Y, ".claude-plugin", "plugin.json"), I = z3(Y, "plugin.json"), W;
    if (B.existsSync(X)) try {
        let H = B.readFileSync(X, {
            encoding: "utf-8"
        }), D = JSON.parse(H), F = qBA.safeParse(D);
        if (F.success) W = F.data;
        else {
            let E = F.error.errors.map((z)=>`${z.path.join(".")}: ${z.message}`).join(", ");
            throw (k(`Invalid manifest at ${X}: ${E}`, {
                level: "error"
            }), Error(`Plugin has an invalid manifest file at ${X}. Validation errors: ${E}`));
        }
    } catch (H) {
        if (H instanceof Error && H.message.includes("invalid manifest file")) throw H;
        let D = H instanceof Error ? H.message : String(H);
        throw (k(`Failed to parse manifest at ${X}: ${D}`, {
            level: "error"
        }), Error(`Plugin has a corrupt manifest file at ${X}. JSON parse error: ${D}`));
    }
    else if (B.existsSync(I)) try {
        let H = B.readFileSync(I, {
            encoding: "utf-8"
        }), D = JSON.parse(H), F = qBA.safeParse(D);
        if (F.success) W = F.data;
        else {
            let E = F.error.errors.map((z)=>`${z.path.join(".")}: ${z.message}`).join(", ");
            throw (k(`Invalid legacy manifest at ${I}: ${E}`, {
                level: "error"
            }), Error(`Plugin has an invalid manifest file at ${I}. Validation errors: ${E}`));
        }
    } catch (H) {
        if (H instanceof Error && H.message.includes("invalid manifest file")) throw H;
        let D = H instanceof Error ? H.message : String(H);
        throw (k(`Failed to parse legacy manifest at ${I}: ${D}`, {
            level: "error"
        }), Error(`Plugin has a corrupt manifest file at ${I}. JSON parse error: ${D}`));
    }
    else W = Q?.manifest || {
        name: Z,
        description: `Plugin cached from ${typeof A === "string" ? A : A.source}`
    };
    let K = W.name.replace(/[^a-zA-Z0-9-_]/g, "-"), V = z3(G, K);
    if (B.existsSync(V)) (k(`Removing old cached version at ${V}`), B.rmSync(V, {
        recursive: !0,
        force: !0
    }));
    return (B.renameSync(Y, V), k(`Successfully cached plugin ${W.name} to ${V}`), {
        path: V,
        manifest: W
    });
}
function G31(A, Q, B) {
    let G = vA();
    if (!G.existsSync(A)) return {
        name: Q,
        description: `Plugin from ${B}`
    };
    try {
        let Z = G.readFileSync(A, {
            encoding: "utf-8"
        }), Y = JSON.parse(Z), J = qBA.safeParse(Y);
        if (J.success) return J.data;
        let X = J.error.errors.map((I)=>`${I.path.join(".")}: ${I.message}`).join(", ");
        throw (k(`Plugin ${Q} has an invalid manifest file at ${A}. Validation errors: ${X}`, {
            level: "error"
        }), Error(`Plugin ${Q} has an invalid manifest file at ${A}.

Validation errors: ${X}

Please fix the manifest or remove it. The plugin cannot load with an invalid manifest.`));
    } catch (Z) {
        if (Z instanceof Error && Z.message.includes("invalid manifest file")) throw Z;
        let Y = Z instanceof Error ? Z.message : String(Z);
        throw (k(`Plugin ${Q} has a corrupt manifest file at ${A}. Parse error: ${Y}`, {
            level: "error"
        }), Error(`Plugin ${Q} has a corrupt manifest file at ${A}.

JSON parse error: ${Y}

Please check the file for syntax errors.`));
    }
}
function PsB(A, Q) {
    let B = vA();
    if (!B.existsSync(A)) throw Error(`Hooks file not found at ${A} for plugin ${Q}. If the manifest declares hooks, the file must exist.`);
    let G = B.readFileSync(A, {
        encoding: "utf-8"
    }), Z = JSON.parse(G);
    return $lB.parse(Z).hooks;
}
function vsB(A, Q, B, G, Z = !0) {
    let Y = vA(), J = [], X = z3(A, ".claude-plugin", "plugin.json"), I = G31(X, G, Q), W = {
        name: I.name,
        manifest: I,
        path: A,
        source: Q,
        repository: Q,
        enabled: B
    }, K = z3(A, "commands");
    if (Y.existsSync(K)) W.commandsPath = K;
    if (I.commands) {
        let $ = Object.values(I.commands)[0];
        if (typeof I.commands === "object" && !Array.isArray(I.commands) && $ && typeof $ === "object" && ("source" in $ || "content" in $)) {
            let O = {}, N = [];
            for (let [M, R] of Object.entries(I.commands)){
                if (!R || typeof R !== "object") continue;
                if (R.source) {
                    let j = z3(A, R.source);
                    if (Y.existsSync(j)) (N.push(j), (O[M] = R));
                    else (k(`Command ${M} path ${R.source} specified in manifest but not found at ${j} for ${I.name}`, {
                        level: "warn"
                    }), t(Error(`Plugin component file not found: ${j} for ${I.name}`)), J.push({
                        type: "path-not-found",
                        source: Q,
                        plugin: I.name,
                        path: j,
                        component: "commands"
                    }));
                } else if (R.content) O[M] = R;
            }
            if (N.length > 0) W.commandsPaths = N;
            if (Object.keys(O).length > 0) W.commandsMetadata = O;
        } else {
            let O = Array.isArray(I.commands) ? I.commands : [
                I.commands
            ], N = [];
            for (let M of O){
                if (typeof M !== "string") {
                    k(`Unexpected command format in manifest for ${I.name}`, {
                        level: "error"
                    });
                    continue;
                }
                let R = z3(A, M);
                if (Y.existsSync(R)) N.push(R);
                else (k(`Command path ${M} specified in manifest but not found at ${R} for ${I.name}`, {
                    level: "warn"
                }), t(Error(`Plugin component file not found: ${R} for ${I.name}`)), J.push({
                    type: "path-not-found",
                    source: Q,
                    plugin: I.name,
                    path: R,
                    component: "commands"
                }));
            }
            if (N.length > 0) W.commandsPaths = N;
        }
    }
    let V = z3(A, "agents");
    if (Y.existsSync(V)) W.agentsPath = V;
    if (I.agents) {
        let $ = Array.isArray(I.agents) ? I.agents : [
            I.agents
        ], O = [];
        for (let N of $){
            let M = z3(A, N);
            if (Y.existsSync(M)) O.push(M);
            else (k(`Agent path ${N} specified in manifest but not found at ${M} for ${I.name}`, {
                level: "warn"
            }), t(Error(`Plugin component file not found: ${M} for ${I.name}`)), J.push({
                type: "path-not-found",
                source: Q,
                plugin: I.name,
                path: M,
                component: "agents"
            }));
        }
        if (O.length > 0) W.agentsPaths = O;
    }
    let H = z3(A, "skills");
    if (Y.existsSync(H)) W.skillsPath = H;
    if (I.skills) {
        let $ = Array.isArray(I.skills) ? I.skills : [
            I.skills
        ], O = [];
        for (let N of $){
            let M = z3(A, N);
            if (Y.existsSync(M)) O.push(M);
            else (k(`Skill path ${N} specified in manifest but not found at ${M} for ${I.name}`, {
                level: "warn"
            }), t(Error(`Plugin component file not found: ${M} for ${I.name}`)), J.push({
                type: "path-not-found",
                source: Q,
                plugin: I.name,
                path: M,
                component: "skills"
            }));
        }
        if (O.length > 0) W.skillsPaths = O;
    }
    let D = z3(A, "output-styles");
    if (Y.existsSync(D)) W.outputStylesPath = D;
    if (I.outputStyles) {
        let $ = Array.isArray(I.outputStyles) ? I.outputStyles : [
            I.outputStyles
        ], O = [];
        for (let N of $){
            let M = z3(A, N);
            if (Y.existsSync(M)) O.push(M);
            else (k(`Output style path ${N} specified in manifest but not found at ${M} for ${I.name}`, {
                level: "warn"
            }), t(Error(`Plugin component file not found: ${M} for ${I.name}`)), J.push({
                type: "path-not-found",
                source: Q,
                plugin: I.name,
                path: M,
                component: "output-styles"
            }));
        }
        if (O.length > 0) W.outputStylesPaths = O;
    }
    let F, E = new Set(), z = z3(A, "hooks", "hooks.json");
    if (Y.existsSync(z)) try {
        F = PsB(z, I.name);
        try {
            E.add(Y.realpathSync(z));
        } catch  {
            E.add(z);
        }
        k(`Loaded hooks from standard location for plugin ${I.name}: ${z}`);
    } catch ($) {
        let O = $ instanceof Error ? $.message : String($);
        (k(`Failed to load hooks for ${I.name}: ${O}`, {
            level: "error"
        }), t($ instanceof Error ? $ : Error(O)), J.push({
            type: "hook-load-failed",
            source: Q,
            plugin: I.name,
            hookPath: z,
            reason: O
        }));
    }
    if (I.hooks) {
        let $ = Array.isArray(I.hooks) ? I.hooks : [
            I.hooks
        ];
        for (let O of $)if (typeof O === "string") {
            let N = z3(A, O);
            if (!Y.existsSync(N)) {
                (k(`Hooks file ${O} specified in manifest but not found at ${N} for ${I.name}`, {
                    level: "error"
                }), t(Error(`Plugin component file not found: ${N} for ${I.name}`)), J.push({
                    type: "path-not-found",
                    source: Q,
                    plugin: I.name,
                    path: N,
                    component: "hooks"
                }));
                continue;
            }
            let M;
            try {
                M = Y.realpathSync(N);
            } catch  {
                M = N;
            }
            if (E.has(M)) {
                if ((k(`Skipping duplicate hooks file for plugin ${I.name}: ${O} (resolves to already-loaded file: ${M})`), Z)) {
                    let R = `Duplicate hooks file detected: ${O} resolves to already-loaded file ${M}. The standard hooks/hooks.json is loaded automatically, so manifest.hooks should only reference additional hook files.`;
                    (t(Error(R)), J.push({
                        type: "hook-load-failed",
                        source: Q,
                        plugin: I.name,
                        hookPath: N,
                        reason: R
                    }));
                }
                continue;
            }
            try {
                let R = PsB(N, I.name);
                try {
                    ((F = SsB(F, R)), E.add(M), k(`Loaded and merged hooks from manifest for plugin ${I.name}: ${O}`));
                } catch (j) {
                    let P = j instanceof Error ? j.message : String(j);
                    (k(`Failed to merge hooks from ${O} for ${I.name}: ${P}`, {
                        level: "error"
                    }), t(j instanceof Error ? j : Error(P)), J.push({
                        type: "hook-load-failed",
                        source: Q,
                        plugin: I.name,
                        hookPath: N,
                        reason: `Failed to merge: ${P}`
                    }));
                }
            } catch (R) {
                let j = R instanceof Error ? R.message : String(R);
                (k(`Failed to load hooks from ${O} for ${I.name}: ${j}`, {
                    level: "error"
                }), t(R instanceof Error ? R : Error(j)), J.push({
                    type: "hook-load-failed",
                    source: Q,
                    plugin: I.name,
                    hookPath: N,
                    reason: j
                }));
            }
        } else if (typeof O === "object") F = SsB(F, O);
    }
    if (F) W.hooksConfig = F;
    return {
        plugin: W,
        errors: J
    };
}
function SsB(A, Q) {
    if (!A) return Q;
    let B = {
        ...A
    };
    for (let [G, Z] of Object.entries(Q))if (!B[G]) B[G] = Z;
    else B[G] = [
        ...(B[G] || []),
        ...Z
    ];
    return B;
}
async function Mj3() {
    let Q = HQ().enabledPlugins || {}, B = [], G = [], Z = Object.entries(Q).filter(([J, X])=>{
        return wBA.safeParse(J).success && X !== void 0;
    }), Y = await v5();
    for (let [J, X] of Z)try {
        let [I, W] = J.split("@"), K = Y[W];
        if (K && !OBA(K.source)) {
            let D = njA(K.source), F = lIA() || [];
            G.push({
                type: "marketplace-blocked-by-policy",
                source: J,
                plugin: I,
                marketplace: W,
                blockedByBlocklist: D,
                allowedSources: D ? [] : F.map((E)=>iIA(E))
            });
            continue;
        }
        let V = g80(J);
        if (!V) {
            G.push({
                type: "plugin-not-found",
                source: J,
                pluginId: I,
                marketplace: W
            });
            continue;
        }
        let H = await Rj3(V.entry, V.marketplaceInstallLocation, J, X === !0, G);
        if (H) B.push(H);
    } catch (I) {
        let W = I instanceof Error ? I : Error(String(I));
        (t(W), G.push({
            type: "generic-error",
            source: J,
            error: W.message
        }));
    }
    return {
        plugins: B,
        errors: G
    };
}
async function Rj3(A, Q, B, G, Z) {
    k(`Loading plugin ${A.name} from source: ${JSON.stringify(A.source)}`);
    let Y = vA(), J = [], X;
    if (typeof A.source === "string") {
        let H = Y.statSync(Q).isDirectory() ? Q : z3(Q, ".."), D = z3(H, A.source);
        if (!Y.existsSync(D)) {
            let F = Error(`Plugin path not found: ${D}`);
            return (k(`Plugin path not found: ${D}`, {
                level: "error"
            }), t(F), Z.push({
                type: "generic-error",
                source: B,
                error: `Plugin directory not found at path: ${D}. Check that the marketplace entry has the correct path.`
            }), null);
        }
        try {
            let F = z3(D, ".claude-plugin", "plugin.json"), E;
            try {
                E = G31(F, A.name, A.source);
            } catch  {}
            let z = await RBA(B, A.source, E, H, A.version);
            ((X = await B31(D, B, z, A, H)), k(`Copied local plugin ${A.name} to versioned cache: ${X}`));
        } catch (F) {
            let E = F instanceof Error ? F.message : String(F);
            (k(`Failed to copy plugin ${A.name} to versioned cache: ${E}. Using marketplace path.`, {
                level: "warn"
            }), (X = D));
        }
    } else try {
        let H = await RBA(B, A.source, void 0, void 0, A.version), D = Qk(B, H);
        if (Y.existsSync(D)) (k(`Using versioned cached plugin ${A.name} from ${D}`), (X = D));
        else {
            let F = await lBA(A.source, {
                manifest: {
                    name: A.name
                }
            }), E = await RBA(B, A.source, F.manifest, F.path, A.version);
            if (((X = await B31(F.path, B, E, A, void 0)), F.path !== X)) Y.rmSync(F.path, {
                recursive: !0,
                force: !0
            });
        }
    } catch (H) {
        let D = H instanceof Error ? H.message : String(H);
        return (k(`Failed to cache plugin ${A.name}: ${D}`, {
            level: "error"
        }), t(H instanceof Error ? H : Error(D)), Z.push({
            type: "generic-error",
            source: B,
            error: `Failed to download/cache plugin ${A.name}: ${D}`
        }), null);
    }
    let I = z3(X, ".claude-plugin", "plugin.json"), W = Y.existsSync(I), { plugin: K, errors: V } = vsB(X, B, G, A.name, A.strict ?? !0);
    if ((J.push(...V), !W)) {
        if (((K.manifest = {
            ...A,
            id: void 0,
            source: void 0,
            strict: void 0
        }), (K.name = K.manifest.name), A.commands)) {
            let H = Object.values(A.commands)[0];
            if (typeof A.commands === "object" && !Array.isArray(A.commands) && H && typeof H === "object" && ("source" in H || "content" in H)) {
                let D = {}, F = [];
                for (let [E, z] of Object.entries(A.commands)){
                    if (!z || typeof z !== "object" || !z.source) continue;
                    let $ = z3(X, z.source);
                    if (Y.existsSync($)) (F.push($), (D[E] = z));
                    else (k(`Command ${E} path ${z.source} from marketplace entry not found at ${$} for ${A.name}`, {
                        level: "warn"
                    }), t(Error(`Plugin component file not found: ${$} for ${A.name}`)), J.push({
                        type: "path-not-found",
                        source: B,
                        plugin: A.name,
                        path: $,
                        component: "commands"
                    }));
                }
                if (F.length > 0) ((K.commandsPaths = F), (K.commandsMetadata = D));
            } else {
                let D = Array.isArray(A.commands) ? A.commands : [
                    A.commands
                ], F = [];
                for (let E of D){
                    if (typeof E !== "string") {
                        k(`Unexpected command format in marketplace entry for ${A.name}`, {
                            level: "error"
                        });
                        continue;
                    }
                    let z = z3(X, E);
                    if (Y.existsSync(z)) F.push(z);
                    else (k(`Command path ${E} from marketplace entry not found at ${z} for ${A.name}`, {
                        level: "warn"
                    }), t(Error(`Plugin component file not found: ${z} for ${A.name}`)), J.push({
                        type: "path-not-found",
                        source: B,
                        plugin: A.name,
                        path: z,
                        component: "commands"
                    }));
                }
                if (F.length > 0) K.commandsPaths = F;
            }
        }
        if (A.agents) {
            let H = Array.isArray(A.agents) ? A.agents : [
                A.agents
            ], D = [];
            for (let F of H){
                let E = z3(X, F);
                if (Y.existsSync(E)) D.push(E);
                else (k(`Agent path ${F} from marketplace entry not found at ${E} for ${A.name}`, {
                    level: "warn"
                }), t(Error(`Plugin component file not found: ${E} for ${A.name}`)), J.push({
                    type: "path-not-found",
                    source: B,
                    plugin: A.name,
                    path: E,
                    component: "agents"
                }));
            }
            if (D.length > 0) K.agentsPaths = D;
        }
        if (A.skills) {
            k(`Processing ${Array.isArray(A.skills) ? A.skills.length : 1} skill paths for plugin ${A.name}`);
            let H = Array.isArray(A.skills) ? A.skills : [
                A.skills
            ], D = [];
            for (let F of H){
                let E = z3(X, F);
                if ((k(`Checking skill path: ${F} -> ${E} (exists: ${Y.existsSync(E)})`), Y.existsSync(E))) D.push(E);
                else (k(`Skill path ${F} from marketplace entry not found at ${E} for ${A.name}`, {
                    level: "warn"
                }), t(Error(`Plugin component file not found: ${E} for ${A.name}`)), J.push({
                    type: "path-not-found",
                    source: B,
                    plugin: A.name,
                    path: E,
                    component: "skills"
                }));
            }
            if ((k(`Found ${D.length} valid skill paths for plugin ${A.name}, setting skillsPaths`), D.length > 0)) K.skillsPaths = D;
        } else k(`Plugin ${A.name} has no entry.skills defined`);
        if (A.outputStyles) {
            let H = Array.isArray(A.outputStyles) ? A.outputStyles : [
                A.outputStyles
            ], D = [];
            for (let F of H){
                let E = z3(X, F);
                if (Y.existsSync(E)) D.push(E);
                else (k(`Output style path ${F} from marketplace entry not found at ${E} for ${A.name}`, {
                    level: "warn"
                }), t(Error(`Plugin component file not found: ${E} for ${A.name}`)), J.push({
                    type: "path-not-found",
                    source: B,
                    plugin: A.name,
                    path: E,
                    component: "output-styles"
                }));
            }
            if (D.length > 0) K.outputStylesPaths = D;
        }
        if (A.hooks) K.hooksConfig = A.hooks;
    } else if (!A.strict && W && (A.commands || A.agents || A.skills || A.hooks || A.outputStyles)) {
        let H = Error(`Plugin ${A.name} has both plugin.json and marketplace manifest entries for commands/agents/skills/hooks/outputStyles. This is a conflict.`);
        return (k(`Plugin ${A.name} has both plugin.json and marketplace manifest entries for commands/agents/skills/hooks/outputStyles. This is a conflict.`, {
            level: "error"
        }), t(H), Z.push({
            type: "generic-error",
            source: B,
            error: `Plugin ${A.name} has conflicting manifests: both plugin.json and marketplace entry specify components. Set strict: true in marketplace entry or remove component specs from one location.`
        }), null);
    } else if (W) {
        if (A.commands) {
            let H = Object.values(A.commands)[0];
            if (typeof A.commands === "object" && !Array.isArray(A.commands) && H && typeof H === "object" && ("source" in H || "content" in H)) {
                let D = {
                    ...(K.commandsMetadata || {})
                }, F = [];
                for (let [E, z] of Object.entries(A.commands)){
                    if (!z || typeof z !== "object" || !z.source) continue;
                    let $ = z3(X, z.source);
                    if (Y.existsSync($)) (F.push($), (D[E] = z));
                    else (k(`Command ${E} path ${z.source} from marketplace entry not found at ${$} for ${A.name}`, {
                        level: "warn"
                    }), t(Error(`Plugin component file not found: ${$} for ${A.name}`)), J.push({
                        type: "path-not-found",
                        source: B,
                        plugin: A.name,
                        path: $,
                        component: "commands"
                    }));
                }
                if (F.length > 0) ((K.commandsPaths = [
                    ...(K.commandsPaths || []),
                    ...F
                ]), (K.commandsMetadata = D));
            } else {
                let D = Array.isArray(A.commands) ? A.commands : [
                    A.commands
                ], F = [];
                for (let E of D){
                    if (typeof E !== "string") {
                        k(`Unexpected command format in marketplace entry for ${A.name}`, {
                            level: "error"
                        });
                        continue;
                    }
                    let z = z3(X, E);
                    if (Y.existsSync(z)) F.push(z);
                    else (k(`Command path ${E} from marketplace entry not found at ${z} for ${A.name}`, {
                        level: "warn"
                    }), t(Error(`Plugin component file not found: ${z} for ${A.name}`)), J.push({
                        type: "path-not-found",
                        source: B,
                        plugin: A.name,
                        path: z,
                        component: "commands"
                    }));
                }
                if (F.length > 0) K.commandsPaths = [
                    ...(K.commandsPaths || []),
                    ...F
                ];
            }
        }
        if (A.agents) {
            let H = Array.isArray(A.agents) ? A.agents : [
                A.agents
            ], D = [];
            for (let F of H){
                let E = z3(X, F);
                if (Y.existsSync(E)) D.push(E);
                else (k(`Agent path ${F} from marketplace entry not found at ${E} for ${A.name}`, {
                    level: "warn"
                }), t(Error(`Plugin component file not found: ${E} for ${A.name}`)), J.push({
                    type: "path-not-found",
                    source: B,
                    plugin: A.name,
                    path: E,
                    component: "agents"
                }));
            }
            if (D.length > 0) K.agentsPaths = [
                ...(K.agentsPaths || []),
                ...D
            ];
        }
        if (A.skills) {
            let H = Array.isArray(A.skills) ? A.skills : [
                A.skills
            ], D = [];
            for (let F of H){
                let E = z3(X, F);
                if (Y.existsSync(E)) D.push(E);
                else (k(`Skill path ${F} from marketplace entry not found at ${E} for ${A.name}`, {
                    level: "warn"
                }), t(Error(`Plugin component file not found: ${E} for ${A.name}`)), J.push({
                    type: "path-not-found",
                    source: B,
                    plugin: A.name,
                    path: E,
                    component: "skills"
                }));
            }
            if (D.length > 0) K.skillsPaths = [
                ...(K.skillsPaths || []),
                ...D
            ];
        }
        if (A.outputStyles) {
            let H = Array.isArray(A.outputStyles) ? A.outputStyles : [
                A.outputStyles
            ], D = [];
            for (let F of H){
                let E = z3(X, F);
                if (Y.existsSync(E)) D.push(E);
                else (k(`Output style path ${F} from marketplace entry not found at ${E} for ${A.name}`, {
                    level: "warn"
                }), t(Error(`Plugin component file not found: ${E} for ${A.name}`)), J.push({
                    type: "path-not-found",
                    source: B,
                    plugin: A.name,
                    path: E,
                    component: "output-styles"
                }));
            }
            if (D.length > 0) K.outputStylesPaths = [
                ...(K.outputStylesPaths || []),
                ...D
            ];
        }
        if (A.hooks) K.hooksConfig = {
            ...(K.hooksConfig || {}),
            ...A.hooks
        };
    }
    return (Z.push(...J), K);
}
async function _j3(A) {
    if (A.length === 0) return {
        plugins: [],
        errors: []
    };
    let Q = [], B = [], G = vA();
    for (let [Z, Y] of A.entries())try {
        let J = Cj3(Y);
        if (!G.existsSync(J)) {
            (k(`Plugin path does not exist: ${J}, skipping`, {
                level: "warn"
            }), B.push({
                type: "path-not-found",
                source: `inline[${Z}]`,
                path: J,
                component: "commands"
            }));
            continue;
        }
        let X = $j3(J), { plugin: I, errors: W } = vsB(J, `${X}@inline`, !0, X);
        ((I.source = `${I.name}@inline`), (I.repository = `${I.name}@inline`), Q.push(I), B.push(...W), k(`Loaded inline plugin from path: ${I.name}`));
    } catch (J) {
        let X = J instanceof Error ? J.message : String(J);
        (k(`Failed to load session plugin from ${Y}: ${X}`, {
            level: "warn"
        }), B.push({
            type: "generic-error",
            source: `inline[${Z}]`,
            error: `Failed to load plugin: ${X}`
        }));
    }
    if (Q.length > 0) k(`Loaded ${Q.length} session-only plugins from --plugin-dir`);
    return {
        plugins: Q,
        errors: B
    };
}
function Bo() {
    m7.cache?.clear?.();
}
var m7;
