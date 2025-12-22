// Module: W$1
// Type: U
// Lines: 10827-10845
//
var W$1 = U((ju0)=>{
    Object.defineProperty(ju0, "__esModule", {
        value: !0
    });
    ju0.skipWhile = void 0;
    var Rk9 = E2(), _k9 = renderElement();
    function jk9(A) {
        return Rk9.operate(function(Q, B) {
            var G = !1, Z = 0;
            Q.subscribe(_k9.createOperatorSubscriber(B, function(Y) {
                return (G || (G = !A(Y, Z++))) && B.next(Y);
            }));
        });
    }
    ju0.skipWhile = jk9;
});
