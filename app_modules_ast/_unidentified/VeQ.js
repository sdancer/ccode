// Module: VeQ
// Type: U
// Lines: 132055-132079
//
var VeQ = U((WeQ)=>{
    Object.defineProperty(WeQ, "__esModule", {
        value: !0
    });
    WeQ.getMachineId = void 0;
    var IeQ = qA("process"), fK8 = VoA(), bK8 = f9();
    async function hK8() {
        let Q = "%windir%\\System32\\REG.exe";
        if (IeQ.arch === "ia32" && "PROCESSOR_ARCHITEW6432" in IeQ.env) Q = "%windir%\\sysnative\\cmd.exe /c " + Q;
        try {
            let G = (await (0, fK8.execAsync)(`${Q} QUERY HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Cryptography /v MachineGuid`)).stdout.split("REG_SZ");
            if (G.length === 2) return G[1].trim();
        } catch (B) {
            bK8.diag.debug(`error reading machine id: ${B}`);
        }
        return;
    }
    WeQ.getMachineId = hK8;
});
