// Module: zC1
// Type: U
// Lines: 9070-9081
//
var zC1 = U((Jh0)=>{
    Object.defineProperty(Jh0, "__esModule", {
        value: !0
    });
    Jh0.count = void 0;
    var US9 = et();
    function wS9(A) {
        return US9.reduce(function(Q, B, G) {
            return !A || A(B, G) ? Q + 1 : Q;
        }, 0);
    }
    Jh0.count = wS9;
});
