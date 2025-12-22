// Module: GUQ
// Type: U
// Lines: 96928-96949
//
var GUQ = U((QUQ)=>{
    Object.defineProperty(QUQ, "__esModule", {
        value: !0
    });
    QUQ.defaultEndpointResolver = void 0;
    var Me4 = ly(), TS1 = createRenderState(), Re4 = AUQ(), _e4 = new TS1.EndpointCache({
        size: 50,
        params: [
            "Endpoint",
            "Region",
            "UseDualStack",
            "UseFIPS"
        ]
    }), je4 = (A, Q = {})=>{
        return _e4.get(A, ()=>(0, TS1.resolveEndpoint)(Re4.ruleSet, {
                endpointParams: A,
                logger: Q.logger
            }));
    };
    QUQ.defaultEndpointResolver = je4;
    TS1.customEndpointFunctions.aws = Me4.awsEndpointFunctions;
});
