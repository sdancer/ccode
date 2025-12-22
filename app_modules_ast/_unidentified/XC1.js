// Module: XC1
// Type: U
// Lines: 8718-8744
//
var XC1 = U((yb0)=>{
    Object.defineProperty(yb0, "__esModule", {
        value: !0
    });
    yb0.catchError = void 0;
    var $P9 = renderElement(), UP9 = renderElement(), wP9 = E2();
    function Sb0(A) {
        return wP9.operate(function(Q, B) {
            var G = null, Z = !1, Y;
            if (((G = Q.subscribe(UP9.createOperatorSubscriber(B, void 0, void 0, function(J) {
                if (((Y = $P9.innerFrom(A(J, Sb0(A)(Q)))), G)) (G.unsubscribe(), (G = null), Y.subscribe(B));
                else Z = !0;
            }))), Z)) (G.unsubscribe(), (G = null), Y.subscribe(B));
        });
    }
    yb0.catchError = Sb0;
});
