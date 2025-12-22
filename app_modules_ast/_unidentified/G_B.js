// Module: G_B
// Type: U
// Lines: 236111-236134
//
var G_B = U((dkG, B_B)=>{
    var VA3 = createRenderState(), HA3 = createRenderState(), DA3 = (A, Q, B)=>{
        let G = null, Z = null, Y = null;
        try {
            Y = new HA3(Q, B);
        } catch (J) {
            return null;
        }
        return (A.forEach((J)=>{
            if (Y.test(J)) {
                if (!G || Z.compare(J) === 1) ((G = J), (Z = new VA3(G, B)));
            }
        }), G);
    };
    B_B.exports = DA3;
});
