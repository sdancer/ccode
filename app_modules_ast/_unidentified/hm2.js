// Module: hm2
// Type: U
// Lines: 439533-439571
//
var hm2 = U((bm2)=>{
    var { _optionalChain: um5 } = FQ();
    Object.defineProperty(bm2, "__esModule", {
        value: !0
    });
    var km2 = qA("domain"), s9A = z6();
    function fm2() {
        return km2.active;
    }
    function mm5() {
        let A = fm2();
        if (!A) return;
        return (s9A.ensureHubOnCarrier(A), s9A.getHubFromCarrier(A));
    }
    function dm5(A) {
        let Q = {};
        return (s9A.ensureHubOnCarrier(Q, A), s9A.getHubFromCarrier(Q));
    }
    function cm5(A, Q) {
        let B = fm2();
        if (B && um5([
            Q,
            "optionalAccess",
            (J)=>J.reuseExisting
        ])) return A();
        let G = km2.create(), Z = B ? s9A.getHubFromCarrier(B) : void 0, Y = dm5(Z);
        return (s9A.setHubOnCarrier(G, Y), G.bind(()=>{
            return A();
        })());
    }
    function pm5() {
        s9A.setAsyncContextStrategy({
            getCurrentHub: mm5,
            runWithAsyncContext: cm5
        });
    }
    bm2.setDomainAsyncContextStrategy = pm5;
});
