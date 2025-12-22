// Module: C2A
// Type: L
// Lines: 322221-322328
//
var createRenderState = L(()=>{
    createRenderState();
    A4();
    describeNativeComponentFrame();
    GJ();
    restoreViewTransitionName();
    g1();
    ob3 = {
        "<fnr>": "<function_results>",
        "<n>": "<name>",
        "</n>": "</name>",
        "<o>": "<output>",
        "</o>": "</output>",
        "<e>": "<error>",
        "</e>": "</error>",
        "<s>": "<system>",
        "</s>": "</system>",
        "<r>": "<result>",
        "</r>": "</result>",
        "< META_START >": "<META_START>",
        "< META_END >": "<META_END>",
        "< EOT >": "<EOT>",
        "< META >": "<META>",
        "< SOS >": "<SOS>",
        "\n\nH:": `

Human:`,
        "\n\nA:": `

Assistant:`
    };
});
function CB2(A, Q) {
    let B = Object.create(null), G = 0;
    for (let Z of A){
        let Y = Q(Z, G++);
        if (B[Y] === void 0) B[Y] = [];
        B[Y].push(Z);
    }
    return B;
}
function LPA(A, Q) {
    let B = m0(), G = {
        type: "queue-operation",
        operation: A,
        timestamp: new Date().toISOString(),
        sessionId: B,
        ...(Q !== void 0 && {
            content: Q
        })
    };
    xcB(G);
}
function w$(A, Q) {
    (Q((B)=>({
            ...B,
            queuedCommands: [
                ...B.queuedCommands,
                A
            ]
        })), LPA("enqueue", typeof A.value === "string" ? A.value : void 0));
}
async function $B2(A, Q) {
    let B = await A();
    if (B.queuedCommands.length === 0) return;
    let [G, ...Z] = B.queuedCommands;
    return (Q((Y)=>({
            ...Y,
            queuedCommands: Z
        })), LPA("dequeue"), G);
}
async function UB2(A, Q) {
    let B = await A();
    if (B.queuedCommands.length === 0) return [];
    let G = [
        ...B.queuedCommands
    ];
    Q((Z)=>({
            ...Z,
            queuedCommands: []
        }));
    for (let Z of G)LPA("dequeue");
    return G;
}
function wB2(A, Q) {
    if (A.length === 0) return;
    Q((B)=>({
            ...B,
            queuedCommands: B.queuedCommands.filter((G)=>!A.some((Z)=>Z.value === G.value))
        }));
    for (let B of A)LPA("remove");
}
function N51(A) {
    return !tb3.has(A);
}
async function L51(A, Q, B, G) {
    let Z = await B();
    if (Z.queuedCommands.length === 0) return;
    let { editable: Y = [], nonEditable: J = [] } = CB2(Z.queuedCommands, (K)=>N51(K.mode) ? "editable" : "nonEditable");
    if (Y.length === 0) return;
    let X = Y.map((K)=>K.value), I = [
        ...X,
        A
    ].filter(Boolean).join(`
`), W = X.join(`
`).length + 1 + Q;
    for (let K of Y)LPA("popAll", typeof K.value === "string" ? K.value : void 0);
    return (G((K)=>({
            ...K,
            queuedCommands: J
        })), {
        text: I,
        cursorOffset: W
    });
}
var tb3;
