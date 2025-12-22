// Module: gA9
// Type: L
// Lines: 468569-468593
//
var gA9 = L(()=>{
    trackUsedThenable();
    Ug();
});
function uA9({ isLoading: A, queuedCommandsLength: Q, lastQueryCompletionTime: B, getAppState: G, setAppState: Z, executeQueuedInput: Y }) {
    let J = vV1.useRef(!1);
    vV1.useEffect(()=>{
        if (A) return;
        if (Q === 0) return;
        if (J.current) return;
        ((J.current = !0), hA9({
            getAppState: G,
            setAppState: Z,
            executeInput: Y
        }).finally(()=>{
            J.current = !1;
        }));
    }, [
        A,
        Q,
        B,
        G,
        Z,
        Y
    ]);
}
var vV1;
