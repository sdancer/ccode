// Module: oy2
// Type: L
// Lines: 427869-427954
//
var rpcCall = L(()=>{
    bA();
    x9A();
    qV();
    s1();
    WI1();
    getViewTransitionClassName();
    zB();
    ((Rz = l(React runtime(), 1)), (iy2 = l(AT(), 1)), (ny2 = l(React runtime(), 1)));
});
async function KI1() {
    let A = process.argv.includes("-p") || process.argv.includes("--print");
    if ($vA()) return !1;
    if (!(await pX("auto_migrate_to_native"))) return !1;
    if (V0(!1) || !1 || A || V0(process.env.DISABLE_AUTO_MIGRATE_TO_NATIVE)) return !1;
    if (v1().installMethod === "native") return !1;
    return !0;
}
async function ry2() {
    r("tengu_auto_migrate_to_native_attempt", {});
    try {
        let A = Y7()?.autoUpdatesChannel ?? "latest", Q = await Vd(A, !0), B = [];
        if (Q.latestVersion) {
            (r("tengu_auto_migrate_to_native_success", {}), k("✅ Upgraded to native installation. Future sessions will use the native version."));
            let { removed: Z, errors: Y, warnings: J } = await zvA(), X = [];
            if (Y.length > 0) Y.forEach((K)=>{
                X.push({
                    message: K,
                    userActionRequired: !1,
                    type: "error"
                });
            });
            if (J.length > 0) J.forEach((K)=>{
                X.push({
                    message: K,
                    userActionRequired: !1,
                    type: "info"
                });
            });
            if (Z > 0) X.push({
                message: `Cleaned up ${Z} old npm installation(s)`,
                userActionRequired: !1,
                type: "info"
            });
            let I = EvA();
            B = [
                ...(await zf(!0)),
                ...I,
                ...X
            ];
        } else (r("tengu_auto_migrate_to_native_partial", {}), k("⚠️ Native installation setup encountered issues but cleanup completed."), (B = await zf(!0)));
        let G = [];
        if (B.length > 0) {
            let Z = B.filter((Y)=>Y.userActionRequired);
            if (Z.length > 0) {
                let Y = [
                    "⚠️  Manual action required after migration to native installer:",
                    ...Z.map((J)=>`• ${J.message}`)
                ].join(`
`);
                G.push(Y);
            }
            (k("Migration completed with the following notes:"), B.forEach((Y)=>{
                k(`  • [${Y.type}] ${Y.message}`);
            }));
        }
        return {
            success: !0,
            version: Q.latestVersion,
            notifications: G.length > 0 ? G : void 0
        };
    } catch (A) {
        return (r("tengu_auto_migrate_to_native_failure", {
            error: A instanceof Error ? A.message : String(A)
        }), t(A instanceof Error ? A : Error(String(A))), {
            success: !1
        });
    }
}
