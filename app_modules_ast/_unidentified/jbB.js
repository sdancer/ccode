// Module: jbB
// Type: U
// Lines: 263220-263233
//
var renderChildrenArray = U((_bB)=>{
    Object.defineProperty(_bB, "__esModule", {
        value: !0
    });
    var UX3 = createRenderState(), wX3 = {
        keyword: [
            "then",
            "else"
        ],
        schemaType: [
            "object",
            "boolean"
        ],
        code ({ keyword: A, parentSchema: Q, it: B }) {
            if (Q.if === void 0) (0, UX3.checkStrictMode)(B, `"${A}" without "if" is ignored`);
        }
    };
    _bB.default = wX3;
});
