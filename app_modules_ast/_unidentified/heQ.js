// Module: heQ
// Type: U
// Lines: 132216-132230
//
var heQ = U((feQ)=>{
    Object.defineProperty(feQ, "__esModule", {
        value: !0
    });
    feQ.serviceInstanceIdDetector = void 0;
    var sK8 = pwA(), tK8 = qA("crypto");
    class keQ {
        detect(A) {
            return {
                attributes: {
                    [sK8.ATTR_SERVICE_INSTANCE_ID]: (0, tK8.randomUUID)()
                }
            };
        }
    }
    feQ.serviceInstanceIdDetector = new keQ();
});
