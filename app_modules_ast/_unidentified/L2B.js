// Module: L2B
// Type: L
// Lines: 151028-151044
//
var L2B = L(()=>{
    createRenderState();
    $d1 = iE8;
});
function wd1(A) {
    let Q = {};
    for (let B of Object.keys(Ud1)){
        let G = B;
        if (G in A) {
            let Z = A[G];
            if (Z !== void 0) Q[G] = Z;
        }
    }
    return Q;
}
var O2B, Ud1;
