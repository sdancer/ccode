// Module: yK2
// Type: U
// Lines: 362154-362174
//
var yK2 = U((PK2)=>{
    Object.defineProperty(PK2, "__esModule", {
        value: !0
    });
    PK2.OTLPLogExporter = void 0;
    var jK2 = jG1(), vQ5 = Sk(), kQ5 = jk();
    class TK2 extends kQ5.OTLPExporterBase {
        constructor(A = {}){
            super((0, jK2.createOtlpGrpcExportDelegate)((0, jK2.convertLegacyOtlpGrpcOptions)(A, "LOGS"), vQ5.ProtobufLogsSerializer, "LogsExportService", "/opentelemetry.proto.collector.logs.v1.LogsService/Export"));
        }
    }
    PK2.OTLPLogExporter = TK2;
});
