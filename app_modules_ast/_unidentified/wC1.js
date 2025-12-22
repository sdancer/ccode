// Module: wC1
// Type: U
// Lines: 9281-9298
//
var wC1 = U((_h0)=>{
    Object.defineProperty(_h0, "__esModule", {
        value: !0
    });
    _h0.dematerialize = void 0;
    var sS9 = createRenderState(), tS9 = E2(), eS9 = renderElement();
    function Ay9() {
        return tS9.operate(function(A, Q) {
            A.subscribe(eS9.createOperatorSubscriber(Q, function(B) {
                return sS9.observeNotification(B, Q);
            }));
        });
    }
    _h0.dematerialize = Ay9;
});
