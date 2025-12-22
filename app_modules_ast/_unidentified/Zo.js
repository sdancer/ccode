// Module: Zo
// Type: U
// Lines: 304019-304035
//
var Zo = U((gtB)=>{
    Object.defineProperty(gtB, "__esModule", {
        value: !0
    });
    var K70;
    function V70() {
        if (K70 === void 0) throw Error("No runtime abstraction layer installed");
        return K70;
    }
    (function(A) {
        function Q(B) {
            if (B === void 0) throw Error("No runtime abstraction layer provided");
            K70 = B;
        }
        A.install = Q;
    })(V70 || (V70 = {}));
    gtB.default = V70;
});
