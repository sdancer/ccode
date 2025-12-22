// Module: h$0
// Type: U
// Lines: 439146-439170
//
var h$0 = U((Um2)=>{
    Object.defineProperty(Um2, "__esModule", {
        value: !0
    });
    var Km5 = qA("os"), Vm5 = qA("util"), Cm2 = z6();
    class $m2 extends Cm2.ServerRuntimeClient {
        constructor(A){
            (Cm2.applySdkMetadata(A, "node"), (A.transportOptions = {
                textEncoder: new Vm5.TextEncoder(),
                ...A.transportOptions
            }));
            let Q = {
                ...A,
                platform: "node",
                runtime: {
                    name: "node",
                    version: global.process.version
                },
                serverName: A.serverName || global.process.env.SENTRY_NAME || Km5.hostname()
            };
            super(Q);
        }
    }
    Um2.NodeClient = $m2;
});
