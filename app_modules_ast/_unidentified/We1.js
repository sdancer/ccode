// Module: We1
// Type: U
// Lines: 234532-234568
//
var renderElement = U((svG, YMB)=>{
    var kQ1 = qv().Buffer, cs8 = qA("stream"), ps8 = qA("util");
    function fQ1(A) {
        if (((this.buffer = null), (this.writable = !0), (this.readable = !0), !A)) return ((this.buffer = kQ1.alloc(0)), this);
        if (typeof A.pipe === "function") return ((this.buffer = kQ1.alloc(0)), A.pipe(this), this);
        if (A.length || typeof A === "object") return ((this.buffer = A), (this.writable = !1), process.nextTick(function() {
            (this.emit("end", A), (this.readable = !1), this.emit("close"));
        }.bind(this)), this);
        throw TypeError("Unexpected data type (" + typeof A + ")");
    }
    ps8.inherits(fQ1, cs8);
    fQ1.prototype.write = function(Q) {
        ((this.buffer = kQ1.concat([
            this.buffer,
            kQ1.from(Q)
        ])), this.emit("data", Q));
    };
    fQ1.prototype.end = function(Q) {
        if (Q) this.write(Q);
        (this.emit("end", Q), this.emit("close"), (this.writable = !1), (this.readable = !1));
    };
    YMB.exports = fQ1;
});
