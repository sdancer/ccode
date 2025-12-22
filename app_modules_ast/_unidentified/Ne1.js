// Module: Ne1
// Type: U
// Lines: 235181-235192
//
var Ne1 = U((VkG, iMB)=>{
    var pMB = /^[0-9]+$/, lMB = (A, Q)=>{
        let B = pMB.test(A), G = pMB.test(Q);
        if (B && G) ((A = +A), (Q = +Q));
        return A === Q ? 0 : B && !G ? -1 : G && !B ? 1 : A < Q ? -1 : 1;
    }, dt8 = (A, Q)=>lMB(Q, A);
    iMB.exports = {
        compareIdentifiers: lMB,
        rcompareIdentifiers: dt8
    };
});
