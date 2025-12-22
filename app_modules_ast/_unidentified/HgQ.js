// Module: HgQ
// Type: U
// Lines: 126476-126516
//
var HgQ = U((KgQ)=>{
    Object.defineProperty(KgQ, "__esModule", {
        value: !0
    });
    KgQ.isCompatible = KgQ._makeCompatibilityCheck = void 0;
    var TQ8 = oh1(), IgQ = /^(\d+)\.(\d+)\.(\d+)(-(.+))?$/;
    function WgQ(A) {
        let Q = new Set([
            A
        ]), B = new Set(), G = A.match(IgQ);
        if (!G) return ()=>!1;
        let Z = {
            major: +G[1],
            minor: +G[2],
            patch: +G[3],
            prerelease: G[4]
        };
        if (Z.prerelease != null) return function(I) {
            return I === A;
        };
        function Y(X) {
            return (B.add(X), !1);
        }
        function J(X) {
            return (Q.add(X), !0);
        }
        return function(I) {
            if (Q.has(I)) return !0;
            if (B.has(I)) return !1;
            let W = I.match(IgQ);
            if (!W) return Y(I);
            let K = {
                major: +W[1],
                minor: +W[2],
                patch: +W[3],
                prerelease: W[4]
            };
            if (K.prerelease != null) return Y(I);
            if (Z.major !== K.major) return Y(I);
            if (Z.major === 0) {
                if (Z.minor === K.minor && Z.patch <= K.patch) return J(I);
                return Y(I);
            }
            if (Z.minor <= K.minor) return J(I);
            return Y(I);
        };
    }
    KgQ._makeCompatibilityCheck = WgQ;
    KgQ.isCompatible = WgQ(TQ8.VERSION);
});
