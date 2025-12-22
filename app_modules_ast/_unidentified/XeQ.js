// Module: XeQ
// Type: U
// Lines: 132030-132055
//
var XeQ = U((YeQ)=>{
    Object.defineProperty(YeQ, "__esModule", {
        value: !0
    });
    YeQ.getMachineId = void 0;
    var xK8 = qA("fs"), vK8 = VoA(), ZeQ = f9();
    async function kK8() {
        try {
            return (await xK8.promises.readFile("/etc/hostid", {
                encoding: "utf8"
            })).trim();
        } catch (A) {
            ZeQ.diag.debug(`error reading machine id: ${A}`);
        }
        try {
            return (await (0, vK8.execAsync)("kenv -q smbios.system.uuid")).stdout.trim();
        } catch (A) {
            ZeQ.diag.debug(`error reading machine id: ${A}`);
        }
        return;
    }
    YeQ.getMachineId = kK8;
});
