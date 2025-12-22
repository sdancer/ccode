// Module: B3B
// Type: U
// Lines: 173809-173820
//
var B3B = U((EXG, Q3B)=>{
    var e8B = /^[0-9]+$/, A3B = (A, Q)=>{
        let B = e8B.test(A), G = e8B.test(Q);
        if (B && G) ((A = +A), (Q = +Q));
        return A === Q ? 0 : B && !G ? -1 : G && !B ? 1 : A < Q ? -1 : 1;
    }, Fw8 = (A, Q)=>A3B(Q, A);
    Q3B.exports = {
        compareIdentifiers: A3B,
        rcompareIdentifiers: Fw8
    };
});
