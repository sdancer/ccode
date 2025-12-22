// Module: Fe1
// Type: U
// Lines: 234735-234743
//
var createRenderState = U((evG, EMB)=>{
    var Gt8 = qA("buffer").Buffer;
    EMB.exports = function(Q) {
        if (typeof Q === "string") return Q;
        if (typeof Q === "number" || Gt8.isBuffer(Q)) return Q.toString();
        return JSON.stringify(Q);
    };
});
