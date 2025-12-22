// Module: Xp1
// Type: U
// Lines: 176227-176267
//
var performWork = U((cXG, C5B)=>{
    var Jp1 = color conversion(), lq8 = z5B(), BYA = {}, iq8 = Object.keys(Jp1);
    function nq8(A) {
        let Q = function(...B) {
            let G = B[0];
            if (G === void 0 || G === null) return G;
            if (G.length > 1) B = G;
            return A(B);
        };
        if ("conversion" in A) Q.conversion = A.conversion;
        return Q;
    }
    function aq8(A) {
        let Q = function(...B) {
            let G = B[0];
            if (G === void 0 || G === null) return G;
            if (G.length > 1) B = G;
            let Z = A(B);
            if (typeof Z === "object") for(let Y = Z.length, J = 0; J < Y; J++)Z[J] = Math.round(Z[J]);
            return Z;
        };
        if ("conversion" in A) Q.conversion = A.conversion;
        return Q;
    }
    iq8.forEach((A)=>{
        ((BYA[A] = {}), Object.defineProperty(BYA[A], "channels", {
            value: Jp1[A].channels
        }), Object.defineProperty(BYA[A], "labels", {
            value: Jp1[A].labels
        }));
        let Q = lq8(A);
        Object.keys(Q).forEach((G)=>{
            let Z = Q[G];
            ((BYA[A][G] = aq8(Z)), (BYA[A][G].raw = nq8(Z)));
        });
    });
    C5B.exports = BYA;
});
