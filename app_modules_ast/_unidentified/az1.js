// Module: az1
// Type: U
// Lines: 7979-7992
//
var az1 = U((xf0)=>{
    Object.defineProperty(xf0, "__esModule", {
        value: !0
    });
    xf0.interval = void 0;
    var nj9 = HU(), aj9 = Vp();
    function oj9(A, Q) {
        if (A === void 0) A = 0;
        if (Q === void 0) Q = nj9.asyncScheduler;
        if (A < 0) A = 0;
        return aj9.timer(A, A, Q);
    }
    xf0.interval = oj9;
});
