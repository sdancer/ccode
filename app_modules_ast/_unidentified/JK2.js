// Module: JK2
// Type: U
// Lines: 361708-361729
//
var JK2 = U((ZK2)=>{
    Object.defineProperty(ZK2, "__esModule", {
        value: !0
    });
    ZK2.OTLPMetricExporter = void 0;
    var IQ5 = OTLPMetricExporter(), BK2 = jG1(), WQ5 = Sk();
    class GK2 extends IQ5.OTLPMetricExporterBase {
        constructor(A){
            super((0, BK2.createOtlpGrpcExportDelegate)((0, BK2.convertLegacyOtlpGrpcOptions)(A ?? {}, "METRICS"), WQ5.ProtobufMetricsSerializer, "MetricsExportService", "/opentelemetry.proto.collector.metrics.v1.MetricsService/Export"), A);
        }
    }
    ZK2.OTLPMetricExporter = GK2;
});
