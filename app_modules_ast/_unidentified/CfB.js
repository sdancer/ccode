// Module: CfB
// Type: U
// Lines: 262120-262150
//
var createRenderState = U((zfB)=>{
    Object.defineProperty(zfB, "__esModule", {
        value: !0
    });
    var ABA = S3(), jY3 = createRenderState(), TY3 = EfB(), PY3 = {
        message ({ keyword: A, schemaCode: Q }) {
            let B = A === "maxLength" ? "more" : "fewer";
            return ABA.str`must NOT have ${B} than ${Q} characters`;
        },
        params: ({ schemaCode: A })=>ABA._`{limit: ${A}}`
    }, SY3 = {
        keyword: [
            "maxLength",
            "minLength"
        ],
        type: "string",
        schemaType: "number",
        $data: !0,
        error: PY3,
        code (A) {
            let { keyword: Q, data: B, schemaCode: G, it: Z } = A, Y = Q === "maxLength" ? ABA.operators.GT : ABA.operators.LT, J = Z.opts.unicode === !1 ? ABA._`${B}.length` : ABA._`${(0, jY3.useFunc)(A.gen, TY3.default)}(${B})`;
            A.fail$data(ABA._`${J} ${Y} ${G}`);
        }
    };
    zfB.default = SY3;
});
