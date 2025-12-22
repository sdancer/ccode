// Module: POB
// Type: U
// Lines: 233791-233806
//
var createRenderState = U((jOB)=>{
    Object.defineProperty(jOB, "__esModule", {
        value: !0
    });
    jOB.default = void 0;
    var Xs8 = Is8(qA("crypto"));
    function Is8(A) {
        return A && A.__esModule ? A : {
            default: A
        };
    }
    function Ws8(A) {
        if (Array.isArray(A)) A = Buffer.from(A);
        else if (typeof A === "string") A = Buffer.from(A, "utf8");
        return Xs8.default.createHash("md5").update(A).digest();
    }
    var Ks8 = Ws8;
    jOB.default = Ks8;
});
