// Module: pC1
// Type: U
// Lines: 10119-10138
//
var pC1 = U((vg0)=>{
    Object.defineProperty(vg0, "__esModule", {
        value: !0
    });
    vg0.pairwise = void 0;
    var ex9 = E2(), Av9 = renderElement();
    function Qv9() {
        return ex9.operate(function(A, Q) {
            var B, G = !1;
            A.subscribe(Av9.createOperatorSubscriber(Q, function(Z) {
                var Y = B;
                ((B = Z), G && Q.next([
                    Y,
                    Z
                ]), (G = !0));
            }));
        });
    }
    vg0.pairwise = Qv9;
});
