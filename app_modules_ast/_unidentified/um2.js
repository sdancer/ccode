// Module: um2
// Type: U
// Lines: 439571-439598
//
var um2 = U((gm2)=>{
    var { _optionalChain: im5 } = FQ();
    Object.defineProperty(gm2, "__esModule", {
        value: !0
    });
    var d$0 = z6(), nm5 = qA("async_hooks"), gW1;
    function am5() {
        if (!gW1) gW1 = new nm5.AsyncLocalStorage();
        function A() {
            return gW1.getStore();
        }
        function Q(G) {
            let Z = {};
            return (d$0.ensureHubOnCarrier(Z, G), d$0.getHubFromCarrier(Z));
        }
        function B(G, Z) {
            let Y = A();
            if (Y && im5([
                Z,
                "optionalAccess",
                (X)=>X.reuseExisting
            ])) return G();
            let J = Q(Y);
            return gW1.run(J, ()=>{
                return G();
            });
        }
        d$0.setAsyncContextStrategy({
            getCurrentHub: A,
            runWithAsyncContext: B
        });
    }
    gm2.setHooksAsyncContextStrategy = am5;
});
