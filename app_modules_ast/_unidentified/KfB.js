// Module: KfB
// Type: U
// Lines: 262050-262079
//
var trackPostpone = U((WfB)=>{
    Object.defineProperty(WfB, "__esModule", {
        value: !0
    });
    var y91 = S3(), Va = y91.operators, x91 = {
        maximum: {
            okStr: "<=",
            ok: Va.LTE,
            fail: Va.GT
        },
        minimum: {
            okStr: ">=",
            ok: Va.GTE,
            fail: Va.LT
        },
        exclusiveMaximum: {
            okStr: "<",
            ok: Va.LT,
            fail: Va.GTE
        },
        exclusiveMinimum: {
            okStr: ">",
            ok: Va.GT,
            fail: Va.LTE
        }
    }, qY3 = {
        message: ({ keyword: A, schemaCode: Q })=>y91.str`must be ${x91[A].okStr} ${Q}`,
        params: ({ keyword: A, schemaCode: Q })=>y91._`{comparison: ${x91[A].okStr}, limit: ${Q}}`
    }, NY3 = {
        keyword: Object.keys(x91),
        type: "number",
        schemaType: "number",
        $data: !0,
        error: qY3,
        code (A) {
            let { keyword: Q, data: B, schemaCode: G } = A;
            A.fail$data(y91._`${B} ${x91[Q].fail} ${G} || isNaN(${B})`);
        }
    };
    WfB.default = NY3;
});
