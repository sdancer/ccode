// Module: Wb2
// Type: U
// Lines: 434118-434135
//
var Wb2 = U((Ib2)=>{
    Object.defineProperty(Ib2, "__esModule", {
        value: !0
    });
    var Xb2 = FQ(), IS5 = cvA();
    function WS5(A, Q, B, G) {
        let Z = {
            sent_at: new Date().toISOString()
        };
        if (B && B.sdk) Z.sdk = {
            name: B.sdk.name,
            version: B.sdk.version
        };
        if (!!G && Q) Z.dsn = Xb2.dsnToString(Q);
        let Y = KS5(A);
        return Xb2.createEnvelope(Z, [
            Y
        ]);
    }
    function KS5(A) {
        let Q = IS5.serializeMetricBuckets(A);
        return [
            {
                type: "statsd",
                length: Q.length
            },
            Q
        ];
    }
    Ib2.createMetricEnvelope = WS5;
});
