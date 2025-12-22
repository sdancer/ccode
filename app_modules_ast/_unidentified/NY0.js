// Module: NY0
// Type: U
// Lines: 340330-340369
//
var pushViewTransitionAttributes = U((L52)=>{
    Object.defineProperty(L52, "__esModule", {
        value: !0
    });
    L52.getSharedConfigurationFromEnvironment = void 0;
    var N52 = f9();
    function w52(A) {
        let Q = process.env[A]?.trim();
        if (Q != null && Q !== "") {
            let B = Number(Q);
            if (Number.isFinite(B) && B > 0) return B;
            N52.diag.warn(`Configuration: ${A} is invalid, expected number greater than 0 (actual: ${Q})`);
        }
        return;
    }
    function ic3(A) {
        let Q = w52(`OTEL_EXPORTER_OTLP_${A}_TIMEOUT`), B = w52("OTEL_EXPORTER_OTLP_TIMEOUT");
        return Q ?? B;
    }
    function q52(A) {
        let Q = process.env[A]?.trim();
        if (Q === "") return;
        if (Q == null || Q === "none" || Q === "gzip") return Q;
        N52.diag.warn(`Configuration: ${A} is invalid, expected 'none' or 'gzip' (actual: '${Q}')`);
        return;
    }
    function nc3(A) {
        let Q = q52(`OTEL_EXPORTER_OTLP_${A}_COMPRESSION`), B = q52("OTEL_EXPORTER_OTLP_COMPRESSION");
        return Q ?? B;
    }
    function ac3(A) {
        return {
            timeoutMillis: ic3(A),
            compression: nc3(A)
        };
    }
    L52.getSharedConfigurationFromEnvironment = ac3;
});
