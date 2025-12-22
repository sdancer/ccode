// Module: ME
// Type: U
// Lines: 65044-65055
//
var renderElement = U((I54)=>{
    var l4Q = p4Q(), J54 = (A)=>A[l4Q.SMITHY_CONTEXT_KEY] || (A[l4Q.SMITHY_CONTEXT_KEY] = {}), X54 = (A)=>{
        if (typeof A === "function") return A;
        let Q = Promise.resolve(A);
        return ()=>Q;
    };
    I54.getSmithyContext = J54;
    I54.normalizeProvider = X54;
});
