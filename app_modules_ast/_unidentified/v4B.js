// Module: v4B
// Type: L
// Lines: 168544-168565
//
var createRenderState = L(()=>{
    x4B = eC8;
});
var A$8 = (A, Q)=>{
    let B = [], G = A - Q, Z = A + Q;
    for(let Y = G; Y <= Z; Y++)B.push(Y);
    return B;
}, Q$8 = (A, Q, B = {})=>{
    var G;
    if (typeof A !== "string") throw TypeError("Source code is missing.");
    if (!Q || Q < 1) throw TypeError("Line number must start from `1`.");
    let Z = x4B(A).split(/\r?\n/);
    if (Q > Z.length) return;
    return A$8(Q, (G = B.around) !== null && G !== void 0 ? G : 3).filter((Y)=>Z[Y - 1] !== void 0).map((Y)=>({
            line: Y,
            value: Z[Y - 1]
        }));
}, k4B;
