// Module: XVQ
// Type: U
// Lines: 88945-88966
//
var XVQ = U((YVQ)=>{
    Object.defineProperty(YVQ, "__esModule", {
        value: !0
    });
    YVQ.defaultEndpointResolver = void 0;
    var av4 = ly(), ej1 = createRenderState(), ov4 = ZVQ(), rv4 = new ej1.EndpointCache({
        size: 50,
        params: [
            "Endpoint",
            "Region",
            "UseDualStack",
            "UseFIPS"
        ]
    }), sv4 = (A, Q = {})=>{
        return rv4.get(A, ()=>(0, ej1.resolveEndpoint)(ov4.ruleSet, {
                endpointParams: A,
                logger: Q.logger
            }));
    };
    YVQ.defaultEndpointResolver = sv4;
    ej1.customEndpointFunctions.aws = av4.awsEndpointFunctions;
});
