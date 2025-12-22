// Module: OF9
// Type: L
// Lines: 532495-532549
//
var OF9 = L(()=>{
    getViewTransitionClassName();
    zB();
    pushStartInstance();
    g1();
});
function MF9() {
    let A = sG(), Q = A.enableAllProjectMcpServers !== void 0, B = A.enabledMcpjsonServers && A.enabledMcpjsonServers.length > 0, G = A.disabledMcpjsonServers && A.disabledMcpjsonServers.length > 0;
    if (!Q && !B && !G) return;
    try {
        let Z = uB("localSettings") || {}, Y = {}, J = [];
        if (Q && Z.enableAllProjectMcpServers === void 0) ((Y.enableAllProjectMcpServers = A.enableAllProjectMcpServers), J.push("enableAllProjectMcpServers"));
        else if (Q) J.push("enableAllProjectMcpServers");
        if (B && A.enabledMcpjsonServers) {
            let X = Z.enabledMcpjsonServers || [];
            ((Y.enabledMcpjsonServers = [
                ...new Set([
                    ...X,
                    ...A.enabledMcpjsonServers
                ])
            ]), J.push("enabledMcpjsonServers"));
        }
        if (G && A.disabledMcpjsonServers) {
            let X = Z.disabledMcpjsonServers || [];
            ((Y.disabledMcpjsonServers = [
                ...new Set([
                    ...X,
                    ...A.disabledMcpjsonServers
                ])
            ]), J.push("disabledMcpjsonServers"));
        }
        if (Object.keys(Y).length > 0) Q2("localSettings", Y);
        if (J.includes("enableAllProjectMcpServers") || J.includes("enabledMcpjsonServers") || J.includes("disabledMcpjsonServers")) tZ((X)=>{
            let { enableAllProjectMcpServers: I, enabledMcpjsonServers: W, disabledMcpjsonServers: K, ...V } = X;
            return V;
        });
        r("tengu_migrate_mcp_approval_fields_success", {
            migratedCount: J.length
        });
    } catch  {
        r("tengu_migrate_mcp_approval_fields_error", {});
    }
}
