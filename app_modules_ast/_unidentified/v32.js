// Module: v32
// Type: U
// Lines: 339908-339926
//
var v32 = U((y32)=>{
    Object.defineProperty(y32, "__esModule", {
        value: !0
    });
    y32.JsonLogsSerializer = void 0;
    var td3 = VY0();
    y32.JsonLogsSerializer = {
        serializeRequest: (A)=>{
            let Q = (0, td3.createExportLogsServiceRequest)(A, {
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
