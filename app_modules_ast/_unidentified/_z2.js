// Module: _z2
// Type: L
// Lines: 375000-375030
//
var _z2 = L(()=>{
    bA();
    VW();
    s1();
    ZZ();
    K8();
    $2();
    renderElement();
    JZ = l(React runtime(), 1);
});
async function jVA() {
    let A = a6()?.accessToken;
    if (!A) throw Error("Claude Code web sessions require authentication with a Claude.ai account. API key authentication is not sufficient. Please run /login to authenticate, or check your authentication status with /status.");
    let Q = await dy();
    if (!Q) throw Error("Unable to get organization UUID");
    let B = `${w9().BASE_API_URL}/v1/environment_providers`;
    try {
        let G = {
            ...PV(A),
            "x-organization-uuid": Q
        }, Z = await PQ.get(B, {
            headers: G,
            timeout: 15000
        });
        if (Z.status !== 200) throw Error(`Failed to fetch environments: ${Z.status} ${Z.statusText}`);
        return Z.data.environments;
    } catch (G) {
        let Z = G instanceof Error ? G : Error(String(G));
        throw (t(Z), Error(`Failed to fetch environments: ${Z.message}`));
    }
}
