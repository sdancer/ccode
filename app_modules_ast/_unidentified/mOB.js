// Module: mOB
// Type: U
// Lines: 233839-233854
//
var createRenderState = U((gOB)=>{
    Object.defineProperty(gOB, "__esModule", {
        value: !0
    });
    gOB.default = void 0;
    var Us8 = ws8(qA("crypto"));
    function ws8(A) {
        return A && A.__esModule ? A : {
            default: A
        };
    }
    function qs8(A) {
        if (Array.isArray(A)) A = Buffer.from(A);
        else if (typeof A === "string") A = Buffer.from(A, "utf8");
        return Us8.default.createHash("sha1").update(A).digest();
    }
    var Ns8 = qs8;
    gOB.default = Ns8;
});
