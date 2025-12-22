// Module: wp1
// Type: L
// Lines: 179507-179559
//
var pushStartInstance = L(()=>{
    K6();
    g1();
    getViewTransitionClassName();
    restoreViewTransitionName();
});
import { homedir as rL8 } from "os";
import { join as sL8 } from "path";
function tL8(A) {
    n0((Q)=>({
            ...Q,
            iterm2SetupInProgress: !0,
            iterm2BackupPath: A
        }));
}
function WYA() {
    n0((A)=>({
            ...A,
            iterm2SetupInProgress: !1
        }));
}
function eL8() {
    let A = v1();
    return {
        inProgress: A.iterm2SetupInProgress ?? !1,
        backupPath: A.iterm2BackupPath || null
    };
}
function OtA() {
    return sL8(rL8(), "Library", "Preferences", "com.googlecode.iterm2.plist");
}
async function E7B() {
    let A = OtA(), Q = `${A}.bak`;
    try {
        if ((await QQ("defaults", [
            "export",
            "com.googlecode.iterm2",
            A
        ]), vA().existsSync(A))) return (vA().copyFileSync(A, Q), tL8(Q), Q);
        return null;
    } catch (B) {
        return (t(B instanceof Error ? B : Error(String(B))), null);
    }
}
function z7B() {
    let { inProgress: A, backupPath: Q } = eL8();
    if (!A) return {
        status: "no_backup"
    };
    if (!Q || !vA().existsSync(Q)) return (WYA(), {
        status: "no_backup"
    });
    try {
        return (vA().copyFileSync(Q, OtA()), WYA(), {
            status: "restored"
        });
    } catch (B) {
        return (t(Error(`Failed to restore iTerm2 settings with: ${B}`)), WYA(), {
            status: "failed",
            backupPath: Q
        });
    }
}
