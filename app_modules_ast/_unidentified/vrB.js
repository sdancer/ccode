// Module: vrB
// Type: U
// Lines: 297224-297276
//
var vrB = U((q4Z, xrB)=>{
    var WL = o8();
    forge utilities();
    createRenderState();
    createRenderState();
    xrB.exports = WL.kem = WL.kem || {};
    var SrB = WL.jsbn.BigInteger;
    WL.kem.rsa = {};
    WL.kem.rsa.create = function(A, Q) {
        Q = Q || {};
        var B = Q.prng || WL.random, G = {};
        return ((G.encrypt = function(Z, Y) {
            var J = Math.ceil(Z.n.bitLength() / 8), X;
            do X = new SrB(WL.util.bytesToHex(B.getBytesSync(J)), 16).mod(Z.n);
            while (X.compareTo(SrB.ONE) <= 0)
            X = WL.util.hexToBytes(X.toString(16));
            var I = J - X.length;
            if (I > 0) X = WL.util.fillString(String.fromCharCode(0), I) + X;
            var W = Z.encrypt(X, "NONE"), K = A.generate(X, Y);
            return {
                encapsulation: W,
                key: K
            };
        }), (G.decrypt = function(Z, Y, J) {
            var X = Z.decrypt(Y, "NONE");
            return A.generate(X, J);
        }), G);
    };
    WL.kem.kdf1 = function(A, Q) {
        yrB(this, A, 0, Q || A.digestLength);
    };
    WL.kem.kdf2 = function(A, Q) {
        yrB(this, A, 1, Q || A.digestLength);
    };
    function yrB(A, Q, B, G) {
        A.generate = function(Z, Y) {
            var J = new WL.util.ByteBuffer(), X = Math.ceil(Y / G) + B, I = new WL.util.ByteBuffer();
            for(var W = B; W < X; ++W){
                (I.putInt32(W), Q.start(), Q.update(Z + I.getBytes()));
                var K = Q.digest();
                J.putBytes(K.getBytes(G));
            }
            return (J.truncate(J.length() - Y), J.getBytes());
        };
    }
});
