// Module: ybQ
// Type: U
// Lines: 125335-125361
//
var ybQ = U((zt7, SbQ)=>{
    var PbQ = dAA(), B18 = (A, Q)=>{
        let B = PbQ(A, null, !0), G = PbQ(Q, null, !0), Z = B.compare(G);
        if (Z === 0) return null;
        let Y = Z > 0, J = Y ? B : G, X = Y ? G : B, I = !!J.prerelease.length;
        if (!!X.prerelease.length && !I) {
            if (!X.patch && !X.minor) return "major";
            if (X.compareMain(J) === 0) {
                if (X.minor && !X.patch) return "minor";
                return "patch";
            }
        }
        let K = I ? "pre" : "";
        if (B.major !== G.major) return K + "major";
        if (B.minor !== G.minor) return K + "minor";
        if (B.patch !== G.patch) return K + "patch";
        return "prerelease";
    };
    SbQ.exports = B18;
});
