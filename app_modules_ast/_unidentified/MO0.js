// Module: MO0
// Type: U
// Lines: 498559-498587
//
var MO0 = U((H0J, fZ9)=>{
    var LO0 = [];
    (function() {
        for(let A = 0; A < 256; A++){
            let Q = A;
            for(let B = 0; B < 8; B++)if (Q & 1) Q = 3988292384 ^ (Q >>> 1);
            else Q = Q >>> 1;
            LO0[A] = Q;
        }
    })();
    var OO0 = (fZ9.exports = function() {
        this._crc = -1;
    });
    OO0.prototype.write = function(A) {
        for(let Q = 0; Q < A.length; Q++)this._crc = LO0[(this._crc ^ A[Q]) & 255] ^ (this._crc >>> 8);
        return !0;
    };
    OO0.prototype.crc32 = function() {
        return this._crc ^ -1;
    };
    OO0.crc32 = function(A) {
        let Q = -1;
        for(let B = 0; B < A.length; B++)Q = LO0[(Q ^ A[B]) & 255] ^ (Q >>> 8);
        return Q ^ -1;
    };
});
