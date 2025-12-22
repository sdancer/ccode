// Module: luQ
// Type: U
// Lines: 127266-127284
//
var luQ = U((cuQ)=>{
    Object.defineProperty(cuQ, "__esModule", {
        value: !0
    });
    cuQ.validateValue = cuQ.validateKey = void 0;
    var _g1 = "[_0-9a-z-*/]", sB8 = `[a-z]${_g1}{0,255}`, tB8 = `[a-z0-9]${_g1}{0,240}@[a-z]${_g1}{0,13}`, eB8 = new RegExp(`^(?:${sB8}|${tB8})$`), A28 = /^[ -~]{0,255}[!-~]$/, Q28 = /,|=/;
    function B28(A) {
        return eB8.test(A);
    }
    cuQ.validateKey = B28;
    function G28(A) {
        return A28.test(A) && !Q28.test(A);
    }
    cuQ.validateValue = G28;
});
