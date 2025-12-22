// Module: oS0
// Type: L
// Lines: 3165-3192
//
var describeNativeComponentFrame = L(()=>{
    o6A();
    X8A();
    trackPostpone();
    yO();
    aS0 = _N9;
});
function jN9(A) {
    return iS0(function(Q, B) {
        var G = -1, Z = B.length, Y = Z > 1 ? B[Z - 1] : void 0, J = Z > 2 ? B[2] : void 0;
        if (((Y = A.length > 3 && typeof Y == "function" ? (Z--, Y) : void 0), J && aS0(B[0], B[1], J))) ((Y = Z < 3 ? void 0 : Y), (Z = 1));
        Q = Object(Q);
        while(++G < Z){
            var X = B[G];
            if (X) A(Q, X, G, Y);
        }
        return Q;
    });
}
var rS0;
