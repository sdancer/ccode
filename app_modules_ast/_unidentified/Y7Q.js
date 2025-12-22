// Module: Y7Q
// Type: U
// Lines: 72325-72332
//
var Y7Q = U((EV4)=>{
    var Z7Q = (A)=>encodeURIComponent(A).replace(/[!'()*]/g, DV4), DV4 = (A)=>`%${A.charCodeAt(0).toString(16).toUpperCase()}`, FV4 = (A)=>A.split("/").map(Z7Q).join("/");
    EV4.escapeUri = Z7Q;
    EV4.escapeUriPath = FV4;
});
