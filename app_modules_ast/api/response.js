// Module: sv
// Type: L
// Lines: 273992-275066
//
var createRenderState = L(()=>{
    YC3 = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
});
import { join as jR, basename as JC3 } from "path";
import { readFile as XC3, writeFile as IC3 } from "fs/promises";
function xjA(A) {
    return (A.type === "user" || A.type === "assistant" || A.type === "attachment" || A.type === "system");
}
function nu() {
    return jR(gQ(), "projects");
}
function vIA() {
    return vjA(m0());
}
function vjA(A) {
    let Q = bK(Na);
    return jR(Q, `${A}.jsonl`);
}
function kIA(A) {
    let Q = bK(Na);
    return jR(Q, `agent-${A}.jsonl`);
}
function PcB(A) {
    let Q = bK(Na), B = jR(Q, `${A}.jsonl`), G = vA();
    try {
        return (G.statSync(B), !0);
    } catch  {
        return !1;
    }
}
function WC3() {
    return "production";
}
function ScB() {
    return "external";
}
function au() {
    return !0;
}
function bK(A) {
    return jR(nu(), hp(A));
}
function Mw() {
    if (!V61) {
        if (((V61 = new ycB()), !_cB)) (X3(async ()=>{
            await V61?.flush();
        }), (_cB = !0));
    }
    return V61;
}
class ycB {
    currentSessionTag;
    currentSessionTitle;
    sessionFile = null;
    remoteIngressUrl = null;
    pendingWriteCount = 0;
    flushResolvers = [];
    constructor(){}
    incrementPendingWrites() {
        this.pendingWriteCount++;
    }
    decrementPendingWrites() {
        if ((this.pendingWriteCount--, this.pendingWriteCount === 0)) {
            for (let A of this.flushResolvers)A();
            this.flushResolvers = [];
        }
    }
    async trackWrite(A) {
        this.incrementPendingWrites();
        try {
            return await A();
        } finally{
            this.decrementPendingWrites();
        }
    }
    async flush() {
        if (this.pendingWriteCount === 0) return;
        return new Promise((A)=>{
            this.flushResolvers.push(A);
        });
    }
    async removeMessageByUuid(A) {
        return this.trackWrite(async ()=>{
            if (this.sessionFile !== null) try {
                let B = (await XC3(this.sessionFile, {
                    encoding: "utf-8"
                })).split(`
`).filter((G)=>{
                    if (!G.trim()) return !0;
                    try {
                        return JSON.parse(G).uuid !== A;
                    } catch  {
                        return !0;
                    }
                });
                await IC3(this.sessionFile, B.join(`
`), {
                    encoding: "utf8"
                });
            } catch  {}
        });
    }
    async insertMessageChain(A, Q = !1, B, G, Z) {
        return this.trackWrite(async ()=>{
            let Y = G ?? null, J;
            try {
                J = await yg();
            } catch  {
                J = void 0;
            }
            let X = m0(), I = REA().get(X);
            for (let W of A){
                let K = ru(W), V = {
                    parentUuid: K ? null : Y,
                    logicalParentUuid: K ? Y : void 0,
                    isSidechain: Q,
                    teamName: Z?.teamName,
                    teammateName: Z?.teammateName,
                    userType: ScB(),
                    cwd: i1(),
                    sessionId: X,
                    version: {
                        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
                        PACKAGE_URL: "@anthropic-ai/claude-code",
                        README_URL: "https://code.claude.com/docs/en/overview",
                        VERSION: "2.0.72",
                        FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
                        BUILD_TIME: "2025-12-17T21:20:34Z"
                    }.VERSION,
                    gitBranch: J,
                    agentId: B,
                    slug: I,
                    ...W
                };
                (await this.appendEntry(V), (Y = W.uuid));
            }
        });
    }
    async insertFileHistorySnapshot(A, Q, B) {
        return this.trackWrite(async ()=>{
            let G = {
                type: "file-history-snapshot",
                messageId: A,
                snapshot: Q,
                isSnapshotUpdate: B
            };
            await this.appendEntry(G);
        });
    }
    async insertQueueOperation(A) {
        return this.trackWrite(async ()=>{
            await this.appendEntry(A);
        });
    }
    async appendEntry(A) {
        let Q = process.env.TEST_ENABLE_SESSION_PERSISTENCE === "true";
        if ((WC3() === "test" && !Q) || HQ()?.cleanupPeriodDays === 0 || it()) return;
        let B = vA();
        if (this.sessionFile === null) {
            let Z = bK(Na);
            try {
                B.statSync(Z);
            } catch  {
                B.mkdirSync(Z);
            }
            this.sessionFile = vIA();
            try {
                B.statSync(this.sessionFile);
            } catch  {
                B.writeFileSync(this.sessionFile, "", {
                    encoding: "utf8",
                    flush: !0,
                    mode: 384
                });
            }
        }
        if (this.sessionFile !== null) try {
            B.statSync(this.sessionFile);
        } catch  {
            let Z = bK(Na);
            try {
                B.statSync(Z);
            } catch  {
                B.mkdirSync(Z);
            }
            B.writeFileSync(this.sessionFile, "", {
                encoding: "utf8",
                flush: !0,
                mode: 384
            });
        }
        let G = m0();
        if (A.type === "summary") B.appendFileSync(this.sessionFile, JSON.stringify(A) + `
`, {
            mode: 384
        });
        else if (A.type === "custom-title") B.appendFileSync(this.sessionFile, JSON.stringify(A) + `
`, {
            mode: 384
        });
        else if (A.type === "tag") B.appendFileSync(this.sessionFile, JSON.stringify(A) + `
`, {
            mode: 384
        });
        else if (A.type === "file-history-snapshot") B.appendFileSync(this.sessionFile, JSON.stringify(A) + `
`, {
            mode: 384
        });
        else {
            let Z = await gcB(G);
            if (A.type === "queue-operation") B.appendFileSync(this.sessionFile, JSON.stringify(A) + `
`, {
                mode: 384
            });
            else {
                let Y = A.isSidechain && A.agentId !== void 0, J = Y ? kIA(A$(A.agentId)) : this.sessionFile;
                if (Y) try {
                    B.statSync(J);
                } catch  {
                    let X = bK(Na);
                    try {
                        B.statSync(X);
                    } catch  {
                        B.mkdirSync(X);
                    }
                    B.writeFileSync(J, "", {
                        encoding: "utf8",
                        flush: !0,
                        mode: 384
                    });
                }
                if (!Z.has(A.uuid)) {
                    if ((B.appendFileSync(J, JSON.stringify(A) + `
`, {
                        mode: 384
                    }), Z.add(A.uuid), this.remoteIngressUrl && xjA(A))) await this.persistToRemote(G, A);
                }
            }
        }
    }
    async persistToRemote(A, Q) {
        if (!this.remoteIngressUrl) return;
        if (!(await NcB(A, Q, this.remoteIngressUrl))) throw (r("tengu_session_persistence_failed", {}), Error("Failed to persist session log to remote"));
    }
    setRemoteIngressUrl(A) {
        ((this.remoteIngressUrl = A), k(`Remote persistence enabled with URL: ${A}`));
    }
    async getLastLog(A) {
        let { messages: Q } = await H80(A);
        if (Q.size === 0) return null;
        let G = Array.from(Q.values()).filter((Y)=>!Y.isSidechain).sort((Y, J)=>new Date(J.timestamp).getTime() - new Date(Y.timestamp).getTime())[0];
        if (!G) return null;
        return xIA(Q, G);
    }
}
async function EBA(A, Q) {
    let B = mcB(A);
    return (await Mw().insertMessageChain(B, !1, void 0, void 0, Q), B[B.length - 1]?.uuid || null);
}
async function J80(A, Q, B) {
    await Mw().insertMessageChain(mcB(A), !0, Q, B);
}
async function xcB(A) {
    await Mw().insertQueueOperation(A);
}
async function X80(A) {
    await Mw().removeMessageByUuid(A);
}
async function F61(A, Q, B) {
    await Mw().insertFileHistorySnapshot(A, Q, B);
}
async function TR() {
    let A = Mw();
    A.sessionFile = vIA();
}
async function vcB(A, Q) {
    nq(ZL(A));
    let B = Mw();
    try {
        let G = (await OcB(A, Q)) || [], Z = vA(), Y = bK(Na);
        try {
            Z.statSync(Y);
        } catch  {
            Z.mkdirSync(Y);
        }
        let J = vjA(A);
        if (Z.existsSync(J)) Z.unlinkSync(J);
        for (let X of G)Z.appendFileSync(J, JSON.stringify(X) + `
`, {
            mode: 384
        });
        if (G.length === 0 && !Z.existsSync(J)) Z.writeFileSync(J, "", {
            encoding: "utf8",
            flush: !0,
            mode: 384
        });
        return (k(`Hydrated ${G.length} entries from remote`), G.length > 0);
    } catch (G) {
        return (k(`Error hydrating session from remote: ${G}`), E3("error", "hydrate_remote_session_fail"), !1);
    } finally{
        B.setRemoteIngressUrl(Q);
    }
}
function I80(A) {
    let Q = W80(A);
    if (Q) {
        let B = Q.replace(/\n/g, " ").trim();
        if (B.length > 200) B = B.slice(0, 200).trim() + "…";
        return B;
    }
    return "No prompt";
}
function W80(A) {
    for (let Q of A){
        if (Q.type !== "user" || Q.isMeta) continue;
        if ("isCompactSummary" in Q && Q.isCompactSummary) continue;
        let B = Q.message?.content;
        if (!B) continue;
        let G = "";
        if (typeof B === "string") G = B;
        else if (Array.isArray(B)) G = B.find((J)=>J.type === "text")?.text || "";
        if (!G) continue;
        let Z = Z9(G, "command-name");
        if (Z) {
            let Y = Z.replace(/^\//, "");
            if (tv().has(Y)) continue;
            else {
                let J = Z9(G, "command-args");
                if (!J || J.trim() === "") continue;
            }
        }
        if (G.match(/^<local-command-stdout>/)) continue;
        if (G.match(/^<session-start-hook>/)) continue;
        return G;
    }
    return;
}
function H61(A) {
    return A.map((Q)=>{
        let { isSidechain: B, parentUuid: G, ...Z } = Q;
        return Z;
    });
}
function xIA(A, Q) {
    let B = [], G = Q;
    while(G)(B.unshift(G), (G = G.parentUuid ? A.get(G.parentUuid) : void 0));
    return B;
}
function yjA(A, Q) {
    let B = [];
    for (let G of Q){
        let Z = A.get(G.uuid);
        if (!Z) continue;
        if (!Z.isSnapshotUpdate) B.push(Z.snapshot);
        else {
            let Y = B.findLastIndex((J)=>J.messageId === Z.snapshot.messageId);
            if (Y === -1) B.push(Z.snapshot);
            else B[Y] = Z.snapshot;
        }
    }
    return B;
}
function KC3(A) {
    if (A.type !== "user") return !1;
    if (A.isMeta) return !1;
    let Q = A.message?.content;
    if (!Q) return !1;
    if (typeof Q === "string") return Q.trim().length > 0;
    if (Array.isArray(Q)) return Q.some((B)=>B.type === "text" || B.type === "image" || B.type === "document");
    return !1;
}
function VC3(A) {
    if (A.type !== "assistant") return !1;
    let Q = A.message?.content;
    if (!Q || !Array.isArray(Q)) return !1;
    return Q.some((B)=>B.type === "text" && typeof B.text === "string" && B.text.trim().length > 0);
}
function HC3(A) {
    let Q = 0;
    for (let B of A)switch(B.type){
        case "user":
            if (KC3(B)) Q++;
            break;
        case "assistant":
            if (VC3(B)) Q++;
            break;
        case "attachment":
        case "system":
        case "progress":
            break;
    }
    return Q;
}
function kcB(A, Q = 0, B, G, Z, Y) {
    let J = A[A.length - 1], X = A[0], I = I80(A), W = new Date(X.timestamp), K = new Date(J.timestamp);
    return {
        date: J.timestamp,
        messages: H61(A),
        fullPath: "n/a",
        value: Q,
        created: W,
        modified: K,
        firstPrompt: I,
        messageCount: HC3(A),
        isSidechain: X.isSidechain,
        isTeammate: !!X.teamName,
        teamName: X.teamName,
        teammateName: X.teammateName,
        leafUuid: J.uuid,
        summary: B,
        customTitle: G,
        tag: Y,
        fileHistorySnapshots: Z,
        gitBranch: J.gitBranch,
        projectPath: X.cwd
    };
}
async function DC3(A) {
    let Q = new Map(), B = 0;
    for (let J of A){
        let X = dX(J);
        if (X) {
            let I = (Q.get(X) || 0) + 1;
            (Q.set(X, I), (B = Math.max(I, B)));
        }
    }
    if (B <= 1) return;
    let G = Array.from(Q.values()).filter((J)=>J > 1), Z = G.length, Y = G.reduce((J, X)=>J + X, 0);
    r("tengu_session_forked_branches_fetched", {
        total_sessions: Q.size,
        sessions_with_branches: Z,
        max_branches_per_session: Math.max(...G),
        avg_branches_per_session: Math.round(Y / Z),
        total_transcript_count: A.length
    });
}
async function FC3(A) {
    let Q = bK(Na), B = !0, G = await F80([
        Q
    ], !1, A, !0);
    return (await DC3(G), G);
}
async function fcB(A, Q) {
    await Mw().appendEntry({
        type: "summary",
        summary: Q,
        leafUuid: A
    });
}
async function E61(A, Q) {
    if ((await Mw().appendEntry({
        type: "custom-title",
        customTitle: Q,
        sessionId: A
    }), A === m0())) Mw().currentSessionTitle = Q;
    r("tengu_session_renamed", {});
}
async function K80(A, Q) {
    if ((await Mw().appendEntry({
        type: "tag",
        tag: Q,
        sessionId: A
    }), A === m0())) Mw().currentSessionTag = Q;
    r("tengu_session_tagged", {});
}
function bcB(A) {
    if (A === m0()) return Mw().currentSessionTag;
    return;
}
function dX(A) {
    if (A.sessionId) return A.sessionId;
    return A.messages[0]?.sessionId;
}
function V80(A) {
    return A.messages.length === 0 && A.sessionId !== void 0;
}
async function hcB(A) {
    if (!V80(A)) return A;
    let { leafUuid: Q, fullPath: B } = A;
    try {
        let { messages: G, fileHistorySnapshots: Z } = await ou(B);
        if (G.size === 0) return A;
        let Y = Q ? G.get(Q) : void 0;
        if (!Y) {
            let X = [
                ...G.values()
            ], I = new Set(X.map((H)=>H.parentUuid)), K = X.filter((H)=>!I.has(H.uuid)).sort((H, D)=>new Date(D.timestamp).getTime() - new Date(H.timestamp).getTime())[0];
            if (!K) return A;
            let V = xIA(G, K);
            return {
                ...A,
                messages: H61(V),
                fileHistorySnapshots: yjA(Z, V)
            };
        }
        let J = xIA(G, Y);
        return {
            ...A,
            messages: H61(J),
            fileHistorySnapshots: yjA(Z, J)
        };
    } catch  {
        return A;
    }
}
async function fIA(A, Q) {
    let { limit: B, exact: G } = Q || {}, Z = await pi(uQ()), Y = await La(Z), J = A.toLowerCase().trim(), X = Y.filter((K)=>{
        let V = K.customTitle?.toLowerCase().trim();
        if (!V) return !1;
        return G ? V === J : V.includes(J);
    }), I = new Map();
    for (let K of X){
        let V = dX(K);
        if (V) {
            let H = I.get(V);
            if (!H || K.modified > H.modified) I.set(V, K);
        }
    }
    let W = Array.from(I.values());
    if ((W.sort((K, V)=>V.modified.getTime() - K.modified.getTime()), B)) return W.slice(0, B);
    return W;
}
async function ou(A) {
    let Q = new Map(), B = new Map(), G = new Map(), Z = new Map(), Y = new Map();
    try {
        let J = await bp(A);
        for (let X of J)if (X.type === "user" || X.type === "assistant" || X.type === "attachment" || X.type === "system") Q.set(X.uuid, X);
        else if (X.type === "summary" && X.leafUuid) B.set(X.leafUuid, X.summary);
        else if (X.type === "custom-title" && X.sessionId) G.set(X.sessionId, X.customTitle);
        else if (X.type === "tag" && X.sessionId) Z.set(X.sessionId, X.tag);
        else if (X.type === "file-history-snapshot") Y.set(X.messageId, X);
    } catch  {}
    return {
        messages: Q,
        summaries: B,
        customTitles: G,
        tags: Z,
        fileHistorySnapshots: Y
    };
}
async function H80(A) {
    let Q = jR(bK(uQ()), `${A}.jsonl`);
    return ou(Q);
}
async function ucB(A, Q) {
    return (await gcB(A)).has(Q);
}
async function D80(A) {
    let Q = await Mw().getLastLog(A);
    if (Q !== null && Q !== void 0) {
        let B = Q[Q.length - 1], { summaries: G, customTitles: Z, tags: Y, fileHistorySnapshots: J } = await H80(A), X = B ? G.get(B.uuid) : void 0, I = B ? Z.get(B.sessionId) : void 0, W = B ? Y.get(B.sessionId) : void 0;
        return kcB(Q, 0, X, I, yjA(J, Q), W);
    }
    return null;
}
async function FBA(A) {
    let B = (await FC3(A)).filter((G)=>D61(G));
    return P8A(B).map((G, Z)=>({
            ...G,
            value: Z
        }));
}
async function F80(A, Q, B, G = !1) {
    let Z = vA(), Y = [];
    for (let X of A)try {
        let W = Z.readdirSync(X).filter((K)=>K.isFile() && K.name.endsWith(".jsonl")).map((K)=>jR(X, K.name));
        if (B) W = W.sort((K, V)=>{
            let H = Z.statSync(K);
            return Z.statSync(V).mtime.getTime() - H.mtime.getTime();
        }).slice(0, B);
        for (let K of W){
            let { messages: V, summaries: H, customTitles: D, tags: F, fileHistorySnapshots: E } = await ou(K);
            if (V.size === 0) continue;
            let z = [
                ...V.values()
            ], $ = new Set(z.map((N)=>N.parentUuid)), O = z.filter((N)=>!$.has(N.uuid));
            for (let N of O){
                let M = xIA(V, N);
                if (M.length === 0) continue;
                let R = H.get(N.uuid), j = N.sessionId, P = D.get(j), f = F.get(j), y = yjA(E, M), m = kcB(M, 0, R, P, y, f);
                Y.push(m);
            }
        }
    } catch  {
        continue;
    }
    let J = Y.filter((X)=>D61(X, {
            includeSidechains: G,
            includeTeammateSessions: Q
        }));
    return P8A(J).map((X, I)=>({
            ...X,
            value: I
        }));
}
async function kjA(A) {
    let Q = vA(), B = nu();
    try {
        Q.statSync(B);
    } catch  {
        return [];
    }
    let Z = Q.readdirSync(B).filter((Y)=>Y.isDirectory()).map((Y)=>jR(B, Y.name));
    return F80(Z, !1, A);
}
async function La(A, Q) {
    let B = vA(), G = nu(), Z = await ocB();
    if (A.length <= 1) {
        if (Z) {
            let X = bK(uQ());
            return TcB(X);
        }
        return FBA(Q);
    }
    try {
        B.statSync(G);
    } catch  {
        return FBA(Q);
    }
    let Y = A.map((X)=>hp(X)), J = [];
    try {
        let X = B.readdirSync(G);
        for (let I of X){
            if (!I.isDirectory()) continue;
            let W = I.name;
            if (Y.some((V)=>W === V || W.startsWith(V + "-"))) J.push(jR(G, W));
        }
    } catch  {
        return FBA(Q);
    }
    if (J.length === 0) return FBA(Q);
    if (Z) {
        let X = [];
        for (let I of J){
            let W = await TcB(I);
            X.push(...W);
        }
        return P8A(X).map((I, W)=>({
                ...I,
                value: W
            }));
    }
    return F80(J, !0, Q);
}
async function z61(A) {
    let Q = kIA(A), B = vA();
    try {
        B.statSync(Q);
    } catch  {
        return null;
    }
    try {
        let { messages: G } = await ou(Q), Z = Array.from(G.values()).filter((W)=>W.agentId === A && W.isSidechain);
        if (Z.length === 0) return null;
        let Y = new Set(Z.map((W)=>W.parentUuid)), J = Z.filter((W)=>!Y.has(W.uuid)).sort((W, K)=>new Date(K.timestamp).getTime() - new Date(W.timestamp).getTime())[0];
        if (!J) return null;
        return xIA(G, J).filter((W)=>W.agentId === A).map(({ isSidechain: W, parentUuid: K, ...V })=>V);
    } catch  {
        return null;
    }
}
function mcB(A) {
    return A.filter((Q)=>{
        if (Q.type === "progress") return !1;
        if (Q.type === "attachment" && ScB() !== "ant") return !1;
        return !0;
    });
}
async function dcB(A) {
    return (await FBA())[A] || null;
}
async function ccB(A) {
    try {
        let Q = m0(), B = vjA(Q), { messages: G } = await ou(B), Z = null;
        for (let Y of G.values())if (Y.type === "assistant") {
            let J = Y.message.content;
            if (Array.isArray(J)) {
                for (let X of J)if (X.type === "tool_use" && X.id === A) {
                    Z = Y;
                    break;
                }
            }
        } else if (Y.type === "user") {
            let J = Y.message.content;
            if (Array.isArray(J)) {
                for (let X of J)if (X.type === "tool_result" && X.tool_use_id === A) return null;
            }
        }
        return Z;
    } catch  {
        return null;
    }
}
function lcB(A) {
    let Q = vA(), B = jR(A, pcB);
    try {
        if (!Q.existsSync(B)) return null;
        let G = Q.readFileSync(B, {
            encoding: "utf-8"
        }), Z = JSON.parse(G);
        if (Z.version !== Y80 || !Array.isArray(Z.entries)) return (k(`Session index invalid or version mismatch: expected version ${Y80}`), null);
        return Z;
    } catch (G) {
        return (t(G), null);
    }
}
function jcB(A, Q) {
    let B = vA(), G = jR(A, pcB), Z = `${G}.tmp`;
    try {
        if (!B.existsSync(A)) B.mkdirSync(A);
        return (B.writeFileSync(Z, JSON.stringify(Q, null, 2), {
            encoding: "utf-8",
            flush: !0,
            mode: 384
        }), B.renameSync(Z, G), !0);
    } catch (Y) {
        t(Y);
        try {
            if (B.existsSync(Z)) B.unlinkSync(Z);
        } catch  {}
        return !1;
    }
}
function EC3(A, Q, B, G, Z, Y, J) {
    if (G.length === 0) return null;
    let X = G[0], I = G[G.length - 1];
    return {
        sessionId: A,
        leafUuid: I.uuid,
        fullPath: Q,
        fileMtime: B,
        firstPrompt: I80(G),
        customTitle: Y.get(A),
        summary: Z.get(I.uuid),
        tag: J.get(A),
        messageCount: G.length,
        created: X.timestamp,
        modified: I.timestamp,
        gitBranch: I.gitBranch,
        projectPath: X.cwd,
        isSidechain: X.isSidechain ?? !1,
        isTeammate: !!X.teamName
    };
}
async function icB(A) {
    if (!(await ocB())) return;
    let B = vA();
    try {
        if (!B.existsSync(A)) return;
        let G = lcB(A), Z = G ?? {
            version: Y80,
            entries: []
        }, Y = new Map();
        for (let V of Z.entries)Y.set(V.sessionId, V);
        let J = acB(A), X = 0, I = 0, W = 0;
        Z.entries = Z.entries.filter((V)=>{
            if (J.has(V.sessionId)) return !0;
            return (W++, !1);
        });
        let K = m0();
        for (let [V, H] of J){
            if (V === K) continue;
            let D = Y.get(V);
            if (D && H.mtime <= D.fileMtime) continue;
            try {
                let { messages: F, summaries: E, customTitles: z, tags: $ } = await ou(H.path);
                if (F.size === 0) continue;
                let O = ncB(F);
                if (!O) continue;
                if (D) Z.entries = Z.entries.filter((M)=>M.sessionId !== V);
                let N = EC3(V, H.path, H.mtime, O, E, z, $);
                if (N) if ((Z.entries.push(N), D)) I++;
                else X++;
            } catch  {
                k(`Failed to read session file: ${H.path}`);
            }
        }
        if (X > 0 || I > 0 || W > 0) (jcB(A, Z), k(`Session index: added ${X}, updated ${I}, removed ${W} (total: ${Z.entries.length})`));
        else if (!G) (jcB(A, Z), k("Created empty session index"));
    } catch (G) {
        t(G);
    }
}
function zC3(A, Q) {
    return {
        date: A.modified,
        messages: [],
        fullPath: A.fullPath,
        value: Q,
        created: new Date(A.created),
        modified: new Date(A.modified),
        firstPrompt: A.firstPrompt,
        messageCount: A.messageCount,
        isSidechain: A.isSidechain,
        isTeammate: A.isTeammate,
        sessionId: A.sessionId,
        leafUuid: A.leafUuid,
        summary: A.summary,
        customTitle: A.customTitle,
        tag: A.tag,
        gitBranch: A.gitBranch,
        projectPath: A.projectPath
    };
}
function D61(A, { isLite: Q = !1, includeSidechains: B = !1, includeTeammateSessions: G = !1 } = {}) {
    if (!Q && !A.messages?.length) return !1;
    if (A.firstPrompt?.startsWith("API Error")) return !1;
    if (A.summary?.startsWith("API Error")) return !1;
    if (!B && A.isSidechain) return !1;
    if (!G && A.isTeammate) return !1;
    return !0;
}
function ncB(A) {
    let Q = [
        ...A.values()
    ], B = new Set(Q.map((J)=>J.parentUuid)), G = Q.filter((J)=>!B.has(J.uuid));
    if (G.length === 0) return null;
    let Z = G.sort((J, X)=>new Date(X.timestamp).getTime() - new Date(J.timestamp).getTime())[0], Y = xIA(A, Z);
    return Y.length > 0 ? Y : null;
}
function acB(A) {
    let Q = vA(), B = new Map(), G = Q.readdirSync(A);
    for (let Z of G){
        if (!Z.isFile() || !Z.name.endsWith(".jsonl")) continue;
        let Y = Q$(JC3(Z.name, ".jsonl"));
        if (!Y) continue;
        let J = jR(A, Z.name);
        try {
            let X = Q.statSync(J);
            B.set(Y, {
                path: J,
                mtime: X.mtime.getTime()
            });
        } catch  {
            k(`Failed to stat session file: ${J}`);
        }
    }
    return B;
}
async function CC3(A) {
    let { messages: Q, summaries: B, customTitles: G, tags: Z, fileHistorySnapshots: Y } = await ou(A);
    if (Q.size === 0) return null;
    let J = ncB(Q);
    if (!J) return null;
    let X = J[0], I = J[J.length - 1], W = X.sessionId;
    return {
        date: I.timestamp,
        messages: H61(J),
        fullPath: A,
        value: 0,
        created: new Date(X.timestamp),
        modified: new Date(I.timestamp),
        firstPrompt: I80(J),
        messageCount: J.length,
        isSidechain: X.isSidechain ?? !1,
        isTeammate: !!X.teamName,
        sessionId: W,
        leafUuid: I.uuid,
        summary: B.get(I.uuid),
        customTitle: G.get(W),
        tag: Z.get(W),
        gitBranch: I.gitBranch,
        projectPath: X.cwd,
        fileHistorySnapshots: yjA(Y, J)
    };
}
async function TcB(A) {
    let Q = lcB(A), B = acB(A), G = new Map();
    if (Q) for (let J of Q.entries)G.set(J.sessionId, J);
    let Z = [], Y = new Set([
        ...G.keys(),
        ...B.keys()
    ]);
    for (let J of Y){
        let X = B.get(J), I = G.get(J);
        if (!X) continue;
        if (!I || X.mtime > I.fileMtime) {
            try {
                let K = await CC3(X.path);
                if (K && D61(K)) Z.push(K);
            } catch  {
                k(`Failed to load session file: ${X.path}`);
            }
            continue;
        }
        if (D61(I, {
            isLite: !0
        })) (Z.push(zC3(I, 0)), k(`Using cached index entry for session: ${J}`));
    }
    return P8A(Z).map((J, X)=>({
            ...J,
            value: X
        }));
}
async function ocB() {
    return Vm1("tengu_session_index", !1);
}
var Na, V61 = null, _cB = !1, gcB, pcB = "sessions-index.json", Y80 = 1;
