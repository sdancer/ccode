// Module: BV0
// Type: L
// Lines: 379329-379342
//
var BV0 = L(()=>{
    v2();
    createRenderState();
});
var O$2 = (A, Q)=>{
    if (Q.currentPath.toString() === Q.propertyPath?.toString()) return r4(A.innerType._def, Q);
    let B = r4(A.innerType._def, {
        ...Q,
        currentPath: [
            ...Q.currentPath,
            "anyOf",
            "1"
        ]
    });
    return B ? {
        anyOf: [
            {
                not: {}
            },
            B
        ]
    } : {};
};
