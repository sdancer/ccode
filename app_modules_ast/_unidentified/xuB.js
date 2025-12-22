// Module: xuB
// Type: U
// Lines: 267820-267844
//
var renderChildrenArray = U((yuB)=>{
    Object.defineProperty(yuB, "__esModule", {
        value: !0
    });
    var WjA = a8(), ID3 = {
        message ({ keyword: A, schemaCode: Q }) {
            let B = A === "maxProperties" ? "more" : "fewer";
            return WjA.str`must NOT have ${B} than ${Q} properties`;
        },
        params: ({ schemaCode: A })=>WjA._`{limit: ${A}}`
    }, WD3 = {
        keyword: [
            "maxProperties",
            "minProperties"
        ],
        type: "object",
        schemaType: "number",
        $data: !0,
        error: ID3,
        code (A) {
            let { keyword: Q, data: B, schemaCode: G } = A, Z = Q === "maxProperties" ? WjA.operators.GT : WjA.operators.LT;
            A.fail$data(WjA._`Object.keys(${B}).length ${Z} ${G}`);
        }
    };
    yuB.default = WD3;
});
