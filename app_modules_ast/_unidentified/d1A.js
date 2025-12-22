// Module: d1A
// Type: L
// Lines: 181786-181815
//
var d1A = L(()=>{
    createRenderState();
    s1();
    restoreViewTransitionName();
    zB();
    pushStartInstance();
    pushStartInstance();
    ((mtA = new Map()), (DYA = new Set()));
    MC = {
        initialize: IM8,
        dispose: WGB,
        subscribe: WM8,
        markInternalWrite: KM8,
        notifyChange: FM8,
        resetForTesting: EM8
    };
});
function FYA(A) {
    let Q = ctA.useCallback((B)=>{
        HT();
        let G = HQ();
        A(B, G);
    }, [
        A
    ]);
    ctA.useEffect(()=>MC.subscribe(Q), [
        Q
    ]);
}
var ctA;
