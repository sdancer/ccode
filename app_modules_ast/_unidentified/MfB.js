// Module: MfB
// Type: U
// Lines: 262274-262298
//
var trackPostpone = U((OfB)=>{
    Object.defineProperty(OfB, "__esModule", {
        value: !0
    });
    var l_A = S3(), pY3 = {
        message ({ keyword: A, schemaCode: Q }) {
            let B = A === "maxItems" ? "more" : "fewer";
            return l_A.str`must NOT have ${B} than ${Q} items`;
        },
        params: ({ schemaCode: A })=>l_A._`{limit: ${A}}`
    }, lY3 = {
        keyword: [
            "maxItems",
            "minItems"
        ],
        type: "array",
        schemaType: "number",
        $data: !0,
        error: pY3,
        code (A) {
            let { keyword: Q, data: B, schemaCode: G } = A, Z = Q === "maxItems" ? l_A.operators.GT : l_A.operators.LT;
            A.fail$data(l_A._`${B}.length ${Z} ${G}`);
        }
    };
    OfB.default = lY3;
});
