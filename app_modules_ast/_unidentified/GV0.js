// Module: GV0
// Type: L
// Lines: 379342-379358
//
var GV0 = L(()=>{
    createRenderState();
});
var M$2 = (A, Q)=>{
    if (Q.pipeStrategy === "input") return r4(A.in._def, Q);
    else if (Q.pipeStrategy === "output") return r4(A.out._def, Q);
    let B = r4(A.in._def, {
        ...Q,
        currentPath: [
            ...Q.currentPath,
            "allOf",
            "0"
        ]
    }), G = r4(A.out._def, {
        ...Q,
        currentPath: [
            ...Q.currentPath,
            "allOf",
            B ? "1" : "0"
        ]
    });
    return {
        allOf: [
            B,
            G
        ].filter((Z)=>Z !== void 0)
    };
};
