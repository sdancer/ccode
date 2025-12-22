// Module: Jh
// Type: U
// Lines: 64389-64426
//
var Jh = U((A34)=>{
    var s84 = T4Q();
    function t84(A) {
        return A;
    }
    var P4Q = (A)=>(Q)=>async (B)=>{
                if (!s84.HttpRequest.isInstance(B.request)) return Q(B);
                let { request: G } = B, { handlerProtocol: Z = "" } = A.requestHandler.metadata || {};
                if (Z.indexOf("h2") >= 0 && !G.headers[":authority"]) (delete G.headers.host, (G.headers[":authority"] = G.hostname + (G.port ? ":" + G.port : "")));
                else if (!G.headers.host) {
                    let Y = G.hostname;
                    if (G.port != null) Y += `:${G.port}`;
                    G.headers.host = Y;
                }
                return Q(B);
            }, S4Q = {
        name: "hostHeaderMiddleware",
        step: "build",
        priority: "low",
        tags: [
            "HOST"
        ],
        override: !0
    }, e84 = (A)=>({
            applyToStack: (Q)=>{
                Q.add(P4Q(A), S4Q);
            }
        });
    A34.getHostHeaderPlugin = e84;
    A34.hostHeaderMiddleware = P4Q;
    A34.hostHeaderMiddlewareOptions = S4Q;
    A34.resolveHostHeaderConfig = t84;
});
