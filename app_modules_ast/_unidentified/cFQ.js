// Module: cFQ
// Type: U
// Lines: 92214-92241
//
var cFQ = U((mFQ)=>{
    Object.defineProperty(mFQ, "__esModule", {
        value: !0
    });
    mFQ.resolveRuntimeExtensions = void 0;
    var bFQ = Pj(), hFQ = xFQ(), gFQ = he(), uFQ = fFQ(), vu4 = (A, Q)=>{
        let B = Object.assign((0, bFQ.getAwsRegionExtensionConfiguration)(A), (0, gFQ.getDefaultExtensionConfiguration)(A), (0, hFQ.getHttpHandlerExtensionConfiguration)(A), (0, uFQ.getHttpAuthExtensionConfiguration)(A));
        return (Q.forEach((G)=>G.configure(B)), Object.assign(A, (0, bFQ.resolveAwsRegionExtensionConfiguration)(B), (0, gFQ.resolveDefaultRuntimeConfig)(B), (0, hFQ.resolveHttpHandlerRuntimeConfig)(B), (0, uFQ.resolveHttpAuthRuntimeConfig)(B)));
    };
    mFQ.resolveRuntimeExtensions = vu4;
});
