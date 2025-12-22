// Module: XO2
// Type: L
// Lines: 391462-391522
//
var XO2 = L(()=>{
    bA();
    read_string_buffer();
    createRenderState();
    GJ();
    Xf = l(React runtime(), 1);
});
function DD0(A, Q, B, G, Z) {
    KX({
        completion_type: Q,
        event: A,
        metadata: {
            language_name: B,
            message_id: G,
            platform: JQ.platform,
            hasFeedback: Z ?? !1
        }
    });
}
function $J5(A, Q) {
    let { messageId: B, toolUseConfirm: G, onDone: Z, completionType: Y, languageName: J } = A;
    if ((DD0("accept", Y, J, B), Q?.feedback)) r("tengu_accept_with_instructions_submitted", {
        instructions_length: Q.feedback.length
    });
    (Z(), G.onAllow(G.input, [], Q?.feedback));
}
function UJ5(A) {
    let { messageId: Q, path: B, toolUseConfirm: G, toolPermissionContext: Z, onDone: Y, completionType: J, languageName: X, operationType: I } = A;
    DD0("accept", J, X, Q);
    let W = B ? FJ1(B, I, Z) : [];
    (Y(), G.onAllow(G.input, W));
}
function wJ5(A, Q) {
    let { messageId: B, toolUseConfirm: G, onDone: Z, onReject: Y, completionType: J, languageName: X } = A;
    (DD0("reject", J, X, B, Q?.hasFeedback), Z(), Y(), G.onReject(Q?.feedback));
}
var IO2;
