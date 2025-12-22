// Module: NyA
// Type: L
// Lines: 377708-377799
//
var read_string_buffer = L(()=>{
    rwA();
    TZ();
    tR();
    KB();
    pushStartInstance();
    uJ();
    EL();
    describeNativeComponentFrame();
    zL();
    bG0();
    Q9();
    A_();
    createRenderState();
    getViewTransitionClassName();
    pushStartInstance();
    A4();
    createRenderState();
    rpcCall();
    describeNativeComponentFrame();
    g1();
    renderElement();
    createRenderState();
    i0();
});
function NC2() {
    return $C2;
}
function hVA(A) {
    $C2 = A;
}
function LC2() {
    lZ1 = Date.now();
}
function OC2() {
    lZ1 = void 0;
}
async function MC2() {
    let A = Date.now();
    while(lZ1){
        if (Date.now() - lZ1 > R65) return;
        if (Date.now() - A > M65) return;
        await new Promise((B)=>setTimeout(B, 1000));
    }
}
function RC2() {
    let A = vA(), Q = iZ1();
    if (!A.existsSync(Q)) return null;
    return A.readFileSync(Q, {
        encoding: "utf-8"
    });
}
function _C2(A) {
    bVA = {
        ...bVA,
        ...A
    };
}
function jC2() {
    return {
        ...bVA
    };
}
function TC2(A) {
    TK0 += A;
}
function PC2(A) {
    UC2 += A;
}
function SC2() {
    wC2 = TK0;
}
function yC2() {
    return qC2;
}
function xC2() {
    qC2 = !0;
}
function vC2() {
    return UC2 >= bVA.minimumMessageTokensToInit;
}
function kC2() {
    return TK0 - wC2 >= bVA.minimumTokensBetweenUpdate;
}
function fC2() {
    return bVA.toolCallsBetweenUpdates;
}
var M65 = 15000, R65 = 60000, LyA, bVA, $C2, lZ1, TK0 = 0, UC2 = 0, wC2 = 0, qC2 = !1;
