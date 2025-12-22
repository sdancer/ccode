// Module: qh
// Type: U
// Lines: 83801-83818
//
var createRenderState = U((pR4)=>{
    var o_1 = qA("node:fs"), cR4 = (A)=>{
        if (!A) return 0;
        if (typeof A === "string") return Buffer.byteLength(A);
        else if (typeof A.byteLength === "number") return A.byteLength;
        else if (typeof A.size === "number") return A.size;
        else if (typeof A.start === "number" && typeof A.end === "number") return A.end + 1 - A.start;
        else if (A instanceof o_1.ReadStream) {
            if (A.path != null) return o_1.lstatSync(A.path).size;
            else if (typeof A.fd === "number") return o_1.fstatSync(A.fd).size;
        }
        throw Error(`Body Length computation failed for ${A}`);
    };
    pR4.calculateBodyLength = cR4;
});
