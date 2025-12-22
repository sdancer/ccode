// Module: tG9
// Type: U
// Lines: 497459-497484
//
var tG9 = U((O87)=>{
    var tL0 = rG9();
    O87.mul = function(Q, B) {
        let G = new Uint8Array(Q.length + B.length - 1);
        for(let Z = 0; Z < Q.length; Z++)for(let Y = 0; Y < B.length; Y++)G[Z + Y] ^= tL0.mul(Q[Z], B[Y]);
        return G;
    };
    O87.mod = function(Q, B) {
        let G = new Uint8Array(Q);
        while(G.length - B.length >= 0){
            let Z = G[0];
            for(let J = 0; J < B.length; J++)G[J] ^= tL0.mul(B[J], Z);
            let Y = 0;
            while(Y < G.length && G[Y] === 0)Y++;
            G = G.slice(Y);
        }
        return G;
    };
    O87.generateECPolynomial = function(Q) {
        let B = new Uint8Array([
            1
        ]);
        for(let G = 0; G < Q; G++)B = O87.mul(B, new Uint8Array([
            1,
            tL0.exp(G)
        ]));
        return B;
    };
});
