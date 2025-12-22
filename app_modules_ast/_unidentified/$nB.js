// Module: $nB
// Type: U
// Lines: 282258-282306
//
var pushStartInstance = U((z9Z, CnB)=>{
    var wN3 = renderElement().fromCallback, FnB = qA("path"), ka = renderElement(), EnB = $P(), qN3 = xa().pathExists, { areIdentical: znB } = pushStartInstance();
    function NN3(A, Q, B) {
        function G(Z, Y) {
            ka.link(Z, Y, (J)=>{
                if (J) return B(J);
                B(null);
            });
        }
        ka.lstat(Q, (Z, Y)=>{
            ka.lstat(A, (J, X)=>{
                if (J) return ((J.message = J.message.replace("lstat", "ensureLink")), B(J));
                if (Y && znB(X, Y)) return B(null);
                let I = FnB.dirname(Q);
                qN3(I, (W, K)=>{
                    if (W) return B(W);
                    if (K) return G(A, Q);
                    EnB.mkdirs(I, (V)=>{
                        if (V) return B(V);
                        G(A, Q);
                    });
                });
            });
        });
    }
    function LN3(A, Q) {
        let B;
        try {
            B = ka.lstatSync(Q);
        } catch  {}
        try {
            let Y = ka.lstatSync(A);
            if (B && znB(Y, B)) return;
        } catch (Y) {
            throw ((Y.message = Y.message.replace("lstat", "ensureLink")), Y);
        }
        let G = FnB.dirname(Q);
        if (ka.existsSync(G)) return ka.linkSync(A, Q);
        return (EnB.mkdirsSync(G), ka.linkSync(A, Q));
    }
    CnB.exports = {
        createLink: wN3(NN3),
        createLinkSync: LN3
    };
});
