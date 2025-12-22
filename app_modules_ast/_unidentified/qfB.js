// Module: qfB
// Type: U
// Lines: 262173-262197
//
var renderChildrenArray = U((wfB)=>{
    Object.defineProperty(wfB, "__esModule", {
        value: !0
    });
    var d_A = S3(), bY3 = {
        message ({ keyword: A, schemaCode: Q }) {
            let B = A === "maxProperties" ? "more" : "fewer";
            return d_A.str`must NOT have ${B} than ${Q} properties`;
        },
        params: ({ schemaCode: A })=>d_A._`{limit: ${A}}`
    }, hY3 = {
        keyword: [
            "maxProperties",
            "minProperties"
        ],
        type: "object",
        schemaType: "number",
        $data: !0,
        error: bY3,
        code (A) {
            let { keyword: Q, data: B, schemaCode: G } = A, Z = Q === "maxProperties" ? d_A.operators.GT : d_A.operators.LT;
            A.fail$data(d_A._`Object.keys(${B}).length ${Z} ${G}`);
        }
    };
    wfB.default = hY3;
});
