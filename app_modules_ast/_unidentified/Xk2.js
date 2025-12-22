// Module: Xk2
// Type: U
// Lines: 430590-430603
//
var Xk2 = U((Jk2)=>{
    Object.defineProperty(Jk2, "__esModule", {
        value: !0
    });
    var Sq5 = createRenderState(), yq5 = pushViewTransitionAttributes();
    function xq5(A, Q, B) {
        let G = [
            {
                type: "client_report"
            },
            {
                timestamp: B || yq5.dateTimestampInSeconds(),
                discarded_events: A
            }
        ];
        return Sq5.createEnvelope(Q ? {
            dsn: Q
        } : {}, [
            G
        ]);
    }
    Jk2.createClientReportEnvelope = xq5;
});
