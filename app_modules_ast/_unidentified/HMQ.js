// Module: HMQ
// Type: U
// Lines: 106610-106631
//
var HMQ = U((KMQ)=>{
    Object.defineProperty(KMQ, "__esModule", {
        value: !0
    });
    KMQ.defaultEndpointResolver = void 0;
    var cj6 = ly(), Jk1 = createRenderState(), pj6 = WMQ(), lj6 = new Jk1.EndpointCache({
        size: 50,
        params: [
            "Endpoint",
            "Region",
            "UseDualStack",
            "UseFIPS"
        ]
    }), ij6 = (A, Q = {})=>{
        return lj6.get(A, ()=>(0, Jk1.resolveEndpoint)(pj6.ruleSet, {
                endpointParams: A,
                logger: Q.logger
            }));
    };
    KMQ.defaultEndpointResolver = ij6;
    Jk1.customEndpointFunctions.aws = cj6.awsEndpointFunctions;
});
