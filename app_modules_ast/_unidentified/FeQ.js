// Module: FeQ
// Type: U
// Lines: 132079-132089
//
var FeQ = U((HeQ)=>{
    Object.defineProperty(HeQ, "__esModule", {
        value: !0
    });
    HeQ.getMachineId = void 0;
    var gK8 = f9();
    async function uK8() {
        gK8.diag.debug("could not read machine-id: unsupported platform");
        return;
    }
    HeQ.getMachineId = uK8;
});
