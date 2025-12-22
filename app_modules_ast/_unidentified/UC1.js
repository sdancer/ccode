// Module: UC1
// Type: U
// Lines: 9266-9281
//
var UC1 = U((Mh0)=>{
    Object.defineProperty(Mh0, "__esModule", {
        value: !0
    });
    Mh0.delay = void 0;
    var nS9 = HU(), aS9 = tgA(), oS9 = Vp();
    function rS9(A, Q) {
        if (Q === void 0) Q = nS9.asyncScheduler;
        var B = oS9.timer(A, Q);
        return aS9.delayWhen(function() {
            return B;
        });
    }
    Mh0.delay = rS9;
});
