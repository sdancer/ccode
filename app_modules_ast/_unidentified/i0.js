// Module: i0
// Type: L
// Lines: 2454-2498
//
var i0 = L(()=>{
    FP0();
    thA();
    r0 = jq9();
});
function EgA({ writeFn: A, flushIntervalMs: Q = 1000, maxBufferSize: B = 100, immediateMode: G = !1 }) {
    let Z = [], Y = null;
    function J() {
        if (Y) (clearTimeout(Y), (Y = null));
    }
    function X() {
        if (Z.length === 0) return;
        (A(Z.join("")), (Z = []), J());
    }
    function I() {
        if (!Y) Y = setTimeout(X, Q);
    }
    return {
        write (W) {
            if (G) {
                A(W);
                return;
            }
            if ((Z.push(W), I(), Z.length >= B)) X();
        },
        flush: X,
        dispose () {
            X();
        }
    };
}
function X3(A) {
    return (bE1.add(A), ()=>bE1.delete(A));
}
async function GS0() {
    await Promise.all(Array.from(bE1).map((A)=>A()));
}
var bE1;
