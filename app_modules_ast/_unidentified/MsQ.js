// Module: MsQ
// Type: U
// Lines: 130806-130824
//
var MsQ = U((LsQ)=>{
    Object.defineProperty(LsQ, "__esModule", {
        value: !0
    });
    LsQ.validateValue = LsQ.validateKey = void 0;
    var Wu1 = "[_0-9a-z-*/]", qI8 = `[a-z]${Wu1}{0,255}`, NI8 = `[a-z0-9]${Wu1}{0,240}@[a-z]${Wu1}{0,13}`, LI8 = new RegExp(`^(?:${qI8}|${NI8})$`), OI8 = /^[ -~]{0,255}[!-~]$/, MI8 = /,|=/;
    function RI8(A) {
        return LI8.test(A);
    }
    LsQ.validateKey = RI8;
    function _I8(A) {
        return OI8.test(A) && !MI8.test(A);
    }
    LsQ.validateValue = _I8;
});
