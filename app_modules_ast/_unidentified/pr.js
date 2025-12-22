// Module: pr
// Type: L
// Lines: 422708-422778
//
var pushStartInstance = L(()=>{
    n2();
    Wd = Y0(()=>{
        if (process.env.VISUAL?.trim()) return process.env.VISUAL.trim();
        if (process.env.EDITOR?.trim()) return process.env.EDITOR.trim();
        if (process.platform === "win32") return "start /wait notepad";
        return [
            "code",
            "vi",
            "nano"
        ].find((Q)=>BF5(Q));
    });
});
import { join as GF5 } from "path";
import { tmpdir as ZF5 } from "os";
import { randomUUID as YF5 } from "crypto";
function yX1(A = "claude-prompt", Q = ".md") {
    let B = YF5();
    return GF5(ZF5(), `${A}-${B}${Q}`);
}
var pE0 = ()=>{};
import { execSync as JF5 } from "child_process";
function WF5(A) {
    let Q = A.split(" ")[0] ?? "";
    return IF5.some((B)=>Q.includes(B));
}
function lE0(A) {
    let Q = vA(), B = IT.get(process.stdout);
    if (!B) throw Error("Ink instance not found - cannot pause rendering");
    let G = Wd();
    if (!G) return null;
    if (!Q.existsSync(A)) return null;
    let Z = !WF5(G);
    try {
        if ((B.pause(), B.suspendStdin(), Z)) process.stdout.write("\x1B[?1049h\x1B[?1004l\x1B[0m\x1B[?25h\x1B[2J\x1B[H");
        let Y = XF5[G] ?? G;
        return (JF5(`${Y} "${A}"`, {
            stdio: "inherit"
        }), Q.readFileSync(A, {
            encoding: "utf-8"
        }));
    } catch (Y) {
        return null;
    } finally{
        if (Z) process.stdout.write("\x1B[?1049l\x1B[?1004h\x1B[?25l");
        (B.resumeStdin(), B.resume());
    }
}
function xX1(A) {
    let Q = vA(), B = yX1();
    try {
        Q.writeFileSync(B, A, {
            encoding: "utf-8",
            flush: !0
        });
        let G = lE0(B);
        if (G === null) return null;
        if (G.endsWith(`
`) && !G.endsWith(`

`)) return G.slice(0, -1);
        return G;
    } finally{
        try {
            if (Q.existsSync(B)) Q.unlinkSync(B);
        } catch  {}
    }
}
var XF5, IF5;
