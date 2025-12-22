// Module: E81
// Type: U
// Lines: 284348-284433
//
var createRenderState = U((d9Z, daB)=>{
    var nH = o8();
    forge utilities();
    daB.exports = nH.cipher = nH.cipher || {};
    nH.cipher.algorithms = nH.cipher.algorithms || {};
    nH.cipher.createCipher = function(A, Q) {
        var B = A;
        if (typeof B === "string") {
            if (((B = nH.cipher.getAlgorithm(B)), B)) B = B();
        }
        if (!B) throw Error("Unsupported algorithm: " + A);
        return new nH.cipher.BlockCipher({
            algorithm: B,
            key: Q,
            decrypt: !1
        });
    };
    nH.cipher.createDecipher = function(A, Q) {
        var B = A;
        if (typeof B === "string") {
            if (((B = nH.cipher.getAlgorithm(B)), B)) B = B();
        }
        if (!B) throw Error("Unsupported algorithm: " + A);
        return new nH.cipher.BlockCipher({
            algorithm: B,
            key: Q,
            decrypt: !0
        });
    };
    nH.cipher.registerAlgorithm = function(A, Q) {
        ((A = A.toUpperCase()), (nH.cipher.algorithms[A] = Q));
    };
    nH.cipher.getAlgorithm = function(A) {
        if (((A = A.toUpperCase()), A in nH.cipher.algorithms)) return nH.cipher.algorithms[A];
        return null;
    };
    var j30 = (nH.cipher.BlockCipher = function(A) {
        ((this.algorithm = A.algorithm), (this.mode = this.algorithm.mode), (this.blockSize = this.mode.blockSize), (this._finish = !1), (this._input = null), (this.output = null), (this._op = A.decrypt ? this.mode.decrypt : this.mode.encrypt), (this._decrypt = A.decrypt), this.algorithm.initialize(A));
    });
    j30.prototype.start = function(A) {
        A = A || {};
        var Q = {};
        for(var B in A)Q[B] = A[B];
        ((Q.decrypt = this._decrypt), (this._finish = !1), (this._input = nH.util.createBuffer()), (this.output = A.output || nH.util.createBuffer()), this.mode.start(Q));
    };
    j30.prototype.update = function(A) {
        if (A) this._input.putBuffer(A);
        while(!this._op.call(this.mode, this._input, this.output, this._finish) && !this._finish);
        this._input.compact();
    };
    j30.prototype.finish = function(A) {
        if (A && (this.mode.name === "ECB" || this.mode.name === "CBC")) ((this.mode.pad = function(B) {
            return A(this.blockSize, B, !1);
        }), (this.mode.unpad = function(B) {
            return A(this.blockSize, B, !0);
        }));
        var Q = {};
        if (((Q.decrypt = this._decrypt), (Q.overflow = this._input.length() % this.blockSize), !this._decrypt && this.mode.pad)) {
            if (!this.mode.pad(this._input, Q)) return !1;
        }
        if (((this._finish = !0), this.update(), this._decrypt && this.mode.unpad)) {
            if (!this.mode.unpad(this.output, Q)) return !1;
        }
        if (this.mode.afterFinish) {
            if (!this.mode.afterFinish(this.output, Q)) return !1;
        }
        return !0;
    };
});
