// Module: dr1
// Type: L
// Lines: 224301-224317
//
var dr1 = L(()=>{
    gr1();
    X01();
    rpcCall();
    on8 = Q01("ts-http-runtime retryPolicy");
});
function pr1(A = {}) {
    var Q;
    return {
        name: cr1,
        sendRequest: zOA([
            twB(),
            ewB(A)
        ], {
            maxRetries: (Q = A.maxRetries) !== null && Q !== void 0 ? Q : FOA
        }).sendRequest
    };
}
var cr1 = "defaultRetryPolicy";
