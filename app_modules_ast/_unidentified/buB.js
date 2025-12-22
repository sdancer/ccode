// Module: buB
// Type: U
// Lines: 267921-267945
//
var trackPostpone = U((fuB)=>{
    Object.defineProperty(fuB, "__esModule", {
        value: !0
    });
    var HjA = a8(), ED3 = {
        message ({ keyword: A, schemaCode: Q }) {
            let B = A === "maxItems" ? "more" : "fewer";
            return HjA.str`must NOT have ${B} than ${Q} items`;
        },
        params: ({ schemaCode: A })=>HjA._`{limit: ${A}}`
    }, zD3 = {
        keyword: [
            "maxItems",
            "minItems"
        ],
        type: "array",
        schemaType: "number",
        $data: !0,
        error: ED3,
        code (A) {
            let { keyword: Q, data: B, schemaCode: G } = A, Z = Q === "maxItems" ? HjA.operators.GT : HjA.operators.LT;
            A.fail$data(HjA._`${B}.length ${Z} ${G}`);
        }
    };
    fuB.default = zD3;
});
