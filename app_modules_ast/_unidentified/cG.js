// Module: cG
// Type: U
// Lines: 65602-65640
//
var createRenderState = U((L74)=>{
    var K6Q = W6Q(), V6Q = (A)=>{
        let Q = K6Q.fromString(A, "utf8");
        return new Uint8Array(Q.buffer, Q.byteOffset, Q.byteLength / Uint8Array.BYTES_PER_ELEMENT);
    }, q74 = (A)=>{
        if (typeof A === "string") return V6Q(A);
        if (ArrayBuffer.isView(A)) return new Uint8Array(A.buffer, A.byteOffset, A.byteLength / Uint8Array.BYTES_PER_ELEMENT);
        return new Uint8Array(A);
    }, N74 = (A)=>{
        if (typeof A === "string") return A;
        if (typeof A !== "object" || typeof A.byteOffset !== "number" || typeof A.byteLength !== "number") throw Error("@smithy/util-utf8: toUtf8 encoder function only accepts string | Uint8Array.");
        return K6Q.fromArrayBuffer(A.buffer, A.byteOffset, A.byteLength).toString("utf8");
    };
    L74.fromUtf8 = V6Q;
    L74.toUint8Array = q74;
    L74.toUtf8 = N74;
});
