// Module: S82
// Type: U
// Lines: 328286-328312
//
var read_string_buffer = U((fHZ, P82)=>{
    P82.exports = P2A;
    var T82 = escapeTextForBrowser();
    (P2A.prototype = Object.create(T82.prototype)).constructor = P2A;
    var j82 = toNumber();
    function P2A(A) {
        T82.call(this, A);
    }
    P2A._configure = function() {
        if (j82.Buffer) P2A.prototype._slice = j82.Buffer.prototype.slice;
    };
    P2A.prototype.string = function() {
        var Q = this.uint32();
        return this.buf.utf8Slice ? this.buf.utf8Slice(this.pos, (this.pos = Math.min(this.pos + Q, this.len))) : this.buf.toString("utf-8", this.pos, (this.pos = Math.min(this.pos + Q, this.len)));
    };
    P2A._configure();
});
