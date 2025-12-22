// Module: RF9
// Type: L
// Lines: 532549-532598
//
var pushStartInstance = L(()=>{
    getViewTransitionClassName();
    zB();
    pushStartInstance();
});
import { posix as gK7 } from "path";
function uK7(A) {
    let Q = otA(A).replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
    return gK7.isAbsolute(Q) && !Q.startsWith("//") ? "/" + Q : Q;
}
function _F9() {
    let Q = sG().ignorePatterns;
    if (!Q || !Array.isArray(Q) || Q.length === 0) return;
    let B = [];
    for (let Y of Q){
        let J = uK7(Y);
        B.push({
            toolName: "Read",
            ruleContent: J
        }, {
            toolName: "Edit",
            ruleContent: J
        });
    }
    if (ntA({
        ruleValues: B,
        ruleBehavior: "deny"
    }, "localSettings")) try {
        (tZ((Y)=>{
            let { ignorePatterns: J, ...X } = Y;
            return X;
        }), r("tengu_migrate_ignore_patterns_success", {
            ignore_patterns_count: Q.length
        }));
    } catch (Y) {
        (t(Error(`Failed to remove ignorePatterns from config: ${Y instanceof Error ? Y.message : String(Y)}`)), r("tengu_migrate_ignore_patterns_config_cleanup_error", {
            ignore_patterns_count: Q.length
        }));
    }
    else (t(Error("Failed to migrate ignorePatterns to settings permissions")), r("tengu_migrate_ignore_patterns_error", {
        ignore_patterns_count: Q.length
    }));
}
