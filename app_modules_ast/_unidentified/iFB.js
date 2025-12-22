// Module: iFB
// Type: U
// Lines: 213960-213977
//
var renderElement = U((bUG, lFB)=>{
    var $v = (A)=>A !== null && typeof A === "object" && typeof A.pipe === "function";
    $v.writable = (A)=>$v(A) && A.writable !== !1 && typeof A._write === "function" && typeof A._writableState === "object";
    $v.readable = (A)=>$v(A) && A.readable !== !1 && typeof A._read === "function" && typeof A._readableState === "object";
    $v.duplex = (A)=>$v.writable(A) && $v.readable(A);
    $v.transform = (A)=>$v.duplex(A) && typeof A._transform === "function";
    lFB.exports = $v;
});
