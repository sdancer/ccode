// Module: nfB
// Type: U
// Lines: 262593-262620
//
var renderChildrenArray = U((ifB)=>{
    Object.defineProperty(ifB, "__esModule", {
        value: !0
    });
    var lfB = S3(), PJ3 = createRenderState(), SJ3 = LR(), yJ3 = describeObjectForErrorMessage(), xJ3 = {
        message: ({ params: { len: A } })=>lfB.str`must NOT have more than ${A} items`,
        params: ({ params: { len: A } })=>lfB._`{limit: ${A}}`
    }, vJ3 = {
        keyword: "items",
        type: "array",
        schemaType: [
            "object",
            "boolean"
        ],
        before: "uniqueItems",
        error: xJ3,
        code (A) {
            let { schema: Q, parentSchema: B, it: G } = A, { prefixItems: Z } = B;
            if (((G.items = !0), (0, PJ3.alwaysValidSchema)(G, Q))) return;
            if (Z) (0, yJ3.validateAdditionalItems)(A, Z);
            else A.ok((0, SJ3.validateArray)(A));
        }
    };
    ifB.default = vJ3;
});
