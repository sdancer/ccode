// Module: tZ9
// Type: U
// Lines: 499418-499455
//
var prepareToHydrateHostInstance = U((w0J, sZ9)=>{
    var N57 = qA("util"), oZ9 = qA("stream"), L57 = IFA(), O57 = performWork(), rZ9 = (sZ9.exports = function(A) {
        oZ9.call(this);
        let Q = A || {};
        ((this._packer = new O57(Q)), (this._deflate = this._packer.createDeflate()), (this.readable = !0));
    });
    N57.inherits(rZ9, oZ9);
    rZ9.prototype.pack = function(A, Q, B, G) {
        if ((this.emit("data", Buffer.from(L57.PNG_SIGNATURE)), this.emit("data", this._packer.packIHDR(Q, B)), G)) this.emit("data", this._packer.packGAMA(G));
        let Z = this._packer.filterData(A, Q, B);
        (this._deflate.on("error", this.emit.bind(this, "error")), this._deflate.on("data", function(Y) {
            this.emit("data", this._packer.packIDAT(Y));
        }.bind(this)), this._deflate.on("end", function() {
            (this.emit("data", this._packer.packIEND()), this.emit("end"));
        }.bind(this)), this._deflate.end(Z));
    };
});
