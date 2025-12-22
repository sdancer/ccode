// Module: Ud2
// Type: U
// Lines: 440383-440427
//
var describeNativeComponentFrame = U(($d2)=>{
    Object.defineProperty($d2, "__esModule", {
        value: !0
    });
    function Gc5(A, Q, B) {
        let G = 0, Z = 5, Y = 0;
        return (setInterval(()=>{
            if (Y === 0) {
                if (G > A) {
                    if (((Z *= 2), B(Z), Z > 86400)) Z = 86400;
                    Y = Z;
                }
            } else if (((Y -= 1), Y === 0)) Q();
            G = 0;
        }, 1000).unref(), ()=>{
            G += 1;
        });
    }
    function n$0(A) {
        return A !== void 0 && (A.length === 0 || A === "?" || A === "<anonymous>");
    }
    function Zc5(A, Q) {
        return A === Q || (n$0(A) && n$0(Q));
    }
    function Cd2(A) {
        if (A === void 0) return;
        return A.slice(-10).reduce((Q, B)=>`${Q},${B.function},${B.lineno},${B.colno}`, "");
    }
    function Yc5(A, Q) {
        if (Q === void 0) return;
        return Cd2(A(Q, 1));
    }
    $d2.createRateLimiter = Gc5;
    $d2.functionNamesMatch = Zc5;
    $d2.hashFrames = Cd2;
    $d2.hashFromStack = Yc5;
    $d2.isAnonymous = n$0;
});
