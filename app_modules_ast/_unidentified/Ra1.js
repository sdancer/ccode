// Module: Ra1
// Type: U
// Lines: 214317-214331
//
var Ra1 = U((GEB)=>{
    Object.defineProperty(GEB, "__esModule", {
        value: !0
    });
    GEB.default = Fm8;
    var Hm8 = Dm8(qA("crypto"));
    function Dm8(A) {
        return A && A.__esModule ? A : {
            default: A
        };
    }
    var w11 = new Uint8Array(256), U11 = w11.length;
    function Fm8() {
        if (U11 > w11.length - 16) (Hm8.default.randomFillSync(w11), (U11 = 0));
        return w11.slice(U11, (U11 += 16));
    }
});
