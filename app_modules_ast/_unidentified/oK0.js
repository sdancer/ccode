// Module: oK0
// Type: L
// Lines: 378675-378710
//
var createRenderState = L(()=>{
    createRenderState();
});
function V$2(A) {
    return {
        type: "string",
        enum: Array.from(A.values)
    };
}
function H$2(A, Q) {
    let B = [
        r4(A.left._def, {
            ...Q,
            currentPath: [
                ...Q.currentPath,
                "allOf",
                "0"
            ]
        }),
        r4(A.right._def, {
            ...Q,
            currentPath: [
                ...Q.currentPath,
                "allOf",
                "1"
            ]
        })
    ].filter((Y)=>!!Y), G = Q.target === "jsonSchema2019-09" ? {
        unevaluatedProperties: !1
    } : void 0, Z = [];
    return (B.forEach((Y)=>{
        if (o65(Y)) {
            if ((Z.push(...Y.allOf), Y.unevaluatedProperties === void 0)) G = void 0;
        } else {
            let J = Y;
            if ("additionalProperties" in Y && Y.additionalProperties === !1) {
                let { additionalProperties: X, ...I } = Y;
                J = I;
            } else G = void 0;
            Z.push(J);
        }
    }), Z.length ? {
        allOf: Z,
        ...G
    } : void 0);
}
var o65 = (A)=>{
    if ("type" in A && A.type === "string") return !1;
    return "allOf" in A;
};
