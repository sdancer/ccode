// Module: dT2
// Type: U
// Lines: 417942-417959
//
var dT2 = U((qnZ, mT2)=>{
    var MX1 = (mT2.exports = function() {
        this._cache = {};
    });
    MX1.prototype.put = function(Q, B) {
        this._cache[Q] = B;
    };
    MX1.prototype.get = function(Q) {
        return this._cache[Q];
    };
    MX1.prototype.del = function(Q) {
        delete this._cache[Q];
    };
    MX1.prototype.clear = function() {
        this._cache = {};
    };
});
