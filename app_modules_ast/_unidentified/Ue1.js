// Module: Ue1
// Type: U
// Lines: 234992-235004
//
var createRenderState = U((XkG, gMB)=>{
    var Rt8 = sameValue();
    gMB.exports = function(A, Q) {
        var B = Q || Math.floor(Date.now() / 1000);
        if (typeof A === "string") {
            var G = Rt8(A);
            if (typeof G > "u") return;
            return Math.floor(B + G / 1000);
        } else if (typeof A === "number") return B + A;
        else return;
    };
});
