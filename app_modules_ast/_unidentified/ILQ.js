// Module: ILQ
// Type: U
// Lines: 103679-103702
//
var createRenderState = U((JLQ)=>{
    Object.defineProperty(JLQ, "__esModule", {
        value: !0
    });
    JLQ.convertToBuffer = void 0;
    var JO6 = YLQ(), XO6 = typeof Buffer < "u" && Buffer.from ? function(A) {
        return Buffer.from(A, "utf8");
    } : JO6.fromUtf8;
    function IO6(A) {
        if (A instanceof Uint8Array) return A;
        if (typeof A === "string") return XO6(A);
        if (ArrayBuffer.isView(A)) return new Uint8Array(A.buffer, A.byteOffset, A.byteLength / Uint8Array.BYTES_PER_ELEMENT);
        return new Uint8Array(A);
    }
    JLQ.convertToBuffer = IO6;
});
