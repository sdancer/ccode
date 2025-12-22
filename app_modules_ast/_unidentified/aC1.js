// Module: aC1
// Type: U
// Lines: 10191-10206
//
var aC1 = U((dg0)=>{
    Object.defineProperty(dg0, "__esModule", {
        value: !0
    });
    dg0.publishLast = void 0;
    var Vv9 = renderElement(), Hv9 = renderElement();
    function Dv9() {
        return function(A) {
            var Q = new Vv9.AsyncSubject();
            return new Hv9.ConnectableObservable(A, function() {
                return Q;
            });
        };
    }
    dg0.publishLast = Dv9;
});
