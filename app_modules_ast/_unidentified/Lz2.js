// Module: Lz2
// Type: L
// Lines: 374400-374445
//
var performWork = L(()=>{
    R5();
    pE();
});
async function X45() {
    try {
        let A = await QQ("gh", [
            "auth",
            "status",
            "--active",
            "--json",
            "hosts"
        ], {
            useCwd: !1,
            timeout: 5000
        });
        if (A.code !== 0 || !A.stdout.trim()) return null;
        let B = JSON.parse(A.stdout)?.hosts;
        if (!B || typeof B !== "object") return null;
        for (let [G, Z] of Object.entries(B)){
            if (!Array.isArray(Z) || Z.length === 0) continue;
            let Y = Z[0];
            if (Y?.login) return {
                username: Y.login,
                hostname: G
            };
        }
        return null;
    } catch (A) {
        return null;
    }
}
async function I45() {
    try {
        let A = await QQ("git", [
            "config",
            "--get",
            "user.email"
        ], {
            useCwd: !1,
            timeout: 5000
        });
        if (A.code === 0 && A.stdout.trim()) return A.stdout.trim();
        return null;
    } catch (A) {
        return null;
    }
}
async function BK0() {
    if (!sZ(!0) && !m9()) return;
    if (kx()) return;
    if (!0) {
        let Z = await cG1();
        if (Z.hasError || !Z.vcsAccountLinkingEnabled) return;
    }
    let [B, G] = await Promise.all([
        X45(),
        I45()
    ]);
    if (B || G) Nz2(B?.username ?? "", B?.hostname ?? "", G ?? "");
}
