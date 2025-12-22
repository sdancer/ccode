// Module: mq1
// Type: U
// Lines: 56449-56466
//
var mq1 = U((hQQ)=>{
    Object.defineProperty(hQQ, "__esModule", {
        value: !0
    });
    hQQ.SDKFlags = void 0;
    var bQQ = {};
    hQQ.SDKFlags = {
        setFlags: (A, Q)=>{
            bQQ[A] = Q;
        },
        get: (A, Q)=>{
            var B, G;
            return (G = (B = bQQ[A]) === null || B === void 0 ? void 0 : B[Q]) !== null && G !== void 0 ? G : !1;
        }
    };
});
