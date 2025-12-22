// Module: ee1
// Type: L
// Lines: 240092-240120
//
var ee1 = L(()=>{
    createRenderState();
    createRenderState();
    PJA();
    renderElement();
    Is1();
    rjB();
    JRA = g7("IdentityUtils");
});
function ATB(A) {
    return zs1([
        {
            name: "imdsRetryPolicy",
            retry: ({ retryCount: Q, response: B })=>{
                if ((B === null || B === void 0 ? void 0 : B.status) !== 404) return {
                    skipStrategy: !0
                };
                return cqB(Q, {
                    retryDelayInMs: A.startDelayInMs,
                    maxRetryDelayInMs: IB3
                });
            }
        }
    ], {
        maxRetries: A.maxRetries
    });
}
var IB3 = 64000;
