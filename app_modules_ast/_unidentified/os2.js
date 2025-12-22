// Module: os2
// Type: L
// Lines: 461999-462024
//
var os2 = L(()=>{
    bA();
    N9();
    eU0();
    Ir();
    MDA();
    trackUsedThenable();
    KB();
    U4();
    b6();
    ((s8 = l(React runtime(), 1)), (ckA = l(React runtime(), 1)));
});
function dw0(A, Q, B = 1000) {
    let G = ()=>jH(Date.now() - A), Z = QV1.useCallback((Y)=>{
        if (!Q) return ()=>{};
        let J = setInterval(Y, B);
        return ()=>clearInterval(J);
    }, [
        Q,
        B
    ]);
    return QV1.useSyncExternalStore(Z, G, G);
}
var QV1;
