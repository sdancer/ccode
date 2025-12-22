// Module: VZ9
// Type: U
// Lines: 497673-497697
//
var VZ9 = U((e1J, KZ9)=>{
    var J37 = js();
    function GFA(A) {
        ((this.mode = J37.NUMERIC), (this.data = A.toString()));
    }
    GFA.getBitsLength = function(Q) {
        return 10 * Math.floor(Q / 3) + (Q % 3 ? (Q % 3) * 3 + 1 : 0);
    };
    GFA.prototype.getLength = function() {
        return this.data.length;
    };
    GFA.prototype.getBitsLength = function() {
        return GFA.getBitsLength(this.data.length);
    };
    GFA.prototype.write = function(Q) {
        let B, G, Z;
        for(B = 0; B + 3 <= this.data.length; B += 3)((G = this.data.substr(B, 3)), (Z = parseInt(G, 10)), Q.put(Z, 10));
        let Y = this.data.length - B;
        if (Y > 0) ((G = this.data.substr(B)), (Z = parseInt(G, 10)), Q.put(Z, Y * 3 + 1));
    };
    KZ9.exports = GFA;
});
