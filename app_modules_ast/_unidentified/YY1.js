// Module: YY1
// Type: L
// Lines: 379085-379109
//
var YY1 = L(()=>{
    v2();
    createRenderState();
    GY1();
    QY1();
});
function E$2(A, Q) {
    if (Q.mapStrategy === "record") return ZY1(A, Q);
    let B = r4(A.keyType._def, {
        ...Q,
        currentPath: [
            ...Q.currentPath,
            "items",
            "items",
            "0"
        ]
    }) || {}, G = r4(A.valueType._def, {
        ...Q,
        currentPath: [
            ...Q.currentPath,
            "items",
            "items",
            "1"
        ]
    }) || {};
    return {
        type: "array",
        maxItems: 125,
        items: {
            type: "array",
            items: [
                B,
                G
            ],
            minItems: 2,
            maxItems: 2
        }
    };
}
