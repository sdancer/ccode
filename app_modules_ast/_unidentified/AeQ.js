// Module: AeQ
// Type: U
// Lines: 131988-132013
//
var AeQ = U((ttQ)=>{
    Object.defineProperty(ttQ, "__esModule", {
        value: !0
    });
    ttQ.getMachineId = void 0;
    var _K8 = VoA(), jK8 = f9();
    async function TK8() {
        try {
            let Q = (await (0, _K8.execAsync)('ioreg -rd1 -c "IOPlatformExpertDevice"')).stdout.split(`
`).find((G)=>G.includes("IOPlatformUUID"));
            if (!Q) return;
            let B = Q.split('" = "');
            if (B.length === 2) return B[1].slice(0, -1);
        } catch (A) {
            jK8.diag.debug(`error reading machine id: ${A}`);
        }
        return;
    }
    ttQ.getMachineId = TK8;
});
