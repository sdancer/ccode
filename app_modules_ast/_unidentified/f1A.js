// Module: f1A
// Type: L
// Lines: 179189-179345
//
var pushStartInstance = L(()=>{
    g1();
    s1();
    r5B();
});
import { execSync as $tA } from "child_process";
import { basename as fL8, extname as bL8, isAbsolute as hL8 } from "path";
function gL8() {
    let A = process.platform, Q = {
        darwin: "No image found in clipboard. Use Cmd + Ctrl + Shift + 4 to copy a screenshot to clipboard.",
        win32: "No image found in clipboard. Use Print Screen to copy a screenshot to clipboard.",
        linux: "No image found in clipboard. Use appropriate screenshot tool to copy a screenshot to clipboard."
    };
    return Q[A] || Q.linux;
}
function A7B() {
    let A = process.platform, Q = {
        darwin: "/tmp/claude_cli_latest_screenshot.png",
        linux: "/tmp/claude_cli_latest_screenshot.png",
        win32: process.env.TEMP ? `${process.env.TEMP}\\claude_cli_latest_screenshot.png` : "C:\\Temp\\claude_cli_latest_screenshot.png"
    }, B = Q[A] || Q.linux, G = {
        darwin: {
            checkImage: "osascript -e 'the clipboard as «class PNGf»'",
            saveImage: `osascript -e 'set png_data to (the clipboard as «class PNGf»)' -e 'set fp to open for access POSIX file "${B}" with write permission' -e 'write png_data to fp' -e 'close access fp'`,
            getPath: "osascript -e 'get POSIX path of (the clipboard as «class furl»)'",
            deleteFile: `rm -f "${B}"`
        },
        linux: {
            checkImage: 'xclip -selection clipboard -t TARGETS -o 2>/dev/null | grep -E "image/(png|jpeg|jpg|gif|webp)" || wl-paste -l 2>/dev/null | grep -E "image/(png|jpeg|jpg|gif|webp)"',
            saveImage: `xclip -selection clipboard -t image/png -o > "${B}" 2>/dev/null || wl-paste --type image/png > "${B}"`,
            getPath: "xclip -selection clipboard -t text/plain -o 2>/dev/null || wl-paste 2>/dev/null",
            deleteFile: `rm -f "${B}"`
        },
        win32: {
            checkImage: 'powershell -NoProfile -Command "(Get-Clipboard -Format Image) -ne $null"',
            saveImage: `powershell -NoProfile -Command "$img = Get-Clipboard -Format Image; if ($img) { $img.Save('${B.replace(/\\/g, "\\\\")}', [System.Drawing.Imaging.ImageFormat]::Png) }"`,
            getPath: 'powershell -NoProfile -Command "Get-Clipboard"',
            deleteFile: `del /f "${B}"`
        }
    };
    return {
        commands: G[A] || G.linux,
        screenshotPath: B
    };
}
async function wtA() {
    let { commands: A, screenshotPath: Q } = A7B();
    try {
        ($tA(A.checkImage, {
            stdio: "ignore"
        }), $tA(A.saveImage, {
            stdio: "ignore"
        }));
        let B = vA().readFileBytesSync(Q), G = await JYA(B, B.length, "png"), Z = G.buffer.toString("base64"), Y = B7B(Z);
        return ($tA(A.deleteFile, {
            stdio: "ignore"
        }), {
            base64: Z,
            mediaType: Y,
            dimensions: G.dimensions
        });
    } catch  {
        return null;
    }
}
function uL8() {
    let { commands: A } = A7B();
    try {
        return $tA(A.getPath, {
            encoding: "utf-8"
        }).trim();
    } catch (Q) {
        return (t(Q), null);
    }
}
function qtA(A) {
    if (A.length < 4) return "image/png";
    if (A[0] === 137 && A[1] === 80 && A[2] === 78 && A[3] === 71) return "image/png";
    if (A[0] === 255 && A[1] === 216 && A[2] === 255) return "image/jpeg";
    if (A[0] === 71 && A[1] === 73 && A[2] === 70) return "image/gif";
    if (A[0] === 82 && A[1] === 73 && A[2] === 70 && A[3] === 70) {
        if (A.length >= 12 && A[8] === 87 && A[9] === 69 && A[10] === 66 && A[11] === 80) return "image/webp";
    }
    return "image/png";
}
function B7B(A) {
    try {
        let Q = Buffer.from(A, "base64");
        return qtA(Q);
    } catch  {
        return "image/png";
    }
}
function G7B(A) {
    if ((A.startsWith('"') && A.endsWith('"')) || (A.startsWith("'") && A.endsWith("'"))) return A.slice(1, -1);
    return A;
}
function Z7B(A) {
    if (process.platform === "win32") return A;
    let B = "__DOUBLE_BACKSLASH__";
    return A.replace(/\\\\/g, B).replace(/\\(.)/g, "$1").replace(new RegExp(B, "g"), "\\");
}
function Cp1(A) {
    let Q = G7B(A.trim()), B = Z7B(Q);
    return Q7B.test(B);
}
function mL8(A) {
    let Q = G7B(A.trim()), B = Z7B(Q);
    if (Q7B.test(B)) return B;
    return null;
}
async function Y7B(A) {
    let Q = mL8(A);
    if (!Q) return null;
    let B = Q, G;
    try {
        if (hL8(B)) G = vA().readFileBytesSync(B);
        else {
            let I = uL8();
            if (I && B === fL8(I)) G = vA().readFileBytesSync(I);
        }
    } catch (I) {
        return (t(I), null);
    }
    if (!G) return null;
    let Z = bL8(B).slice(1).toLowerCase() || "png", Y = await JYA(G, G.length, Z), J = Y.buffer.toString("base64"), X = B7B(J);
    return {
        path: B,
        base64: J,
        mediaType: X,
        dimensions: Y.dimensions
    };
}
var HIG, UtA = 800, Q7B;
