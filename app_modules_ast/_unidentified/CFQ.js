// Module: CFQ
// Type: U
// Lines: 91845-91872
//
var CFQ = U((EFQ)=>{
    Object.defineProperty(EFQ, "__esModule", {
        value: !0
    });
    EFQ.defaultEndpointResolver = void 0;
    var og4 = ly(), uT1 = createRenderState(), rg4 = FFQ(), sg4 = new uT1.EndpointCache({
        size: 50,
        params: [
            "Endpoint",
            "Region",
            "UseDualStack",
            "UseFIPS",
            "UseGlobalEndpoint"
        ]
    }), tg4 = (A, Q = {})=>{
        return sg4.get(A, ()=>(0, uT1.resolveEndpoint)(rg4.ruleSet, {
                endpointParams: A,
                logger: Q.logger
            }));
    };
    EFQ.defaultEndpointResolver = tg4;
    uT1.customEndpointFunctions.aws = og4.awsEndpointFunctions;
});
