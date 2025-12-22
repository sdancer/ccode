// Module: yC1
// Type: U
// Lines: 9728-9750
//
var yC1 = U((Hg0)=>{
    Object.defineProperty(Hg0, "__esModule", {
        value: !0
    });
    Hg0.isEmpty = void 0;
    var Jx9 = E2(), Xx9 = renderElement();
    function Ix9() {
        return Jx9.operate(function(A, Q) {
            A.subscribe(Xx9.createOperatorSubscriber(Q, function() {
                (Q.next(!1), Q.complete());
            }, function() {
                (Q.next(!0), Q.complete());
            }));
        });
    }
    Hg0.isEmpty = Ix9;
});
