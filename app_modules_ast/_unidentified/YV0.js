// Module: YV0
// Type: L
// Lines: 379364-379380
//
var YV0 = L(()=>{
    createRenderState();
});
function _$2(A, Q) {
    let G = {
        type: "array",
        uniqueItems: !0,
        items: r4(A.valueType._def, {
            ...Q,
            currentPath: [
                ...Q.currentPath,
                "items"
            ]
        })
    };
    if (A.minSize) b5(G, "minItems", A.minSize.value, A.minSize.message, Q);
    if (A.maxSize) b5(G, "maxItems", A.maxSize.value, A.maxSize.message, Q);
    return G;
}
