// Module: NuB
// Type: U
// Lines: 267697-267726
//
var trackPostpone = U((quB)=>{
    Object.defineProperty(quB, "__esModule", {
        value: !0
    });
    var V41 = a8(), Ca = V41.operators, H41 = {
        maximum: {
            okStr: "<=",
            ok: Ca.LTE,
            fail: Ca.GT
        },
        minimum: {
            okStr: ">=",
            ok: Ca.GTE,
            fail: Ca.LT
        },
        exclusiveMaximum: {
            okStr: "<",
            ok: Ca.LT,
            fail: Ca.GTE
        },
        exclusiveMinimum: {
            okStr: ">",
            ok: Ca.GT,
            fail: Ca.LTE
        }
    }, iH3 = {
        message: ({ keyword: A, schemaCode: Q })=>V41.str`must be ${H41[A].okStr} ${Q}`,
        params: ({ keyword: A, schemaCode: Q })=>V41._`{comparison: ${H41[A].okStr}, limit: ${Q}}`
    }, nH3 = {
        keyword: Object.keys(H41),
        type: "number",
        schemaType: "number",
        $data: !0,
        error: iH3,
        code (A) {
            let { keyword: Q, data: B, schemaCode: G } = A;
            A.fail$data(V41._`${B} ${H41[Q].fail} ${G} || isNaN(${B})`);
        }
    };
    quB.default = nH3;
});
