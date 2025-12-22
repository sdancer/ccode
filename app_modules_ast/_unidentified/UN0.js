// Module: UN0
// Type: L
// Lines: 476007-476027
//
var preload = L(()=>{
    DK();
});
function j49(A) {
    let { addNotification: Q } = z5(), B = KH1.useRef(null);
    KH1.useEffect(()=>{
        let G = WH1(A);
        if (G && G !== B.current) ((B.current = G), Q({
            key: "model-deprecation-warning",
            text: G,
            color: "warning",
            priority: "high"
        }));
        if (!G) B.current = null;
    }, [
        A,
        Q
    ]);
}
var KH1;
