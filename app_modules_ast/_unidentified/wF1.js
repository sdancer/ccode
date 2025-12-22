// Module: wF1
// Type: L
// Lines: 528355-528388
//
var wF1 = L(()=>{
    HBA();
    getViewTransitionClassName();
    i0();
    s1();
    K6();
});
function B_0() {
    if (KW0()) vD2().then(()=>{
        (K6A(), bH9());
    });
    else bH9();
}
function bH9() {
    if (fH9) return;
    (kW7(), (fH9 = !0));
}
function kW7() {
    let A = wD2();
    if (A) jP0(A, (B, G)=>{
        let Z = A?.createCounter(B, G);
        return {
            add (Y, J = {}) {
                let I = {
                    ...IVA(),
                    ...J
                };
                Z?.add(Y, I);
            }
        };
    });
}
var fH9 = !1, hH9;
