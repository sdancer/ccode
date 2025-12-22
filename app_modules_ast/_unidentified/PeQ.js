// Module: PeQ
// Type: U
// Lines: 132165-132183
//
var PeQ = U((jeQ)=>{
    Object.defineProperty(jeQ, "__esModule", {
        value: !0
    });
    jeQ.osDetector = void 0;
    var MeQ = pwA(), ReQ = qA("os"), aK8 = Nu1();
    class _eQ {
        detect(A) {
            return {
                attributes: {
                    [MeQ.ATTR_OS_TYPE]: (0, aK8.normalizeType)((0, ReQ.platform)()),
                    [MeQ.ATTR_OS_VERSION]: (0, ReQ.release)()
                }
            };
        }
    }
    jeQ.osDetector = new _eQ();
});
