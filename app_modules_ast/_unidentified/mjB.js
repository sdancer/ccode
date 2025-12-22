// Module: mjB
// Type: L
// Lines: 239440-239499
//
var mjB = L(()=>{
/*! @azure/msal-node v3.8.1 2025-10-29 */ });
class _QA {
    constructor(){
        this.exponentialRetryStrategy = new oe1(_QA.MIN_EXPONENTIAL_BACKOFF_MS, _QA.MAX_EXPONENTIAL_BACKOFF_MS, _QA.EXPONENTIAL_DELTA_BACKOFF_MS);
    }
    static get MIN_EXPONENTIAL_BACKOFF_MS() {
        return sQ3;
    }
    static get MAX_EXPONENTIAL_BACKOFF_MS() {
        return tQ3;
    }
    static get EXPONENTIAL_DELTA_BACKOFF_MS() {
        return eQ3;
    }
    static get HTTP_STATUS_GONE_RETRY_AFTER_MS() {
        return AB3;
    }
    set isNewRequest(A) {
        this._isNewRequest = A;
    }
    async pauseForRetry(A, Q, B) {
        if (this._isNewRequest) ((this._isNewRequest = !1), (this.maxRetries = A === x6.GONE ? rQ3 : oQ3));
        if ((aQ3.includes(A) || (A >= x6.SERVER_ERROR_RANGE_START && A <= x6.SERVER_ERROR_RANGE_END && Q < this.maxRetries)) && Q < this.maxRetries) {
            let G = A === x6.GONE ? _QA.HTTP_STATUS_GONE_RETRY_AFTER_MS : this.exponentialRetryStrategy.calculateDelay(Q);
            return (B.verbose(`Retrying request in ${G}ms (retry attempt: ${Q + 1})`), await new Promise((Z)=>{
                return setTimeout(Z, G);
            }), !0);
        }
        return !1;
    }
}
var aQ3, oQ3 = 3, rQ3 = 7, sQ3 = 1000, tQ3 = 4000, eQ3 = 2000, AB3 = 1e4;
