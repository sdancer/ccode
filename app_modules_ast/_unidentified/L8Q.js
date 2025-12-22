// Module: L8Q
// Type: U
// Lines: 67246-67253
//
var L8Q = U((MZ4)=>{
    var N8Q = (A)=>encodeURIComponent(A).replace(/[!'()*]/g, LZ4), LZ4 = (A)=>`%${A.charCodeAt(0).toString(16).toUpperCase()}`, OZ4 = (A)=>A.split("/").map(N8Q).join("/");
    MZ4.escapeUri = N8Q;
    MZ4.escapeUriPath = OZ4;
});
