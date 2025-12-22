// Module: ad1
// Type: L
// Lines: 167234-167245
//
var ad1 = L(()=>{
    IsA();
});
function rx(A, Q) {
    let B = new Set(Q.map((Z)=>Z.endCode)), G = new Set(A.map((Z)=>Z.code));
    return [
        ...j1A(A.filter((Z)=>!B.has(Z.endCode))),
        ...Q.filter((Z)=>!G.has(Z.code))
    ];
}
