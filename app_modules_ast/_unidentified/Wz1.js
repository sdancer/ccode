// Module: Wz1
// Type: U
// Lines: 3694-3708
//
var Wz1 = U((qy0)=>{
    Object.defineProperty(qy0, "__esModule", {
        value: !0
    });
    qy0.reportUnhandledError = void 0;
    var iN9 = x8A(), nN9 = describeNativeComponentFrame();
    function aN9(A) {
        nN9.timeoutProvider.setTimeout(function() {
            var Q = iN9.config.onUnhandledError;
            if (Q) Q(A);
            else throw A;
        });
    }
    qy0.reportUnhandledError = aN9;
});
