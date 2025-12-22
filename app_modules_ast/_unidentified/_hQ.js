// Module: _hQ
// Type: U
// Lines: 126009-126032
//
var _hQ = U((mt7, RhQ)=>{
    var C08 = createRenderState(), $08 = createRenderState(), U08 = (A, Q, B)=>{
        let G = null, Z = null, Y = null;
        try {
            Y = new $08(Q, B);
        } catch (J) {
            return null;
        }
        return (A.forEach((J)=>{
            if (Y.test(J)) {
                if (!G || Z.compare(J) === 1) ((G = J), (Z = new C08(G, B)));
            }
        }), G);
    };
    RhQ.exports = U08;
});
