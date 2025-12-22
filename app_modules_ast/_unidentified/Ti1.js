// Module: Ti1
// Type: U
// Lines: 194286-194300
//
var renderElement = U((ZXB)=>{
    Object.defineProperty(ZXB, "__esModule", {
        value: !0
    });
    ZXB.toUtf8 = ZXB.fromUtf8 = void 0;
    var BXB = tJB(), GXB = read_string_buffer(), KT8 = (A)=>typeof TextEncoder === "function" ? (0, GXB.fromUtf8)(A) : (0, BXB.fromUtf8)(A);
    ZXB.fromUtf8 = KT8;
    var VT8 = (A)=>typeof TextDecoder === "function" ? (0, GXB.toUtf8)(A) : (0, BXB.toUtf8)(A);
    ZXB.toUtf8 = VT8;
});
