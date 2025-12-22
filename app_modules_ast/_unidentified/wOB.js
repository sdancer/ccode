// Module: wOB
// Type: U
// Lines: 233660-233709
//
var wOB = U(($OB)=>{
    Object.defineProperty($OB, "__esModule", {
        value: !0
    });
    $OB.default = void 0;
    var nr8 = COB(Ae1()), ar8 = COB(bMA());
    function COB(A) {
        return A && A.__esModule ? A : {
            default: A
        };
    }
    var zOB, Qe1, Be1 = 0, Ge1 = 0;
    function or8(A, Q, B) {
        let G = (Q && B) || 0, Z = Q || Array(16);
        A = A || {};
        let Y = A.node || zOB, J = A.clockseq !== void 0 ? A.clockseq : Qe1;
        if (Y == null || J == null) {
            let H = A.random || (A.rng || nr8.default)();
            if (Y == null) Y = zOB = [
                H[0] | 1,
                H[1],
                H[2],
                H[3],
                H[4],
                H[5]
            ];
            if (J == null) J = Qe1 = ((H[6] << 8) | H[7]) & 16383;
        }
        let X = A.msecs !== void 0 ? A.msecs : Date.now(), I = A.nsecs !== void 0 ? A.nsecs : Ge1 + 1, W = X - Be1 + (I - Ge1) / 1e4;
        if (W < 0 && A.clockseq === void 0) J = (J + 1) & 16383;
        if ((W < 0 || X > Be1) && A.nsecs === void 0) I = 0;
        if (I >= 1e4) throw Error("uuid.v1(): Can't create more than 10M uuids/sec");
        ((Be1 = X), (Ge1 = I), (Qe1 = J), (X += 12219292800000));
        let K = ((X & 268435455) * 1e4 + I) % 4294967296;
        ((Z[G++] = (K >>> 24) & 255), (Z[G++] = (K >>> 16) & 255), (Z[G++] = (K >>> 8) & 255), (Z[G++] = K & 255));
        let V = ((X / 4294967296) * 1e4) & 268435455;
        ((Z[G++] = (V >>> 8) & 255), (Z[G++] = V & 255), (Z[G++] = ((V >>> 24) & 15) | 16), (Z[G++] = (V >>> 16) & 255), (Z[G++] = (J >>> 8) | 128), (Z[G++] = J & 255));
        for(let H = 0; H < 6; ++H)Z[G + H] = Y[H];
        return Q || (0, ar8.default)(Z);
    }
    var rr8 = or8;
    $OB.default = rr8;
});
