// Module: Ko1
// Type: U
// Lines: 219225-219233
//
var createRenderState = U((vwG, aCB)=>{
    var cp8 = qA("buffer").Buffer;
    aCB.exports = function(Q) {
        if (typeof Q === "string") return Q;
        if (typeof Q === "number" || cp8.isBuffer(Q)) return Q.toString();
        return JSON.stringify(Q);
    };
});
