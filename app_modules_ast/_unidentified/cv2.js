// Module: cv2
// Type: U
// Lines: 430250-430263
//
var rpcCall = U((dv2)=>{
    Object.defineProperty(dv2, "__esModule", {
        value: !0
    });
    var uv2 = [
        "fatal",
        "error",
        "warning",
        "log",
        "info",
        "debug"
    ];
    function Pw5(A) {
        return mv2(A);
    }
    function mv2(A) {
        return A === "warn" ? "warning" : uv2.includes(A) ? A : "log";
    }
    dv2.severityFromString = Pw5;
    dv2.severityLevelFromString = mv2;
    dv2.validSeverityLevels = uv2;
});
