// Module: gEB
// Type: U
// Lines: 214585-214600
//
var createRenderState = U((bEB)=>{
    Object.defineProperty(bEB, "__esModule", {
        value: !0
    });
    bEB.default = void 0;
    var Gd8 = Zd8(qA("crypto"));
    function Zd8(A) {
        return A && A.__esModule ? A : {
            default: A
        };
    }
    function Yd8(A) {
        if (Array.isArray(A)) A = Buffer.from(A);
        else if (typeof A === "string") A = Buffer.from(A, "utf8");
        return Gd8.default.createHash("sha1").update(A).digest();
    }
    var Jd8 = Yd8;
    bEB.default = Jd8;
});
