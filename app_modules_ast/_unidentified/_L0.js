// Module: _L0
// Type: L
// Lines: 492310-492329
//
var _L0 = L(()=>{
    VW();
    restoreViewTransitionName();
    aB();
    g1();
    K6();
});
import { execFileSync as S67 } from "child_process";
function D79(A) {
    try {
        S67("git", [
            "rev-parse",
            "--is-inside-work-tree"
        ], {
            cwd: A,
            stdio: "ignore"
        });
    } catch (Q) {
        return !1;
    }
    return !0;
}
