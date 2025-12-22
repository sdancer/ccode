// Module: AK1
// Type: U
// Lines: 440968-441014
//
var AK1 = U((cd2)=>{
    Object.defineProperty(cd2, "__esModule", {
        value: !0
    });
    var eW1 = z6(), gd2 = FQ(), uc5 = t$0(), ud2 = "OnUnhandledRejection", mc5 = (A = {})=>{
        let Q = A.mode || "warn";
        return {
            name: ud2,
            setupOnce () {},
            setup (B) {
                global.process.on("unhandledRejection", dd2(B, {
                    mode: Q
                }));
            }
        };
    }, md2 = eW1.defineIntegration(mc5), dc5 = eW1.convertIntegrationFnToClass(ud2, md2);
    function dd2(A, Q) {
        return function(G, Z) {
            if (eW1.getClient() !== A) return;
            (eW1.captureException(G, {
                originalException: Z,
                captureContext: {
                    extra: {
                        unhandledPromiseRejection: !0
                    }
                },
                mechanism: {
                    handled: !1,
                    type: "onunhandledrejection"
                }
            }), cc5(G, Q));
        };
    }
    function cc5(A, Q) {
        let B = "This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). The promise rejected with the reason:";
        if (Q.mode === "warn") gd2.consoleSandbox(()=>{
            (console.warn(B), console.error(A && A.stack ? A.stack : A));
        });
        else if (Q.mode === "strict") (gd2.consoleSandbox(()=>{
            console.warn(B);
        }), uc5.logAndExitProcess(A));
    }
    cd2.OnUnhandledRejection = dc5;
    cd2.makeUnhandledPromiseHandler = dd2;
    cd2.onUnhandledRejectionIntegration = md2;
});
