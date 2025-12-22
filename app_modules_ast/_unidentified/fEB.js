// Module: fEB
// Type: U
// Lines: 214562-214585
//
var fEB = U((vEB)=>{
    Object.defineProperty(vEB, "__esModule", {
        value: !0
    });
    vEB.default = void 0;
    var yEB = xEB(SEB()), em8 = xEB(Ra1()), Ad8 = cLA();
    function xEB(A) {
        return A && A.__esModule ? A : {
            default: A
        };
    }
    function Qd8(A, Q, B) {
        if (yEB.default.randomUUID && !Q && !A) return yEB.default.randomUUID();
        A = A || {};
        let G = A.random || (A.rng || em8.default)();
        if (((G[6] = (G[6] & 15) | 64), (G[8] = (G[8] & 63) | 128), Q)) {
            B = B || 0;
            for(let Z = 0; Z < 16; ++Z)Q[B + Z] = G[Z];
            return Q;
        }
        return (0, Ad8.unsafeStringify)(G);
    }
    var Bd8 = Qd8;
    vEB.default = Bd8;
});
