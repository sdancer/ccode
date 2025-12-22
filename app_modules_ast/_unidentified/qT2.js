// Module: qT2
// Type: U
// Lines: 416561-416574
//
var qT2 = U((HnZ, wT2)=>{
    wT2.exports = function(Q) {
        var B = 0, G = Q.length, Z = 0, Y;
        while(Z < G)if ((B++, (Y = Q.charCodeAt(Z++)), Y >= 55296 && Y <= 56319 && Z < G)) {
            if (((Y = Q.charCodeAt(Z)), (Y & 64512) == 56320)) Z++;
        }
        return B;
    };
});
