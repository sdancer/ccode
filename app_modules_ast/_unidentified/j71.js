// Module: j71
// Type: U
// Lines: 345427-345463
//
var j71 = U((LFZ, qZ2)=>{
    qZ2.exports = xk;
    var ba3 = toNumber();
    function xk(A) {
        if (A) for(var Q = Object.keys(A), B = 0; B < Q.length; ++B)this[Q[B]] = A[Q[B]];
    }
    xk.create = function(Q) {
        return this.$type.create(Q);
    };
    xk.encode = function(Q, B) {
        return this.$type.encode(Q, B);
    };
    xk.encodeDelimited = function(Q, B) {
        return this.$type.encodeDelimited(Q, B);
    };
    xk.decode = function(Q) {
        return this.$type.decode(Q);
    };
    xk.decodeDelimited = function(Q) {
        return this.$type.decodeDelimited(Q);
    };
    xk.verify = function(Q) {
        return this.$type.verify(Q);
    };
    xk.fromObject = function(Q) {
        return this.$type.fromObject(Q);
    };
    xk.toObject = function(Q, B) {
        return this.$type.toObject(Q, B);
    };
    xk.prototype.toJSON = function() {
        return this.$type.toObject(this, ba3.toJSONOptions);
    };
});
