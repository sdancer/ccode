// Module: bA9
// Type: L
// Lines: 468520-468569
//
var createRenderState = L(()=>{
    trackUsedThenable();
    Ug();
    pushStartInstance();
    _Y();
    samplingCallback();
    prepareToHydrateHostInstance();
    pushViewTransitionAttributes();
    xw();
    qxA();
    Lu();
    KJ();
    createRenderState();
});
function LQ7(A, Q) {
    let B = [], G = {}, Z = Q;
    for (let Y of A)if (Y.type === "text") B.push(Y.text);
    else if (Y.type === "image" && Y.source.type === "base64") {
        let J = TtA(Z);
        (B.push(J), (G[Z] = {
            id: Z,
            type: "image",
            content: Y.source.data,
            mediaType: Y.source.media_type
        }), Z++);
    }
    return {
        text: B.join(" "),
        pastedContents: G,
        nextPasteId: Z
    };
}
async function hA9({ getAppState: A, setAppState: Q, executeInput: B }) {
    let G = await UB2(A, Q);
    if (G.length === 0) return {
        processed: !1
    };
    let Z = [], Y = {}, J = 1;
    for (let I of G)if (typeof I.value === "string") Z.push(I.value);
    else {
        let W = LQ7(I.value, J);
        (Z.push(W.text), Object.assign(Y, W.pastedContents), (J = W.nextPasteId));
    }
    let X = Z.join(`
`);
    return (await B(X, Y), {
        processed: !0
    });
}
