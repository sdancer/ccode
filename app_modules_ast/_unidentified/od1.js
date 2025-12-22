// Module: od1
// Type: L
// Lines: 167245-167266
//
var od1 = L(()=>{
    ad1();
});
function e9B(A) {
    let Q = [], B = [];
    for (let G of A)if (G.type === "ansi") Q = XsA(Q, [
        G
    ]);
    else if (G.type === "char") B.push({
        ...G,
        styles: [
            ...Q
        ]
    });
    return B;
}
function A4B(A) {
    let Q = "";
    for(let B = 0; B < A.length; B++){
        let G = A[B];
        if (B === 0) Q += SN(G.styles);
        else Q += SN(rx(A[B - 1].styles, G.styles));
        if (((Q += G.value), B === A.length - 1)) Q += SN(rx(G.styles, []));
    }
    return Q;
}
