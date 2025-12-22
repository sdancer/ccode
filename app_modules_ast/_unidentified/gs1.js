// Module: gs1
// Type: L
// Lines: 229470-229519
//
var gs1 = L(()=>{
    lT(); /*! @azure/msal-common v15.13.1 2025-10-29 */ 
});
function ULB({ authOptions: A, systemOptions: Q, loggerOptions: B, cacheOptions: G, storageInterface: Z, networkInterface: Y, cryptoInterface: J, clientCredentials: X, libraryInfo: I, telemetry: W, serverTelemetryManager: K, persistencePlugin: V, serializableCache: H }) {
    let D = {
        ...Oo8,
        ...B
    };
    return {
        authOptions: So8(A),
        systemOptions: {
            ...Lo8,
            ...Q
        },
        loggerOptions: D,
        cacheOptions: {
            ...Mo8,
            ...G
        },
        storageInterface: Z || new d01(A.clientId, nJA, new Bw(D), new AXA()),
        networkInterface: Y || Ro8,
        cryptoInterface: J || nJA,
        clientCredentials: X || jo8,
        libraryInfo: {
            ..._o8,
            ...I
        },
        telemetry: {
            ...Po8,
            ...W
        },
        serverTelemetryManager: K || null,
        persistencePlugin: V || null,
        serializableCache: H || null
    };
}
function So8(A) {
    return {
        clientCapabilities: [],
        azureCloudOptions: To8,
        skipAuthorityMetadataCache: !1,
        instanceAware: !1,
        encodeExtraQueryParams: !1,
        ...A
    };
}
function c01(A) {
    return A.authOptions.authority.options.protocolMode === eE.OIDC;
}
var Lo8, Oo8, Mo8, Ro8, _o8, jo8, To8, Po8;
