// Module: VQ2
// Type: L
// Lines: 317386-317425
//
var pushStartInstance = L(()=>{
    bA();
    SK();
    qI();
    i4();
    renderElement();
    A4();
    KB();
    mK = l(React runtime(), 1);
});
import { relative as qf3 } from "path";
function UG0(A) {
    if (A.length <= $G0) return A;
    if (U61()) return A;
    let Q = A.slice(0, $G0), G = A.slice($G0).split(`
`).length;
    return `${Q}

... [${G} lines truncated] ...`;
}
function wG0(A, Q, B = 0) {
    if (Q === void 0) return A.slice(B);
    return A.slice(B, B + Q);
}
function qG0(A) {
    let Q = i1(), B = qf3(Q, A);
    return B.startsWith("..") ? A : B;
}
function NG0(A, Q) {
    if (!A && !Q) return "";
    return `limit: ${A}, offset: ${Q ?? 0}`;
}
var Nf3, $G0 = 20000, Lf3, Of3, Cm;
