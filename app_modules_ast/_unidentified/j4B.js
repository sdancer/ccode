// Module: j4B
// Type: U
// Lines: 168350-168357
//
var createRenderState = U((r7G, _4B)=>{
    var nC8 = /[|\\{}()[\]^$+*?.-]/g;
    _4B.exports = (A)=>{
        if (typeof A !== "string") throw TypeError("Expected a string");
        return A.replace(nC8, "\\$&");
    };
});
