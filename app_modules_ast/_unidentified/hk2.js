// Module: hk2
// Type: U
// Lines: 430936-430943
//
var hk2 = U((bk2)=>{
    Object.defineProperty(bk2, "__esModule", {
        value: !0
    });
    function ON5(A) {
        return A.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
    }
    bk2.escapeStringForRegex = ON5;
});
