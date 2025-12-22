// Module: P32
// Type: U
// Lines: 339880-339897
//
var P32 = U((j32)=>{
    Object.defineProperty(j32, "__esModule", {
        value: !0
    });
    j32.ProtobufTraceSerializer = void 0;
    var _32 = OTel protobuf(), nd3 = zY0(), ad3 = _32.opentelemetry.proto.collector.trace.v1.ExportTraceServiceResponse, od3 = _32.opentelemetry.proto.collector.trace.v1.ExportTraceServiceRequest;
    j32.ProtobufTraceSerializer = {
        serializeRequest: (A)=>{
            let Q = (0, nd3.createExportTraceServiceRequest)(A);
            return od3.encode(Q).finish();
        },
        deserializeResponse: (A)=>{
            return ad3.decode(A);
        }
    };
});
