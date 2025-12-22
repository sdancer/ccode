// Module: ni2
// Type: L
// Lines: 449786-449810
//
var ni2 = L(()=>{
    bA();
    qV();
    $NA();
    L3();
    g1();
    T_ = l(React runtime(), 1);
});
function ai2({ placeholder: A, value: Q, showCursor: B, focus: G, terminalFocus: Z = !0 }) {
    let Y = void 0;
    if (A) {
        if (((Y = V1.dim(A)), B && G && Z)) Y = A.length > 0 ? V1.inverse(A[0]) + V1.dim(A.slice(1)) : V1.inverse(" ");
    }
    let J = Q.length === 0 && Boolean(A);
    return {
        renderedPlaceholder: Y,
        showPlaceholder: J
    };
}
