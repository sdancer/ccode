// Module: sA9
// Type: L
// Lines: 468764-468808
//
var sA9 = L(()=>{
    bA();
    Ui();
    oA9 = l(React runtime(), 1);
});
function tA9(A, Q) {
    let B = DfA.useRef(!1), G = DfA.useRef(null);
    DfA.useEffect(()=>{
        let Z = Ow(A);
        if (G.current !== Z) ((B.current = !1), (G.current = Z || null), Q({
            lineCount: 0,
            lineStart: void 0,
            text: void 0,
            filePath: void 0
        }));
        if (B.current || !Z) return;
        let Y = (J)=>{
            if (J.selection?.start && J.selection?.end) {
                let { start: X, end: I } = J.selection, W = I.line - X.line + 1;
                if (I.character === 0) W--;
                let K = {
                    lineCount: W,
                    lineStart: X.line,
                    text: J.text,
                    filePath: J.filePath
                };
                Q(K);
            }
        };
        (Z.client.setNotificationHandler(OQ7, (J)=>{
            if (G.current !== Z) return;
            try {
                let X = J.params;
                if (X.selection && X.selection.start && X.selection.end) Y(X);
                else if (X.text !== void 0) Y({
                    selection: null,
                    text: X.text,
                    filePath: X.filePath
                });
            } catch (X) {
                t(X);
            }
        }), (B.current = !0));
    }, [
        A,
        Q
    ]);
}
var DfA, OQ7;
