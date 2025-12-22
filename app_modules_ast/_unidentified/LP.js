// Module: LP
// Type: L
// Lines: 300140-300255
//
var createRenderState = L(()=>{
    hK();
    pushViewTransitionAttributes();
    prepareToHydrateHostInstance();
    PTA();
    pushStartInstance();
    B$();
    XL();
    s1();
});
import { rename as n50 } from "fs/promises";
import { existsSync as Dj3, mkdirSync as OsB, rmSync as Fj3 } from "fs";
import { dirname as MsB, sep as o50, join as Ej3, resolve as a50 } from "path";
import { tmpdir as zj3 } from "os";
function RsB() {
    return new Date().toISOString();
}
function r50(A, Q) {
    let B = a50(A, Q), G = a50(A) + o50;
    if (!B.startsWith(G) && B !== a50(A)) throw Error(`Path traversal detected: "${Q}" would escape the base directory`);
    return B;
}
async function yw(A, Q, B = "user", G, Z) {
    let Y = typeof Q.source === "string" && Z ? Z : Q.source, J = await lBA(Y, {
        manifest: Q
    }), X = await p61(J.path), I = RsB(), W = J.manifest.version || Q.version || "unknown", K = typeof Q.source === "string", V = Qk(A, W), H = J.path;
    if (J.path !== V) {
        if ((OsB(MsB(V), {
            recursive: !0
        }), Dj3(V))) Fj3(V, {
            recursive: !0,
            force: !0
        });
        let D = J.path.endsWith(o50) ? J.path : J.path + o50;
        if (V.startsWith(D)) {
            let E = Ej3(zj3(), `claude-plugin-temp-${Date.now()}`);
            (await n50(J.path, E), OsB(MsB(V), {
                recursive: !0
            }), await n50(E, V));
        } else await n50(J.path, V);
        H = V;
    }
    return (n80(A, {
        version: W,
        installedAt: I,
        lastUpdated: I,
        installPath: H,
        gitCommitSha: X,
        isLocal: K
    }, B, G), H);
}
function _sB(A, Q = "user", B) {
    let G = RsB();
    n80(A.pluginId, {
        version: A.version || "unknown",
        installedAt: G,
        lastUpdated: G,
        installPath: A.installPath,
        isLocal: !0
    }, Q, B);
}
async function Q31({ pluginId: A, entry: Q, marketplaceName: B, scope: G = "user" }) {
    try {
        let Z = ev(G), Y = G !== "user" ? i1() : void 0, J, { source: X } = Q;
        if (EP(X)) {
            let K = await TF(A);
            if (K) J = r50(K.marketplaceInstallLocation, X);
        }
        await yw(A, Q, G, Y, J);
        let W = {
            ...uB(Z)?.enabledPlugins,
            [A]: !0
        };
        return (Q2(Z, {
            enabledPlugins: W
        }), r("tengu_plugin_installed", {
            plugin_id: A,
            marketplace_name: B
        }), IY(), {
            success: !0,
            message: `✓ Installed ${Q.name}. Restart Claude Code to load new plugins.`
        });
    } catch (Z) {
        let Y = Z instanceof Error ? Z.message : String(Z);
        return (t(Z instanceof Error ? Z : Error(`Failed to install plugin: ${String(Z)}`)), {
            success: !1,
            error: `Failed to install: ${Y}`
        });
    }
}
