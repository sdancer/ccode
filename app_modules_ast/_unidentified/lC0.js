// Module: lC0
// Type: U
// Lines: 433793-433835
//
var lC0 = U((ef2)=>{
    Object.defineProperty(ef2, "__esModule", {
        value: !0
    });
    var sHA = FQ();
    function VP5(A, Q) {
        if (!Q) return A;
        return ((A.sdk = A.sdk || {}), (A.sdk.name = A.sdk.name || Q.name), (A.sdk.version = A.sdk.version || Q.version), (A.sdk.integrations = [
            ...(A.sdk.integrations || []),
            ...(Q.integrations || [])
        ]), (A.sdk.packages = [
            ...(A.sdk.packages || []),
            ...(Q.packages || [])
        ]), A);
    }
    function HP5(A, Q, B, G) {
        let Z = sHA.getSdkMetadataForEnvelopeHeader(B), Y = {
            sent_at: new Date().toISOString(),
            ...(Z && {
                sdk: Z
            }),
            ...(!!G && Q && {
                dsn: sHA.dsnToString(Q)
            })
        }, J = "aggregates" in A ? [
            {
                type: "sessions"
            },
            A
        ] : [
            {
                type: "session"
            },
            A.toJSON()
        ];
        return sHA.createEnvelope(Y, [
            J
        ]);
    }
    function DP5(A, Q, B, G) {
        let Z = sHA.getSdkMetadataForEnvelopeHeader(B), Y = A.type && A.type !== "replay_event" ? A.type : "event";
        VP5(A, B && B.sdk);
        let J = sHA.createEventEnvelopeHeaders(A, Z, G, Q);
        delete A.sdkProcessingMetadata;
        let X = [
            {
                type: Y
            },
            A
        ];
        return sHA.createEnvelope(J, [
            X
        ]);
    }
    ef2.createEventEnvelope = DP5;
    ef2.createSessionEnvelope = HP5;
});
