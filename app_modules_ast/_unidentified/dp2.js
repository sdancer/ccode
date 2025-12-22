// Module: dp2
// Type: U
// Lines: 444940-444990
//
var dp2 = U((mp2)=>{
    Object.defineProperty(mp2, "__esModule", {
        value: !0
    });
    var bp2 = z6(), IU0 = FQ(), XU0 = IU0.GLOBAL_OBJ, Ln5 = 7, hp2 = "ContextLines", On5 = (A = {})=>{
        let Q = A.frameContextLines != null ? A.frameContextLines : Ln5;
        return {
            name: hp2,
            setupOnce () {},
            processEvent (B) {
                return Rn5(B, Q);
            }
        };
    }, gp2 = bp2.defineIntegration(On5), Mn5 = bp2.convertIntegrationFnToClass(hp2, gp2);
    function Rn5(A, Q) {
        let B = XU0.document, G = XU0.location && IU0.stripUrlQueryAndFragment(XU0.location.href);
        if (!B || !G) return A;
        let Z = A.exception && A.exception.values;
        if (!Z || !Z.length) return A;
        let Y = B.documentElement.innerHTML;
        if (!Y) return A;
        let J = [
            "<!DOCTYPE html>",
            "<html>",
            ...Y.split(`
`),
            "</html>"
        ];
        return (Z.forEach((X)=>{
            let I = X.stacktrace;
            if (I && I.frames) I.frames = I.frames.map((W)=>up2(W, J, G, Q));
        }), A);
    }
    function up2(A, Q, B, G) {
        if (A.filename !== B || !A.lineno || !Q.length) return A;
        return (IU0.addContextToFrame(Q, A, G), A);
    }
    mp2.ContextLines = Mn5;
    mp2.applySourceContextToFrame = up2;
    mp2.contextLinesIntegration = gp2;
});
