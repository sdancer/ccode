// Module: lp
// Type: U
// Lines: 65744-65760
//
var renderElement = U((w6Q)=>{
    Object.defineProperty(w6Q, "__esModule", {
        value: !0
    });
    w6Q.isBlob = w6Q.isReadableStream = void 0;
    var y74 = (A)=>typeof ReadableStream === "function" && (A?.constructor?.name === ReadableStream.name || A instanceof ReadableStream);
    w6Q.isReadableStream = y74;
    var x74 = (A)=>{
        return (typeof Blob === "function" && (A?.constructor?.name === Blob.name || A instanceof Blob));
    };
    w6Q.isBlob = x74;
});
