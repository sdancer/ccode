// Module: NC1
// Type: U
// Lines: 9355-9366
//
var NC1 = U((vh0)=>{
    Object.defineProperty(vh0, "__esModule", {
        value: !0
    });
    vh0.distinctUntilKeyChanged = void 0;
    var Ky9 = egA();
    function Vy9(A, Q) {
        return Ky9.distinctUntilChanged(function(B, G) {
            return Q ? Q(B[A], G[A]) : B[A] === G[A];
        });
    }
    vh0.distinctUntilKeyChanged = Vy9;
});
