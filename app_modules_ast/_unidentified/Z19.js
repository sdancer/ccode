// Module: Z19
// Type: L
// Lines: 469947-470004
//
var Z19 = L(()=>{
    qV();
    samplingCallback();
    OK();
    s1();
    X2();
    EyA();
    IJ1();
    GHA();
    WxA();
    R4A = l(React runtime(), 1);
});
function J19({ autoConnectIdeFlag: A, ideToInstallExtension: Q, setDynamicMcpConfig: B, setShowIdeOnboarding: G, setIDEInstallationState: Z }) {
    Y19.useEffect(()=>{
        function Y(J) {
            if (!J) return;
            if (!((v1().autoConnectIde || A || fK() || Q || V0(process.env.CLAUDE_CODE_AUTO_CONNECT_IDE)) && !KK(process.env.CLAUDE_CODE_AUTO_CONNECT_IDE))) return;
            B((W)=>{
                if (W?.ide) return W;
                return {
                    ...W,
                    ide: {
                        type: J.url.startsWith("ws:") ? "ws-ide" : "sse-ide",
                        url: J.url,
                        ideName: J.name,
                        authToken: J.authToken,
                        ideRunningInWindows: J.ideRunningInWindows,
                        scope: "dynamic"
                    }
                };
            });
        }
        IcB(Y, Q, ()=>G(!0), (J)=>Z(J));
    }, [
        A,
        Q,
        B,
        G,
        Z
    ]);
}
var Y19;
