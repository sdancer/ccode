// Module: RW0
// Type: L
// Lines: 366082-366112
//
var RW0 = L(()=>{
    bA();
    ((jL = l(React runtime(), 1)), (pD2 = eSA()), (lD2 = [
        ...pD2,
        ...[
            ...pD2
        ].reverse()
    ]));
});
function QyA(A, Q, B, G) {
    let Z = $VA.useRef(Date.now()), [Y, J] = $VA.useState(A === "requesting" ? -1 : 10), X = $VA.useMemo(()=>{
        if (A === "requesting") return 50;
        return 200;
    }, [
        A
    ]);
    return (BG(()=>{
        if (B === !1 || G) return;
        let I = Date.now() - Z.current, W = Math.floor(I / X), K = Q.length, V = K + 20;
        if (A === "requesting") {
            let H = (W % V) - 10;
            J(H);
        } else {
            let H = K + 10 - (W % V);
            J(H);
        }
    }, X), Y);
}
var $VA;
