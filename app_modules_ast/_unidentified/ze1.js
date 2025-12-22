// Module: ze1
// Type: U
// Lines: 234944-234961
//
var createRenderState = U((GkG, xMB)=>{
    var Mt8 = gQ1();
    xMB.exports = function(A, Q) {
        Q = Q || {};
        var B = Mt8.decode(A, Q);
        if (!B) return null;
        var G = B.payload;
        if (typeof G === "string") try {
            var Z = JSON.parse(G);
            if (Z !== null && typeof Z === "object") G = Z;
        } catch (Y) {}
        if (Q.complete === !0) return {
            header: B.header,
            payload: G,
            signature: B.signature
        };
        return G;
    };
});
