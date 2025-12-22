// Module: KmQ
// Type: U
// Lines: 127368-127380
//
var KmQ = U((ImQ)=>{
    Object.defineProperty(ImQ, "__esModule", {
        value: !0
    });
    ImQ.NOOP_METER_PROVIDER = ImQ.NoopMeterProvider = void 0;
    var K28 = Ig1();
    class Tg1 {
        getMeter(A, Q, B) {
            return K28.NOOP_METER;
        }
    }
    ImQ.NoopMeterProvider = Tg1;
    ImQ.NOOP_METER_PROVIDER = new Tg1();
});
