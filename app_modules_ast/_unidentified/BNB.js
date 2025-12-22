// Module: BNB
// Type: L
// Lines: 225180-225195
//
var BNB = L(()=>{
    dT();
});
function GNB(A = "x-ms-client-request-id") {
    return {
        name: "setClientRequestIdPolicy",
        async sendRequest (Q, B) {
            if (!Q.headers.has(A)) Q.headers.set(A, Q.requestId);
            return B(Q);
        }
    };
}
function ZNB(A) {
    return Qs1(A);
}
