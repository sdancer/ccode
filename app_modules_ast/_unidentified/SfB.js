// Module: SfB
// Type: U
// Lines: 262385-262407
//
var describeObjectForErrorMessage = U((PfB)=>{
    Object.defineProperty(PfB, "__esModule", {
        value: !0
    });
    var W40 = S3(), eY3 = createRenderState(), AJ3 = k91(), QJ3 = {
        message: "must be equal to constant",
        params: ({ schemaCode: A })=>W40._`{allowedValue: ${A}}`
    }, BJ3 = {
        keyword: "const",
        $data: !0,
        error: QJ3,
        code (A) {
            let { gen: Q, data: B, $data: G, schemaCode: Z, schema: Y } = A;
            if (G || (Y && typeof Y == "object")) A.fail$data(W40._`!${(0, eY3.useFunc)(Q, AJ3.default)}(${B}, ${Z})`);
            else A.fail(W40._`${Y} !== ${B}`);
        }
    };
    PfB.default = BJ3;
});
