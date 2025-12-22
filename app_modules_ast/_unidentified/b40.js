// Module: b40
// Type: U
// Lines: 265289-265323
//
var createRenderState = U((ahB)=>{
    Object.defineProperty(ahB, "__esModule", {
        value: !0
    });
    ahB.getRules = ahB.isJSONType = void 0;
    var AK3 = [
        "string",
        "number",
        "integer",
        "boolean",
        "null",
        "object",
        "array"
    ], QK3 = new Set(AK3);
    function BK3(A) {
        return typeof A == "string" && QK3.has(A);
    }
    ahB.isJSONType = BK3;
    function GK3() {
        let A = {
            number: {
                type: "number",
                rules: []
            },
            string: {
                type: "string",
                rules: []
            },
            array: {
                type: "array",
                rules: []
            },
            object: {
                type: "object",
                rules: []
            }
        };
        return {
            types: {
                ...A,
                integer: !0,
                boolean: !0,
                null: !0
            },
            rules: [
                {
                    rules: []
                },
                A.number,
                A.string,
                A.array,
                A.object
            ],
            post: {
                rules: []
            },
            all: {},
            keywords: {}
        };
    }
    ahB.getRules = GK3;
});
