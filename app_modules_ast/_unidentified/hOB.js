// Module: hOB
// Type: U
// Lines: 233818-233839
//
var hOB = U((fOB)=>{
    Object.defineProperty(fOB, "__esModule", {
        value: !0
    });
    fOB.default = void 0;
    var Es8 = kOB(Ae1()), zs8 = kOB(bMA());
    function kOB(A) {
        return A && A.__esModule ? A : {
            default: A
        };
    }
    function Cs8(A, Q, B) {
        A = A || {};
        let G = A.random || (A.rng || Es8.default)();
        if (((G[6] = (G[6] & 15) | 64), (G[8] = (G[8] & 63) | 128), Q)) {
            B = B || 0;
            for(let Z = 0; Z < 16; ++Z)Q[B + Z] = G[Z];
            return Q;
        }
        return (0, zs8.default)(G);
    }
    var $s8 = Cs8;
    fOB.default = $s8;
});
