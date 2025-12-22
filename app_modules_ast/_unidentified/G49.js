// Module: G49
// Type: L
// Lines: 474907-474943
//
var preload = L(()=>{
    bA();
    EI();
    Q49();
    L3();
    ((k$ = l(React runtime(), 1)), (LfA = l(React runtime(), 1)));
});
function ZH1() {
    let { addNotification: A, removeNotification: Q } = z5(), [B, G] = mDA.useState(()=>{
        let { errors: Y } = WS();
        return Y;
    }), Z = mDA.useCallback(()=>{
        let { errors: Y } = WS();
        G(Y);
    }, []);
    return (FYA(Z), mDA.useEffect(()=>{
        if (B.length > 0) {
            let Y = `Found ${B.length} invalid settings ${B.length === 1 ? "file" : "files"} · /doctor for details`;
            A({
                key: Z49,
                text: Y,
                color: "warning",
                priority: "high",
                timeoutMs: 60000
            });
        } else Q(Z49);
    }, [
        B,
        A,
        Q
    ]), B);
}
var mDA, Z49 = "settings-errors";
