// Module: Jd0
// Type: U
// Lines: 15059-15086
//
var Jd0 = U((gR7, Yd0)=>{
    Yd0.exports = Zd0;
    Zd0.sync = Uc9;
    var Bd0 = qA("fs");
    function $c9(A, Q) {
        var B = Q.pathExt !== void 0 ? Q.pathExt : process.env.PATHEXT;
        if (!B) return !0;
        if (((B = B.split(";")), B.indexOf("") !== -1)) return !0;
        for(var G = 0; G < B.length; G++){
            var Z = B[G].toLowerCase();
            if (Z && A.substr(-Z.length).toLowerCase() === Z) return !0;
        }
        return !1;
    }
    function Gd0(A, Q, B) {
        if (!A.isSymbolicLink() && !A.isFile()) return !1;
        return $c9(Q, B);
    }
    function Zd0(A, Q, B) {
        Bd0.stat(A, function(G, Z) {
            B(G, G ? !1 : Gd0(Z, A, Q));
        });
    }
    function Uc9(A, Q) {
        return Gd0(Bd0.statSync(A), A, Q);
    }
});
