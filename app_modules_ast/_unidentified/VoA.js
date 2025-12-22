// Module: VoA
// Type: U
// Lines: 131981-131988
//
var VoA = U((rtQ)=>{
    Object.defineProperty(rtQ, "__esModule", {
        value: !0
    });
    rtQ.execAsync = void 0;
    var MK8 = qA("child_process"), RK8 = qA("util");
    rtQ.execAsync = RK8.promisify(MK8.exec);
});
