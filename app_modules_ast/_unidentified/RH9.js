// Module: RH9
// Type: L
// Lines: 528162-528189
//
var RH9 = L(()=>{
    pushStartInstance();
    s1();
    L3();
    OH9 = new Map();
    TW7 = [
        /MaxListenersExceededWarning.*AbortSignal/,
        /MaxListenersExceededWarning.*EventTarget/
    ];
});
function _H9() {}
function jH9() {
    let A = HQ() || {}, Q = v1().env || {}, B = A.env || {};
    for (let [G, Z] of Object.entries(Q))if (nSA.has(G.toUpperCase())) process.env[G] = Z;
    for (let [G, Z] of Object.entries(B))if (nSA.has(G.toUpperCase())) process.env[G] = Z;
    _H9();
}
function K6A() {
    let A = HQ() || {};
    (Object.assign(process.env, v1().env), Object.assign(process.env, A.env), _H9());
}
