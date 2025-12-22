// Module: mJQ
// Type: U
// Lines: 82548-82564
//
var mJQ = U((gJQ)=>{
    Object.defineProperty(gJQ, "__esModule", {
        value: !0
    });
    gJQ.retryWrapper = void 0;
    var jO4 = (A, Q, B)=>{
        return async ()=>{
            for(let G = 0; G < Q; ++G)try {
                return await A();
            } catch (Z) {
                await new Promise((Y)=>setTimeout(Y, B));
            }
            return await A();
        };
    };
    gJQ.retryWrapper = jO4;
});
