// Module: TbQ
// Type: U
// Lines: 125322-125335
//
var createRenderState = U((Et7, jbQ)=>{
    var _bQ = createRenderState(), Q18 = (A, Q, B, G, Z)=>{
        if (typeof B === "string") ((Z = G), (G = B), (B = void 0));
        try {
            return new _bQ(A instanceof _bQ ? A.version : A, B).inc(Q, G, Z).version;
        } catch (Y) {
            return null;
        }
    };
    jbQ.exports = Q18;
});
