// Module: YmB
// Type: U
// Lines: 268240-268267
//
var describeObjectForErrorMessage = U((ZmB)=>{
    Object.defineProperty(ZmB, "__esModule", {
        value: !0
    });
    var GmB = a8(), QF3 = createRenderState(), BF3 = MR(), GF3 = renderElement(), ZF3 = {
        message: ({ params: { len: A } })=>GmB.str`must NOT have more than ${A} items`,
        params: ({ params: { len: A } })=>GmB._`{limit: ${A}}`
    }, YF3 = {
        keyword: "items",
        type: "array",
        schemaType: [
            "object",
            "boolean"
        ],
        before: "uniqueItems",
        error: ZF3,
        code (A) {
            let { schema: Q, parentSchema: B, it: G } = A, { prefixItems: Z } = B;
            if (((G.items = !0), (0, QF3.alwaysValidSchema)(G, Q))) return;
            if (Z) (0, GF3.validateAdditionalItems)(A, Z);
            else A.ok((0, BF3.validateArray)(A));
        }
    };
    ZmB.default = YF3;
});
