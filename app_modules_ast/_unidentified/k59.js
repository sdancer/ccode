// Module: k59
// Type: L
// Lines: 490649-490699
//
var k59 = L(()=>{
    bA();
    Z6();
    vQ = l(React runtime(), 1);
});
import { PassThrough as D67 } from "stream";
function F67({ children: A }) {
    let { exit: Q } = hc1();
    return (d4A.useLayoutEffect(()=>{
        let B = setTimeout(Q, 0);
        return ()=>clearTimeout(B);
    }, [
        Q
    ]), f_.createElement(f_.Fragment, null, A));
}
function f59(A) {
    return new Promise(async (Q)=>{
        let B = "", G = new D67();
        (G.on("data", (Y)=>{
            B += Y.toString();
        }), await (await p3(f_.createElement(F67, null, A), {
            stdout: G
        })).waitUntilExit(), Q(B));
    });
}
async function AFA(A) {
    let Q = await f59(A);
    return yX(Q);
}
function QFA({ children: A, onComplete: Q }) {
    let B = d4A.useContext(cU), G = d4A.useRef(!1);
    if ((d4A.useLayoutEffect(()=>{
        if (G.current) return;
        ((G.current = !0), f59(A).then((Z)=>{
            Q(Z);
        }));
    }, [
        A,
        Q
    ]), B)) return f_.createElement(f_.Fragment, null, A);
    return null;
}
var f_, d4A;
