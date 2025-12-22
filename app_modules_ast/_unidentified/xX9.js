// Module: xX9
// Type: L
// Lines: 505346-505423
//
var xX9 = L(()=>{
    bA();
    bA();
    $2();
    _I();
    WM0();
    Q9();
    ND1();
    eQ = l(React runtime(), 1);
});
function VM0({ steps: A, initialData: Q = {}, onComplete: B, onCancel: G, children: Z, title: Y, showStepCounter: J = !0 }) {
    let [X, I] = BV.useState(0), [W, K] = BV.useState(Q), [V, H] = BV.useState(!1), [D, F] = BV.useState([]);
    (qQ(), BV.useEffect(()=>{
        if (V) (F([]), B(W));
    }, [
        V,
        W,
        B
    ]));
    let E = BV.useCallback(()=>{
        if (X < A.length - 1) {
            if (D.length > 0) F((j)=>[
                    ...j,
                    X
                ]);
            I((j)=>j + 1);
        } else H(!0);
    }, [
        X,
        A.length,
        D
    ]), z = BV.useCallback(()=>{
        if (D.length > 0) {
            let j = D[D.length - 1];
            if (j !== void 0) (F((P)=>P.slice(0, -1)), I(j));
        } else if (X > 0) I((j)=>j - 1);
        else if (G) G();
    }, [
        X,
        D,
        G
    ]), $ = BV.useCallback((j)=>{
        if (j >= 0 && j < A.length) (F((P)=>[
                ...P,
                X
            ]), I(j));
    }, [
        X,
        A.length
    ]), O = BV.useCallback(()=>{
        if ((F([]), G)) G();
    }, [
        G
    ]), N = BV.useCallback((j)=>{
        K((P)=>({
                ...P,
                ...j
            }));
    }, []), M = BV.useMemo(()=>({
            currentStepIndex: X,
            totalSteps: A.length,
            wizardData: W,
            setWizardData: K,
            updateWizardData: N,
            goNext: E,
            goBack: z,
            goToStep: $,
            cancel: O,
            title: Y,
            showStepCounter: J
        }), [
        X,
        A.length,
        W,
        N,
        E,
        z,
        $,
        O,
        Y,
        J
    ]), R = A[X];
    if (!R || V) return null;
    return BV.default.createElement(KM0.Provider, {
        value: M
    }, Z || BV.default.createElement(R, null));
}
var BV, KM0;
