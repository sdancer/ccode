// Module: VTB
// Type: L
// Lines: 240406-240421
//
var VTB = L(()=>{
    OB3 = qB3(LB3);
});
import MB3 from "node:process";
import { promisify as RB3 } from "node:util";
import { execFile as _B3, execFileSync as xgG } from "node:child_process";
async function HTB(A, { humanReadableOutput: Q = !0, signal: B } = {}) {
    if (MB3.platform !== "darwin") throw Error("macOS only");
    let G = Q ? [] : [
        "-ss"
    ], Z = {};
    if (B) Z.signal = B;
    let { stdout: Y } = await jB3("osascript", [
        "-e",
        A,
        G
    ], Z);
    return Y.trim();
}
var jB3;
