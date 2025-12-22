// Module: gC1
// Type: U
// Lines: 9916-9945
//
var gC1 = U((Mg0)=>{
    Object.defineProperty(Mg0, "__esModule", {
        value: !0
    });
    Mg0.mergeScan = void 0;
    var Px9 = E2(), Sx9 = pgA();
    function yx9(A, Q, B) {
        if (B === void 0) B = 1 / 0;
        return Px9.operate(function(G, Z) {
            var Y = Q;
            return Sx9.mergeInternals(G, Z, function(J, X) {
                return A(Y, J, X);
            }, B, function(J) {
                Y = J;
            }, !1, void 0, function() {
                return (Y = null);
            });
        });
    }
    Mg0.mergeScan = yx9;
});
