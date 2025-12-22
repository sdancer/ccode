// Module: D6B
// Type: L
// Lines: 169909-169949
//
var getEventPriority = L(()=>{
    qc1 = class qc1 extends Dg {
        data;
        constructor(A){
            super("paste", {
                bubbles: !0,
                cancelable: !0
            });
            this.data = A;
        }
    };
});
function z$8(A) {
    let Q = A.sequence;
    if (!Q || Q.length !== 1) return !1;
    return !A.meta && !A.ctrl && Q.charCodeAt(0) >= 32;
}
function C$8(A, Q, B, G) {
    for (let Z of Q){
        let Y = Z.sequence ?? "";
        A.handleInput(Y);
        let J = new RsA(Z);
        A.internal_eventEmitter.emit("input", J);
        let X = A.state.activeFocusId, I = (X && TZA(X)) || A.props.rootNode;
        if (Z.isPasted) {
            let W = new qc1(Y);
            Hg(I, W);
        } else {
            let W = new PsA("keydown", Z);
            if (Hg(I, W) && z$8(Z)) {
                let V = new PsA("keypress", Z);
                Hg(I, V);
            }
        }
    }
}
var sx, H$8 = "\t", D$8 = "\x1B[Z", F$8 = "\x1B", E$8, SsA;
