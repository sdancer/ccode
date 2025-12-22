// Module: UiB
// Type: U
// Lines: 281475-281486
//
var pushStartInstance = U((zq3, $iB)=>{
    var Eq3 = qA("path");
    zq3.checkPath = function(Q) {
        if (process.platform === "win32") {
            if (/[<>:"|?*]/.test(Q.replace(Eq3.parse(Q).root, ""))) {
                let G = Error(`Path contains invalid characters: ${Q}`);
                throw ((G.code = "EINVAL"), G);
            }
        }
    };
});
