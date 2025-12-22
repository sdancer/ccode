// Module: yjB
// Type: L
// Lines: 239125-239155
//
var yjB = L(()=>{
/*! @azure/msal-node v3.8.1 2025-10-29 */ });
class WB1 {
    constructor(){
        this.linearRetryStrategy = new ae1();
    }
    static get DEFAULT_MANAGED_IDENTITY_RETRY_DELAY_MS() {
        return gQ3;
    }
    async pauseForRetry(A, Q, B, G) {
        if (uQ3.includes(A) && Q < hQ3) {
            let Z = this.linearRetryStrategy.calculateDelay(G, WB1.DEFAULT_MANAGED_IDENTITY_RETRY_DELAY_MS);
            return (B.verbose(`Retrying request in ${Z}ms (retry attempt: ${Q + 1})`), await new Promise((Y)=>{
                return setTimeout(Y, Z);
            }), !0);
        }
        return !1;
    }
}
var hQ3 = 3, gQ3 = 1000, uQ3;
