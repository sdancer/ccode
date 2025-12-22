// Module: SgA
// Type: U
// Lines: 3737-3761
//
var SgA = U((Ty0)=>{
    Object.defineProperty(Ty0, "__esModule", {
        value: !0
    });
    Ty0.captureError = Ty0.errorContext = void 0;
    var jy0 = x8A(), rt = null;
    function QL9(A) {
        if (jy0.config.useDeprecatedSynchronousErrorHandling) {
            var Q = !rt;
            if (Q) rt = {
                errorThrown: !1,
                error: null
            };
            if ((A(), Q)) {
                var B = rt, G = B.errorThrown, Z = B.error;
                if (((rt = null), G)) throw Z;
            }
        } else A();
    }
    Ty0.errorContext = QL9;
    function BL9(A) {
        if (jy0.config.useDeprecatedSynchronousErrorHandling && rt) ((rt.errorThrown = !0), (rt.error = A));
    }
    Ty0.captureError = BL9;
});
