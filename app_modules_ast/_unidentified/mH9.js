// Module: mH9
// Type: L
// Lines: 528514-528597
//
var samplingCallback = L(()=>{
    Ag();
    I5();
    z4();
    i0();
    aQ();
    At = l(KU0(), 1);
});
function bW7(A, Q) {
    let B = 0, G = Q === null || Q === void 0;
    for (let Z of A){
        if (!G) {
            if (Z.uuid === Q) G = !0;
            continue;
        }
        if (Z.type === "assistant") {
            let J = Z.message.content;
            if (Array.isArray(J)) B += J.filter((X)=>X.type === "tool_use").length;
        }
    }
    return B;
}
function hW7(A) {
    let B = [
        ...A
    ].reverse().find((I)=>I.type === "assistant")?.uuid;
    if (B && B !== cH9) {
        let I = dK(A);
        if (I > 0) TC2(I);
        let W = kQ2(A);
        if (W > 0) PC2(W);
        cH9 = B;
    }
    if (!yC2()) {
        if (!vC2()) return !1;
        xC2();
    }
    let G = kC2(), Y = bW7(A, dH9) >= fC2(), J = gfA(A);
    if ((G && Y) || (G && !J)) {
        let I = A[A.length - 1];
        if (I?.uuid) dH9 = I.uuid;
        return !0;
    }
    return !1;
}
async function gW7(A) {
    let Q = vA(), B = ZF1();
    if (!Q.existsSync(B)) Q.mkdirSync(B);
    let G = iZ1();
    if (!Q.existsSync(G)) {
        let X = await PK0();
        Q.writeFileSync(G, X, {
            encoding: "utf-8",
            flush: !1,
            mode: 384
        });
    }
    let Z = await D3.call({
        file_path: G
    }, A), Y = "", J = Z.data;
    if (J.type === "text") Y = J.file.content;
    return {
        memoryPath: G,
        currentMemory: Y
    };
}
async function pH9() {
    if (!am()) return;
    if (await pX("tengu_session_memory")) {
        let A = await Yf("tengu_sm_config", {}), Q = {
            minimumMessageTokensToInit: A.minimumMessageTokensToInit && A.minimumMessageTokensToInit > 0 ? A.minimumMessageTokensToInit : LyA.minimumMessageTokensToInit,
            minimumTokensBetweenUpdate: A.minimumTokensBetweenUpdate && A.minimumTokensBetweenUpdate > 0 ? A.minimumTokensBetweenUpdate : LyA.minimumTokensBetweenUpdate,
            toolCallsBetweenUpdates: A.toolCallsBetweenUpdates && A.toolCallsBetweenUpdates > 0 ? A.toolCallsBetweenUpdates : LyA.toolCallsBetweenUpdates
        };
        (_C2(Q), hY1(uW7));
    }
}
var dH9, cH9, uW7;
