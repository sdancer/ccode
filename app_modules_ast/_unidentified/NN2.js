// Module: NN2
// Type: L
// Lines: 385875-385925
//
var NN2 = L(()=>{
    updateProperties();
    flushCompletedQueues();
    createRenderState();
    startFakeNavigation();
    renderNode();
    g1();
    qN2();
});
async function LN2(A) {
    let Q;
    do Q = await A.next();
    while (!Q.done)
    return Q.value;
}
async function* tVA(A, Q = 1 / 0) {
    let B = (Y)=>{
        let J = Y.next().then(({ done: X, value: I })=>({
                done: X,
                value: I,
                generator: Y,
                promise: J
            }));
        return J;
    }, G = [
        ...A
    ], Z = new Set();
    while(Z.size < Q && G.length > 0){
        let Y = G.shift();
        Z.add(B(Y));
    }
    while(Z.size > 0){
        let { done: Y, value: J, generator: X, promise: I } = await Promise.race(Z);
        if ((Z.delete(I), !Y)) {
            if ((Z.add(B(X)), J !== void 0)) yield J;
        } else if (G.length > 0) {
            let W = G.shift();
            Z.add(B(W));
        }
    }
}
async function kY1(A) {
    let Q = [];
    for await (let B of A)Q.push(B);
    return Q;
}
async function* OH0(A) {
    for (let Q of A)yield Q;
}
var PvZ;
