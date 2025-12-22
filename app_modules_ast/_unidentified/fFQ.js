// Module: fFQ
// Type: U
// Lines: 92175-92214
//
var fFQ = U((vFQ)=>{
    Object.defineProperty(vFQ, "__esModule", {
        value: !0
    });
    vFQ.resolveHttpAuthRuntimeConfig = vFQ.getHttpAuthExtensionConfiguration = void 0;
    var Su4 = (A)=>{
        let { httpAuthSchemes: Q, httpAuthSchemeProvider: B, credentials: G } = A;
        return {
            setHttpAuthScheme (Z) {
                let Y = Q.findIndex((J)=>J.schemeId === Z.schemeId);
                if (Y === -1) Q.push(Z);
                else Q.splice(Y, 1, Z);
            },
            httpAuthSchemes () {
                return Q;
            },
            setHttpAuthSchemeProvider (Z) {
                B = Z;
            },
            httpAuthSchemeProvider () {
                return B;
            },
            setCredentials (Z) {
                G = Z;
            },
            credentials () {
                return G;
            }
        };
    };
    vFQ.getHttpAuthExtensionConfiguration = Su4;
    var yu4 = (A)=>{
        return {
            httpAuthSchemes: A.httpAuthSchemes(),
            httpAuthSchemeProvider: A.httpAuthSchemeProvider(),
            credentials: A.credentials()
        };
    };
    vFQ.resolveHttpAuthRuntimeConfig = yu4;
});
