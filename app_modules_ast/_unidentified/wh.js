// Module: wh
// Type: U
// Lines: 83768-83801
//
var createRenderState = U((mR4)=>{
    var a_1 = OXQ(), gR4 = createRenderState(), uR4 = qA("buffer"), MXQ = qA("crypto");
    class _XQ {
        algorithmIdentifier;
        secret;
        hash;
        constructor(A, Q){
            ((this.algorithmIdentifier = A), (this.secret = Q), this.reset());
        }
        update(A, Q) {
            this.hash.update(gR4.toUint8Array(RXQ(A, Q)));
        }
        digest() {
            return Promise.resolve(this.hash.digest());
        }
        reset() {
            this.hash = this.secret ? MXQ.createHmac(this.algorithmIdentifier, RXQ(this.secret)) : MXQ.createHash(this.algorithmIdentifier);
        }
    }
    function RXQ(A, Q) {
        if (uR4.Buffer.isBuffer(A)) return A;
        if (typeof A === "string") return a_1.fromString(A, Q);
        if (ArrayBuffer.isView(A)) return a_1.fromArrayBuffer(A.buffer, A.byteOffset, A.byteLength);
        return a_1.fromArrayBuffer(A);
    }
    mR4.Hash = _XQ;
});
