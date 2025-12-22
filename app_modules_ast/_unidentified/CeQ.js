// Module: CeQ
// Type: U
// Lines: 132089-132117
//
var CeQ = U((EeQ)=>{
    Object.defineProperty(EeQ, "__esModule", {
        value: !0
    });
    EeQ.getMachineId = void 0;
    var mK8 = qA("process"), B1A;
    async function dK8() {
        if (!B1A) switch(mK8.platform){
            case "darwin":
                B1A = (await Promise.resolve().then(()=>l(AeQ()))).getMachineId;
                break;
            case "linux":
                B1A = (await Promise.resolve().then(()=>l(GeQ()))).getMachineId;
                break;
            case "freebsd":
                B1A = (await Promise.resolve().then(()=>l(XeQ()))).getMachineId;
                break;
            case "win32":
                B1A = (await Promise.resolve().then(()=>l(VeQ()))).getMachineId;
                break;
            default:
                B1A = (await Promise.resolve().then(()=>l(FeQ()))).getMachineId;
                break;
        }
        return B1A();
    }
    EeQ.getMachineId = dK8;
});
