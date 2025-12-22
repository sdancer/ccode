// Module: NbB
// Type: U
// Lines: 263142-263161
//
var NbB = U((qbB)=>{
    Object.defineProperty(qbB, "__esModule", {
        value: !0
    });
    var DX3 = createRenderState(), FX3 = {
        keyword: "allOf",
        schemaType: "array",
        code (A) {
            let { gen: Q, schema: B, it: G } = A;
            if (!Array.isArray(B)) throw Error("ajv implementation error");
            let Z = Q.name("valid");
            B.forEach((Y, J)=>{
                if ((0, DX3.alwaysValidSchema)(G, Y)) return;
                let X = A.subschema({
                    keyword: "allOf",
                    schemaProp: J
                }, Z);
                (A.ok(Z), A.mergeEvaluated(X));
            });
        }
    };
    qbB.default = FX3;
});
