// Module: cHQ
// Type: U
// Lines: 90249-90276
//
var cHQ = U((mHQ)=>{
    Object.defineProperty(mHQ, "__esModule", {
        value: !0
    });
    mHQ.resolveRuntimeExtensions = void 0;
    var bHQ = Pj(), hHQ = BpA(), gHQ = VC(), uHQ = fHQ(), Qb4 = (A, Q)=>{
        let B = Object.assign((0, bHQ.getAwsRegionExtensionConfiguration)(A), (0, gHQ.getDefaultExtensionConfiguration)(A), (0, hHQ.getHttpHandlerExtensionConfiguration)(A), (0, uHQ.getHttpAuthExtensionConfiguration)(A));
        return (Q.forEach((G)=>G.configure(B)), Object.assign(A, (0, bHQ.resolveAwsRegionExtensionConfiguration)(B), (0, gHQ.resolveDefaultRuntimeConfig)(B), (0, hHQ.resolveHttpHandlerRuntimeConfig)(B), (0, uHQ.resolveHttpAuthRuntimeConfig)(B)));
    };
    mHQ.resolveRuntimeExtensions = Qb4;
});
