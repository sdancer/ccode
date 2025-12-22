// Module: WJ
// Type: L
// Lines: 525037-525341
//
var read_string_buffer = L(()=>{
    i0();
    z4();
    aB();
    GJ();
    W5A();
    b8();
    L3();
    GJ();
    OK();
    NZ();
    pushStartInstance();
    zB();
    pushStartInstance();
    restoreViewTransitionName();
    renderElement();
    createRenderState();
    pushStartInstance();
    su();
    ((MV9 = l(createRenderState(), 1)), (fX7 = [
        ".gitconfig",
        ".gitmodules",
        ".bashrc",
        ".bash_profile",
        ".zshrc",
        ".zprofile",
        ".profile",
        ".ripgreprc",
        ".mcp.json"
    ]), (bX7 = [
        ".git",
        ".vscode",
        ".idea",
        ".claude"
    ]));
    r$ = os.sep;
});
import { isAbsolute as XF1, resolve as SV9, relative as sX7, sep as RR0, basename as IF1, dirname as jR0, extname as _R0, join as jFA } from "path";
import { homedir as tX7 } from "os";
import { chmodSync as eX7 } from "fs";
function AI7(A) {
    let Q = /[*?[{]/, B = A.match(Q);
    if (!B || B.index === void 0) {
        let X = jR0(A), I = IF1(A);
        return {
            baseDir: X,
            relativePattern: I
        };
    }
    let G = A.slice(0, B.index), Z = Math.max(G.lastIndexOf("/"), G.lastIndexOf(RR0));
    if (Z === -1) return {
        baseDir: "",
        relativePattern: A
    };
    let Y = G.slice(0, Z), J = A.slice(Z + 1);
    if (Y === "" && Z === 0) Y = "/";
    if (xQ() === "windows" && /^[A-Za-z]:$/.test(Y)) Y = Y + RR0;
    return {
        baseDir: Y,
        relativePattern: J
    };
}
async function wQ2(A, Q, { limit: B, offset: G }, Z, Y) {
    let J = Q, X = A;
    if (XF1(A)) {
        let { baseDir: F, relativePattern: E } = AI7(A);
        if (F) ((J = F), (X = E));
    }
    let I = rWA(sWA(Y), J), W = [
        "--files",
        "--glob",
        X,
        "--sort=modified",
        "--no-ignore",
        "--hidden"
    ];
    for (let F of I)W.push("--glob", `!${F}`);
    let V = (await yy(W, J, Z)).map((F)=>(XF1(F) ? F : jFA(J, F))), H = V.length > G + B;
    return {
        files: V.slice(G, G + B),
        truncated: H
    };
}
function Vw(A) {
    let Q = vA();
    return Math.ceil(Q.statSync(A).mtimeMs);
}
function uPB(A, Q = 0, B) {
    let Y = vA().readFileSync(A, {
        encoding: "utf8"
    }).split(/\r?\n/), J = B !== void 0 && Y.length - Q > B ? Y.slice(Q, Q + B) : Y.slice(Q);
    return {
        content: J.join(`
`),
        lineCount: J.length,
        totalLines: Y.length
    };
}
function oWA(A, Q, B, G) {
    let Z = Q;
    if (G === "CRLF") Z = Q.split(`
`).join(`\r
`);
    iR(A, Z, {
        encoding: B
    });
}
function LE(A) {
    try {
        let B = vA(), { resolvedPath: G } = tI(B, A), { buffer: Z, bytesRead: Y } = B.readSync(G, {
            length: 4096
        });
        if (Y === 0) return "utf8";
        if (Y >= 2) {
            if (Z[0] === 255 && Z[1] === 254) return "utf16le";
        }
        if (Y >= 3 && Z[0] === 239 && Z[1] === 187 && Z[2] === 191) return "utf8";
        return "utf8";
    } catch (B) {
        return (t(B), "utf8");
    }
}
function X2A(A, Q = "utf8") {
    try {
        let B = vA(), { resolvedPath: G } = tI(B, A), { buffer: Z, bytesRead: Y } = B.readSync(G, {
            length: 4096
        }), J = Z.toString(Q, 0, Y);
        return QI7(J);
    } catch (B) {
        return (t(B), "LF");
    }
}
function QI7(A) {
    let Q = 0, B = 0;
    for(let G = 0; G < A.length; G++)if (A[G] === `
`) if (G > 0 && A[G - 1] === "\r") Q++;
    else B++;
    return Q > B ? "CRLF" : "LF";
}
function sn(A) {
    let Q = XF1(A) ? A : SV9(i1(), A), B = vA(), G = String.fromCharCode(8239), Z = /^(.+)([ \u202F])(AM|PM)(\.png)$/, Y = IF1(Q).match(Z);
    if (Y) {
        if (B.existsSync(Q)) return Q;
        let J = Y[2], X = J === " " ? G : " ", I = Q.replace(`${J}${Y[3]}${Y[4]}`, `${X}${Y[3]}${Y[4]}`);
        if (B.existsSync(I)) return I;
    }
    return Q;
}
function TXA(A) {
    return A.replace(/^\t+/gm, (Q)=>"  ".repeat(Q.length));
}
function BI7(A) {
    let Q = A ? R4(A) : void 0, B = Q ? sX7(i1(), Q) : void 0;
    return {
        absolutePath: Q,
        relativePath: B
    };
}
function S5(A) {
    let { relativePath: Q } = BI7(A);
    if (Q && !Q.startsWith("..")) return Q;
    let B = tX7();
    if (A.startsWith(B + RR0)) return "~" + A.slice(B.length);
    return A;
}
function xB1(A) {
    let Q = vA();
    try {
        let B = jR0(A), G = IF1(A, _R0(A));
        if (!Q.existsSync(B)) return;
        let J = Q.readdirSync(B).filter((X)=>IF1(X.name, _R0(X.name)) === G && jFA(B, X.name) !== A)[0];
        if (J) return J.name;
        return;
    } catch (B) {
        t(B);
        return;
    }
}
function en({ content: A, startLine: Q }) {
    if (!A) return "";
    return A.split(/\r?\n/).map((G, Z)=>{
        let Y = Z + Q, J = String(Y);
        if (J.length >= 6) return `${J}→${G}`;
        return `${J.padStart(6, " ")}→${G}`;
    }).join(`
`);
}
function D7B(A) {
    let Q = vA();
    if (!Q.existsSync(A)) return !0;
    return Q.isDirEmptySync(A);
}
function WF(A) {
    let Q = vA(), { resolvedPath: B, isSymlink: G } = tI(Q, A);
    if (G) k(`Reading through symlink: ${A} -> ${B}`);
    let Z = LE(B);
    return Q.readFileSync(B, {
        encoding: Z
    }).replaceAll(`\r
`, `
`);
}
function AZ0(A) {
    let { content: Q } = Kt0.readFile(A);
    return Q;
}
function iR(A, Q, B = {
    encoding: "utf-8"
}) {
    let G = vA(), Z = A;
    if (G.existsSync(A)) try {
        let J = G.readlinkSync(A);
        ((Z = XF1(J) ? J : SV9(jR0(A), J)), k(`Writing through symlink: ${A} -> ${Z}`));
    } catch (J) {
        Z = A;
    }
    let Y = `${Z}.tmp.${process.pid}.${Date.now()}`;
    try {
        k(`Writing to temp file: ${Y}`);
        let J, X = G.existsSync(Z);
        if (X) ((J = G.statSync(Z).mode), k(`Preserving file permissions: ${J.toString(8)}`));
        else if (B.mode !== void 0) ((J = B.mode), k(`Setting permissions for new file: ${J.toString(8)}`));
        let I = {
            encoding: B.encoding,
            flush: !0
        };
        if (!X && B.mode !== void 0) I.mode = B.mode;
        if ((G.writeFileSync(Y, Q, I), k(`Temp file written successfully, size: ${Q.length} bytes`), X && J !== void 0)) (eX7(Y, J), k("Applied original permissions to temp file"));
        (k(`Renaming ${Y} to ${Z}`), G.renameSync(Y, Z), k(`File ${Z} written atomically`));
    } catch (J) {
        (k(`Failed to write file atomically: ${J}`), t(J), r("tengu_atomic_write_error", {}));
        try {
            if (G.existsSync(Y)) (k(`Cleaning up temp file: ${Y}`), G.unlinkSync(Y));
        } catch (X) {
            k(`Failed to clean up temp file: ${X}`);
        }
        k(`Falling back to non-atomic write for ${Z}`);
        try {
            let X = {
                encoding: B.encoding,
                flush: !0
            };
            if (!G.existsSync(Z) && B.mode !== void 0) X.mode = B.mode;
            (G.writeFileSync(Z, Q, X), k(`File ${Z} written successfully with non-atomic fallback`));
        } catch (X) {
            throw (k(`Non-atomic write also failed: ${X}`), X);
        }
    }
}
function JF1(A) {
    return hp(A);
}
function FI(A) {
    let Q = A / 1024;
    if (Q < 1) return `${A} bytes`;
    if (Q < 1024) return `${Q.toFixed(1).replace(/\.0$/, "")}KB`;
    let B = Q / 1024;
    if (B < 1024) return `${B.toFixed(1).replace(/\.0$/, "")}MB`;
    return `${(B / 1024).toFixed(1).replace(/\.0$/, "")}GB`;
}
function XHA(A) {
    let Q = _R0(A);
    if (!Q) return "unknown";
    return yV9.getLanguage(Q.slice(1))?.name ?? "unknown";
}
function M39(A) {
    let Q = vA();
    try {
        if (!Q.existsSync(A)) Q.mkdirSync(A);
        return !0;
    } catch (B) {
        return (t(B instanceof Error ? B : Error(String(B))), !1);
    }
}
function vB1(A, Q = ERA) {
    try {
        return vA().statSync(A).size <= Q;
    } catch  {
        return !1;
    }
}
var yV9, ERA = 262144, ZQ2, YF1, My;
