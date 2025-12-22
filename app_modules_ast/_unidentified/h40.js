// Module: h40
// Type: U
// Lines: 265323-265346
//
var h40 = U((thB)=>{
    Object.defineProperty(thB, "__esModule", {
        value: !0
    });
    thB.shouldUseRule = thB.shouldUseGroup = thB.schemaHasRulesForType = void 0;
    function YK3({ schema: A, self: Q }, B) {
        let G = Q.RULES.types[B];
        return G && G !== !0 && rhB(A, G);
    }
    thB.schemaHasRulesForType = YK3;
    function rhB(A, Q) {
        return Q.rules.some((B)=>shB(A, B));
    }
    thB.shouldUseGroup = rhB;
    function shB(A, Q) {
        var B;
        return (A[Q.keyword] !== void 0 || ((B = Q.definition.implements) === null || B === void 0 ? void 0 : B.some((G)=>A[G] !== void 0)));
    }
    thB.shouldUseRule = shB;
});
