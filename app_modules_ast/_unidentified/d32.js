// Module: d32
// Type: U
// Lines: 339965-339983
//
var d32 = U((u32)=>{
    Object.defineProperty(u32, "__esModule", {
        value: !0
    });
    u32.JsonTraceSerializer = void 0;
    var Zc3 = zY0();
    u32.JsonTraceSerializer = {
        serializeRequest: (A)=>{
            let Q = (0, Zc3.createExportTraceServiceRequest)(A, {
                useHex: !0,
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
