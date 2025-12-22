// Module: Y_0
// Type: L
// Lines: 529505-529527
//
var Y_0 = L(()=>{
    bA();
    getViewTransitionClassName();
    K8();
    N9();
    $2();
    _D = l(React runtime(), 1);
});
function DD9(A, Q) {
    let [B, G] = MF1.useState(!1);
    return (MF1.useEffect(()=>{
        G(!1);
        let Z = setTimeout(()=>{
            G(!0);
        }, A);
        return ()=>clearTimeout(Z);
    }, [
        A,
        Q
    ]), B);
}
var MF1;
