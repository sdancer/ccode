// Module: JV0
// Type: L
// Lines: 379380-379416
//
var JV0 = L(()=>{
    createRenderState();
});
function j$2(A, Q) {
    if (A.rest) return {
        type: "array",
        minItems: A.items.length,
        items: A.items.map((B, G)=>r4(B._def, {
                ...Q,
                currentPath: [
                    ...Q.currentPath,
                    "items",
                    `${G}`
                ]
            })).reduce((B, G)=>(G === void 0 ? B : [
                ...B,
                G
            ]), []),
        additionalItems: r4(A.rest._def, {
            ...Q,
            currentPath: [
                ...Q.currentPath,
                "additionalItems"
            ]
        })
    };
    else return {
        type: "array",
        minItems: A.items.length,
        maxItems: A.items.length,
        items: A.items.map((B, G)=>r4(B._def, {
                ...Q,
                currentPath: [
                    ...Q.currentPath,
                    "items",
                    `${G}`
                ]
            })).reduce((B, G)=>(G === void 0 ? B : [
                ...B,
                G
            ]), [])
    };
}
