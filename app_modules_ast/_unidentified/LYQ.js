// Module: LYQ
// Type: U
// Lines: 80255-80264
//
var LYQ = U((qYQ)=>{
    Object.defineProperty(qYQ, "__esModule", {
        value: !0
    });
    qYQ.isStreamingPayload = void 0;
    var zw4 = qA("stream"), Cw4 = (A)=>A?.body instanceof zw4.Readable || (typeof ReadableStream < "u" && A?.body instanceof ReadableStream);
    qYQ.isStreamingPayload = Cw4;
});
