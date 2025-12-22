// Module: e8A
// Type: U
// Lines: 6648-6664
//
var e8A = U((xv0)=>{
    Object.defineProperty(xv0, "__esModule", {
        value: !0
    });
    xv0.subscribeOn = void 0;
    var dM9 = E2();
    function cM9(A, Q) {
        if (Q === void 0) Q = 0;
        return dM9.operate(function(B, G) {
            G.add(A.schedule(function() {
                return B.subscribe(G);
            }, Q));
        });
    }
    xv0.subscribeOn = cM9;
});
