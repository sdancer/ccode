// Module: dD9
// Type: L
// Lines: 531229-531333
//
var dD9 = L(()=>{
    main();
    main();
    samplingCallback();
    CV0();
    NZ();
    createRenderState();
    Q9();
    g1();
    zL();
    createRenderState();
    samplingCallback();
    KB();
    pushStartInstance();
    _Y();
    X2();
    uD9 = [
        CD1
    ];
});
function tbA(A, Q) {
    (t(A instanceof Error ? A : Error(String(A))), console.error(`${B1.cross} Failed to ${Q}: ${A instanceof Error ? A.message : String(A)}`), process.exit(1));
}
async function cD9(A, Q = "user") {
    try {
        console.log(`Installing plugin "${A}"...`);
        let B = await V49(A, Q);
        if (!B.success) throw Error(B.message);
        (console.log(`${B1.tick} ${B.message}`), r("tengu_plugin_installed_cli", {
            plugin_id: B.pluginId || A,
            marketplace_name: B.pluginId?.split("@")[1] || "unknown",
            scope: B.scope || Q
        }), process.exit(0));
    } catch (B) {
        tbA(B, `install plugin "${A}"`);
    }
}
async function pD9(A, Q = "user") {
    try {
        let B = await MfA(A, Q);
        if (!B.success) throw Error(B.message);
        (console.log(`${B1.tick} ${B.message}`), r("tengu_plugin_uninstalled_cli", {
            plugin_id: B.pluginId || A,
            scope: B.scope || Q
        }), process.exit(0));
    } catch (B) {
        tbA(B, `uninstall plugin "${A}"`);
    }
}
async function lD9(A, Q) {
    try {
        let B = await y4A(A, Q);
        if (!B.success) throw Error(B.message);
        (console.log(`${B1.tick} ${B.message}`), r("tengu_plugin_enabled_cli", {
            plugin_id: B.pluginId || A,
            scope: B.scope
        }), process.exit(0));
    } catch (B) {
        tbA(B, `enable plugin "${A}"`);
    }
}
async function iD9(A, Q) {
    try {
        let B = await RfA(A, Q);
        if (!B.success) throw Error(B.message);
        (console.log(`${B1.tick} ${B.message}`), r("tengu_plugin_disabled_cli", {
            plugin_id: B.pluginId || A,
            scope: B.scope
        }), process.exit(0));
    } catch (B) {
        tbA(B, `disable plugin "${A}"`);
    }
}
async function nD9(A, Q) {
    try {
        o9(`Checking for updates for plugin "${A}" at ${Q} scope…
`);
        let B = await x4A(A, Q);
        if (!B.success) throw Error(B.message);
        if ((o9(`${B1.tick} ${B.message}
`), !B.alreadyUpToDate)) r("tengu_plugin_updated_cli", {
            plugin_id: A,
            old_version: B.oldVersion || "unknown",
            new_version: B.newVersion || "unknown"
        });
        await x8(0);
    } catch (B) {
        tbA(B, `update plugin "${A}"`);
    }
}
