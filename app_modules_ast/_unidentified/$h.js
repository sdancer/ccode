// Module: $h
// Type: U
// Lines: 78492-78529
//
var $h = U((az4)=>{
    var iz4 = KZQ(), VZQ = "content-length";
    function HZQ(A) {
        return (Q)=>async (B)=>{
                let G = B.request;
                if (iz4.HttpRequest.isInstance(G)) {
                    let { body: Z, headers: Y } = G;
                    if (Z && Object.keys(Y).map((J)=>J.toLowerCase()).indexOf(VZQ) === -1) try {
                        let J = A(Z);
                        G.headers = {
                            ...G.headers,
                            [VZQ]: String(J)
                        };
                    } catch (J) {}
                }
                return Q({
                    ...B,
                    request: G
                });
            };
    }
    var DZQ = {
        step: "build",
        tags: [
            "SET_CONTENT_LENGTH",
            "CONTENT_LENGTH"
        ],
        name: "contentLengthMiddleware",
        override: !0
    }, nz4 = (A)=>({
            applyToStack: (Q)=>{
                Q.add(HZQ(A.bodyLengthChecker), DZQ);
            }
        });
    az4.contentLengthMiddleware = HZQ;
    az4.contentLengthMiddlewareOptions = DZQ;
    az4.getContentLengthPlugin = nz4;
});
