// Module: UfB
// Type: U
// Lines: 262150-262173
//
var createRenderState = U(($fB)=>{
    Object.defineProperty($fB, "__esModule", {
        value: !0
    });
    var xY3 = LR(), v91 = S3(), vY3 = {
        message: ({ schemaCode: A })=>v91.str`must match pattern "${A}"`,
        params: ({ schemaCode: A })=>v91._`{pattern: ${A}}`
    }, kY3 = {
        keyword: "pattern",
        type: "string",
        schemaType: "string",
        $data: !0,
        error: vY3,
        code (A) {
            let { data: Q, $data: B, schema: G, schemaCode: Z, it: Y } = A, J = Y.opts.unicodeRegExp ? "u" : "", X = B ? v91._`(new RegExp(${Z}, ${J}))` : (0, xY3.usePattern)(A, G);
            A.fail$data(v91._`!${X}.test(${Q})`);
        }
    };
    $fB.default = kY3;
});
