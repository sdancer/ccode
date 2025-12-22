// Module: FTB
// Type: L
// Lines: 240428-240451
//
var FTB = L(()=>{
    DTB();
});
import { promisify as TB3 } from "node:util";
import { execFile as PB3 } from "node:child_process";
async function VA0(A = SB3) {
    let { stdout: Q } = await A("reg", [
        "QUERY",
        " HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\Shell\\Associations\\UrlAssociations\\http\\UserChoice",
        "/v",
        "ProgId"
    ]), B = /ProgId\s*REG_SZ\s*(?<id>\S+)/.exec(Q);
    if (!B) throw new KA0(`Cannot find Windows browser in stdout: ${JSON.stringify(Q)}`);
    let { id: G } = B.groups, Z = yB3[G];
    if (!Z) throw new KA0(`Unknown browser ID: ${G}`);
    return Z;
}
var SB3, yB3, KA0;
