// Module: wNA
// Type: L
// Lines: 179437-179507
//
var pushStartInstance = L(()=>{
    pushStartInstance();
    bA();
    getViewTransitionClassName();
    A4();
    aB();
    restoreViewTransitionName();
    n2();
    ((pL8 = l(React runtime(), 1)), (W7B = l(React runtime(), 1)));
    V7B = Y0(()=>{
        if (K7B() || sG().projectOnboardingSeenCount >= 4 || process.env.IS_DEMO) return !1;
        return !0;
    });
});
import { homedir as iL8 } from "os";
import { join as nL8 } from "path";
function aL8(A) {
    n0((Q)=>({
            ...Q,
            appleTerminalSetupInProgress: !0,
            appleTerminalBackupPath: A
        }));
}
function qNA() {
    n0((A)=>({
            ...A,
            appleTerminalSetupInProgress: !1
        }));
}
function oL8() {
    let A = v1();
    return {
        inProgress: A.appleTerminalSetupInProgress ?? !1,
        backupPath: A.appleTerminalBackupPath || null
    };
}
function IYA() {
    return nL8(iL8(), "Library", "Preferences", "com.apple.Terminal.plist");
}
async function F7B() {
    let A = IYA(), Q = `${A}.bak`;
    try {
        let { code: B } = await QQ("defaults", [
            "export",
            "com.apple.Terminal",
            A
        ]);
        if (B !== 0) return null;
        if (vA().existsSync(A)) return (await QQ("defaults", [
            "export",
            "com.apple.Terminal",
            Q
        ]), aL8(Q), Q);
        return null;
    } catch (B) {
        return (t(B instanceof Error ? B : Error(String(B))), null);
    }
}
async function LtA() {
    let { inProgress: A, backupPath: Q } = oL8();
    if (!A) return {
        status: "no_backup"
    };
    if (!Q || !vA().existsSync(Q)) return (qNA(), {
        status: "no_backup"
    });
    try {
        let { code: B } = await QQ("defaults", [
            "import",
            "com.apple.Terminal",
            Q
        ]);
        if (B !== 0) return {
            status: "failed",
            backupPath: Q
        };
        return (await QQ("killall", [
            "cfprefsd"
        ]), qNA(), {
            status: "restored"
        });
    } catch (B) {
        return (t(Error(`Failed to restore Terminal.app settings with: ${B}`)), qNA(), {
            status: "failed",
            backupPath: Q
        });
    }
}
