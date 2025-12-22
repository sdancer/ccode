// Module: U52
// Type: U
// Lines: 340309-340330
//
var U52 = U((C52)=>{
    Object.defineProperty(C52, "__esModule", {
        value: !0
    });
    C52.createOtlpHttpExportDelegate = void 0;
    var mc3 = gZ0(), dc3 = V52(), cc3 = hZ0(), pc3 = z52();
    function lc3(A, Q) {
        return (0, mc3.createOtlpExportDelegate)({
            transport: (0, pc3.createRetryingTransport)({
                transport: (0, dc3.createHttpExporterTransport)(A)
            }),
            serializer: Q,
            promiseHandler: (0, cc3.createBoundedQueueExportPromiseHandler)(A)
        }, {
            timeout: A.timeoutMillis
        });
    }
    C52.createOtlpHttpExportDelegate = lc3;
});
