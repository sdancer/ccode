// Module: AKQ
// Type: U
// Lines: 87526-87547
//
var AKQ = U((tWQ)=>{
    Object.defineProperty(tWQ, "__esModule", {
        value: !0
    });
    tWQ.defaultEndpointResolver = void 0;
    var By4 = ly(), kj1 = createRenderState(), Gy4 = sWQ(), Zy4 = new kj1.EndpointCache({
        size: 50,
        params: [
            "Endpoint",
            "Region",
            "UseDualStack",
            "UseFIPS"
        ]
    }), Yy4 = (A, Q = {})=>{
        return Zy4.get(A, ()=>(0, kj1.resolveEndpoint)(Gy4.ruleSet, {
                endpointParams: A,
                logger: Q.logger
            }));
    };
    tWQ.defaultEndpointResolver = Yy4;
    kj1.customEndpointFunctions.aws = By4.awsEndpointFunctions;
});
