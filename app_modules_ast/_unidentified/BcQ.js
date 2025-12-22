// Module: BcQ
// Type: U
// Lines: 128298-128348
//
var BcQ = U((AcQ)=>{
    Object.defineProperty(AcQ, "__esModule", {
        value: !0
    });
    AcQ.getStringListFromEnv = AcQ.getBooleanFromEnv = AcQ.getStringFromEnv = AcQ.getNumberFromEnv = void 0;
    var sdQ = f9(), tdQ = qA("util");
    function u98(A) {
        let Q = process.env[A];
        if (Q == null || Q.trim() === "") return;
        let B = Number(Q);
        if (isNaN(B)) {
            sdQ.diag.warn(`Unknown value ${(0, tdQ.inspect)(Q)} for ${A}, expected a number, using defaults`);
            return;
        }
        return B;
    }
    AcQ.getNumberFromEnv = u98;
    function edQ(A) {
        let Q = process.env[A];
        if (Q == null || Q.trim() === "") return;
        return Q;
    }
    AcQ.getStringFromEnv = edQ;
    function m98(A) {
        let Q = process.env[A]?.trim().toLowerCase();
        if (Q == null || Q === "") return !1;
        if (Q === "true") return !0;
        else if (Q === "false") return !1;
        else return (sdQ.diag.warn(`Unknown value ${(0, tdQ.inspect)(Q)} for ${A}, expected 'true' or 'false', falling back to 'false' (default)`), !1);
    }
    AcQ.getBooleanFromEnv = m98;
    function d98(A) {
        return edQ(A)?.split(",").map((Q)=>Q.trim()).filter((Q)=>Q !== "");
    }
    AcQ.getStringListFromEnv = d98;
});
