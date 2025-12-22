// Module: hG9
// Type: U
// Lines: 497168-497192
//
var hG9 = U((g1J, bG9)=>{
    function fG9() {
        ((this.buffer = []), (this.length = 0));
    }
    fG9.prototype = {
        get: function(A) {
            let Q = Math.floor(A / 8);
            return ((this.buffer[Q] >>> (7 - (A % 8))) & 1) === 1;
        },
        put: function(A, Q) {
            for(let B = 0; B < Q; B++)this.putBit(((A >>> (Q - B - 1)) & 1) === 1);
        },
        getLengthInBits: function() {
            return this.length;
        },
        putBit: function(A) {
            let Q = Math.floor(this.length / 8);
            if (this.buffer.length <= Q) this.buffer.push(0);
            if (A) this.buffer[Q] |= 128 >>> (this.length % 8);
            this.length++;
        }
    };
    bG9.exports = fG9;
});
