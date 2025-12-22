// Module: dc1
// Type: L
// Lines: 172607-172634
//
var dc1 = L(()=>{
    trackPostpone();
    IF = l(React runtime(), 1);
});
function E8B({ visibleOptionCount: A = 5, options: Q, defaultValue: B, onChange: G, onCancel: Z, onFocus: Y, focusValue: J }) {
    let [X, I] = csA.useState(B), W = dsA({
        visibleOptionCount: A,
        options: Q,
        initialFocusValue: void 0,
        onFocus: Y,
        focusValue: J
    }), K = csA.useCallback(()=>{
        I(W.focusedValue);
    }, [
        W.focusedValue
    ]);
    return {
        ...W,
        value: X,
        selectFocusedOption: K,
        onChange: G,
        onCancel: Z
    };
}
var csA;
