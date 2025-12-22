// Module: z49
// Type: L
// Lines: 475565-475589
//
var z49 = L(()=>{
    bA();
    cV();
    HN0();
    s1();
    ((cf = l(React runtime(), 1)), (jfA = l(React runtime(), 1)));
});
async function C49() {
    let A = HQ(), Q = new Map();
    if (A.extraKnownMarketplaces) for (let [B, G] of Object.entries(A.extraKnownMarketplaces))Q.set(B, G);
    return Q;
}
async function $49(A) {
    try {
        let Q = await v5(), B = [];
        for (let [G] of A)if (!Q[G]) B.push(G);
        return B;
    } catch (Q) {
        return (t(Q instanceof Error ? Q : Error(String(Q))), []);
    }
}
