// Module: xS0
// Type: L
// Lines: 3012-3046
//
var xS0 = L(()=>{
    cE1();
    performWork();
    iE1();
    nE1();
    aE1();
    EEA();
    XC();
    renderElement();
    createChildReconciler();
    VhA();
    yO();
    renderElement();
    arrayLikeKeys();
    oE1();
    SS0();
    yS0 = zN9;
});
function vS0(A, Q, B, G, Z) {
    if (A === Q) return;
    $gA(Q, function(Y, J) {
        if ((Z || (Z = new Ey()), LX(Y))) yS0(A, Q, J, B, vS0, G, Z);
        else {
            var X = G ? G(SEA(A, J), Y, J + "", A, Q, Z) : void 0;
            if (X === void 0) X = Y;
            TEA(A, J, X);
        }
    }, Oy);
}
var kS0;
