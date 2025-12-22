// Module: _FA
// Type: L
// Lines: 524513-525037
//
var renderElement = L(()=>{
    i0();
    pushStartInstance();
    sH();
});
import { join as Jc, posix as os, sep as rs } from "path";
import { homedir as vX7, tmpdir as kX7 } from "os";
function as(A) {
    return A.toLowerCase();
}
function RV9(A, Q) {
    if (xQ() === "windows") {
        let B = gy(A), G = gy(Q);
        return os.relative(B, G);
    }
    return os.relative(A, Q);
}
function otA(A) {
    if (xQ() === "windows") return gy(A);
    return A;
}
function hX7() {
    return fN.map((A)=>RC(A)).filter((A)=>A !== void 0);
}
function zV0(A) {
    let Q = R4(A), B = as(Q);
    if (B.endsWith("/.claude/settings.json") || B.endsWith("/.claude/settings.local.json")) return !0;
    return hX7().some((G)=>as(G) === B);
}
function gX7(A) {
    if (zV0(A)) return !0;
    let Q = Jc(uQ(), ".claude", "commands"), B = Jc(uQ(), ".claude", "agents"), G = Jc(uQ(), ".claude", "skills");
    return qm(A, Q) || qm(A, B) || qm(A, G);
}
function uX7(A) {
    if (!Yc()) return !1;
    let Q = R4(A);
    return qm(Q, Yc());
}
function _V9(A) {
    let Q = lC();
    return A === Q;
}
function ZF1() {
    return Jc(bK(i1()), m0(), "session-memory") + rs;
}
function iZ1() {
    return Jc(ZF1(), "summary.md");
}
function mX7(A) {
    return A.startsWith(ZF1());
}
function dX7(A) {
    let Q = bK(i1());
    return A === Q || A.startsWith(Q + rs);
}
function qFA() {
    return !1;
}
function cX7() {
    return xQ() === "windows" ? Jc(kX7(), "claude") + rs : "/tmp/claude/";
}
function jB1() {
    return Jc(cX7(), hp(uQ())) + rs;
}
function dD1() {
    return Jc(jB1(), m0(), "scratchpad");
}
function jV9() {
    if (!qFA()) throw Error("Scratchpad directory feature is not enabled");
    let A = vA(), Q = dD1();
    if (!A.existsSync(Q)) A.mkdirSync(Q);
    return Q;
}
function pX7(A) {
    if (!qFA()) return !1;
    let Q = dD1();
    return A === Q || A.startsWith(Q + rs);
}
function lX7(A) {
    let B = R4(A).split(rs), G = B[B.length - 1];
    if (A.startsWith("\\\\") || A.startsWith("//")) return !0;
    for (let Z of bX7){
        let Y = as(Z);
        if (B.some((J)=>as(J) === Y)) return !0;
    }
    if (G) {
        let Z = as(G);
        if (fX7.some((Y)=>as(Y) === Z)) return !0;
    }
    return !1;
}
function TV9(A) {
    if (A.indexOf(":", 2) !== -1) return !0;
    if (/~\d/.test(A)) return !0;
    if (A.startsWith("\\\\?\\") || A.startsWith("\\\\.\\") || A.startsWith("//?/") || A.startsWith("//./")) return !0;
    if (/[.\s]+$/.test(A)) return !0;
    if (/\.(CON|PRN|AUX|NUL|COM[1-9]|LPT[1-9])$/i.test(A)) return !0;
    if (/(^|\/|\\)\.{3,}(\/|\\|$)/.test(A)) return !0;
    if (vH1(A)) return !0;
    return !1;
}
function yD0(A) {
    let Q = ut(A);
    for (let B of Q)if (TV9(B)) return {
        safe: !1,
        message: `Claude requested permissions to write to ${A}, which contains a suspicious Windows path pattern that requires manual approval.`
    };
    for (let B of Q)if (gX7(B)) return {
        safe: !1,
        message: `Claude requested permissions to write to ${A}, but you haven't granted it yet.`
    };
    for (let B of Q)if (uX7(B)) ;
    for (let B of Q)if (lX7(B)) return {
        safe: !1,
        message: `Claude requested permissions to edit ${A} which is a sensitive file.`
    };
    return {
        safe: !0
    };
}
function KHA(A) {
    return new Set([
        uQ(),
        ...A.additionalWorkingDirectories.keys()
    ]);
}
function AS(A, Q) {
    return ut(A).every((G)=>Array.from(KHA(Q)).some((Z)=>qm(G, Z)));
}
function qm(A, Q) {
    let B = R4(A), G = R4(Q), Z = B.replace(/^\/private\/var\//, "/var/").replace(/^\/private\/tmp(\/|$)/, "/tmp$1"), Y = G.replace(/^\/private\/var\//, "/var/").replace(/^\/private\/tmp(\/|$)/, "/tmp$1"), J = as(Z), X = as(Y), I = RV9(X, J);
    if (I === "") return !0;
    if (K5A(I)) return !1;
    return !os.isAbsolute(I);
}
function iX7(A) {
    switch(A){
        case "cliArg":
        case "command":
        case "session":
            return R4(uQ());
        case "userSettings":
        case "policySettings":
        case "projectSettings":
        case "localSettings":
        case "flagSettings":
            return kYA(A);
    }
}
function MR0(A) {
    return os.join(r$, A);
}
function nX7({ patternRoot: A, pattern: Q, rootPath: B }) {
    let G = os.join(A, Q);
    if (A === B) return MR0(Q);
    else if (G.startsWith(`${B}${r$}`)) {
        let Z = G.slice(B.length);
        return MR0(Z);
    } else {
        let Z = os.relative(B, A);
        if (!Z || Z.startsWith(`..${r$}`) || Z === "..") return null;
        else {
            let Y = os.join(Z, Q);
            return MR0(Y);
        }
    }
}
function rWA(A, Q) {
    let B = new Set(A.get(null) ?? []);
    for (let [G, Z] of A.entries()){
        if (G === null) continue;
        for (let Y of Z){
            let J = nX7({
                patternRoot: G,
                pattern: Y,
                rootPath: Q
            });
            if (J) B.add(J);
        }
    }
    return Array.from(B);
}
function sWA(A) {
    let Q = PV9(A, "read", "deny"), B = new Map();
    for (let [G, Z] of Q.entries())B.set(G, Array.from(Z.keys()));
    return B;
}
function aX7(A, Q) {
    if (A.startsWith(`${r$}${r$}`)) {
        let G = A.slice(1);
        if (xQ() === "windows" && G.match(/^\/[a-z]\//i)) {
            let Z = G[1]?.toUpperCase() ?? "C", Y = G.slice(2), J = `${Z}:\\`;
            return {
                relativePattern: Y.startsWith("/") ? Y.slice(1) : Y,
                root: J
            };
        }
        return {
            relativePattern: G,
            root: r$
        };
    } else if (A.startsWith(`~${r$}`)) return {
        relativePattern: A.slice(1),
        root: vX7()
    };
    else if (A.startsWith(r$)) return {
        relativePattern: A,
        root: iX7(Q)
    };
    let B = A;
    if (A.startsWith(`.${r$}`)) B = A.slice(2);
    return {
        relativePattern: B,
        root: null
    };
}
function PV9(A, Q, B) {
    let G = (()=>{
        switch(Q){
            case "edit":
                return S8;
            case "read":
                return y8;
        }
    })(), Z = WR0(A, G, B), Y = new Map();
    for (let [J, X] of Z.entries()){
        let { relativePattern: I, root: W } = aX7(J, X.source), K = Y.get(W);
        if (K === void 0) ((K = new Map()), Y.set(W, K));
        K.set(I, X);
    }
    return Y;
}
function wF(A, Q, B, G) {
    let Z = R4(A);
    if (xQ() === "windows" && Z.includes("\\")) Z = gy(Z);
    let Y = PV9(Q, B, G);
    for (let [J, X] of Y.entries()){
        let I = Array.from(X.keys()).map((H)=>{
            let D = H;
            if (J === r$ && H.startsWith(r$)) D = H.slice(1);
            if (D.endsWith("/**")) D = D.slice(0, -3);
            return D;
        }), W = MV9.default().add(I), K = RV9(J ?? i1(), Z ?? i1());
        if (K.startsWith(`..${r$}`)) continue;
        if (!K) continue;
        let V = W.test(K);
        if (V.ignored && V.rule) {
            let H = V.rule.pattern, D = H + "/**";
            if (X.has(D)) return X.get(D) ?? null;
            if (J === r$ && !H.startsWith(r$)) {
                H = r$ + H;
                let F = H + "/**";
                if (X.has(F)) return X.get(F) ?? null;
            }
            return X.get(H) ?? null;
        }
    }
    return null;
}
function tn(A, Q, B) {
    if (typeof A.getPath !== "function") return {
        behavior: "ask",
        message: `Claude requested permissions to use ${A.name}, but you haven't granted it yet.`
    };
    let G = A.getPath(Q), Z = ut(G);
    for (let K of Z)if (K.startsWith("\\\\") || K.startsWith("//")) return {
        behavior: "ask",
        message: `Claude requested permissions to read from ${G}, which appears to be a UNC path that could access network resources.`,
        decisionReason: {
            type: "other",
            reason: "UNC path detected (defense-in-depth check)"
        }
    };
    for (let K of Z)if (TV9(K)) return {
        behavior: "ask",
        message: `Claude requested permissions to read from ${G}, which contains a suspicious Windows path pattern that requires manual approval.`,
        decisionReason: {
            type: "other",
            reason: "Path contains suspicious Windows-specific patterns (alternate data streams, short names, long path prefixes, or three or more consecutive dots) that require manual verification"
        }
    };
    for (let K of Z){
        let V = wF(K, B, "read", "deny");
        if (V) return {
            behavior: "deny",
            message: `Permission to read ${G} has been denied.`,
            decisionReason: {
                type: "rule",
                rule: V
            }
        };
    }
    for (let K of Z){
        let V = wF(K, B, "read", "ask");
        if (V) return {
            behavior: "ask",
            message: `Claude requested permissions to read from ${G}, but you haven't granted it yet.`,
            decisionReason: {
                type: "rule",
                rule: V
            }
        };
    }
    let Y = J2A(A, Q, B);
    if (Y.behavior === "allow") return Y;
    if (AS(G, B)) return {
        behavior: "allow",
        updatedInput: Q,
        decisionReason: {
            type: "mode",
            mode: "default"
        }
    };
    let X = R4(G), I = rX7(X, Q);
    if (I.behavior !== "passthrough") return I;
    let W = wF(G, B, "read", "allow");
    if (W) return {
        behavior: "allow",
        updatedInput: Q,
        decisionReason: {
            type: "rule",
            rule: W
        }
    };
    return {
        behavior: "ask",
        message: `Claude requested permissions to read from ${G}, but you haven't granted it yet.`,
        suggestions: FJ1(G, "read", B),
        decisionReason: {
            type: "workingDir",
            reason: "Path is outside allowed working directories"
        }
    };
}
function J2A(A, Q, B) {
    if (typeof A.getPath !== "function") return {
        behavior: "ask",
        message: `Claude requested permissions to use ${A.name}, but you haven't granted it yet.`
    };
    let G = A.getPath(Q), Z = ut(G);
    for (let K of Z){
        let V = wF(K, B, "edit", "deny");
        if (V) return {
            behavior: "deny",
            message: `Permission to edit ${G} has been denied.`,
            decisionReason: {
                type: "rule",
                rule: V
            }
        };
    }
    let Y = R4(G), J = oX7(Y, Q);
    if (J.behavior !== "passthrough") return J;
    let X = yD0(G);
    if (!X.safe) return {
        behavior: "ask",
        message: X.message,
        decisionReason: {
            type: "other",
            reason: X.message
        }
    };
    for (let K of Z){
        let V = wF(K, B, "edit", "ask");
        if (V) return {
            behavior: "ask",
            message: `Claude requested permissions to write to ${G}, but you haven't granted it yet.`,
            decisionReason: {
                type: "rule",
                rule: V
            }
        };
    }
    let I = AS(G, B);
    if (B.mode === "acceptEdits" && I) return {
        behavior: "allow",
        updatedInput: Q,
        decisionReason: {
            type: "mode",
            mode: B.mode
        }
    };
    let W = wF(G, B, "edit", "allow");
    if (W) return {
        behavior: "allow",
        updatedInput: Q,
        decisionReason: {
            type: "rule",
            rule: W
        }
    };
    return {
        behavior: "ask",
        message: `Claude requested permissions to write to ${G}, but you haven't granted it yet.`,
        suggestions: FJ1(G, "write", B),
        decisionReason: !I ? {
            type: "workingDir",
            reason: "Path is outside allowed working directories"
        } : void 0
    };
}
function FJ1(A, Q, B) {
    let G = !AS(A, B);
    if (Q === "read" && G) {
        let Z = Bh(A);
        return ut(Z).map((X)=>atA(X, "session")).filter((X)=>X !== void 0);
    }
    if (Q === "write" || Q === "create") {
        let Z = [
            {
                type: "setMode",
                mode: "acceptEdits",
                destination: "session"
            }
        ];
        if (G) {
            let Y = Bh(A), J = ut(Y);
            Z.push({
                type: "addDirectories",
                directories: J,
                destination: "session"
            });
        }
        return Z;
    }
    return [
        {
            type: "setMode",
            mode: "acceptEdits",
            destination: "session"
        }
    ];
}
function oX7(A, Q) {
    if (_V9(A)) return {
        behavior: "allow",
        updatedInput: Q,
        decisionReason: {
            type: "other",
            reason: "Plan files for current session are allowed for writing"
        }
    };
    if (pX7(A)) return {
        behavior: "allow",
        updatedInput: Q,
        decisionReason: {
            type: "other",
            reason: "Scratchpad files for current session are allowed for writing"
        }
    };
    return {
        behavior: "passthrough",
        message: ""
    };
}
function rX7(A, Q) {
    let B = Jc(bK(uQ()), "bash-outputs", m0());
    if (A.startsWith(B)) return {
        behavior: "allow",
        updatedInput: Q,
        decisionReason: {
            type: "other",
            reason: "Bash output files from current session are allowed for reading"
        }
    };
    if (mX7(A)) return {
        behavior: "allow",
        updatedInput: Q,
        decisionReason: {
            type: "other",
            reason: "Session memory files are allowed for reading"
        }
    };
    if (dX7(A)) return {
        behavior: "allow",
        updatedInput: Q,
        decisionReason: {
            type: "other",
            reason: "Project directory files are allowed for reading"
        }
    };
    if (_V9(A)) return {
        behavior: "allow",
        updatedInput: Q,
        decisionReason: {
            type: "other",
            reason: "Plan files for current session are allowed for reading"
        }
    };
    let G = $61(), Z = G.endsWith(rs) ? G : G + rs;
    if (A === G || A.startsWith(Z)) return {
        behavior: "allow",
        updatedInput: Q,
        decisionReason: {
            type: "other",
            reason: "Tool result files are allowed for reading"
        }
    };
    let Y = jB1();
    if (A.startsWith(Y)) return {
        behavior: "allow",
        updatedInput: Q,
        decisionReason: {
            type: "other",
            reason: "Project temp directory files are allowed for reading"
        }
    };
    return {
        behavior: "passthrough",
        message: ""
    };
}
var MV9, fX7, bX7, r$;
