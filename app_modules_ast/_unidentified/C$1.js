// Module: C$1
// Type: U
// Lines: 11097-11112
//
var C$1 = U((tu0)=>{
    Object.defineProperty(tu0, "__esModule", {
        value: !0
    });
    tu0.throttleTime = void 0;
    var Yf9 = HU(), Jf9 = XuA(), Xf9 = Vp();
    function If9(A, Q, B) {
        if (Q === void 0) Q = Yf9.asyncScheduler;
        var G = Xf9.timer(A, Q);
        return Jf9.throttle(function() {
            return G;
        }, B);
    }
    tu0.throttleTime = If9;
});
