// Module: tn2
// Type: L
// Lines: 451679-451730
//
var tn2 = L(()=>{
    KB();
    kn2();
    gn2();
    mn2();
    nn2();
    rn2();
    yd = l(React runtime(), 1);
});
function Xe5() {
    let A = new Ci();
    A.setMaxListeners(100);
    let Q = null, B = !0;
    return {
        subscribe (G) {
            if ((A.on("blink", G), A.listenerCount("blink") === 1)) Q = setInterval(()=>{
                ((B = !B), A.emit("blink"));
            }, 600);
            return B;
        },
        unsubscribe (G) {
            if ((A.off("blink", G), A.listenerCount("blink") === 0 && Q)) (clearInterval(Q), (Q = null));
        },
        getCurrentState () {
            return B;
        }
    };
}
function Aa2(A) {
    let Q = en2(), [B, G] = hK1.useState(Q.getCurrentState());
    return (hK1.useEffect(()=>{
        if (!A) return;
        let Z = en2(), Y = ()=>G(Z.getCurrentState()), J = Z.subscribe(Y);
        return (G(J), ()=>{
            Z.unsubscribe(Y);
        });
    }, [
        A
    ]), A ? B : !0);
}
var hK1, en2;
