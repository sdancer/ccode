// Module: US
// Type: U
// Lines: 428467-428525
//
var rpcCall = U((Ex2)=>{
    Object.defineProperty(Ex2, "__esModule", {
        value: !0
    });
    var wz5 = $f(), wz0 = renderChildrenArray(), qz5 = "Sentry Logger ", qz0 = [
        "debug",
        "info",
        "warn",
        "error",
        "log",
        "assert",
        "trace"
    ], Nz0 = {};
    function Fx2(A) {
        if (!("console" in wz0.GLOBAL_OBJ)) return A();
        let Q = wz0.GLOBAL_OBJ.console, B = {}, G = Object.keys(Nz0);
        G.forEach((Z)=>{
            let Y = Nz0[Z];
            ((B[Z] = Q[Z]), (Q[Z] = Y));
        });
        try {
            return A();
        } finally{
            G.forEach((Z)=>{
                Q[Z] = B[Z];
            });
        }
    }
    function Nz5() {
        let A = !1, Q = {
            enable: ()=>{
                A = !0;
            },
            disable: ()=>{
                A = !1;
            },
            isEnabled: ()=>A
        };
        if (wz5.DEBUG_BUILD) qz0.forEach((B)=>{
            Q[B] = (...G)=>{
                if (A) Fx2(()=>{
                    wz0.GLOBAL_OBJ.console[B](`${qz5}[${B}]:`, ...G);
                });
            };
        });
        else qz0.forEach((B)=>{
            Q[B] = ()=>{
                return;
            };
        });
        return Q;
    }
    var Lz5 = Nz5();
    Ex2.CONSOLE_LEVELS = qz0;
    Ex2.consoleSandbox = Fx2;
    Ex2.logger = Lz5;
    Ex2.originalConsoleMethods = Nz0;
});
