// Module: BRB
// Type: U
// Lines: 235416-235424
//
var BRB = U((EkG, QRB)=>{
    var nt8 = UQA(), at8 = (A, Q)=>{
        let B = nt8(A.trim().replace(/^[=v]+/, ""), Q);
        return B ? B.version : null;
    };
    QRB.exports = at8;
});
