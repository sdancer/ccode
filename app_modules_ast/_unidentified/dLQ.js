// Module: dLQ
// Type: U
// Lines: 104545-104552
//
var dLQ = U((RM6)=>{
    var mLQ = (A)=>encodeURIComponent(A).replace(/[!'()*]/g, OM6), OM6 = (A)=>`%${A.charCodeAt(0).toString(16).toUpperCase()}`, MM6 = (A)=>A.split("/").map(mLQ).join("/");
    RM6.escapeUri = mLQ;
    RM6.escapeUriPath = MM6;
});
