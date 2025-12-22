// Module: Vd0
// Type: U
// Lines: 15086-15114
//
var Vd0 = U((uR7, Kd0)=>{
    Kd0.exports = Id0;
    Id0.sync = wc9;
    var Xd0 = qA("fs");
    function Id0(A, Q, B) {
        Xd0.stat(A, function(G, Z) {
            B(G, G ? !1 : Wd0(Z, Q));
        });
    }
    function wc9(A, Q) {
        return Wd0(Xd0.statSync(A), Q);
    }
    function Wd0(A, Q) {
        return A.isFile() && qc9(A, Q);
    }
    function qc9(A, Q) {
        var { mode: B, uid: G, gid: Z } = A, Y = Q.uid !== void 0 ? Q.uid : process.getuid && process.getuid(), J = Q.gid !== void 0 ? Q.gid : process.getgid && process.getgid(), X = parseInt("100", 8), I = parseInt("010", 8), W = parseInt("001", 8), K = X | I, V = B & W || (B & I && Z === J) || (B & X && G === Y) || (B & K && Y === 0);
        return V;
    }
});
