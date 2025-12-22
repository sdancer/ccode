// Module: BA9
// Type: L
// Lines: 466915-466989
//
var BA9 = L(()=>{
    bA();
    cx();
    n6();
    createRenderState();
    zK1();
    startFakeNavigation();
    getViewTransitionClassName();
    Ug();
    createRenderState();
    Bn2();
    MkA();
    Z6();
    trackUsedThenable();
    Jn2();
    OK();
    i0();
    Mn2();
    wZ();
    psA();
    pushStartInstance();
    $NA();
    createRenderState();
    _n2();
    aB();
    samplingCallback();
    samplingCallback();
    prepareToHydrateHostInstance();
    Iq0();
    $e2();
    samplingCallback();
    prepareToHydrateHostInstance();
    z$();
    X2();
    Se2();
    be2();
    he2();
    trackUsedThenable();
    de2();
    trackUsedThenable();
    pe2();
    createRenderState();
    U4();
    ae2();
    cV();
    se2();
    eyA();
    NV1();
    createRenderState();
    ((s2 = l(React runtime(), 1)), (x3 = l(React runtime(), 1)));
    QA9 = VQ7;
});
function GA9({ inputValue: A, isAssistantResponding: Q }) {
    let [B, G] = IQ(), Z = !0, Y = !0, J = null, X = O4A.useRef(!1);
    O4A.useEffect(()=>{}, [
        !0,
        B.promptCoaching.tip
    ]);
    let I = O4A.useCallback((W = "dismissed")=>{
        return;
    }, [
        !0,
        G
    ]);
    return (O4A.useEffect(()=>{
        return;
    }, [
        !0,
        B.promptCoaching.tip,
        A,
        Q,
        I
    ]), {
        tip: null,
        dismissTip: ()=>{}
    });
    return {
        tip: null,
        dismissTip: ()=>I("dismissed")
    };
}
var O4A;
