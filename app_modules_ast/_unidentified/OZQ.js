// Module: OZQ
// Type: U
// Lines: 78665-78679
//
var OZQ = U((NZQ)=>{
    Object.defineProperty(NZQ, "__esModule", {
        value: !0
    });
    NZQ.readFile = NZQ.fileIntercept = NZQ.filePromises = void 0;
    var $C4 = qA("node:fs/promises");
    NZQ.filePromises = {};
    NZQ.fileIntercept = {};
    var UC4 = (A, Q)=>{
        if (NZQ.fileIntercept[A] !== void 0) return NZQ.fileIntercept[A];
        if (!NZQ.filePromises[A] || Q?.ignoreCache) NZQ.filePromises[A] = (0, $C4.readFile)(A, "utf8");
        return NZQ.filePromises[A];
    };
    NZQ.readFile = UC4;
});
