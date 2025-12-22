// Module: $zQ
// Type: U
// Lines: 94157-94178
//
var $zQ = U((zzQ)=>{
    Object.defineProperty(zzQ, "__esModule", {
        value: !0
    });
    zzQ.defaultEndpointResolver = void 0;
    var Pl4 = ly(), _P1 = createRenderState(), Sl4 = EzQ(), yl4 = new _P1.EndpointCache({
        size: 50,
        params: [
            "Endpoint",
            "Region",
            "UseDualStack",
            "UseFIPS"
        ]
    }), xl4 = (A, Q = {})=>{
        return yl4.get(A, ()=>(0, _P1.resolveEndpoint)(Sl4.ruleSet, {
                endpointParams: A,
                logger: Q.logger
            }));
    };
    zzQ.defaultEndpointResolver = xl4;
    _P1.customEndpointFunctions.aws = Pl4.awsEndpointFunctions;
});
