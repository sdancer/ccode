// Module: cuB
// Type: U
// Lines: 268032-268054
//
var describeObjectForErrorMessage = U((duB)=>{
    Object.defineProperty(duB, "__esModule", {
        value: !0
    });
    var B60 = a8(), OD3 = createRenderState(), MD3 = F41(), RD3 = {
        message: "must be equal to constant",
        params: ({ schemaCode: A })=>B60._`{allowedValue: ${A}}`
    }, _D3 = {
        keyword: "const",
        $data: !0,
        error: RD3,
        code (A) {
            let { gen: Q, data: B, $data: G, schemaCode: Z, schema: Y } = A;
            if (G || (Y && typeof Y == "object")) A.fail$data(B60._`!${(0, OD3.useFunc)(Q, MD3.default)}(${B}, ${Z})`);
            else A.fail(B60._`${Y} !== ${B}`);
        }
    };
    duB.default = _D3;
});
