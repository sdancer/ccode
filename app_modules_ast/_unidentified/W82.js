// Module: W82
// Type: U
// Lines: 327473-327539
//
var W82 = U((I82)=>{
    var iZ0 = I82;
    iZ0.length = function(Q) {
        var B = 0, G = 0;
        for(var Z = 0; Z < Q.length; ++Z)if (((G = Q.charCodeAt(Z)), G < 128)) B += 1;
        else if (G < 2048) B += 2;
        else if ((G & 64512) === 55296 && (Q.charCodeAt(Z + 1) & 64512) === 56320) (++Z, (B += 4));
        else B += 3;
        return B;
    };
    iZ0.read = function(Q, B, G) {
        var Z = G - B;
        if (Z < 1) return "";
        var Y = null, J = [], X = 0, I;
        while(B < G){
            if (((I = Q[B++]), I < 128)) J[X++] = I;
            else if (I > 191 && I < 224) J[X++] = ((I & 31) << 6) | (Q[B++] & 63);
            else if (I > 239 && I < 365) ((I = (((I & 7) << 18) | ((Q[B++] & 63) << 12) | ((Q[B++] & 63) << 6) | (Q[B++] & 63)) - 65536), (J[X++] = 55296 + (I >> 10)), (J[X++] = 56320 + (I & 1023)));
            else J[X++] = ((I & 15) << 12) | ((Q[B++] & 63) << 6) | (Q[B++] & 63);
            if (X > 8191) ((Y || (Y = [])).push(String.fromCharCode.apply(String, J)), (X = 0));
        }
        if (Y) {
            if (X) Y.push(String.fromCharCode.apply(String, J.slice(0, X)));
            return Y.join("");
        }
        return String.fromCharCode.apply(String, J.slice(0, X));
    };
    iZ0.write = function(Q, B, G) {
        var Z = G, Y, J;
        for(var X = 0; X < Q.length; ++X)if (((Y = Q.charCodeAt(X)), Y < 128)) B[G++] = Y;
        else if (Y < 2048) ((B[G++] = (Y >> 6) | 192), (B[G++] = (Y & 63) | 128));
        else if ((Y & 64512) === 55296 && ((J = Q.charCodeAt(X + 1)) & 64512) === 56320) ((Y = 65536 + ((Y & 1023) << 10) + (J & 1023)), ++X, (B[G++] = (Y >> 18) | 240), (B[G++] = ((Y >> 12) & 63) | 128), (B[G++] = ((Y >> 6) & 63) | 128), (B[G++] = (Y & 63) | 128));
        else ((B[G++] = (Y >> 12) | 224), (B[G++] = ((Y >> 6) & 63) | 128), (B[G++] = (Y & 63) | 128));
        return G - Z;
    };
});
