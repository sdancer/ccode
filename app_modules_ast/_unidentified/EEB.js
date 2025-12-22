// Module: EEB
// Type: U
// Lines: 214393-214442
//
var EEB = U((DEB)=>{
    Object.defineProperty(DEB, "__esModule", {
        value: !0
    });
    DEB.default = void 0;
    var Rm8 = jm8(Ra1()), _m8 = cLA();
    function jm8(A) {
        return A && A.__esModule ? A : {
            default: A
        };
    }
    var HEB, _a1, ja1 = 0, Ta1 = 0;
    function Tm8(A, Q, B) {
        let G = (Q && B) || 0, Z = Q || Array(16);
        A = A || {};
        let Y = A.node || HEB, J = A.clockseq !== void 0 ? A.clockseq : _a1;
        if (Y == null || J == null) {
            let H = A.random || (A.rng || Rm8.default)();
            if (Y == null) Y = HEB = [
                H[0] | 1,
                H[1],
                H[2],
                H[3],
                H[4],
                H[5]
            ];
            if (J == null) J = _a1 = ((H[6] << 8) | H[7]) & 16383;
        }
        let X = A.msecs !== void 0 ? A.msecs : Date.now(), I = A.nsecs !== void 0 ? A.nsecs : Ta1 + 1, W = X - ja1 + (I - Ta1) / 1e4;
        if (W < 0 && A.clockseq === void 0) J = (J + 1) & 16383;
        if ((W < 0 || X > ja1) && A.nsecs === void 0) I = 0;
        if (I >= 1e4) throw Error("uuid.v1(): Can't create more than 10M uuids/sec");
        ((ja1 = X), (Ta1 = I), (_a1 = J), (X += 12219292800000));
        let K = ((X & 268435455) * 1e4 + I) % 4294967296;
        ((Z[G++] = (K >>> 24) & 255), (Z[G++] = (K >>> 16) & 255), (Z[G++] = (K >>> 8) & 255), (Z[G++] = K & 255));
        let V = ((X / 4294967296) * 1e4) & 268435455;
        ((Z[G++] = (V >>> 8) & 255), (Z[G++] = V & 255), (Z[G++] = ((V >>> 24) & 15) | 16), (Z[G++] = (V >>> 16) & 255), (Z[G++] = (J >>> 8) | 128), (Z[G++] = J & 255));
        for(let H = 0; H < 6; ++H)Z[G + H] = Y[H];
        return Q || (0, _m8.unsafeStringify)(Z);
    }
    var Pm8 = Tm8;
    DEB.default = Pm8;
});
