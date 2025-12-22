// Module: xH2
// Type: U
// Lines: 363498-363518
//
var xH2 = U((SH2)=>{
    Object.defineProperty(SH2, "__esModule", {
        value: !0
    });
    SH2.OTLPTraceExporter = void 0;
    var TH2 = jG1(), mB5 = Sk(), dB5 = jk();
    class PH2 extends dB5.OTLPExporterBase {
        constructor(A = {}){
            super((0, TH2.createOtlpGrpcExportDelegate)((0, TH2.convertLegacyOtlpGrpcOptions)(A, "TRACES"), mB5.ProtobufTraceSerializer, "TraceExportService", "/opentelemetry.proto.collector.trace.v1.TraceService/Export"));
        }
    }
    SH2.OTLPTraceExporter = PH2;
});
