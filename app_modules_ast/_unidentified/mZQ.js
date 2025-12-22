// Module: mZQ
// Type: U
// Lines: 78939-78948
//
var mZQ = U((gZQ)=>{
    Object.defineProperty(gZQ, "__esModule", {
        value: !0
    });
    gZQ.getEndpointFromConfig = void 0;
    var oC4 = renderElement(), rC4 = hZQ(), sC4 = async (A)=>(0, oC4.loadConfig)((0, rC4.getEndpointUrlConfig)(A ?? ""))();
    gZQ.getEndpointFromConfig = sC4;
});
