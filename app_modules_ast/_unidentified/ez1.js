// Module: ez1
// Type: U
// Lines: 8339-8353
//
var ez1 = U((wb0)=>{
    Object.defineProperty(wb0, "__esModule", {
        value: !0
    });
    wb0.auditTime = void 0;
    var cT9 = HU(), pT9 = igA(), lT9 = Vp();
    function iT9(A, Q) {
        if (Q === void 0) Q = cT9.asyncScheduler;
        return pT9.audit(function() {
            return lT9.timer(A, Q);
        });
    }
    wb0.auditTime = iT9;
});
