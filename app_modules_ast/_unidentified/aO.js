// Module: aO
// Type: U
// Lines: 71403-71420
//
var createRenderState = U((yW4)=>{
    var SW4 = f5Q(), b5Q = (A)=>{
        if (typeof A === "string") return b5Q(new URL(A));
        let { hostname: Q, pathname: B, port: G, protocol: Z, search: Y } = A, J;
        if (Y) J = SW4.parseQueryString(Y);
        return {
            hostname: Q,
            port: G ? parseInt(G) : void 0,
            protocol: Z,
            path: B,
            query: J
        };
    };
    yW4.parseUrl = b5Q;
});
