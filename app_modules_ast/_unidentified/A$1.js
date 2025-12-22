// Module: A$1
// Type: U
// Lines: 10513-10525
//
var A$1 = U((Iu0)=>{
    Object.defineProperty(Iu0, "__esModule", {
        value: !0
    });
    Iu0.sampleTime = void 0;
    var lv9 = HU(), iv9 = YuA(), nv9 = az1();
    function av9(A, Q) {
        if (Q === void 0) Q = lv9.asyncScheduler;
        return iv9.sample(nv9.interval(A, Q));
    }
    Iu0.sampleTime = av9;
});
