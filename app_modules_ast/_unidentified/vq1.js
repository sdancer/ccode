// Module: vq1
// Type: U
// Lines: 55661-55686
//
var vq1 = U((GQQ)=>{
    Object.defineProperty(GQQ, "__esModule", {
        value: !0
    });
    GQQ._getFullUserHash = GQQ._normalizeUser = void 0;
    var VB4 = performWork(), HB4 = OE();
    function DB4(A, Q, B) {
        try {
            let G = JSON.parse(JSON.stringify(A));
            if (Q != null && Q.environment != null) G.statsigEnvironment = Q.environment;
            else if (B != null) G.statsigEnvironment = {
                tier: B
            };
            return G;
        } catch (G) {
            return (HB4.Log.error("Failed to JSON.stringify user"), {
                statsigEnvironment: void 0
            });
        }
    }
    GQQ._normalizeUser = DB4;
    function FB4(A) {
        return A ? (0, VB4._DJB2Object)(A) : null;
    }
    GQQ._getFullUserHash = FB4;
});
