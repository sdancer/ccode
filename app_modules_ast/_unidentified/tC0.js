// Module: tC0
// Type: U
// Lines: 434594-434610
//
var tC0 = U((Cb2)=>{
    Object.defineProperty(Cb2, "__esModule", {
        value: !0
    });
    var sC0 = FQ();
    function LS5(A, Q, B, G, Z) {
        let Y = {
            sent_at: new Date().toISOString()
        };
        if (B && B.sdk) Y.sdk = {
            name: B.sdk.name,
            version: B.sdk.version
        };
        if (!!G && !!Z) Y.dsn = sC0.dsnToString(Z);
        if (Q) Y.trace = sC0.dropUndefinedKeys(Q);
        let J = OS5(A);
        return sC0.createEnvelope(Y, [
            J
        ]);
    }
    function OS5(A) {
        return [
            {
                type: "check_in"
            },
            A
        ];
    }
    Cb2.createCheckInEnvelope = LS5;
});
