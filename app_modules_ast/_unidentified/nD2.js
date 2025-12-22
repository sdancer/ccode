// Module: nD2
// Type: L
// Lines: 366131-366161
//
var nD2 = L(()=>{
    qV();
    iD2 = l(React runtime(), 1);
});
function TW0(A, Q = !1) {
    let [B, G] = t2A.useState(0), [Z, Y] = t2A.useState(0), J = t2A.useRef(A);
    (t2A.useEffect(()=>{
        if (A > J.current) (G(0), Y(0), (J.current = A));
    }, [
        A
    ]), BG(()=>{
        if (A > 0 && A === J.current && !Q) G((W)=>W + 100);
        else if (A === 0 || Q) G(0);
    }, 100));
    let X = B > 3000 && !Q, I = X ? Math.min((B - 3000) / 2000, 1) : 0;
    return (BG(()=>{
        Y((W)=>{
            let K = I, V = K - W;
            if (Math.abs(V) < 0.01) return K;
            return W + V * 0.1;
        });
    }, 50), {
        isStalled: X,
        stalledIntensity: Z
    });
}
var t2A;
