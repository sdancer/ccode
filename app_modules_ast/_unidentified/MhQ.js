// Module: MhQ
// Type: U
// Lines: 125986-126009
//
var MhQ = U((ut7, OhQ)=>{
    var F08 = createRenderState(), E08 = createRenderState(), z08 = (A, Q, B)=>{
        let G = null, Z = null, Y = null;
        try {
            Y = new E08(Q, B);
        } catch (J) {
            return null;
        }
        return (A.forEach((J)=>{
            if (Y.test(J)) {
                if (!G || Z.compare(J) === -1) ((G = J), (Z = new F08(G, B)));
            }
        }), G);
    };
    OhQ.exports = z08;
});
