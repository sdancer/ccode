// Module: usQ
// Type: U
// Lines: 130947-130975
//
var usQ = U((hsQ)=>{
    Object.defineProperty(hsQ, "__esModule", {
        value: !0
    });
    hsQ.getRPCMetadata = hsQ.deleteRPCMetadata = hsQ.setRPCMetadata = hsQ.RPCType = void 0;
    var gI8 = f9(), Hu1 = (0, gI8.createContextKey)("OpenTelemetry SDK Context Key RPC_METADATA"), uI8;
    (function(A) {
        A.HTTP = "http";
    })((uI8 = hsQ.RPCType || (hsQ.RPCType = {})));
    function mI8(A, Q) {
        return A.setValue(Hu1, Q);
    }
    hsQ.setRPCMetadata = mI8;
    function dI8(A) {
        return A.deleteValue(Hu1);
    }
    hsQ.deleteRPCMetadata = dI8;
    function cI8(A) {
        return A.getValue(Hu1);
    }
    hsQ.getRPCMetadata = cI8;
});
