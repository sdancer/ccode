// Module: BQ1
// Type: L
// Lines: 230981-231030
//
var BQ1 = L(()=>{
    _s1();
    NLB();
    xn();
    _K();
    bY();
    vs1();
    Sn();
    YMA();
    k01();
    rpcCall();
    RLB();
    jLB();
    VR();
    lT();
    Du();
    AQ1();
    EW();
    Iu();
    /*! @azure/msal-common v15.13.1 2025-10-29 */ _V.reservedTenantDomains = new Set([
        "{tenant}",
        "{tenantid}",
        Aw.COMMON,
        Aw.CONSUMERS,
        Aw.ORGANIZATIONS
    ]);
});
var GQ1 = {};
M5(GQ1, {
    createDiscoveredInstance: ()=>gt1
});
async function gt1(A, Q, B, G, Z, Y, J) {
    J?.addQueueMeasurement(L0.AuthorityFactoryCreateDiscoveredInstance, Y);
    let X = _V.transformCIAMAuthority(QQ1(A)), I = new _V(X, Q, B, G, Z, Y, J);
    try {
        return (await V5(I.resolveEndpointsAsync.bind(I), L0.AuthorityResolveEndpointsAsync, Z, J, Y)(), I);
    } catch (W) {
        throw BQ(bC);
    }
}
