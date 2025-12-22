// Module: JaB
// Type: U
// Lines: 282606-282663
//
var renderElement = U((j9Z, YaB)=>{
    var YL3 = renderElement(), E30 = qA("path"), JL3 = Z81().copy, ZaB = XTA().remove, XL3 = $P().mkdirp, IL3 = xa().pathExists, BaB = pushStartInstance();
    function WL3(A, Q, B, G) {
        if (typeof B === "function") ((G = B), (B = {}));
        B = B || {};
        let Z = B.overwrite || B.clobber || !1;
        BaB.checkPaths(A, Q, "move", B, (Y, J)=>{
            if (Y) return G(Y);
            let { srcStat: X, isChangingCase: I = !1 } = J;
            BaB.checkParentPaths(A, X, Q, "move", (W)=>{
                if (W) return G(W);
                if (KL3(Q)) return GaB(A, Q, Z, I, G);
                XL3(E30.dirname(Q), (K)=>{
                    if (K) return G(K);
                    return GaB(A, Q, Z, I, G);
                });
            });
        });
    }
    function KL3(A) {
        let Q = E30.dirname(A);
        return E30.parse(Q).root === Q;
    }
    function GaB(A, Q, B, G, Z) {
        if (G) return F30(A, Q, B, Z);
        if (B) return ZaB(Q, (Y)=>{
            if (Y) return Z(Y);
            return F30(A, Q, B, Z);
        });
        IL3(Q, (Y, J)=>{
            if (Y) return Z(Y);
            if (J) return Z(Error("dest already exists."));
            return F30(A, Q, B, Z);
        });
    }
    function F30(A, Q, B, G) {
        YL3.rename(A, Q, (Z)=>{
            if (!Z) return G();
            if (Z.code !== "EXDEV") return G(Z);
            return VL3(A, Q, B, G);
        });
    }
    function VL3(A, Q, B, G) {
        JL3(A, Q, {
            overwrite: B,
            errorOnExist: !0
        }, (Y)=>{
            if (Y) return G(Y);
            return ZaB(A, G);
        });
    }
    YaB.exports = WL3;
});
