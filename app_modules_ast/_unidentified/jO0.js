// Module: jO0
// Type: U
// Lines: 498938-498994
//
var jO0 = U((E0J, gZ9)=>{
    function t37(A, Q, B, G, Z) {
        let Y = 0;
        for(let J = 0; J < G; J++)for(let X = 0; X < B; X++){
            let I = Z[A[Y]];
            if (!I) throw Error("index " + A[Y] + " not in palette");
            for(let W = 0; W < 4; W++)Q[Y + W] = I[W];
            Y += 4;
        }
    }
    function e37(A, Q, B, G, Z) {
        let Y = 0;
        for(let J = 0; J < G; J++)for(let X = 0; X < B; X++){
            let I = !1;
            if (Z.length === 1) {
                if (Z[0] === A[Y]) I = !0;
            } else if (Z[0] === A[Y] && Z[1] === A[Y + 1] && Z[2] === A[Y + 2]) I = !0;
            if (I) for(let W = 0; W < 4; W++)Q[Y + W] = 0;
            Y += 4;
        }
    }
    function A57(A, Q, B, G, Z) {
        let Y = 255, J = Math.pow(2, Z) - 1, X = 0;
        for(let I = 0; I < G; I++)for(let W = 0; W < B; W++){
            for(let K = 0; K < 4; K++)Q[X + K] = Math.floor((A[X + K] * Y) / J + 0.5);
            X += 4;
        }
    }
    gZ9.exports = function(A, Q) {
        let { depth: B, width: G, height: Z, colorType: Y, transColor: J, palette: X } = Q, I = A;
        if (Y === 3) t37(A, I, G, Z, X);
        else {
            if (J) e37(A, I, G, Z, J);
            if (B !== 8) {
                if (B === 16) I = Buffer.alloc(G * Z * 4);
                A57(A, I, G, Z, B);
            }
        }
        return I;
    };
});
