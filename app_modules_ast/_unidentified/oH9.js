// Module: oH9
// Type: L
// Lines: 528837-528888
//
var createRenderState = L(()=>{
    restoreViewTransitionName();
    describeNativeComponentFrame();
    createRenderState();
    syA();
    iyA();
    zL();
    KB();
    describeNativeComponentFrame();
    ((lW7 = /^#\s*MAGIC\s+DOC:\s*(.+)$/im), (iW7 = /^[_*](.+?)[_*]\s*$/m), (qF1 = new Map()));
    RqJ = nl(async function(A) {
        let { messages: Q, querySource: B } = A;
        if (B !== "repl_main_thread") return;
        if (gfA(Q)) return;
        if (qF1.size === 0) return;
        for (let Y of Array.from(qF1.values()))await oW7(Y, A);
    });
});
function rH9(A) {
    let Q = [];
    for (let B of A)if (B.type === "user" && B.message?.content) {
        let G = "";
        if (typeof B.message.content === "string") G = B.message.content;
        else if (Array.isArray(B.message.content)) {
            for (let Z of B.message.content)if (Z.type === "text") G += Z.text + " ";
        }
        if (G.trim()) Q.push(G.trim().slice(0, rW7));
    }
    return Q;
}
function sW7(A) {
    return A.map((B)=>`User: ${B}
Asst: [response hidden]`).join(`
`);
}
function tW7(A) {
    let Q = Z9(A, "frustrated"), B = Z9(A, "pr_request");
    return {
        isFrustrated: Q === "true",
        hasPRRequest: B === "true"
    };
}
async function sH9() {
    return;
}
var rW7 = 300, eW7;
