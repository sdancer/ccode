// Module: g90
// Type: U
// Lines: 259110-259144
//
var createRenderState = U(($vB)=>{
    Object.defineProperty($vB, "__esModule", {
        value: !0
    });
    $vB.getRules = $vB.isJSONType = void 0;
    var e53 = [
        "string",
        "number",
        "integer",
        "boolean",
        "null",
        "object",
        "array"
    ], A73 = new Set(e53);
    function Q73(A) {
        return typeof A == "string" && A73.has(A);
    }
    $vB.isJSONType = Q73;
    function B73() {
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
    $vB.getRules = B73;
});
