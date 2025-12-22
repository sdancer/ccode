// Module: MmQ
// Type: U
// Lines: 127428-127455
//
var MmQ = U((LmQ)=>{
    Object.defineProperty(LmQ, "__esModule", {
        value: !0
    });
    LmQ.deleteBaggage = LmQ.setBaggage = LmQ.getActiveBaggage = LmQ.getBaggage = void 0;
    var F28 = fwA(), E28 = vwA(), xg1 = (0, E28.createContextKey)("OpenTelemetry Baggage Key");
    function NmQ(A) {
        return A.getValue(xg1) || void 0;
    }
    LmQ.getBaggage = NmQ;
    function z28() {
        return NmQ(F28.ContextAPI.getInstance().active());
    }
    LmQ.getActiveBaggage = z28;
    function C28(A, Q) {
        return A.setValue(xg1, Q);
    }
    LmQ.setBaggage = C28;
    function $28(A) {
        return A.deleteValue(xg1);
    }
    LmQ.deleteBaggage = $28;
});
