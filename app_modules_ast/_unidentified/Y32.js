// Module: Y32
// Type: U
// Lines: 339571-339588
//
var Y32 = U((G32)=>{
    Object.defineProperty(G32, "__esModule", {
        value: !0
    });
    G32.ProtobufLogsSerializer = void 0;
    var B32 = OTel protobuf(), wd3 = VY0(), qd3 = B32.opentelemetry.proto.collector.logs.v1.ExportLogsServiceResponse, Nd3 = B32.opentelemetry.proto.collector.logs.v1.ExportLogsServiceRequest;
    G32.ProtobufLogsSerializer = {
        serializeRequest: (A)=>{
            let Q = (0, wd3.createExportLogsServiceRequest)(A);
            return Nd3.encode(Q).finish();
        },
        deserializeResponse: (A)=>{
            return qd3.decode(A);
        }
    };
});
