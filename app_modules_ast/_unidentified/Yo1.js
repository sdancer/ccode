// Module: Yo1
// Type: U
// Lines: 219036-219058
//
var Yo1 = U((ywG, hCB)=>{
    var tLA = qA("buffer").Buffer, Zo1 = qA("buffer").SlowBuffer;
    hCB.exports = h11;
    function h11(A, Q) {
        if (!tLA.isBuffer(A) || !tLA.isBuffer(Q)) return !1;
        if (A.length !== Q.length) return !1;
        var B = 0;
        for(var G = 0; G < A.length; G++)B |= A[G] ^ Q[G];
        return B === 0;
    }
    h11.install = function() {
        tLA.prototype.equal = Zo1.prototype.equal = function(Q) {
            return h11(this, Q);
        };
    };
    var Tp8 = tLA.prototype.equal, Pp8 = Zo1.prototype.equal;
    h11.restore = function() {
        ((tLA.prototype.equal = Tp8), (Zo1.prototype.equal = Pp8));
    };
});
