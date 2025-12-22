// Module: Dd0
// Type: U
// Lines: 15114-15150
//
var describeNativeComponentFrame = U((dR7, Hd0)=>{
    var mR7 = qA("fs"), zuA;
    if (process.platform === "win32" || global.TESTING_WINDOWS) zuA = Jd0();
    else zuA = Vd0();
    Hd0.exports = f$1;
    f$1.sync = Nc9;
    function f$1(A, Q, B) {
        if (typeof Q === "function") ((B = Q), (Q = {}));
        if (!B) {
            if (typeof Promise !== "function") throw TypeError("callback not provided");
            return new Promise(function(G, Z) {
                f$1(A, Q || {}, function(Y, J) {
                    if (Y) Z(Y);
                    else G(J);
                });
            });
        }
        zuA(A, Q || {}, function(G, Z) {
            if (G) {
                if (G.code === "EACCES" || (Q && Q.ignoreErrors)) ((G = null), (Z = !1));
            }
            B(G, Z);
        });
    }
    function Nc9(A, Q) {
        try {
            return zuA.sync(A, Q || {});
        } catch (B) {
            if ((Q && Q.ignoreErrors) || B.code === "EACCES") return !1;
            else throw B;
        }
    }
});
