// Module: vmB
// Type: U
// Lines: 268789-268808
//
var vmB = U((xmB)=>{
    Object.defineProperty(xmB, "__esModule", {
        value: !0
    });
    var hF3 = createRenderState(), gF3 = {
        keyword: "allOf",
        schemaType: "array",
        code (A) {
            let { gen: Q, schema: B, it: G } = A;
            if (!Array.isArray(B)) throw Error("ajv implementation error");
            let Z = Q.name("valid");
            B.forEach((Y, J)=>{
                if ((0, hF3.alwaysValidSchema)(G, Y)) return;
                let X = A.subschema({
                    keyword: "allOf",
                    schemaProp: J
                }, Z);
                (A.ok(Z), A.mergeEvaluated(X));
            });
        }
    };
    xmB.default = gF3;
});
