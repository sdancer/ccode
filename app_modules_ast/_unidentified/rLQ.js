// Module: rLQ
// Type: U
// Lines: 104749-104756
//
var rLQ = U((tM6)=>{
    var oLQ = (A)=>encodeURIComponent(A).replace(/[!'()*]/g, rM6), rM6 = (A)=>`%${A.charCodeAt(0).toString(16).toUpperCase()}`, sM6 = (A)=>A.split("/").map(oLQ).join("/");
    tM6.escapeUri = oLQ;
    tM6.escapeUriPath = sM6;
});
