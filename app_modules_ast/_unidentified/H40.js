// Module: H40
// Type: U
// Lines: 262537-262581
//
var renderNode = U((mfB)=>{
    Object.defineProperty(mfB, "__esModule", {
        value: !0
    });
    mfB.validateTuple = void 0;
    var gfB = S3(), f91 = createRenderState(), OJ3 = LR(), MJ3 = {
        keyword: "items",
        type: "array",
        schemaType: [
            "object",
            "array",
            "boolean"
        ],
        before: "uniqueItems",
        code (A) {
            let { schema: Q, it: B } = A;
            if (Array.isArray(Q)) return ufB(A, "additionalItems", Q);
            if (((B.items = !0), (0, f91.alwaysValidSchema)(B, Q))) return;
            A.ok((0, OJ3.validateArray)(A));
        }
    };
    function ufB(A, Q, B = A.schema) {
        let { gen: G, parentSchema: Z, data: Y, keyword: J, it: X } = A;
        if ((K(Z), X.opts.unevaluated && B.length && X.items !== !0)) X.items = f91.mergeEvaluated.items(G, B.length, X.items);
        let I = G.name("valid"), W = G.const("len", gfB._`${Y}.length`);
        B.forEach((V, H)=>{
            if ((0, f91.alwaysValidSchema)(X, V)) return;
            (G.if(gfB._`${W} > ${H}`, ()=>A.subschema({
                    keyword: J,
                    schemaProp: H,
                    dataProp: H
                }, I)), A.ok(I));
        });
        function K(V) {
            let { opts: H, errSchemaPath: D } = X, F = B.length, E = F === V.minItems && (F === V.maxItems || V[Q] === !1);
            if (H.strictTuples && !E) {
                let z = `"${J}" is ${F}-tuple, but minItems or maxItems/${Q} are not specified or different at path "${D}"`;
                (0, f91.checkStrictMode)(X, z, H.strictTuples);
            }
        }
    }
    mfB.validateTuple = ufB;
    mfB.default = MJ3;
});
