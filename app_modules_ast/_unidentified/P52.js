// Module: P52
// Type: U
// Lines: 340438-340469
//
var renderElement = U((j52)=>{
    Object.defineProperty(j52, "__esModule", {
        value: !0
    });
    j52.convertLegacyHttpOptions = void 0;
    var OY0 = qY0(), Gp3 = _52(), Zp3 = f9(), Yp3 = dPA();
    function Jp3(A) {
        if (typeof A.httpAgentOptions === "function") return A.httpAgentOptions;
        let Q = A.httpAgentOptions;
        if (A.keepAlive != null) Q = {
            keepAlive: A.keepAlive,
            ...Q
        };
        if (Q != null) return (0, OY0.httpAgentFactoryFromOptions)(Q);
        else return;
    }
    function Xp3(A, Q, B, G) {
        if (A.metadata) Zp3.diag.warn("Metadata cannot be set when using http");
        return (0, OY0.mergeOtlpHttpConfigurationWithDefaults)({
            url: A.url,
            headers: (0, Yp3.wrapStaticHeadersInFunction)(A.headers),
            concurrencyLimit: A.concurrencyLimit,
            timeoutMillis: A.timeoutMillis,
            compression: A.compression,
            agentFactory: Jp3(A)
        }, (0, Gp3.getHttpConfigurationFromEnvironment)(Q, B), (0, OY0.getHttpConfigurationDefaults)(G, B));
    }
    j52.convertLegacyHttpOptions = Xp3;
});
