// Module: h32
// Type: U
// Lines: 339937-339954
//
var h32 = U((f32)=>{
    Object.defineProperty(f32, "__esModule", {
        value: !0
    });
    f32.JsonMetricsSerializer = void 0;
    var Qc3 = FY0();
    f32.JsonMetricsSerializer = {
        serializeRequest: (A)=>{
            let Q = (0, Qc3.createExportMetricsServiceRequest)([
                A
            ], {
                useLongBits: !1
            });
            return new TextEncoder().encode(JSON.stringify(Q));
        },
        deserializeResponse: (A)=>{
            if (A.length === 0) return {};
            return JSON.parse(new TextDecoder().decode(A));
        }
    };
});
