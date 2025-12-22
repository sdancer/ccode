// Module: NHQ
// Type: U
// Lines: 90040-90067
//
var NHQ = U((wHQ)=>{
    Object.defineProperty(wHQ, "__esModule", {
        value: !0
    });
    wHQ.defaultEndpointResolver = void 0;
    var Tf4 = ly(), UT1 = createRenderState(), Pf4 = UHQ(), Sf4 = new UT1.EndpointCache({
        size: 50,
        params: [
            "Endpoint",
            "Region",
            "UseDualStack",
            "UseFIPS",
            "UseGlobalEndpoint"
        ]
    }), yf4 = (A, Q = {})=>{
        return Sf4.get(A, ()=>(0, UT1.resolveEndpoint)(Pf4.ruleSet, {
                endpointParams: A,
                logger: Q.logger
            }));
    };
    wHQ.defaultEndpointResolver = yf4;
    UT1.customEndpointFunctions.aws = Tf4.awsEndpointFunctions;
});
