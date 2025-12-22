// Module: Mn2
// Type: L
// Lines: 451054-451087
//
var Mn2 = L(()=>{
    bA();
    Un2();
    zK1();
    qn2();
    _kA();
    Nn2();
    tU0();
    ((rF = l(React runtime(), 1)), (Ln2 = l(React runtime(), 1)));
    On2 = Ln2.memo(Qe5);
});
function Rn2(A, Q) {
    let B = xK1.useRef(void 0);
    xK1.useEffect(()=>{
        let G = Ow(A);
        if (B.current !== G) B.current = G;
        if (G) G.client.setNotificationHandler(Ge5, (Z)=>{
            if (B.current !== G) return;
            try {
                let Y = Z.params, J = Y.lineStart !== void 0 ? Y.lineStart + 1 : void 0, X = Y.lineEnd !== void 0 ? Y.lineEnd + 1 : void 0;
                Q({
                    filePath: Y.filePath,
                    lineStart: J,
                    lineEnd: X
                });
            } catch (Y) {
                t(Y);
            }
        });
    }, [
        A,
        Q
    ]);
}
var xK1, Be5 = "at_mentioned", Ge5;
