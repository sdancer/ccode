// Module: ZKB
// Type: U
// Lines: 196894-196917
//
var createRenderState = U((BKB)=>{
    Object.defineProperty(BKB, "__esModule", {
        value: !0
    });
    BKB.convertToBuffer = void 0;
    var ry8 = renderElement(), sy8 = typeof Buffer < "u" && Buffer.from ? function(A) {
        return Buffer.from(A, "utf8");
    } : ry8.fromUtf8;
    function ty8(A) {
        if (A instanceof Uint8Array) return A;
        if (typeof A === "string") return sy8(A);
        if (ArrayBuffer.isView(A)) return new Uint8Array(A.buffer, A.byteOffset, A.byteLength / Uint8Array.BYTES_PER_ELEMENT);
        return new Uint8Array(A);
    }
    BKB.convertToBuffer = ty8;
});
