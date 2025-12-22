// Module: WZ9
// Type: U
// Lines: 497662-497673
//
var WZ9 = U((Z37)=>{
    var IO0 = Rs(), IZ9 = IO0.getBCHDigit(1335);
    Z37.getEncodedBits = function(Q, B) {
        let G = (Q.bit << 3) | B, Z = G << 10;
        while(IO0.getBCHDigit(Z) - IZ9 >= 0)Z ^= 1335 << (IO0.getBCHDigit(Z) - IZ9);
        return ((G << 10) | Z) ^ 21522;
    };
});
