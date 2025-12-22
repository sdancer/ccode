// Module: mEA
// Type: U
// Lines: 7561-7574
//
var mEA = U((Kf0)=>{
    Object.defineProperty(Kf0, "__esModule", {
        value: !0
    });
    Kf0.concat = void 0;
    var Aj9 = uEA(), Qj9 = trackPostpone(), Bj9 = ab();
    function Gj9() {
        var A = [];
        for(var Q = 0; Q < arguments.length; Q++)A[Q] = arguments[Q];
        return Aj9.concatAll()(Bj9.from(A, Qj9.popScheduler(A)));
    }
    Kf0.concat = Gj9;
});
