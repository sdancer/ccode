// Module: uG9
// Type: U
// Lines: 497192-497215
//
var uG9 = U((u1J, gG9)=>{
    function efA(A) {
        if (!A || A < 1) throw Error("BitMatrix size must be defined and greater than 0");
        ((this.size = A), (this.data = new Uint8Array(A * A)), (this.reservedBit = new Uint8Array(A * A)));
    }
    efA.prototype.set = function(A, Q, B, G) {
        let Z = A * this.size + Q;
        if (((this.data[Z] = B), G)) this.reservedBit[Z] = !0;
    };
    efA.prototype.get = function(A, Q) {
        return this.data[A * this.size + Q];
    };
    efA.prototype.xor = function(A, Q, B) {
        this.data[A * this.size + Q] ^= B;
    };
    efA.prototype.isReserved = function(A, Q) {
        return this.reservedBit[A * this.size + Q];
    };
    gG9.exports = efA;
});
