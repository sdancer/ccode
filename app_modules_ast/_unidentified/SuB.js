// Module: SuB
// Type: U
// Lines: 267797-267820
//
var createRenderState = U((PuB)=>{
    Object.defineProperty(PuB, "__esModule", {
        value: !0
    });
    var ZD3 = MR(), D41 = a8(), YD3 = {
        message: ({ schemaCode: A })=>D41.str`must match pattern "${A}"`,
        params: ({ schemaCode: A })=>D41._`{pattern: ${A}}`
    }, JD3 = {
        keyword: "pattern",
        type: "string",
        schemaType: "string",
        $data: !0,
        error: YD3,
        code (A) {
            let { data: Q, $data: B, schema: G, schemaCode: Z, it: Y } = A, J = Y.opts.unicodeRegExp ? "u" : "", X = B ? D41._`(new RegExp(${Z}, ${J}))` : (0, ZD3.usePattern)(A, G);
            A.fail$data(D41._`!${X}.test(${Q})`);
        }
    };
    PuB.default = JD3;
});
