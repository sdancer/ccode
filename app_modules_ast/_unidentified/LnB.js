// Module: LnB
// Type: U
// Lines: 282357-282383
//
var renderElement = U(($9Z, NnB)=>{
    var qnB = renderElement();
    function _N3(A, Q, B) {
        if (((B = typeof Q === "function" ? Q : B), (Q = typeof Q === "function" ? !1 : Q), Q)) return B(null, Q);
        qnB.lstat(A, (G, Z)=>{
            if (G) return B(null, "file");
            ((Q = Z && Z.isDirectory() ? "dir" : "file"), B(null, Q));
        });
    }
    function jN3(A, Q) {
        let B;
        if (Q) return Q;
        try {
            B = qnB.lstatSync(A);
        } catch  {
            return "file";
        }
        return B && B.isDirectory() ? "dir" : "file";
    }
    NnB.exports = {
        symlinkType: _N3,
        symlinkTypeSync: jN3
    };
});
