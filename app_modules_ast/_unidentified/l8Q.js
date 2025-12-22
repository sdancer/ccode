// Module: l8Q
// Type: U
// Lines: 67583-67597
//
var l8Q = U((p8Q)=>{
    Object.defineProperty(p8Q, "__esModule", {
        value: !0
    });
    p8Q.splitStream = YY4;
    var d8Q = qA("stream"), ZY4 = renderElement(), c8Q = renderElement();
    async function YY4(A) {
        if ((0, c8Q.isReadableStream)(A) || (0, c8Q.isBlob)(A)) return (0, ZY4.splitStream)(A);
        let Q = new d8Q.PassThrough(), B = new d8Q.PassThrough();
        return (A.pipe(Q), A.pipe(B), [
            Q,
            B
        ]);
    }
});
