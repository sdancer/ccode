// Module: v62
// Type: U
// Lines: 326800-326826
//
var v62 = U((y62)=>{
    Object.defineProperty(y62, "__esModule", {
        value: !0
    });
    y62.createLoggingPartialSuccessResponseHandler = void 0;
    var $m3 = f9();
    function Um3(A) {
        return Object.prototype.hasOwnProperty.call(A, "partialSuccess");
    }
    function wm3() {
        return {
            handleResponse (A) {
                if (A == null || !Um3(A) || A.partialSuccess == null || Object.keys(A.partialSuccess).length === 0) return;
                $m3.diag.warn("Received Partial Success response:", JSON.stringify(A.partialSuccess));
            }
        };
    }
    y62.createLoggingPartialSuccessResponseHandler = wm3;
});
