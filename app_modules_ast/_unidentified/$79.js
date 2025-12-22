// Module: $79
// Type: L
// Lines: 492417-492439
//
var pushStartInstance = L(()=>{
    bA();
    K8();
    N9();
    U$();
    A4();
    pushStartInstance();
    i0();
    aQ();
    ((XO = l(React runtime(), 1)), (z79 = l(React runtime(), 1)));
});
import { homedir as y67 } from "os";
import { relative as x67 } from "path";
function U79(A) {
    let Q = y67(), B = i1(), G = A.startsWith(Q) ? "~" + A.slice(Q.length) : null, Z = A.startsWith(B) ? "./" + x67(B, A) : null;
    if (G && Z) return G.length <= Z.length ? G : Z;
    return G || Z || A;
}
var v67;
