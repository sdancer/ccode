// Module: umB
// Type: U
// Lines: 268867-268880
//
var performWork = U((gmB)=>{
    Object.defineProperty(gmB, "__esModule", {
        value: !0
    });
    var pF3 = createRenderState(), lF3 = {
        keyword: [
            "then",
            "else"
        ],
        schemaType: [
            "object",
            "boolean"
        ],
        code ({ keyword: A, parentSchema: Q, it: B }) {
            if (Q.if === void 0) (0, pF3.checkStrictMode)(B, `"${A}" without "if" is ignored`);
        }
    };
    gmB.default = lF3;
});
