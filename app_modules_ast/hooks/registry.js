// Module: TTA
// Type: L
// Lines: 299719-299903
//
var prepareToHydrateHostInstance = L(()=>{
    n2();
    restoreViewTransitionName();
    hK();
    s1();
    pushStartInstance();
    cBA = Y0(async ()=>{
        let { enabled: A, errors: Q } = await m7(), B = [];
        if (Q.length > 0) k(`Plugin loading errors: ${Q.map((G)=>xR(G)).join(", ")}`);
        for (let G of A){
            if (G.agentsPath) try {
                let Z = DsB(G.agentsPath, G.name, G.source);
                if ((B.push(...Z), Z.length > 0)) k(`Loaded ${Z.length} agents from plugin ${G.name} default directory`);
            } catch (Z) {
                k(`Failed to load agents from plugin ${G.name} default directory: ${Z}`, {
                    level: "error"
                });
            }
            if (G.agentsPaths) for (let Z of G.agentsPaths)try {
                let J = vA().statSync(Z);
                if (J.isDirectory()) {
                    let X = DsB(Z, G.name, G.source);
                    if ((B.push(...X), X.length > 0)) k(`Loaded ${X.length} agents from plugin ${G.name} custom path: ${Z}`);
                } else if (J.isFile() && Z.endsWith(".md")) {
                    let X = FsB(Z, G.name, [], G.source);
                    if (X) (B.push(X), k(`Loaded agent from plugin ${G.name} custom file: ${Z}`));
                }
            } catch (Y) {
                k(`Failed to load agents from plugin ${G.name} custom path ${Z}: ${Y}`, {
                    level: "error"
                });
            }
        }
        return (k(`Total plugin agents loaded: ${B.length}`), B);
    });
});
import { spawn as t_3 } from "node:child_process";
function e_3(A, Q, B) {
    return {
        type: "callback",
        timeout: B,
        callback: async (G, Z, Y, J)=>{
            let X = A.replace(/\$\{CLAUDE_PLUGIN_ROOT\}/g, Q), I = {
                ...process.env,
                CLAUDE_PLUGIN_ROOT: Q,
                CLAUDE_PROJECT_DIR: uQ()
            };
            if (G.hook_event_name === "SessionStart" && J !== void 0) I.CLAUDE_ENV_FILE = UrA(J);
            let W = JSON.stringify(G), K = t_3(X, [], {
                env: I,
                shell: !0,
                signal: Y
            }), V = "", H = "";
            (K.stdout.on("data", (F)=>{
                V += F.toString();
            }), K.stderr.on("data", (F)=>{
                H += F.toString();
            }), K.stdin.on("error", (F)=>{
                k(`Plugin hook stdin error for "${X}": ${F.message}`);
            }), K.stdin.write(W), K.stdin.end());
            let D;
            try {
                D = await new Promise((F, E)=>{
                    (K.on("close", (z)=>{
                        F(z ?? 1);
                    }), K.on("error", E));
                });
            } catch (F) {
                let E = F instanceof Error ? F.message : String(F);
                return (t(Error(`Plugin hook "${X}" failed to execute: ${E}`)), k(`Plugin hook spawn error: ${E}`), {
                    suppressOutput: !1,
                    systemMessage: `Plugin hook "${X}" failed to start: ${E}. Check that the command exists and is executable.`
                });
            }
            try {
                let F = V.trim();
                if (F.startsWith("{")) return JSON.parse(F);
            } catch (F) {
                k(`Plugin hook "${X}" produced invalid JSON output: ${F instanceof Error ? F.message : String(F)}. Falling back to exit code handling.`);
            }
            if (D === 0) return {
                suppressOutput: !1
            };
            else if (D === 2) {
                let F = H.trim(), E = V.trim();
                return {
                    decision: "block",
                    reason: F ? F : E ? `Hook blocked with message: ${E}` : `Plugin hook "${X}" blocked this action (exit code 2) but provided no reason.`
                };
            } else {
                let F = H.trim(), E = V.trim(), z = [
                    `Plugin hook "${X}" failed with exit code ${D}`
                ];
                if (F) z.push(`stderr: ${F}`);
                if (E) z.push(`stdout: ${E}`);
                let $ = z.join(`
`);
                return (t(Error($)), k($), {
                    suppressOutput: !1,
                    systemMessage: F ? `Plugin hook error: ${F}` : E ? `Plugin hook "${X}" exited with code ${D}: ${E}` : `Plugin hook "${X}" exited with code ${D}. See ${nt()}`
                });
            }
        }
    };
}
function Aj3(A) {
    let Q = {
        PreToolUse: [],
        PostToolUse: [],
        PostToolUseFailure: [],
        Notification: [],
        UserPromptSubmit: [],
        SessionStart: [],
        SessionEnd: [],
        Stop: [],
        SubagentStart: [],
        SubagentStop: [],
        PreCompact: [],
        PermissionRequest: []
    };
    if (!A.hooksConfig) return Q;
    for (let [B, G] of Object.entries(A.hooksConfig)){
        let Z = B;
        if (!Q[Z]) continue;
        for (let Y of G){
            let J = [];
            for (let X of Y.hooks)if (X.type === "command") J.push(e_3(X.command, A.path, X.timeout));
            if (J.length > 0) Q[Z].push({
                matcher: Y.matcher,
                hooks: J,
                pluginName: A.name
            });
        }
    }
    return Q;
}
function d50() {
    Qo.cache?.clear?.();
}
function CsB() {
    if (zsB) return;
    ((zsB = !0), MC.subscribe((A)=>{
        if (A === "policySettings") (k("Plugin hooks: reloading due to policySettings change"), Bo(), d50(), Qo());
    }));
}
var zsB = !1, Qo;
