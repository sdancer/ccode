// Module: tW2
// Type: U
// Lines: 361642-361669
//
var tW2 = U((rW2)=>{
    Object.defineProperty(rW2, "__esModule", {
        value: !0
    });
    rW2.convertLegacyOtlpGrpcOptions = void 0;
    var t05 = f9(), oW2 = mW2(), e05 = gSA(), AQ5 = aW2();
    function QQ5(A, Q) {
        if (A.headers) t05.diag.warn("Headers cannot be set when using grpc");
        let B = A.credentials;
        return (0, oW2.mergeOtlpGrpcConfigurationWithDefaults)({
            url: A.url,
            metadata: ()=>{
                return A.metadata ?? (0, e05.createEmptyMetadata)();
            },
            compression: A.compression,
            timeoutMillis: A.timeoutMillis,
            concurrencyLimit: A.concurrencyLimit,
            credentials: B != null ? ()=>B : void 0
        }, (0, AQ5.getOtlpGrpcConfigurationFromEnv)(Q), (0, oW2.getOtlpGrpcDefaultConfiguration)());
    }
    rW2.convertLegacyOtlpGrpcOptions = QQ5;
});
