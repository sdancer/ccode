// Module: Nu1
// Type: U
// Lines: 132117-132145
//
var Nu1 = U(($eQ)=>{
    Object.defineProperty($eQ, "__esModule", {
        value: !0
    });
    $eQ.normalizeType = $eQ.normalizeArch = void 0;
    var cK8 = (A)=>{
        switch(A){
            case "arm":
                return "arm32";
            case "ppc":
                return "ppc32";
            case "x64":
                return "amd64";
            default:
                return A;
        }
    };
    $eQ.normalizeArch = cK8;
    var pK8 = (A)=>{
        switch(A){
            case "sunos":
                return "solaris";
            case "win32":
                return "windows";
            default:
                return A;
        }
    };
    $eQ.normalizeType = pK8;
});
