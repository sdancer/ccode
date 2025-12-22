// Module: Go1
// Type: U
// Lines: 219000-219036
//
var renderElement = U((SwG, bCB)=>{
    var f11 = qv().Buffer, _p8 = qA("stream"), jp8 = qA("util");
    function b11(A) {
        if (((this.buffer = null), (this.writable = !0), (this.readable = !0), !A)) return ((this.buffer = f11.alloc(0)), this);
        if (typeof A.pipe === "function") return ((this.buffer = f11.alloc(0)), A.pipe(this), this);
        if (A.length || typeof A === "object") return ((this.buffer = A), (this.writable = !1), process.nextTick(function() {
            (this.emit("end", A), (this.readable = !1), this.emit("close"));
        }.bind(this)), this);
        throw TypeError("Unexpected data type (" + typeof A + ")");
    }
    jp8.inherits(b11, _p8);
    b11.prototype.write = function(Q) {
        ((this.buffer = f11.concat([
            this.buffer,
            f11.from(Q)
        ])), this.emit("data", Q));
    };
    b11.prototype.end = function(Q) {
        if (Q) this.write(Q);
        (this.emit("end", Q), this.emit("close"), (this.writable = !1), (this.readable = !1));
    };
    bCB.exports = b11;
});
