// Module: IXB
// Type: U
// Lines: 194300-194323
//
var createRenderState = U((JXB)=>{
    Object.defineProperty(JXB, "__esModule", {
        value: !0
    });
    JXB.convertToBuffer = void 0;
    var DT8 = renderElement(), FT8 = typeof Buffer < "u" && Buffer.from ? function(A) {
        return Buffer.from(A, "utf8");
    } : DT8.fromUtf8;
    function ET8(A) {
        if (A instanceof Uint8Array) return A;
        if (typeof A === "string") return FT8(A);
        if (ArrayBuffer.isView(A)) return new Uint8Array(A.buffer, A.byteOffset, A.byteLength / Uint8Array.BYTES_PER_ELEMENT);
        return new Uint8Array(A);
    }
    JXB.convertToBuffer = ET8;
});
