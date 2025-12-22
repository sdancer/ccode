// Module: J3A
// Type: U
// Lines: 9171-9195
//
var J3A = U((Dh0)=>{
    Object.defineProperty(Dh0, "__esModule", {
        value: !0
    });
    Dh0.defaultIfEmpty = void 0;
    var TS9 = E2(), PS9 = renderElement();
    function SS9(A) {
        return TS9.operate(function(Q, B) {
            var G = !1;
            Q.subscribe(PS9.createOperatorSubscriber(B, function(Z) {
                ((G = !0), B.next(Z));
            }, function() {
                if (!G) B.next(A);
                B.complete();
            }));
        });
    }
    Dh0.defaultIfEmpty = SS9;
});
