// Module: P6Q
// Type: U
// Lines: 65812-65827
//
var renderElement = U((T6Q)=>{
    Object.defineProperty(T6Q, "__esModule", {
        value: !0
    });
    T6Q.createChecksumStream = c74;
    var u74 = renderElement(), m74 = renderElement(), d74 = renderElement();
    function c74(A) {
        if (typeof ReadableStream === "function" && (0, u74.isReadableStream)(A.source)) return (0, d74.createChecksumStream)(A);
        return new m74.ChecksumStream(A);
    }
});
