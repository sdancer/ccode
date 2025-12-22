// Module: wfA
// Type: L
// Lines: 473098-473109
//
var renderElement = L(()=>{
    ((CB7 = Math.pow(10, 8) * 24 * 60 * 60 * 1000), (SUY = -CB7), (oq0 = Symbol.for("constructDateFrom")));
});
function Uq(A, Q) {
    if (typeof A === "function") return A(Q);
    if (A && typeof A === "object" && oq0 in A) return A[oq0](Q);
    if (A instanceof Date) return new A.constructor(Q);
    return new Date(Q);
}
