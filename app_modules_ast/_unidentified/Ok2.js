// Module: Ok2
// Type: U
// Lines: 430780-430822
//
var Ok2 = U((Lk2)=>{
    Object.defineProperty(Lk2, "__esModule", {
        value: !0
    });
    var BN5 = L_(), GN5 = describeNativeComponentFrame();
    function ZN5(A, Q, B, G) {
        let Z = A(), Y = !1, J = !0;
        return (setInterval(()=>{
            let X = Z.getTimeMs();
            if (Y === !1 && X > Q + B) {
                if (((Y = !0), J)) G();
            }
            if (X < Q + B) Y = !1;
        }, 20), {
            poll: ()=>{
                Z.reset();
            },
            enabled: (X)=>{
                J = X;
            }
        });
    }
    function YN5(A, Q, B) {
        let G = Q ? Q.replace(/^file:\/\//, "") : void 0, Z = A.location.columnNumber ? A.location.columnNumber + 1 : void 0, Y = A.location.lineNumber ? A.location.lineNumber + 1 : void 0;
        return BN5.dropUndefinedKeys({
            filename: G,
            module: B(G),
            function: A.functionName || "?",
            colno: Z,
            lineno: Y,
            in_app: G ? GN5.filenameIsInApp(G) : void 0
        });
    }
    Lk2.callFrameToStackFrame = YN5;
    Lk2.watchdogTimer = ZN5;
});
