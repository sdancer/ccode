// Module: I5B
// Type: U
// Lines: 175428-175447
//
var I5B = U((gXG, X5B)=>{
    var bq8 = createRenderState(), hq8 = Array.prototype.concat, gq8 = Array.prototype.slice, J5B = (X5B.exports = function(Q) {
        var B = [];
        for(var G = 0, Z = Q.length; G < Z; G++){
            var Y = Q[G];
            if (bq8(Y)) B = hq8.call(B, gq8.call(Y));
            else B.push(Y);
        }
        return B;
    });
    J5B.wrap = function(A) {
        return function() {
            return A(J5B(arguments));
        };
    };
});
