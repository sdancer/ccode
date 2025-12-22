// Module: NnA
// Type: U
// Lines: 114888-114902
//
var NnA = U((Eo7, vPQ)=>{
    var pl6 = qnA();
    function ll6({ maxRedirections: A }) {
        return (Q)=>{
            return function(G, Z) {
                let { maxRedirections: Y = A } = G;
                if (!Y) return Q(G, Z);
                let J = new pl6(Q, Y, G, Z);
                return ((G = {
                    ...G,
                    maxRedirections: 0
                }), Q(G, J));
            };
        };
    }
    vPQ.exports = ll6;
});
