// Module: gr1
// Type: L
// Lines: 224133-224166
//
var gr1 = L(()=>{
    X01();
});
function rwB(A) {
    if (!(A && [
        429,
        503
    ].includes(A.status))) return;
    try {
        for (let Z of pn8){
            let Y = owB(A, Z);
            if (Y === 0 || Y) return Y * (Z === ur1 ? 1000 : 1);
        }
        let Q = A.headers.get(ur1);
        if (!Q) return;
        let G = Date.parse(Q) - Date.now();
        return Number.isFinite(G) ? Math.max(0, G) : void 0;
    } catch (Q) {
        return;
    }
}
function swB(A) {
    return Number.isFinite(rwB(A));
}
function twB() {
    return {
        name: "throttlingRetryStrategy",
        retry ({ response: A }) {
            let Q = rwB(A);
            if (!Number.isFinite(Q)) return {
                skipStrategy: !0
            };
            return {
                retryAfterInMs: Q
            };
        }
    };
}
var ur1 = "Retry-After", pn8;
