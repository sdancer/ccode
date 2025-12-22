// Module: EZ9
// Type: U
// Lines: 497768-497789
//
var createRenderState = U((Q0J, FZ9)=>{
    var I37 = js();
    function YFA(A) {
        if (((this.mode = I37.BYTE), typeof A === "string")) this.data = new TextEncoder().encode(A);
        else this.data = new Uint8Array(A);
    }
    YFA.getBitsLength = function(Q) {
        return Q * 8;
    };
    YFA.prototype.getLength = function() {
        return this.data.length;
    };
    YFA.prototype.getBitsLength = function() {
        return YFA.getBitsLength(this.data.length);
    };
    YFA.prototype.write = function(A) {
        for(let Q = 0, B = this.data.length; Q < B; Q++)A.put(this.data[Q], 8);
    };
    FZ9.exports = YFA;
});
