// Module: OeQ
// Type: U
// Lines: 132145-132165
//
var OeQ = U((NeQ)=>{
    Object.defineProperty(NeQ, "__esModule", {
        value: !0
    });
    NeQ.hostDetector = void 0;
    var Lu1 = pwA(), weQ = qA("os"), iK8 = CeQ(), nK8 = Nu1();
    class qeQ {
        detect(A) {
            return {
                attributes: {
                    [Lu1.ATTR_HOST_NAME]: (0, weQ.hostname)(),
                    [Lu1.ATTR_HOST_ARCH]: (0, nK8.normalizeArch)((0, weQ.arch)()),
                    [Lu1.ATTR_HOST_ID]: (0, iK8.getMachineId)()
                }
            };
        }
    }
    NeQ.hostDetector = new qeQ();
});
