// Module: Q_B
// Type: U
// Lines: 236088-236111
//
var Q_B = U((mkG, A_B)=>{
    var IA3 = createRenderState(), WA3 = createRenderState(), KA3 = (A, Q, B)=>{
        let G = null, Z = null, Y = null;
        try {
            Y = new WA3(Q, B);
        } catch (J) {
            return null;
        }
        return (A.forEach((J)=>{
            if (Y.test(J)) {
                if (!G || Z.compare(J) === -1) ((G = J), (Z = new IA3(G, B)));
            }
        }), G);
    };
    A_B.exports = KA3;
});
