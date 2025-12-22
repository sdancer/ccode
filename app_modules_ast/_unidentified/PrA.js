// Module: PrA
// Type: L
// Lines: 149902-149917
//
var PrA = L(()=>{
    Vi();
});
function LqA(A, Q) {
    if (Q <= 0) return A.split(`
`).length;
    let B = 0;
    for (let G of A.split(`
`)){
        let Z = LG(G);
        B += Z === 0 ? 1 : Math.ceil(Z / Q);
    }
    return B;
}
