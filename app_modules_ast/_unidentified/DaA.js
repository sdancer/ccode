// Module: DaA
// Type: U
// Lines: 122287-122339
//
var DaA = U((Cr7, hkQ)=>{
    var { maxUnsigned16Bit: ft6 } = fAA(), Eh1, GwA = null, OGA = 16386;
    try {
        Eh1 = qA("node:crypto");
    } catch  {
        Eh1 = {
            randomFillSync: function(Q, B, G) {
                for(let Z = 0; Z < Q.length; ++Z)Q[Z] = (Math.random() * 255) | 0;
                return Q;
            }
        };
    }
    function bt6() {
        if (OGA === 16386) ((OGA = 0), Eh1.randomFillSync((GwA ??= Buffer.allocUnsafe(16386)), 0, 16386));
        return [
            GwA[OGA++],
            GwA[OGA++],
            GwA[OGA++],
            GwA[OGA++]
        ];
    }
    class bkQ {
        constructor(A){
            this.frameData = A;
        }
        createFrame(A) {
            let Q = this.frameData, B = bt6(), G = Q?.byteLength ?? 0, Z = G, Y = 6;
            if (G > ft6) ((Y += 8), (Z = 127));
            else if (G > 125) ((Y += 2), (Z = 126));
            let J = Buffer.allocUnsafe(G + Y);
            ((J[0] = J[1] = 0), (J[0] |= 128), (J[0] = (J[0] & 240) + A));
            /*! ws. MIT License. Einar Otto Stangvik <einaros@gmail.com> */ if (((J[Y - 4] = B[0]), (J[Y - 3] = B[1]), (J[Y - 2] = B[2]), (J[Y - 1] = B[3]), (J[1] = Z), Z === 126)) J.writeUInt16BE(G, 2);
            else if (Z === 127) ((J[2] = J[3] = 0), J.writeUIntBE(G, 4, 6));
            J[1] |= 128;
            for(let X = 0; X < G; ++X)J[Y + X] = Q[X] ^ B[X & 3];
            return J;
        }
    }
    hkQ.exports = {
        WebsocketFrameSend: bkQ
    };
});
