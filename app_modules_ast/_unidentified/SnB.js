// Module: SnB
// Type: U
// Lines: 282383-282446
//
var renderElement = U((U9Z, PnB)=>{
    var TN3 = renderElement().fromCallback, MnB = qA("path"), UP = renderElement(), RnB = $P(), PN3 = RnB.mkdirs, SN3 = RnB.mkdirsSync, _nB = pushStartInstance(), yN3 = _nB.symlinkPaths, xN3 = _nB.symlinkPathsSync, jnB = renderElement(), vN3 = jnB.symlinkType, kN3 = jnB.symlinkTypeSync, fN3 = xa().pathExists, { areIdentical: TnB } = pushStartInstance();
    function bN3(A, Q, B, G) {
        ((G = typeof B === "function" ? B : G), (B = typeof B === "function" ? !1 : B), UP.lstat(Q, (Z, Y)=>{
            if (!Z && Y.isSymbolicLink()) Promise.all([
                UP.stat(A),
                UP.stat(Q)
            ]).then(([J, X])=>{
                if (TnB(J, X)) return G(null);
                OnB(A, Q, B, G);
            });
            else OnB(A, Q, B, G);
        }));
    }
    function OnB(A, Q, B, G) {
        yN3(A, Q, (Z, Y)=>{
            if (Z) return G(Z);
            ((A = Y.toDst), vN3(Y.toCwd, B, (J, X)=>{
                if (J) return G(J);
                let I = MnB.dirname(Q);
                fN3(I, (W, K)=>{
                    if (W) return G(W);
                    if (K) return UP.symlink(A, Q, X, G);
                    PN3(I, (V)=>{
                        if (V) return G(V);
                        UP.symlink(A, Q, X, G);
                    });
                });
            }));
        });
    }
    function hN3(A, Q, B) {
        let G;
        try {
            G = UP.lstatSync(Q);
        } catch  {}
        if (G && G.isSymbolicLink()) {
            let X = UP.statSync(A), I = UP.statSync(Q);
            if (TnB(X, I)) return;
        }
        let Z = xN3(A, Q);
        ((A = Z.toDst), (B = kN3(Z.toCwd, B)));
        let Y = MnB.dirname(Q);
        if (UP.existsSync(Y)) return UP.symlinkSync(A, Q, B);
        return (SN3(Y), UP.symlinkSync(A, Q, B));
    }
    PnB.exports = {
        createSymlink: TN3(bN3),
        createSymlinkSync: hN3
    };
});
