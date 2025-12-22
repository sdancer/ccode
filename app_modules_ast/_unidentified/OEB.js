// Module: OEB
// Type: U
// Lines: 214525-214540
//
var createRenderState = U((NEB)=>{
    Object.defineProperty(NEB, "__esModule", {
        value: !0
    });
    NEB.default = void 0;
    var dm8 = cm8(qA("crypto"));
    function cm8(A) {
        return A && A.__esModule ? A : {
            default: A
        };
    }
    function pm8(A) {
        if (Array.isArray(A)) A = Buffer.from(A);
        else if (typeof A === "string") A = Buffer.from(A, "utf8");
        return dm8.default.createHash("md5").update(A).digest();
    }
    var lm8 = pm8;
    NEB.default = lm8;
});
