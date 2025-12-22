// Module: T6B
// Type: U
// Lines: 170934-170998
//
var T6B = U((DYG, j6B)=>{
    var x$8 = R6B(), lZA = lEA();
    function _6B(A) {
        if (/^\d{3,4}$/.test(A)) {
            let B = /(\d{1,2})(\d{2})/.exec(A);
            return {
                major: 0,
                minor: parseInt(B[1], 10),
                patch: parseInt(B[2], 10)
            };
        }
        let Q = (A || "").split(".").map((B)=>parseInt(B, 10));
        return {
            major: Q[0],
            minor: Q[1],
            patch: Q[2]
        };
    }
    function Tc1(A) {
        let { env: Q } = process;
        if ("FORCE_HYPERLINK" in Q) return !(Q.FORCE_HYPERLINK.length > 0 && parseInt(Q.FORCE_HYPERLINK, 10) === 0);
        if (lZA("no-hyperlink") || lZA("no-hyperlinks") || lZA("hyperlink=false") || lZA("hyperlink=never")) return !1;
        if (lZA("hyperlink=true") || lZA("hyperlink=always")) return !0;
        if ("NETLIFY" in Q) return !0;
        if (!x$8.supportsColor(A)) return !1;
        if (A && !A.isTTY) return !1;
        if (process.platform === "win32") return !1;
        if ("CI" in Q) return !1;
        if ("TEAMCITY_VERSION" in Q) return !1;
        if ("TERM_PROGRAM" in Q) {
            let B = _6B(Q.TERM_PROGRAM_VERSION);
            switch(Q.TERM_PROGRAM){
                case "iTerm.app":
                    if (B.major === 3) return B.minor >= 1;
                    return B.major > 3;
                case "WezTerm":
                    return B.major >= 20200620;
                case "vscode":
                    return B.major > 1 || (B.major === 1 && B.minor >= 72);
            }
        }
        if ("VTE_VERSION" in Q) {
            if (Q.VTE_VERSION === "0.50.0") return !1;
            let B = _6B(Q.VTE_VERSION);
            return B.major > 0 || B.minor >= 50;
        }
        return !1;
    }
    j6B.exports = {
        supportsHyperlink: Tc1,
        stdout: Tc1(process.stdout),
        stderr: Tc1(process.stderr)
    };
});
function iZA() {
    if (P6B.default.stdout) return !0;
    let A = process.env.TERM_PROGRAM;
    if (A && v$8.includes(A)) return !0;
    if (process.env.TERM?.includes("kitty")) return !0;
    return !1;
}
var P6B, v$8;
