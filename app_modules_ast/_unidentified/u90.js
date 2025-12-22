// Module: u90
// Type: U
// Lines: 259144-259167
//
var u90 = U((NvB)=>{
    Object.defineProperty(NvB, "__esModule", {
        value: !0
    });
    NvB.shouldUseRule = NvB.shouldUseGroup = NvB.schemaHasRulesForType = void 0;
    function Z73({ schema: A, self: Q }, B) {
        let G = Q.RULES.types[B];
        return G && G !== !0 && wvB(A, G);
    }
    NvB.schemaHasRulesForType = Z73;
    function wvB(A, Q) {
        return Q.rules.some((B)=>qvB(A, B));
    }
    NvB.shouldUseGroup = wvB;
    function qvB(A, Q) {
        var B;
        return (A[Q.keyword] !== void 0 || ((B = Q.definition.implements) === null || B === void 0 ? void 0 : B.some((G)=>A[G] !== void 0)));
    }
    NvB.shouldUseRule = qvB;
});
