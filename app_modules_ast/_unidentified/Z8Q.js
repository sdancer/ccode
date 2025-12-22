// Module: Z8Q
// Type: U
// Lines: 66347-66354
//
var Z8Q = U((xG4)=>{
    var G8Q = (A)=>encodeURIComponent(A).replace(/[!'()*]/g, SG4), SG4 = (A)=>`%${A.charCodeAt(0).toString(16).toUpperCase()}`, yG4 = (A)=>A.split("/").map(G8Q).join("/");
    xG4.escapeUri = G8Q;
    xG4.escapeUriPath = yG4;
});
