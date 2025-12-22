// Module: M1Q
// Type: L
// Lines: 52987-53013
//
var M1Q = L(()=>{
    O1Q = R04;
});
function _04(A, Q) {
    let B = 0, G = 1000 / Q, Z, Y, J = (W, K = Date.now())=>{
        if (((B = K), (Z = null), Y)) (clearTimeout(Y), (Y = null));
        A.apply(null, W);
    };
    return [
        (...W)=>{
            let K = Date.now(), V = K - B;
            if (V >= G) J(W, K);
            else if (((Z = W), !Y)) Y = setTimeout(()=>{
                ((Y = null), J(Z));
            }, G - V);
        },
        ()=>Z && J(Z)
    ];
}
var R1Q;
