// Module: hZA
// Type: L
// Lines: 167363-167396
//
var hZA = L(()=>{
    pqA();
    od1();
    IsA();
    ad1();
    Q4B();
    G4B();
});
function gC8(A) {
    return A.code === A.endCode;
}
function Z4B(A) {
    return A.filter((Q)=>!gC8(Q));
}
function lqA(A, Q, B) {
    let G = bZA(A, B), Z = [], Y = 0, J = "", X = !1;
    for (let W of G){
        if (B !== void 0 && Y >= B) break;
        if (W.type === "ansi") {
            if ((Z.push(W), X)) J += W.code;
        } else {
            if (!X && Y >= Q) ((X = !0), (Z = Z4B(zi(Z))), (J = SN(Z)));
            if (X) J += W.value;
            Y += W.fullWidth ? 2 : W.value.length;
        }
    }
    let I = Z4B(zi(Z));
    return ((J += SN(j1A(I))), J);
}
