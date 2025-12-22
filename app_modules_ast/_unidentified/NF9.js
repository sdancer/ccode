// Module: NF9
// Type: L
// Lines: 532462-532495
//
var NF9 = L(()=>{
    getViewTransitionClassName();
    getViewTransitionClassName();
    i0();
    zB();
    createRenderState();
    renderElement();
    sH();
    TFA();
    A2();
    g1();
    obA();
});
function LF9() {
    let A = v1();
    if (A.autoUpdates !== !1 || A.autoUpdatesProtectedForNative === !0) return;
    try {
        let Q = uB("userSettings") || {};
        (Q2("userSettings", {
            ...Q,
            env: {
                ...Q.env,
                DISABLE_AUTOUPDATER: "1"
            }
        }), r("tengu_migrate_autoupdates_to_settings", {
            was_user_preference: !0,
            already_had_env_var: !!Q.env?.DISABLE_AUTOUPDATER
        }), (process.env.DISABLE_AUTOUPDATER = "1"), n0((B)=>{
            let { autoUpdates: G, autoUpdatesProtectedForNative: Z, ...Y } = B;
            return Y;
        }));
    } catch (Q) {
        (t(Error(`Failed to migrate auto-updates: ${Q}`)), r("tengu_migrate_autoupdates_error", {
            has_error: !0
        }));
    }
}
