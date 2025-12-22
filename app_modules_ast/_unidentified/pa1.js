// Module: pa1
// Type: U
// Lines: 217547-217640
//
var pa1 = U((Tc8)=>{
    Tc8.byteLength = Lc8;
    Tc8.toByteArray = Mc8;
    Tc8.fromByteArray = jc8;
    var Uv = [], XR = [], Nc8 = typeof Uint8Array < "u" ? Uint8Array : Array, da1 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    for(Kn = 0, ca1 = da1.length; Kn < ca1; ++Kn)((Uv[Kn] = da1[Kn]), (XR[da1.charCodeAt(Kn)] = Kn));
    var Kn, ca1;
    XR[45] = 62;
    XR[95] = 63;
    function dzB(A) {
        var Q = A.length;
        if (Q % 4 > 0) throw Error("Invalid string. Length must be a multiple of 4");
        var B = A.indexOf("=");
        if (B === -1) B = Q;
        var G = B === Q ? 0 : 4 - (B % 4);
        return [
            B,
            G
        ];
    }
    function Lc8(A) {
        var Q = dzB(A), B = Q[0], G = Q[1];
        return ((B + G) * 3) / 4 - G;
    }
    function Oc8(A, Q, B) {
        return ((Q + B) * 3) / 4 - B;
    }
    function Mc8(A) {
        var Q, B = dzB(A), G = B[0], Z = B[1], Y = new Nc8(Oc8(A, G, Z)), J = 0, X = Z > 0 ? G - 4 : G, I;
        for(I = 0; I < X; I += 4)((Q = (XR[A.charCodeAt(I)] << 18) | (XR[A.charCodeAt(I + 1)] << 12) | (XR[A.charCodeAt(I + 2)] << 6) | XR[A.charCodeAt(I + 3)]), (Y[J++] = (Q >> 16) & 255), (Y[J++] = (Q >> 8) & 255), (Y[J++] = Q & 255));
        if (Z === 2) ((Q = (XR[A.charCodeAt(I)] << 2) | (XR[A.charCodeAt(I + 1)] >> 4)), (Y[J++] = Q & 255));
        if (Z === 1) ((Q = (XR[A.charCodeAt(I)] << 10) | (XR[A.charCodeAt(I + 1)] << 4) | (XR[A.charCodeAt(I + 2)] >> 2)), (Y[J++] = (Q >> 8) & 255), (Y[J++] = Q & 255));
        return Y;
    }
    function Rc8(A) {
        return (Uv[(A >> 18) & 63] + Uv[(A >> 12) & 63] + Uv[(A >> 6) & 63] + Uv[A & 63]);
    }
    function _c8(A, Q, B) {
        var G, Z = [];
        for(var Y = Q; Y < B; Y += 3)((G = ((A[Y] << 16) & 16711680) + ((A[Y + 1] << 8) & 65280) + (A[Y + 2] & 255)), Z.push(Rc8(G)));
        return Z.join("");
    }
    function jc8(A) {
        var Q, B = A.length, G = B % 3, Z = [], Y = 16383;
        for(var J = 0, X = B - G; J < X; J += Y)Z.push(_c8(A, J, J + Y > X ? X : J + Y));
        if (G === 1) ((Q = A[B - 1]), Z.push(Uv[Q >> 2] + Uv[(Q << 4) & 63] + "=="));
        else if (G === 2) ((Q = (A[B - 2] << 8) + A[B - 1]), Z.push(Uv[Q >> 10] + Uv[(Q >> 4) & 63] + Uv[(Q << 2) & 63] + "="));
        return Z.join("");
    }
});
