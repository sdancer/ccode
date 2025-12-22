// Module: zIQ
// Type: U
// Lines: 85503-85524
//
var zIQ = U((FIQ)=>{
    Object.defineProperty(FIQ, "__esModule", {
        value: !0
    });
    FIQ.defaultEndpointResolver = void 0;
    var u_4 = ly(), Xj1 = createRenderState(), m_4 = DIQ(), d_4 = new Xj1.EndpointCache({
        size: 50,
        params: [
            "Endpoint",
            "Region",
            "UseDualStack",
            "UseFIPS"
        ]
    }), c_4 = (A, Q = {})=>{
        return d_4.get(A, ()=>(0, Xj1.resolveEndpoint)(m_4.ruleSet, {
                endpointParams: A,
                logger: Q.logger
            }));
    };
    FIQ.defaultEndpointResolver = c_4;
    Xj1.customEndpointFunctions.aws = u_4.awsEndpointFunctions;
});
