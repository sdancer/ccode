// Module: pfB
// Type: U
// Lines: 262581-262593
//
var pfB = U((cfB)=>{
    Object.defineProperty(cfB, "__esModule", {
        value: !0
    });
    var _J3 = renderNode(), jJ3 = {
        keyword: "prefixItems",
        type: "array",
        schemaType: [
            "array"
        ],
        before: "uniqueItems",
        code: (A)=>(0, _J3.validateTuple)(A, "items")
    };
    cfB.default = jJ3;
});
