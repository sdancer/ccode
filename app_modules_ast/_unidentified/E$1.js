// Module: E$1
// Type: U
// Lines: 10979-10998
//
var E$1 = U((lu0)=>{
    Object.defineProperty(lu0, "__esModule", {
        value: !0
    });
    lu0.takeWhile = void 0;
    var ak9 = E2(), ok9 = renderElement();
    function rk9(A, Q) {
        if (Q === void 0) Q = !1;
        return ak9.operate(function(B, G) {
            var Z = 0;
            B.subscribe(ok9.createOperatorSubscriber(G, function(Y) {
                var J = A(Y, Z++);
                ((J || Q) && G.next(Y), !J && G.complete());
            }));
        });
    }
    lu0.takeWhile = rk9;
});
