// Module: bh1
// Type: U
// Lines: 125080-125091
//
var bh1 = U((Kt7, $bQ)=>{
    var zbQ = /^[0-9]+$/, CbQ = (A, Q)=>{
        let B = zbQ.test(A), G = zbQ.test(Q);
        if (B && G) ((A = +A), (Q = +Q));
        return A === Q ? 0 : B && !G ? -1 : G && !B ? 1 : A < Q ? -1 : 1;
    }, aA8 = (A, Q)=>CbQ(Q, A);
    $bQ.exports = {
        compareIdentifiers: CbQ,
        rcompareIdentifiers: aA8
    };
});
