// Module: qMB
// Type: U
// Lines: 234743-234816
//
var rpcCall = U((AkG, wMB)=>{
    var Zt8 = qv().Buffer, zMB = renderElement(), Yt8 = describeNativeComponentFrame(), Jt8 = qA("stream"), CMB = createRenderState(), Ee1 = qA("util");
    function $MB(A, Q) {
        return Zt8.from(A, Q).toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
    }
    function Xt8(A, Q, B) {
        B = B || "utf8";
        var G = $MB(CMB(A), "binary"), Z = $MB(CMB(Q), B);
        return Ee1.format("%s.%s", G, Z);
    }
    function UMB(A) {
        var { header: Q, payload: B } = A, G = A.secret || A.privateKey, Z = A.encoding, Y = Yt8(Q.alg), J = Xt8(Q, B, Z), X = Y.sign(J, G);
        return Ee1.format("%s.%s", J, X);
    }
    function bQ1(A) {
        var Q = A.secret || A.privateKey || A.key, B = new zMB(Q);
        ((this.readable = !0), (this.header = A.header), (this.encoding = A.encoding), (this.secret = this.privateKey = this.key = B), (this.payload = new zMB(A.payload)), this.secret.once("close", function() {
            if (!this.payload.writable && this.readable) this.sign();
        }.bind(this)), this.payload.once("close", function() {
            if (!this.secret.writable && this.readable) this.sign();
        }.bind(this)));
    }
    Ee1.inherits(bQ1, Jt8);
    bQ1.prototype.sign = function() {
        try {
            var Q = UMB({
                header: this.header,
                payload: this.payload.buffer,
                secret: this.secret.buffer,
                encoding: this.encoding
            });
            return (this.emit("done", Q), this.emit("data", Q), this.emit("end"), (this.readable = !1), Q);
        } catch (B) {
            ((this.readable = !1), this.emit("error", B), this.emit("close"));
        }
    };
    bQ1.sign = UMB;
    wMB.exports = bQ1;
});
