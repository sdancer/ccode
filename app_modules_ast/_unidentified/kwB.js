// Module: kwB
// Type: L
// Lines: 223535-223558
//
var createRenderState = L(()=>{
    vwB = new Set([
        "Deserialize",
        "Serialize",
        "Retry",
        "Sign"
    ]);
});
function VOA(A) {
    return (typeof A === "object" && A !== null && !Array.isArray(A) && !(A instanceof RegExp) && !(A instanceof Date));
}
function M0A(A) {
    if (VOA(A)) {
        let Q = typeof A.name === "string", B = typeof A.message === "string";
        return Q && B;
    }
    return !1;
}
var _r1 = ()=>{};
import { inspect as xn8 } from "node:util";
var fwB;
