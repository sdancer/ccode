// Module: ozB
// Type: U
// Lines: 217714-217755
//
var createRenderState = U((nzB)=>{
    Object.defineProperty(nzB, "__esModule", {
        value: !0
    });
    nzB.NodeCrypto = void 0;
    var zJA = qA("crypto");
    class izB {
        async sha256DigestBase64(A) {
            return zJA.createHash("sha256").update(A).digest("base64");
        }
        randomBytesBase64(A) {
            return zJA.randomBytes(A).toString("base64");
        }
        async verify(A, Q, B) {
            let G = zJA.createVerify("RSA-SHA256");
            return (G.update(Q), G.end(), G.verify(A, B, "base64"));
        }
        async sign(A, Q) {
            let B = zJA.createSign("RSA-SHA256");
            return (B.update(Q), B.end(), B.sign(A, "base64"));
        }
        decodeBase64StringUtf8(A) {
            return Buffer.from(A, "base64").toString("utf-8");
        }
        encodeBase64StringUtf8(A) {
            return Buffer.from(A, "utf-8").toString("base64");
        }
        async sha256DigestHex(A) {
            return zJA.createHash("sha256").update(A).digest("hex");
        }
        async signWithHmacSha256(A, Q) {
            let B = typeof A === "string" ? A : kc8(A);
            return vc8(zJA.createHmac("sha256", B).update(Q).digest());
        }
    }
    nzB.NodeCrypto = izB;
    function vc8(A) {
        return A.buffer.slice(A.byteOffset, A.byteOffset + A.byteLength);
    }
    function kc8(A) {
        return Buffer.from(A);
    }
});
