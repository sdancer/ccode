// Module: A$B
// Type: U
// Lines: 219233-219307
//
var rpcCall = U((kwG, eCB)=>{
    var pp8 = qv().Buffer, oCB = renderElement(), lp8 = describeNativeComponentFrame(), ip8 = qA("stream"), rCB = createRenderState(), Vo1 = qA("util");
    function sCB(A, Q) {
        return pp8.from(A, Q).toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
    }
    function np8(A, Q, B) {
        B = B || "utf8";
        var G = sCB(rCB(A), "binary"), Z = sCB(rCB(Q), B);
        return Vo1.format("%s.%s", G, Z);
    }
    function tCB(A) {
        var { header: Q, payload: B } = A, G = A.secret || A.privateKey, Z = A.encoding, Y = lp8(Q.alg), J = np8(Q, B, Z), X = Y.sign(J, G);
        return Vo1.format("%s.%s", J, X);
    }
    function g11(A) {
        var Q = A.secret || A.privateKey || A.key, B = new oCB(Q);
        ((this.readable = !0), (this.header = A.header), (this.encoding = A.encoding), (this.secret = this.privateKey = this.key = B), (this.payload = new oCB(A.payload)), this.secret.once("close", function() {
            if (!this.payload.writable && this.readable) this.sign();
        }.bind(this)), this.payload.once("close", function() {
            if (!this.secret.writable && this.readable) this.sign();
        }.bind(this)));
    }
    Vo1.inherits(g11, ip8);
    g11.prototype.sign = function() {
        try {
            var Q = tCB({
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
    g11.sign = tCB;
    eCB.exports = g11;
});
