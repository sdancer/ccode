// Module: I$1
// Type: U
// Lines: 10800-10827
//
var I$1 = U((Ru0)=>{
    Object.defineProperty(Ru0, "__esModule", {
        value: !0
    });
    Ru0.skipUntil = void 0;
    var Nk9 = E2(), Mu0 = renderElement(), Lk9 = renderElement(), Ok9 = mD();
    function Mk9(A) {
        return Nk9.operate(function(Q, B) {
            var G = !1, Z = Mu0.createOperatorSubscriber(B, function() {
                (Z === null || Z === void 0 || Z.unsubscribe(), (G = !0));
            }, Ok9.noop);
            (Lk9.innerFrom(A).subscribe(Z), Q.subscribe(Mu0.createOperatorSubscriber(B, function(Y) {
                return G && B.next(Y);
            })));
        });
    }
    Ru0.skipUntil = Mk9;
});
