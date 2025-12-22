// Module: pF9
// Type: L
// Lines: 533261-533276
//
var pF9 = L(()=>{
    createRenderState();
});
function lF9(A) {
    let Q = A.find((B)=>B.name === "claude-vscode");
    if (Q && Q.type === "connected") {
        Q.client.setNotificationHandler(sK7, async (G)=>{
            let { eventName: Z, eventData: Y } = G.params;
            r(`tengu_vscode_${Z}`, Y);
        });
        let B = {
            tengu_vscode_review_upsell: U7("tengu_vscode_review_upsell")
        };
        Q.client.notification({
            method: "experiment_gates",
            params: {
                gates: B
            }
        });
    }
}
var sK7;
