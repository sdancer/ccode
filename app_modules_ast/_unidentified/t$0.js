// Module: t$0
// Type: U
// Lines: 440858-440898
//
var t$0 = U((xd2)=>{
    Object.defineProperty(xd2, "__esModule", {
        value: !0
    });
    var Tc5 = z6(), rW1 = FQ(), s$0 = IkA(), Pc5 = 2000;
    function Sc5(A) {
        rW1.consoleSandbox(()=>{
            console.error(A);
        });
        let Q = Tc5.getClient();
        if (Q === void 0) (s$0.DEBUG_BUILD && rW1.logger.warn("No NodeClient was defined, we are exiting the process now."), global.process.exit(1));
        let B = Q.getOptions(), G = (B && B.shutdownTimeout && B.shutdownTimeout > 0 && B.shutdownTimeout) || Pc5;
        Q.close(G).then((Z)=>{
            if (!Z) s$0.DEBUG_BUILD && rW1.logger.warn("We reached the timeout for emptying the request buffer, still exiting now!");
            global.process.exit(1);
        }, (Z)=>{
            s$0.DEBUG_BUILD && rW1.logger.error(Z);
        });
    }
    xd2.logAndExitProcess = Sc5;
});
