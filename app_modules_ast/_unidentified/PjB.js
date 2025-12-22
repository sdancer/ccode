// Module: PjB
// Type: L
// Lines: 238935-238968
//
var PjB = L(()=>{
/*! @azure/msal-node v3.8.1 2025-10-29 */ });
class ne1 {
    constructor(A, Q, B){
        ((this.httpClientNoRetries = A), (this.retryPolicy = Q), (this.logger = B));
    }
    async sendNetworkRequestAsyncHelper(A, Q, B) {
        if (A === HJ.GET) return this.httpClientNoRetries.sendGetRequestAsync(Q, B);
        else return this.httpClientNoRetries.sendPostRequestAsync(Q, B);
    }
    async sendNetworkRequestAsync(A, Q, B) {
        let G = await this.sendNetworkRequestAsyncHelper(A, Q, B);
        if ("isNewRequest" in this.retryPolicy) this.retryPolicy.isNewRequest = !0;
        let Z = 0;
        while(await this.retryPolicy.pauseForRetry(G.status, Z, this.logger, G.headers[fY.RETRY_AFTER]))((G = await this.sendNetworkRequestAsyncHelper(A, Q, B)), Z++);
        return G;
    }
    async sendGetRequestAsync(A, Q) {
        return this.sendNetworkRequestAsync(HJ.GET, A, Q);
    }
    async sendPostRequestAsync(A, Q) {
        return this.sendNetworkRequestAsync(HJ.POST, A, Q);
    }
}
