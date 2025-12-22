// Module: igA
// Type: U
// Lines: 8298-8339
//
var igA = U(($b0)=>{
    Object.defineProperty($b0, "__esModule", {
        value: !0
    });
    $b0.audit = void 0;
    var uT9 = E2(), mT9 = renderElement(), Cb0 = renderElement();
    function dT9(A) {
        return uT9.operate(function(Q, B) {
            var G = !1, Z = null, Y = null, J = !1, X = function() {
                if ((Y === null || Y === void 0 || Y.unsubscribe(), (Y = null), G)) {
                    G = !1;
                    var W = Z;
                    ((Z = null), B.next(W));
                }
                J && B.complete();
            }, I = function() {
                ((Y = null), J && B.complete());
            };
            Q.subscribe(Cb0.createOperatorSubscriber(B, function(W) {
                if (((G = !0), (Z = W), !Y)) mT9.innerFrom(A(W)).subscribe((Y = Cb0.createOperatorSubscriber(B, X, I)));
            }, function() {
                ((J = !0), (!G || !Y || Y.closed) && B.complete());
            }));
        });
    }
    $b0.audit = dT9;
});
