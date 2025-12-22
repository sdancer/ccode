// Module: m62
// Type: U
// Lines: 326929-326946
//
var m62 = U((g62)=>{
    Object.defineProperty(g62, "__esModule", {
        value: !0
    });
    g62.createOtlpNetworkExportDelegate = void 0;
    var Om3 = hZ0(), Mm3 = gZ0();
    function Rm3(A, Q, B) {
        return (0, Mm3.createOtlpExportDelegate)({
            transport: B,
            serializer: Q,
            promiseHandler: (0, Om3.createBoundedQueueExportPromiseHandler)(A)
        }, {
            timeout: A.timeoutMillis
        });
    }
    g62.createOtlpNetworkExportDelegate = Rm3;
});
