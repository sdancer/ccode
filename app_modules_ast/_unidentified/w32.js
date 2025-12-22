// Module: w32
// Type: U
// Lines: 339749-339768
//
var w32 = U(($32)=>{
    Object.defineProperty($32, "__esModule", {
        value: !0
    });
    $32.ProtobufMetricsSerializer = void 0;
    var C32 = OTel protobuf(), kd3 = FY0(), fd3 = C32.opentelemetry.proto.collector.metrics.v1.ExportMetricsServiceResponse, bd3 = C32.opentelemetry.proto.collector.metrics.v1.ExportMetricsServiceRequest;
    $32.ProtobufMetricsSerializer = {
        serializeRequest: (A)=>{
            let Q = (0, kd3.createExportMetricsServiceRequest)([
                A
            ]);
            return bd3.encode(Q).finish();
        },
        deserializeResponse: (A)=>{
            return fd3.decode(A);
        }
    };
});
