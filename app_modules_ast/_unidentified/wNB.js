// Module: wNB
// Type: L
// Lines: 225514-225545
//
var wNB = L(()=>{
    _qB();
    Js1();
    TqB();
    bqB();
    aqB();
    rqB();
    tqB();
    ANB();
    renderElement();
    BNB();
    YNB();
    XNB();
    CNB();
    UNB();
});
function Es1() {
    let A = yr1();
    return {
        async sendRequest (Q) {
            let { abortSignal: B, cleanup: G } = Q.abortSignal ? O01(Q.abortSignal) : {};
            try {
                return ((Q.abortSignal = B), await A.sendRequest(Q));
            } finally{
                G === null || G === void 0 || G();
            }
        }
    };
}
