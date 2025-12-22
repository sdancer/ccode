// Module: Z$1
// Type: U
// Lines: 10688-10719
//
var describeObjectForErrorMessage = U((Cu0)=>{
    Object.defineProperty(Cu0, "__esModule", {
        value: !0
    });
    Cu0.shareReplay = void 0;
    var Xk9 = renderElement(), Ik9 = describeNativeComponentFrame();
    function Wk9(A, Q, B) {
        var G, Z, Y, J, X = !1;
        if (A && typeof A === "object") ((G = A.bufferSize), (J = G === void 0 ? 1 / 0 : G), (Z = A.windowTime), (Q = Z === void 0 ? 1 / 0 : Z), (Y = A.refCount), (X = Y === void 0 ? !1 : Y), (B = A.scheduler));
        else J = A !== null && A !== void 0 ? A : 1 / 0;
        return Ik9.share({
            connector: function() {
                return new Xk9.ReplaySubject(J, Q, B);
            },
            resetOnError: !0,
            resetOnComplete: !1,
            resetOnRefCountZero: X
        });
    }
    Cu0.shareReplay = Wk9;
});
