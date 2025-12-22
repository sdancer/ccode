// Module: JY1
// Type: L
// Lines: 379209-379241
//
var createRenderState = L(()=>{
    createRenderState();
    MyA = {
        ZodString: "string",
        ZodNumber: "number",
        ZodBigInt: "integer",
        ZodBoolean: "boolean",
        ZodNull: "null"
    };
});
function q$2(A, Q) {
    if ([
        "ZodString",
        "ZodNumber",
        "ZodBigInt",
        "ZodBoolean",
        "ZodNull"
    ].includes(A.innerType._def.typeName) && (!A.innerType._def.checks || !A.innerType._def.checks.length)) {
        if (Q.target === "openApi3") return {
            type: MyA[A.innerType._def.typeName],
            nullable: !0
        };
        return {
            type: [
                MyA[A.innerType._def.typeName],
                "null"
            ]
        };
    }
    if (Q.target === "openApi3") {
        let G = r4(A.innerType._def, {
            ...Q,
            currentPath: [
                ...Q.currentPath
            ]
        });
        if (G && "$ref" in G) return {
            allOf: [
                G
            ],
            nullable: !0
        };
        return G && {
            ...G,
            nullable: !0
        };
    }
    let B = r4(A.innerType._def, {
        ...Q,
        currentPath: [
            ...Q.currentPath,
            "anyOf",
            "0"
        ]
    });
    return B && {
        anyOf: [
            B,
            {
                type: "null"
            }
        ]
    };
}
