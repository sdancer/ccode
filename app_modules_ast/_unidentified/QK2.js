// Module: QK2
// Type: U
// Lines: 361669-361690
//
var QK2 = U((eW2)=>{
    Object.defineProperty(eW2, "__esModule", {
        value: !0
    });
    eW2.createOtlpGrpcExportDelegate = void 0;
    var BQ5 = jk(), GQ5 = gSA();
    function ZQ5(A, Q, B, G) {
        return (0, BQ5.createOtlpNetworkExportDelegate)(A, Q, (0, GQ5.createOtlpGrpcExporterTransport)({
            address: A.url,
            compression: A.compression,
            credentials: A.credentials,
            metadata: A.metadata,
            grpcName: B,
            grpcPath: G
        }));
    }
    eW2.createOtlpGrpcExportDelegate = ZQ5;
});
