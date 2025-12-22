// Module: aB
// Type: L
// Lines: 16998-17063
//
var aB = L(()=>{
    i0();
});
function lZ(A, Q, B = 10 * wU1 * UU1) {
    let G;
    if (Q === void 0) G = {};
    else if (Q instanceof AbortSignal) G = {
        abortSignal: Q,
        timeout: B
    };
    else G = Q;
    let { abortSignal: Z, timeout: Y = 10 * wU1 * UU1, input: J, stdio: X = [
        "ignore",
        "pipe",
        "pipe"
    ] } = G;
    Z?.throwIfAborted();
    let I = performance.now();
    try {
        let W = U3A(A, {
            env: process.env,
            maxBuffer: 1e6,
            timeout: Y,
            cwd: i1(),
            stdio: X,
            shell: !0,
            reject: !1,
            input: J
        }), K = performance.now() - I;
        if (K > tc0) k(`[SLOW OPERATION DETECTED] execSyncWithDefaults_DEPRECATED (${K.toFixed(1)}ms): ${A.slice(0, 100)}`);
        if (!W.stdout) return null;
        return W.stdout.trim() || null;
    } catch  {
        let W = performance.now() - I;
        if (W > tc0) k(`[SLOW OPERATION DETECTED] execSyncWithDefaults_DEPRECATED (${W.toFixed(1)}ms): ${A.slice(0, 100)}`);
        return null;
    }
}
async function QzA(A, Q = {}) {
    let { abortSignal: B, timeout: G = 10 * wU1 * UU1 } = Q;
    B?.throwIfAborted();
    try {
        let Z = await Ze(A, {
            env: process.env,
            maxBuffer: 1e6,
            signal: B,
            timeout: G,
            cwd: i1(),
            shell: !0,
            reject: !1
        });
        if (!Z.stdout) return null;
        return Z.stdout.trim() || null;
    } catch  {
        return null;
    }
}
var tc0 = 5, UU1 = 1000, wU1 = 60;
