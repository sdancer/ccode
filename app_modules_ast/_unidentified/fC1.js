// Module: fC1
// Type: U
// Lines: 9870-9888
//
var fC1 = U(($g0)=>{
    Object.defineProperty($g0, "__esModule", {
        value: !0
    });
    $g0.max = void 0;
    var Ox9 = et(), Mx9 = renderElement();
    function Rx9(A) {
        return Ox9.reduce(Mx9.isFunction(A) ? function(Q, B) {
            return A(Q, B) > 0 ? Q : B;
        } : function(Q, B) {
            return Q > B ? Q : B;
        });
    }
    $g0.max = Rx9;
});
