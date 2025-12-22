// Module: Te2
// Type: L
// Lines: 465409-465431
//
var Te2 = L(()=>{
    Ug();
});
function Pe2({ input: A, pastedContents: Q, onInputChange: B, setCursorOffset: G, setPastedContents: Z }) {
    let [Y, J] = YfA.useState(!1);
    (YfA.useEffect(()=>{
        if (Y) return;
        if (A.length <= 1e4) return;
        let { newInput: X, newPastedContents: I } = je2(A, Q);
        (B(X), G(X.length), Z(I), J(!0));
    }, [
        A,
        Y,
        Q,
        B,
        Z,
        G
    ]), YfA.useEffect(()=>{
        if (A === "") J(!1);
    }, [
        A
    ]));
}
var YfA;
