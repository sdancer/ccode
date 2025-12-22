// Module: lc0
// Type: L
// Lines: 16755-16771
//
var lc0 = L(()=>{
    ((Ql9 = /^[\w.-]+$/), (Gl9 = / +/g));
});
import { debuglog as Yl9 } from "node:util";
import Jl9 from "node:process";
var ic0, juA = (A, Q)=>String(A).padStart(Q, "0"), Xl9 = ()=>{
    let A = new Date();
    return `${juA(A.getHours(), 2)}:${juA(A.getMinutes(), 2)}:${juA(A.getSeconds(), 2)}.${juA(A.getMilliseconds(), 3)}`;
}, zU1 = (A, { verbose: Q })=>{
    if (!Q) return;
    Jl9.stderr.write(`[${Xl9()}] ${A}
`);
};
