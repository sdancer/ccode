// Module: T49
// Type: L
// Lines: 476027-476081
//
var rpcCall = L(()=>{
    cV();
    preload();
    KH1 = l(React runtime(), 1);
});
function P49({ ideSelection: A, mcpClients: Q, ideInstallationStatus: B }) {
    let { addNotification: G } = z5(), Z = HDA(Q), Y = B ? VP(B?.ideType) : !1, J = B?.error || Y, X = Z === "connected" && (A?.filePath || (A?.text && A.lineCount > 0)), I = Z === "connected" && !X, W = J && !Y && !I && !X, K = J && Y && !I && !X;
    (PfA.useEffect(()=>{
        if (fK() || Z !== null || K) return;
        jjA(!0).then((V)=>{
            let H = V[0]?.name;
            if (H) G({
                key: "ide-status-hint",
                text: `${B1.circle} /ide for ${H}`,
                priority: "low"
            });
        });
    }, [
        G,
        Z,
        K
    ]), PfA.useEffect(()=>{
        if (W || K || Z !== "disconnected") return;
        G({
            key: "ide-status-disconnected",
            text: `${B1.circle} IDE disconnected`,
            color: "error",
            priority: "medium"
        });
    }, [
        G,
        Z,
        W,
        K
    ]), PfA.useEffect(()=>{
        if (!K) return;
        G({
            key: "ide-status-jetbrains-disconnected",
            text: "IDE plugin not connected · /status for info",
            priority: "medium"
        });
    }, [
        G,
        K
    ]), PfA.useEffect(()=>{
        if (!W) return;
        G({
            key: "ide-status-install-error",
            text: "IDE extension install failed (see /status for info)",
            color: "error",
            priority: "medium"
        });
    }, [
        G,
        W
    ]));
}
var PfA;
