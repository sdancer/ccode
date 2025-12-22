// Module: TuB
// Type: U
// Lines: 267767-267797
//
var createRenderState = U((juB)=>{
    Object.defineProperty(juB, "__esModule", {
        value: !0
    });
    var JBA = a8(), eH3 = createRenderState(), AD3 = _uB(), QD3 = {
        message ({ keyword: A, schemaCode: Q }) {
            let B = A === "maxLength" ? "more" : "fewer";
            return JBA.str`must NOT have ${B} than ${Q} characters`;
        },
        params: ({ schemaCode: A })=>JBA._`{limit: ${A}}`
    }, BD3 = {
        keyword: [
            "maxLength",
            "minLength"
        ],
        type: "string",
        schemaType: "number",
        $data: !0,
        error: QD3,
        code (A) {
            let { keyword: Q, data: B, schemaCode: G, it: Z } = A, Y = Q === "maxLength" ? JBA.operators.GT : JBA.operators.LT, J = Z.opts.unicode === !1 ? JBA._`${B}.length` : JBA._`${(0, eH3.useFunc)(A.gen, AD3.default)}(${B})`;
            A.fail$data(JBA._`${J} ${Y} ${G}`);
        }
    };
    juB.default = BD3;
});
