// Module: Y60
// Type: U
// Lines: 268184-268228
//
var performWork = U((euB)=>{
    Object.defineProperty(euB, "__esModule", {
        value: !0
    });
    euB.validateTuple = void 0;
    var suB = a8(), E41 = createRenderState(), oD3 = MR(), rD3 = {
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
            if (Array.isArray(Q)) return tuB(A, "additionalItems", Q);
            if (((B.items = !0), (0, E41.alwaysValidSchema)(B, Q))) return;
            A.ok((0, oD3.validateArray)(A));
        }
    };
    function tuB(A, Q, B = A.schema) {
        let { gen: G, parentSchema: Z, data: Y, keyword: J, it: X } = A;
        if ((K(Z), X.opts.unevaluated && B.length && X.items !== !0)) X.items = E41.mergeEvaluated.items(G, B.length, X.items);
        let I = G.name("valid"), W = G.const("len", suB._`${Y}.length`);
        B.forEach((V, H)=>{
            if ((0, E41.alwaysValidSchema)(X, V)) return;
            (G.if(suB._`${W} > ${H}`, ()=>A.subschema({
                    keyword: J,
                    schemaProp: H,
                    dataProp: H
                }, I)), A.ok(I));
        });
        function K(V) {
            let { opts: H, errSchemaPath: D } = X, F = B.length, E = F === V.minItems && (F === V.maxItems || V[Q] === !1);
            if (H.strictTuples && !E) {
                let z = `"${J}" is ${F}-tuple, but minItems or maxItems/${Q} are not specified or different at path "${D}"`;
                (0, E41.checkStrictMode)(X, z, H.strictTuples);
            }
        }
    }
    euB.validateTuple = tuB;
    euB.default = rD3;
});
